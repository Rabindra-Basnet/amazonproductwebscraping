import type { NextApiRequest, NextApiResponse } from "next";
import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB();

    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products for carousel'
        })
    }

}