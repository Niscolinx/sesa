
import React from 'react'

import OverviewChart from '../../components/overview/OverviewChart'

import  {
    OverviewWallet,
} from '../../components/overview/OverviewWallets'
import { TbCurrencyNaira } from 'react-icons/tb'

export const overviewChart_data = [
    { name: 'Resident Wallet', value: 10 },
    { name: 'Security Company Wallet', value: 10 },
    { name: 'Estate Wallet', value: 45 },
    { name: 'Commission Wallet', value: 17 },
]

export const overviewChart_colors = ['#EA0B90', '#23C375', '#098DFF', '#404243']

const Wallet = () => {
    return (
        <div>
            <h1 className='heading2'>Wallet</h1>
            <div className='bg-white grid mt-12 py-10 gap-8 rounded-lg'>
                <div className='flex items-center max-w-[90rem] mx-auto gap-10'>
                    <div>
                        <p className='text-[1.6rem] font-semibold'>
                            Total Balance (Pool Wallet)
                        </p>
                        <h1 className='text-[3rem] font-bold flex items-center gap-0'>
                            <TbCurrencyNaira className='text-[3rem]' />
                            800,836,709.74
                        </h1>
                    </div>
                    <div className='overviewChart__box'>
                        <OverviewChart />

                        <div className='overviewChart__label'>
                            <p className='overviewChart__label--percentage'>
                                hee
                                <span>%</span>
                            </p>
                            <p className='overviewChart__label--title'>
                                jsdsdd
                            </p>
                        </div>
                    </div>
                    <ul className='overviewChart__list'>
                        {React.Children.toArray(
                            overviewChart_data.map((item, index) => {
                                return (
                                    <li className='overviewChart__list--item'>
                                        <span
                                            style={{
                                                background:
                                                    overviewChart_colors[index],
                                            }}
                                        >
                                            &nbsp;
                                        </span>
                                        <p>{item.name}</p>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </div>
                <div
                    className='grid max-w-[90rem] gap-10 mx-auto'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <OverviewWallet
                        amount={200_333_500.89}
                        title='Resident Wallet'
                        isWalletScreen
                    />
                    <OverviewWallet
                        amount={160_847}
                        title={'Security Company Wallet'}
                        isWalletScreen
                        bgImgUri='/icons/overview/card/bgS.svg'
                        lefIconUri='/icons/overview/card/leftS.svg'
                        bgColor='bg-[#6AB95F]'
                    />
                    <OverviewWallet
                        amount={1_032_422}
                        title={'Estate Wallet'}
                        isWalletScreen
                        bgImgUri='/icons/overview/card/bgE.svg'
                        lefIconUri='/icons/overview/card/leftE.svg'
                        bgColor='bg-[#97346F]'
                    />
                    <OverviewWallet
                        amount={4_000_832}
                        title={'Commission Wallet'}
                        isWalletScreen
                        bgImgUri='/icons/overview/card/bgC.svg'
                        lefIconUri='/icons/overview/card/leftC.svg'
                        bgColor='bg-[#333333]'
                    />
                </div>
            </div>
        </div>
    )
}

export default Wallet
