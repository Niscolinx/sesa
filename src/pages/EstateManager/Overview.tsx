import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import OverviewChart from '../../components/SuperAdmin/charts/OverviewChart'
import OverviewCards from '../../components/SuperAdmin/overview/OverviewCards'
import OverviewWalletNav from '../../components/SuperAdmin/overview/OverviewWalletNav'
import OverviewWallets from '../../components/SuperAdmin/overview/OverviewWallets'


export const overviewChart_data = [
    { name: 'Resident Wallet', value: 10 },
    { name: 'Security Company Wallet', value: 10 },
    { name: 'Estate Wallet', value: 45 },
    { name: 'Commission Wallet', value: 17 },
]

export const overviewChart_colors = ['#EA0B90', '#23C375', '#098DFF', '#404243']

const Overview = () => {


  


    return (
        <div className='overview'>
            <div className='overview__container'>
                <section className='overview__left'>
                    <OverviewCards />
                </section>
                <section className='overview__right'>
                    

                    <div className='overviewChart'>
                        <p className='overviewChart__heading'>Today's Inflow</p>
                        <div className='overviewChart__box'>
                            <OverviewChart />

                            
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

export default Overview
