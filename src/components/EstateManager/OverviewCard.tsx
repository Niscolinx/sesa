import React, { FC } from 'react'

type OverviewCard = {
    iconUrl: string
    title: string
    number: number
    bgColor: string
    textColor: string
    percent?: number
    arrow?: string
    bottomLeft?: string
    bottomRight?: string
}

const OverviewCard: FC<OverviewCard> = ({
    iconUrl,
    title,
    number,
    bgColor,
    percent,
    arrow,
    bottomLeft,
    bottomRight,
    textColor = 'black',
}) => {
    return (
        <div className={`h-[15rem] rounded-2xl p-8 ${bgColor}`}>
            <div className='flex gap-4 items-baseline'>
                <img src={iconUrl} alt='' className='' />
                <div>
                    <p className='overviewCard__title'>{title}</p>
                    <p className={`overviewCard__number ${textColor}`}>
                        {number.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className={`${textColor}`}>
                <p>{bottomLeft}</p>
                <p>{bottomRight}</p>
            </div>
        </div>
    )
}

export default OverviewCard
