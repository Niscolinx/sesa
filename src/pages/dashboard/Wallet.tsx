import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import OverviewChart from '../../components/overview/OverviewChart'
import OverviewCards from '../../components/overview/OverviewCards'
import OverviewWallets from '../../components/overview/OverviewWallets'
import OverviewWalletNav from '../../components/overview/OverviewWalletNav'

export const overviewChart_data = [
    { name: 'Resident Wallet', value: 10 },
    { name: 'Security Company Wallet', value: 10 },
    { name: 'Estate Wallet', value: 45 },
    { name: 'Commission Wallet', value: 17 },
]

export const overviewChart_colors = ['#EA0B90', '#23C375', '#098DFF', '#404243']

const Wallet = () => {
    const swiperRef: MutableRefObject<SwiperRef> = useRef(null as any)
    const [currentSwiperIndex, setCurrentSwiperIndex] = useState<number>(
        null as any
    )

    const handlePrevButtonClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev()
        }
    }

    const handleNextButtonClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext()
        }
    }

    

    console.log({ currentSwiperIndex })

    return (
        <div>
            <h1 className='heading2'>Wallet</h1>
            <div className='bg-white grid mt-12 justify-center overflow-scroll gap-8'>
                <section className='overview__right'>
                    {React.Children.toArray(
                        OverviewWallets.map((item) => {
                            return item
                        })
                    )}

                    <div className='overviewChart'>
                        <p className='overviewChart__heading'>Today's Inflow</p>
                        <div className='overviewChart__box'>
                            <OverviewChart
                                currentSwiperIndex={currentSwiperIndex}
                            />

                            
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
                                                        overviewChart_colors[
                                                            index
                                                        ],
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
                </section>
            </div>
        </div>
    )
}

export default Wallet
