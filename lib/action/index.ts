'use server'

import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utlis";
import { User } from "@/types/types";

import { generateEmailBody, sendEmail } from "../nodemailer";



export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    try {
        await connectToDB()
        const scrapeProduct = await scrapeAmazonProduct(productUrl)

        console.log(scrapeProduct)
        console.log(productUrl)

        if (!scrapeProduct) return;

        let product = scrapeProduct;
        console.log(scrapeProduct)

        const existingProduct = await Product.findOne({ url: scrapeProduct.url })

        if (existingProduct) {
            const updatePriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapeProduct.currentPrice }
            ]
            product = {
                ...scrapeProduct,
                priceHistory: updatePriceHistory,
                lowestPrice: getLowestPrice(updatePriceHistory),
                highestPrice: getHighestPrice(updatePriceHistory),
                averagePrice: getAveragePrice(updatePriceHistory)
            }
            // this can be done 
            //     await Product.updateOne(
            //         { url: scrapeProduct.url },
            //         {$set: product}
            //     )
            // } else {
            //     // if product doesnot exist, create
            //     const newproduct = new Product(product)
            //     await newproduct.save();
            //     console.log(newproduct)
        }

        const newproduct = await Product.findOneAndUpdate(
            // to add data to database we need to find one and update function as it has a functionality to create and update
            { url: scrapeProduct.url }, // query
            product, //updated products
            { upsert: true, new: true } // upxert opt
        )

        // update existing products
        // revalidate the path after create/update
        revalidatePath(`/products/${newproduct._id}`)



    } catch (error: any) {
        console.error(`Error scraping product: ${error.message}`);
        throw new Error(`Failed to create/update products:`);
    }
}


export async function getProductById(productId: string) {
    try {
        await connectToDB();

        const product = await Product.findOne({ _id: productId })

        if (!product) return null;

        return product

    } catch (error: any) {
        throw new Error(`failed to get product by Id ${error.message}`)
    }
}

export async function getAllProducts() {
    try {
        await connectToDB();

        const products = await Product.find({})
        return products

    } catch (error: any) {
        throw new Error(error.message)
    }
}
export async function getSimilarProducts(productId: string) {
    try {
        await connectToDB();

        const currentProduct = await Product.findById(productId)
        if (!currentProduct) return null
        const similarProducts = await Product.find({
            _id: { $ne: productId }
        }).limit(3)
        return similarProducts

    } catch (error: any) {
        throw new Error(error.message)
    }
}



// export async function addUserEmailToProduct(productId: string, userEmail: string) {
//     try {
//         const product = await Product.findById(productId);

//         if (!product) return null;
//         if (!product.users) {
//             console.log(`users array not found in product: ${JSON.stringify(product)}`)
//             product.users = []
//         }

//         const userExists = product.user.some((user: User) => user.email == userEmail);

//         if (!userExists) {
//             product.users.push({ email: userEmail })
//             await product.save();
//             const emailContent = await generateEmailBody(product, 'WELCOME')
//             await sendEmail(emailContent, [userEmail])
//         }

//     } catch (error: any) {
//         throw new Error(`Error to submit email and sent mail to database ${error.message}`)
//     }
// }

export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
        const product = await Product.findById(productId);

        if (!product) return null;

        if (!product.users) {
            console.log(`users array not found in product: ${JSON.stringify(product)}`);
            product.users = [];
        }

        // Fix: Corrected `product.user` to `product.users`
        const userExists = product.users.some((user: User) => user.email === userEmail);

        if (!userExists) {
            product.users.push({ email: userEmail });
            await product.save();

            const emailContent = await generateEmailBody(product, 'WELCOME');
            await sendEmail(emailContent, [userEmail]);
        }

    } catch (error: any) {
        throw new Error(`Error submitting email and sending mail to database: ${error.message}`);
    }
}
