import { getProductById } from '@/lib/action'
import { Product } from '@/types/types'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    params: { id: string }
}


const ProductDetails = async ({ params: { id } }: Props) => {
    const product: Product = await getProductById(id)
    if (!product) redirect('/')
    return (
        <div className='product-container' >
            {id}
            <div className='flex gap-1 xl:flex-row flex-col'>
                <div className='product-image'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className='mx-auto'
                    />
                    <div className='flex-1 flex flex-col'>
                        <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
                            <div className='flex flex-col gap-3'>
                                <p className='text-[28px]font-semibold text-secondary'> {product.title}</p>
                                <Link href={product.url}
                                    target='_blank'
                                    className='text-base text-blank opacity-50'>
                                    Visit Product
                                </Link>
                            </div>

                            <div className='flex items-center gap-3'>
                                <div className='product-hearts'>
                                    <Image
                                        src='/assets/icons/red-heart.svg'
                                        alt='heart'
                                        width={20}
                                        height={20} />
                                    <p className='text-base font-semibold text-[#D46F77]'>
                                        {product.reviewCount}

                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
