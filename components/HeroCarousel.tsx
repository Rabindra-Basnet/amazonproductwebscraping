'use client'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useEffect, useState, } from "react";


// const heroImages = [
//     { imgUrl: "/assets/images/hero-1.svg", alt: 'smart watch' },
//     { imgUrl: "/assets/images/hero-2.svg", alt: 'bag' },
//     { imgUrl: "/assets/images/hero-3.svg", alt: 'lamp' },
//     { imgUrl: "/assets/images/hero-4.svg", alt: 'air' },
//     { imgUrl: "/assets/images/hero-5.svg", alt: 'chair' },

// ]

interface Product {
    _id: string,
    title: string,
    image: string,
}


const HeroCarousel = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products')
                if (!response.ok) {
                    throw new Error(`Network Response was not ok`)
                }

                const data: Product[] = await response.json()
                setProducts(data)
                console.log('Fetched products', data)
            } catch (error) {
                setProducts([])
            }
        }
        fetchProducts();
    }, [])
    return (
        <div className="hero-carousel">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={2000}
                showArrows={false}
                showStatus={false}
            >
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Image
                            key={product._id}
                            src={product.image}
                            alt={product.title}
                            height={484}
                            width={484}
                            className='object-contain'
                        />
                    ))
                ) : (
                    [<div key='no-products'>No products available</div>]
                    // JSX element instead of an empty string
                )}

            </Carousel >
            <Image
                src='/assets/icons/hand-drawn-arrow.svg'
                alt="arrow"
                width={175}
                height={175}
                className="max-xl:hidden absolute -left-[15%] bottom-0"

            />
        </div >
    )
}

export default HeroCarousel
