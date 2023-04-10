import React from 'react'

import { TbCurrencyNaira } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import OverviewChart from '../../components/SuperAdmin/charts/OverviewChart'
import { OverviewWallet } from '../../components/SuperAdmin/overview/OverviewWallets'
import useAxios from '../../components/hooks/useAxios'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'

export const overviewChart_data = [
    { name: 'Resident Wallet', value: 10, color: '#098DFF' },
    { name: 'Estate Wallet', value: 45, color: '#EA0B90' },
    { name: 'Security Company Wallet', value: 10, color: '#23C375' },
    { name: 'Commission Wallet', value: 17, color: '#404243' },
]

const Wallet = () => {
    interface ApiResponse {
        estate_wallet: number
        security_company_wallet: number
        resident_wallet: number
        commission_wallet: number
        pool_wallet: number
        estate_percentage: number
        security_company_percentage: number
        resident_percentage: number
        commission_percentage: number
    }

    const axiosInstance = useAxios()

    const fetchWallets = (): Promise<ApiResponse> => {
        return axiosInstance({
            url: '/admin/get/wallet',
        }).then((res) => res.data)
    }

    const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>(
        'wallets',
        fetchWallets
    )

    if (isLoading) {
        return <p className='p-8'> Loading...</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }

    console.log({ data })

    return (
        <>
            {data ? (
                <div className='bg-white grid mt-12 py-10 gap-8 rounded-lg'>
                    <div className='flex items-center max-w-[90rem] mx-auto gap-10'>
                        <div>
                            <p className='text-[1.6rem] font-semibold'>
                                Total Balance (Pool Wallet)
                            </p>
                            <h1 className='text-[3rem] font-Satoshi-Medium flex items-center gap-0'>
                                <TbCurrencyNaira className='text-[3rem]' />
                                {data.pool_wallet}
                            </h1>
                        </div>
                        <div className='overviewChart__box'>
                            <OverviewChart />

                            <div className='overviewChart__label'>
                                <p className='text-[3.4rem] font-Satoshi-Medium relative'>
                                    {Math.floor(data.resident_percentage)}
                                    <span>%</span>
                                </p>
                                <p className='text-[1rem] max-w-[9.8rem]'>
                                    Resident Wallet
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
                                                    background: item.color,
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
                        <Link to='/superAdmin/wallet/resident'>
                            <OverviewWallet
                                amount={200_333_500.89}
                                title='Resident Wallet'
                                isWalletScreen
                            />
                        </Link>

                        <Link to='/superAdmin/wallet/security-company'>
                            <OverviewWallet
                                amount={160_847}
                                title={'Security Company Wallet'}
                                isWalletScreen
                                bgImgUri='/icons/overview/card/bgS.svg'
                                lefIconUri='/icons/overview/card/leftS.svg'
                                bgColor='bg-[#6AB95F]'
                            />
                        </Link>

                        <Link to='/superAdmin/wallet/estate'>
                            <OverviewWallet
                                amount={1_032_422}
                                title={'Estate Wallet'}
                                isWalletScreen
                                bgImgUri='/icons/overview/card/bgE.svg'
                                lefIconUri='/icons/overview/card/leftE.svg'
                                bgColor='bg-[#97346F]'
                            />
                        </Link>
                        <Link to='/superAdmin/wallet/commission'>
                            <OverviewWallet
                                amount={4_000_832}
                                title={'Commission Wallet'}
                                isWalletScreen
                                bgImgUri='/icons/overview/card/bgC.svg'
                                lefIconUri='/icons/overview/card/leftC.svg'
                                bgColor='bg-[#333333]'
                            />
                        </Link>
                    </div>
                </div>
            ) : (
                <p>No Data Found</p>
            )}
        </>
    )
}

export default Wallet
