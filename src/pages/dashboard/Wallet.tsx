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

    useEffect(() => {
        const swiperProps = swiperRef.current
        if (swiperProps && swiperProps.swiper) {
            setCurrentSwiperIndex(swiperProps.swiper.activeIndex)
        }
    }, [swiperRef.current])

    const handleSlideChange = (swiper: { activeIndex: number }) => {
        setCurrentSwiperIndex(() => {
            if (swiper.activeIndex === OverviewWallets.length + 1) {
                return 1
            } else if (swiper.activeIndex === 0) {
                return OverviewWallets.length
            }
            return swiper.activeIndex
        })
    }

    console.log({ currentSwiperIndex })

    return (
        <div className='overview'>
            <h1 className='heading2'>Overview</h1>
            <div className='overview__container'>
                <section className='overview__left'>
                    <OverviewCards />
                </section>
                <section className='overview__right'>
                    <div className='overviewWallet__wrapper'>
                        <Swiper
                            ref={swiperRef}
                            spaceBetween={30}
                            centeredSlides={true}
                            loop={true}
                            modules={[Autoplay, Pagination]}
                            className='overviewWallet__swiper'
                            onSlideChange={handleSlideChange}
                        >
                            {React.Children.toArray(
                                OverviewWallets.map((item) => {
                                    return item
                                })
                            )}
                        </Swiper>

                        <OverviewWalletNav
                            currentSwiperIndex={currentSwiperIndex}
                            prev={handlePrevButtonClick}
                            next={handleNextButtonClick}
                            max={4}
                        />
                    </div>

                    <div className='overviewChart'>
                        <p className='overviewChart__heading'>Today's Inflow</p>
                        <div className='overviewChart__box'>
                            <OverviewChart
                                currentSwiperIndex={currentSwiperIndex}
                            />

                            {currentSwiperIndex && (
                                <div className='overviewChart__label'>
                                    <p className='overviewChart__label--percentage'>
                                        {
                                            overviewChart_data[
                                                currentSwiperIndex - 1
                                            ].value
                                        }
                                        <span>%</span>
                                    </p>
                                    <p className='overviewChart__label--title'>
                                        {
                                            overviewChart_data[
                                                currentSwiperIndex - 1
                                            ].name
                                        }
                                    </p>
                                </div>
                            )}
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
