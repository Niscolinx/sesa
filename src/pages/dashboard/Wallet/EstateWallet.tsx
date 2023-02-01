import React from 'react'

import { TbCurrencyNaira } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { OverviewWallet } from '../../../components/overview/OverviewWallets'

export const overviewChart_data = [
    { name: 'Resident Wallet', value: 10, color: '#098DFF' },
    { name: 'Estate Wallet', value: 45, color: '#EA0B90' },
    { name: 'Security Company Wallet', value: 10, color: '#23C375' },
    { name: 'Commission Wallet', value: 17, color: '#404243' },
]

const EstateWallet = () => {
    return (
        <div>
            <h1 className='heading2'>Estate Wallet</h1>
            <div className='bg-white grid mt-12 py-10 gap-8 rounded-lg'>
                <div className=''>
                    <OverviewWallet
                        amount={1_032_422}
                        title={'Estate Wallet'}
                        isWalletScreen
                        bgImgUri='/icons/overview/card/bgE.svg'
                        lefIconUri='/icons/overview/card/leftE.svg'
                        bgColor='bg-[#97346F]'
                    />
                </div>
            </div>
        </div>
    )
}

export default EstateWallet
