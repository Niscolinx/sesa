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
        <div className={` rounded-2xl p-8 grid gap-8 ${bgColor}`}>
            <div className='flex gap-10 items-center'>
                <img src={iconUrl} alt='' className='w-[5rem]' />
                <div>
                    <p className='font-medium'>{title}</p>
                    <p className={`text-[2.6rem] font-medium ${textColor}`}>
                        {number.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className={`${textColor} border-t `}>
                <p>{bottomLeft}</p>
                <p>{bottomRight}</p>
            </div>
        </div>
    )
}

export default OverviewCard
