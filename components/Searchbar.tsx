'use client'

import { scrapeAndStoreProduct } from "@/lib/action";
import { FormEvent, useState } from "react"

const isValidAmazonProductURl = (url: string) => {
    try {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url
        }
        const parsedURL = new URL(url)
        const hostname = parsedURL.hostname;
        ///check if hostname contains amazon
        if (hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon')
        ) {
            console.log(`Valid Amazon URL ${url}`)
            return true;
        }
        console.log("Invalid Amazon Hostname", hostname)
    } catch (error: any) {
        throw new Error(` Given as the Invalid Url: ${error.message}`)
    }
    return false
}

const Searchbar = () => {

    const [searchPrompt, setSearchPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURl(searchPrompt);


        console.log(searchPrompt);
        console.log(isValidAmazonProductURl(searchPrompt));


        // alert(isValidLink ? 'valid link' : 'invalid link')
        if (!isValidLink) return alert('please provide a valid Amazon link')

        try {
            setIsLoading(true)

            // scrape the product pagess
            const product = await scrapeAndStoreProduct(searchPrompt)
            console.log(product)
        } catch (error: any) {
            console.error(`Failed to scrape the product details:: ${error.message}`)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            className='flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder='Enter product link'
                className="searchbar-input"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
            />
            <button
                type="submit"
                className="searchbar-btn"
                disabled={searchPrompt === ""}

            >
                {isLoading ? 'Searching..' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar
