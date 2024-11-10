import { getProductById, getSimilarProducts } from '@/lib/action'
import { Product } from '@/types/types'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CgBookmark, CgChart, CgShare } from 'react-icons/cg'
import { formatNumber } from '@/lib/utlis'
import { IoPricetagOutline, IoStarOutline, IoArrowUpOutline, IoArrowDownOutline, IoStatsChartOutline } from 'react-icons/io5'
import { GoComment } from 'react-icons/go'
import PriceInfoCard from '@/components/PriceInfoCard'
import ProductCard from '@/components/ProductCard'
import Modal from '@/components/Modal'


// type Props = {
//     params: { id: string },
// }


const ProductDetails: React.FC<Props> = async ({ params }: { params: { id: string } }) => {
    const product: Product = await getProductById(id)
    if (!product) redirect('/')

    const priceInfoData = [
        {
            title: 'Current Price',
            value: `${product.currency} ${formatNumber(product.currentPrice)}`,
            iconSrc: (
                <IoPricetagOutline
                    color='blue'
                    style={{
                        width: '32px',
                        height: '32px',
                    }}
                />
            ),
        },
        {
            title: 'Average Price',
            value: `${product.currency} ${formatNumber(product.averagePrice)}`,
            iconSrc: (
                <IoStatsChartOutline
                    color='purple'
                    style={{
                        width: '32px',
                        height: '32px',
                    }}
                />
            ),

        },
        {
            title: 'Highest Price',
            value: `${product.currency} ${formatNumber(product.highestPrice)}`,
            iconSrc: (
                <IoArrowUpOutline
                    color='red'
                    style={{
                        width: '32px',
                        height: '32px',
                    }}
                />
            ),

        },
        {
            title: 'Lowest Price',
            value: `${product.currency} ${formatNumber(product.lowestPrice)}`,
            iconSrc: (
                <IoArrowDownOutline
                    color='green'
                    style={{
                        width: '32px',
                        height: '32px',
                    }}
                />
            ),
        },
    ]

    const similarProducts = await getSimilarProducts(id)

    return (
        <div className='product-container' >

            {id}
            <div className='flex gap-1  xl:flex-row  flex-col'>
                <div className='product-image'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className='mx-auto'
                    />
                </div>

                <div className='flex-1 flex flex-col m-10'>
                    <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[28px] font-semibold text-secondary'>
                                {product.title}
                            </p>

                            <Link
                                href={product.url}
                                target='_blank'
                                className='text-base text-blank opacity-50'
                            >
                                Visit Product
                            </Link>
                        </div>

                        <div className='flex items-center gap-3'>
                            <div className='product-hearts'>
                                <Image
                                    src='/assets/icons/red-heart.svg'
                                    alt='heart'
                                    width={20}
                                    height={20}
                                />
                                <p className='text-base font-semibold text-[#D46F77]'
                                >
                                    {product.reviewsCount}
                                </p>
                            </div>

                            <div className='p-2 bg-white-200 rounded-10'>
                                <CgBookmark
                                    color='#555'
                                    style={{
                                        width: '20',
                                        height: '20',

                                    }}
                                />
                            </div>

                            <div className='p-2 bg-white-200 rounded-10'>
                                <CgShare
                                    color='#555'
                                    style={{
                                        width: '20',
                                        height: '20',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='product-info'>
                        <div className='flex flex-col gap-2'>
                            <p
                                className='text-[34px] text-secondary font-bold'
                            >
                                {product.currency} {formatNumber(product.currentPrice)}
                            </p>

                            <p className='text-[21px] text-secondary font-bold line-through'
                            >
                                {product.currency} {formatNumber(product.originalPrice)}

                            </p>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-3'>
                                <div className='product-stars'>
                                    <IoStarOutline
                                        color='#555'
                                        style={{
                                            width: '16',
                                            height: '16',
                                        }}
                                    />
                                    <p className='text-sm text-primary-orange font-semibold'
                                    >
                                        {product.stars || '23'}
                                    </p>
                                </div>

                                <div className='product-reviews'>
                                    <GoComment
                                        color='#555'
                                        style={{
                                            width: '16',
                                            height: '16',
                                            backgroundSize: 'bold'
                                        }}
                                    />
                                    <p
                                        className='text-sm text-secondary font-semibold'
                                    >
                                        {product.reviewsCount} Reviews
                                    </p>
                                </div>
                            </div>

                            <p className='text-sm text-black opacity-50'>
                                <span className='text-primary-green font-semibold'>93%</span> of buyers have recommended this.
                            </p>
                        </div>

                    </div>


                    <div className='m-7 flex flex-col gap-5' >
                        <div className='flex gap-5 flex-wrap '>
                            {priceInfoData.map((info, index) => (
                                <PriceInfoCard
                                    key={index}
                                    title={info.title}
                                    value={info.value}
                                    iconSrc={info.iconSrc}
                                />
                            ))}
                        </div>
                    </div>

                    <Modal productId={id} />
                </div>
            </div>

            <div className='flex flex-col gap-16'>
                <div className='flex flex-col gap-5'>
                    <h3
                        className='text-2xl text-secondary font-semibold'
                    >
                        Product Description
                    </h3>
                    <div className='flex flex-col gap-4'>
                        {product?.description?.split('\n')}
                    </div>
                </div>

                <button
                    className='btn w-fit mx-auto flex items-center justify-center'
                >
                    <Image
                        src='/assets/icons/bag.svg'
                        width={22}
                        height={22}
                        alt='check'
                    />
                    <Link
                        href='/'
                        className='text-base text-white'>
                        Buy Now
                    </Link>
                </button>
            </div>

            {similarProducts && similarProducts.length > 0 && (
                <div className='py-14 flex flex-col gap-2'>
                    <p className='section-text'> Similar Products</p>
                    <div className='flex flex-wrap gap-10 mt-7 w-full '>
                        {similarProducts.map((product) => (
                            <ProductCard key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </div>
            )}

        </div>
    )

}
export default ProductDetails


{/* <div className='flex gap-5 flex-wrap'>
        <PriceInfoCard
            title=""
            iconSrc={
                <IoPricetagOutline
                    color='blue'
                    style={{
                        width: '24',
                        height: '24',
                    }}
                />
            }
            value={`${product.currency} ${formatNumber(product.currentPrice)}`}
            borderColor= "#b6dbff"
        />
</div> */}