import { formatNumber } from "@/lib/utlis"


interface Props {
    title: string,
    iconSrc: JSX.Element,
    value: string,
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
    return (
        <div className={`price-info_card`}>
            <p className="text-base text-black-100">{title}</p>
            <div className="flex gap-1">
                {
                    // this can be done
                    /* {Image src={iconSrc} alt={title} width={24} height={24}} */
                }
                {iconSrc}
                <p className="text-2xl font-bold text-secondary">{value}</p>
            </div>
        </div>
    )
}

export default PriceInfoCard


