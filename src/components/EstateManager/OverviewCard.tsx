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
        <div className={`overviewCard ${bgColor}`}>
            <div>
                <img src={iconUrl} alt='' className='overviewCard__img' />
                <div
                    className={`overviewCard__content ${
                        percent ? 'relative' : ''
                    }`}
                >
                    <p className='overviewCard__title'>{title}</p>
                    <p className={`overviewCard__number ${textColor}`}>
                        {number.toLocaleString()}
                    </p>

                    {percent && (
                        <div className='absolute bottom-0 right-0'>
                            <img
                                src={arrow}
                                alt=''
                                className='overviewCard__arrow'
                            />
                            <p className='text-green-600'>{percent}%</p>
                        </div>
                    )}
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
