import { FC, Fragment } from 'react'
import { SwiperSlide } from 'swiper/react'

type OverviewWallet = {
    amount: number
    title: string
    bgImgUri?: string
    lefIconUri?: string
    bgColor?: string
    isWalletScreen?: boolean
}

 const OverviewWallet: FC<OverviewWallet> = ({
    amount,
    title,
    bgColor = 'bg-[#5c8bff]',
    lefIconUri = '/icons/overview/card/leftR.svg',
    bgImgUri = '/icons/overview/card/bgR.svg',
    isWalletScreen = false,
}) => {
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)

    const splittedAmount = formattedAmount.split('.')
    const wholeNum = splittedAmount[0]
    const fraction = splittedAmount[1]

    return (
        <div
            className={`overviewWallet relative overflow-hidden ${bgColor} ${
                isWalletScreen ? 'h-[18rem]' : 'h-[14rem]'
            }`}
        >
            <img
                src={bgImgUri}
                alt=''
                role={'presentation'}
                className='absolute top-0 z-[1]'
            />

            <img
                src={lefIconUri}
                alt=''
                className='overviewWallet__leftIcon z-[2]'
            />
            <div className='overviewWallet__content relative z-[2]'>
                <p className='overviewWallet__title'>{title}</p>
                <div className='overviewWallet__box'>
                    <img src='/icons/overview/card/naira.svg' alt='' />
                    <p className='overviewWallet__amount'>
                        {wholeNum}
                        <span className='text-[1.8rem]'>.{fraction}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}



export default OverviewWallet