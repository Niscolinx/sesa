import React, { FC } from 'react'

type OverviewCard = {
    iconUrl: string;
    title: string;
    number: number
    bgColor: string
    textColor: string
    percent?: number
    arrow?: string
}

const OverviewCard:FC<OverviewCard> = ({iconUrl, title, number, bgColor, percent, arrow, textColor = 'black'}) => {
    return (
        <div className={`overviewCard ${bgColor}`}>
            <img
                src={iconUrl}
                alt=''
                className='overviewCard__img'
            />
            <div className='overviewCard__content'>
                <p className='overviewCard__title'>{title}</p>
                <p className={`overviewCard__number ${textColor}`}>{number.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default OverviewCard
