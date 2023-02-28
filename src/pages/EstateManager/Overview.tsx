
import OverviewChart from '../../components/SuperAdmin/charts/OverviewChart'

import  { OverviewWallet } from '../../components/SuperAdmin/overview/OverviewWallets'
import OverviewCard, { OverviewCard_CheckIn } from '../../components/EstateManager/OverviewCard'
import React from 'react'


export const overviewChart_data = [
    { name: 'Resident Wallet', value: 10 },
    { name: 'Security Company Wallet', value: 10 },
    { name: 'Estate Wallet', value: 45 },
    { name: 'Commission Wallet', value: 17 },
]

export const overviewChart_colors = ['#EA0B90', '#23C375', '#098DFF', '#404243']

const Overview = () => {


  


    return (
        <div className=''>
            <div
                className='grid gap-8'
                style={{
                    gridTemplateColumns: '60% auto',
                }}
            >
                <section
                    className=' bg-white rounded-lg grid p-8 gap-10'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(30rem, 1fr))',
                    }}
                >
                    <OverviewCard
                        title='Total Residents'
                        number={18_000}
                        iconUrl='/icons/securityCompany/totalEstates.svg'
                        bgColor='bg-[#EDFDEC]'
                        textColor='text-[#1A8F56]'
                        bottomLeft='Alpha 56%'
                        bottomRight='Res. User 44%'
                    />
                    <OverviewCard
                        title='Properties'
                        number={1532}
                        iconUrl='/icons/securityCompany/securityGuards.svg'
                        bgColor='bg-[#F5F9FA]'
                        textColor='text-[#00C2FF]'
                        bottomLeft='Residential 56%'
                        bottomRight='Business 44%'
                    />
                    <OverviewCard
                        title='Security Guards'
                        number={1200}
                        iconUrl='/icons/securityCompany/AssignedSecurityGuards.svg'
                        bgColor='bg-[#FCF3FA]'
                        textColor='text-[#B6008E]'
                        bottomLeft='23 guards on duty'
                    />
                    <OverviewCard_CheckIn/>
                </section>
                <section className='overview__right'>
                    <OverviewWallet
                        amount={200_333_500.89}
                        title='Estate Wallet'
                        isWalletScreen
                    />

                    <div className='overviewChart'>
                        <p className='overviewChart__heading'>Today's Inflow</p>
                        <div className='overviewChart__box'>
                            <OverviewChart />

                            <div className='overviewChart__label'>
                                <p className='overviewChart__label--percentage'>
                                    45
                                    <span>%</span>
                                </p>
                                <p className='overviewChart__label--title'>
                                    Estate Wallet
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

export default Overview
