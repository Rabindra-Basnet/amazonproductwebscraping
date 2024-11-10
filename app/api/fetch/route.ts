import { NextResponse } from "next/server";
import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";


export async function GET(request: any) {
    try {
        // const url = request.nextUrl.searchParams;
        // const action = url.get('a')
        // const query = url.get('q')
        // // Log the parameters for debugging
        // console.log(`Action: ${action}, Query: ${query}`);
        await connectToDB()
        const products = await Product.find({});
        return NextResponse.json(products)
        // if (action === 'get') {
        //     if (query === "fetch") {
        // }
        // return NextResponse.json(
        //     { message: "Invalid action or query parameters" },
        //     { status: 404 }
        // );
    }
    // } 
    catch (error: any) {
        return NextResponse.json({
            error: "An error occured fetching database",

        }, { status: 500 })
    }
}
