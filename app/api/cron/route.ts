import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utlis";
import { NextResponse } from "next/server";

export const maxDuration = 300;
export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET() {
    try {
        connectToDB();

        const products = await Product.find({})
        if (!products) throw new Error('No Products found')

        console.log(products)

        // 1 Scrape Latest Product Details and update DB
        const updatedProducts = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapeProduct = await scrapeAmazonProduct(currentProduct.url);
                if (!scrapeProduct) throw new Error('No product Found')

                const updatePriceHistory = [
                    ...currentProduct.priceHistory,
                    {
                        price: scrapeProduct.currentPrice,
                    }
                ]
                const product = {
                    ...scrapeProduct,
                    priceHistory: updatePriceHistory,
                    lowestPrice: getLowestPrice(updatePriceHistory),
                    highestPrice: getHighestPrice(updatePriceHistory),
                    averagePrice: getAveragePrice(updatePriceHistory)
                }
                const updatedProduct = await Product.findOneAndUpdate(
                    {
                        url: product.url
                    }, // query
                    product, //updated products
                );
                // 2 check each product status and sent emaol accordingly

                const emailNotifType = getEmailNotifType(
                    scrapeProduct,
                    currentProduct
                );

                if (emailNotifType && updatedProduct.users.length > 0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url
                    }
                    // construct email content
                    const emailContent = await generateEmailBody(productInfo, emailNotifType)
                    // get an array if users emails
                    const userEmails = updatedProduct.users.map((user: any) => user.email)
                    // send email notification
                    await sendEmail(emailContent, userEmails)
                }
                return updatedProduct
            })
        );
        return NextResponse.json({
            message: 'Ok',
            data: updatedProducts,
        })
    } catch (error: any) {
        throw new Error(`Error in getting all the products: ${error.message}`)
    }
}

// setInterval(async () => {
//     try {
//         console.log('Running product update interval');
//         await GET();
//         console.log('Product update completed');
//     } catch (error: any) {
//         console.error(`Error in interval: ${error.message}`);
//     }
// }, 3000000000); 