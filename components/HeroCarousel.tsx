'use client'
import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

interface Product {
    _id: string;
    title: string;
    image: string;
}

const HeroCarousel: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/fetch', {
                    next: {
                        revalidate: 10
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };

        fetchProducts();
    }, []);

    console.log(products)
    return (
        <div className="hero-carousel">
            {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
            {products.length > 0 ? (
                <Carousel
                    showThumbs={false}
                    autoPlay
                    infiniteLoop
                    interval={2000}
                    showArrows={false}
                    showStatus={false}
                >
                    {products.map((product) => (
                        <div key={product._id} className="carousel-item">
                            <Image
                                src={product.image}
                                alt={product.title}
                                height={484}
                                width={484}
                                className='object-contain'
                            />
                            <p className="legend">{product.title}</p> {/* Optional legend text */}
                        </div>
                    ))}
                </Carousel>
            ) :

                <p className="error-message">Loading....</p>
                // Show loading message until products are fetched
            }
            <Image
                src='/assets/icons/hand-drawn-arrow.svg'
                alt="arrow"
                width={175}
                height={175}
                className="max-xl:hidden absolute -left-[15%] bottom-0"
            />
        </div>
    );
};

export default HeroCarousel;
