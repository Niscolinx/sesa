import { FC, Fragment } from 'react'
import { SwiperSlide } from 'swiper/react'

type OverviewWallet = {
    amount: number
    title: string
    imgUri?: string
    bgColor?: string
}

 export const OverviewWallet: FC<OverviewWallet> = ({
     amount,
     title,
     bgColor = 'bg-[#5c8bff]',
 }) => {
     const formattedAmount = new Intl.NumberFormat('en-US', {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
     }).format(amount)

     const splittedAmount = formattedAmount.split('.')
     const wholeNum = splittedAmount[0]
     const fraction = splittedAmount[1]

     return (
         <div className={`overviewWallet relative overflow-hidden ${bgColor} h-[14rem]`}>
             <img
                 src='/icons/overview/card/cardT.svg'
                 alt=''
                 role={'presentation'}
                 className='absolute top-0 z-[1]'
             />
             
             <img
                 src='/icons/overview/card/cardLeft.svg'
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

const OverviewWallets = [
    <SwiperSlide>
        <OverviewWallet amount={200_333_500.89} title='Resident Wallet' />
    </SwiperSlide>,
    <SwiperSlide>
        <OverviewWallet amount={160_847} title={'Security Company Wallet'} />
    </SwiperSlide>,
    <SwiperSlide>
        <OverviewWallet amount={1_032_422} title={'Estate Wallet'} />
    </SwiperSlide>,
    <SwiperSlide>
        <OverviewWallet amount={4_000_832} title={'Commission Wallet'} />
    </SwiperSlide>,
]


export default OverviewWallets
