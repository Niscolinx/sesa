import React from 'react'
import WalletBarChart from '../../../components/SuperAdmin/charts/WalletBarChart'

function TokenPurchase() {
    return (
        <section
            className=' text-[1.4rem] grid gap-8'
            style={{
                gridTemplateColumns: '60% auto',
            }}
        >
            <div className='border-l border-l-color-grey bg-white rounded-lg p-8 grid gap-10'>
                <WalletBarChart />
            </div>

            <div className='bg-white p-8 rounded-lg grid justify-center items-baseline'></div>
        </section>
    )
}

export default TokenPurchase
