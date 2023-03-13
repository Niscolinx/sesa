import React from 'react'
import OverviewChart from '../../../components/SuperAdmin/charts/OverviewChart'
import WalletBarChart from '../../../components/SuperAdmin/charts/WalletBarChart'

function TokenPurchase() {
    return (
        <section
            className=' text-[1.4rem] grid gap-8 bg-white '
            style={{
                gridTemplateColumns: '60% auto',
            }}
        >
            <div className='border-l border-l-color-grey bg-white rounded-lg p-8 grid gap-10'>
                <WalletBarChart />
            </div>

            <div className='overviewChart grid justify-center'>
                <div className='overviewChart__box'>
                    <OverviewChart />

                    <div className='overviewChart__label'>
                        <p className='overviewChart__label--percentage'>
                            62
                            <span>%</span>
                        </p>
                        <p className='overviewChart__label--title'>
                            Total Denomination Count
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TokenPurchase
