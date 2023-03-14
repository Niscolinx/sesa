import React, { FC } from 'react'

type OverviewCard = {
    iconUrl: string
    title: string
    number: number | string
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
        <div className={` rounded-2xl p-8 grid gap-6 h-[15rem] ${bgColor}`}>
            <div className='flex gap-10 items-center'>
                <img src={iconUrl} alt='' className='w-[5rem]' />
                <div>
                    <p className='font-Satoshi-Medium'>{title}</p>
                    <p
                        className={`text-[2.6rem] font-Satoshi-Medium ${textColor}`}
                    >
                        {number.toLocaleString()}
                    </p>
                </div>
            </div>
            <div
                className={`${textColor} border-t flex items-center justify-around pt-4`}
            >
                <p>{bottomLeft}</p>
                <p>{bottomRight}</p>
            </div>
        </div>
    )
}
export const OverviewCard_CheckIn: FC = () => {
    return (
        <div
            className={` rounded-2xl p-8 flex justify-between gap-8 bg-[#73738b12] h-[15rem]`}
        >
            <div>
                <img src='/icons/estateManager/walkRight.svg' alt='' />
                <p>Check-In</p>
                <p className='text-[#33F110]'>25,000</p>
            </div>
            <div>
                <img src='/icons/estateManager/walkLeft.svg' alt='' />
                <p>Check-Out</p>
                <p className='text-[#A36EE6]'>25,000</p>
            </div>
        </div>
    )
}

export default OverviewCard
