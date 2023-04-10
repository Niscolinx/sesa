import React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrUp, GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import WalletBarChart from '../../../components/SuperAdmin/charts/WalletBarChart'
import { OverviewWallet } from '../../../components/SuperAdmin/overview/OverviewWallets'
import {
    ResidentTransactions,
    RESIDENT_BALANCE,
    RESIDENT_TRANSACTION_HISTORY,
} from '../../EstateManager/wallet/wallets/resident/ResidentTransactions'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import Table from '../../../components/UI/table/Table'

type Trend = 'This Week' | 'This Month' | 'This Year'

export interface ITransactions {
    id: string
    date: string
    transactionType: 'Credit' | 'Debit'
    transactionCategory: string
    transactionId: number
    amount: number
    time: string
    balance: number
}

interface ResidentWalletList {
    id: string
    residentName: string
    amount: number
    imgUri: string
}

type SortBy = 'A-Z' | 'date'

export const TRANSACTION_HISTORY: ITransactions[] = [
    {
        id: '1',
        date: '02-May, 2021',
        transactionType: 'Credit',
        transactionCategory: 'Fund Wallet',
        transactionId: 100872323,
        amount: 6000,
        time: '12:00pm',
        balance: 6000,
    },
    {
        id: '2',
        date: '02-May, 2021',
        transactionType: 'Credit',
        transactionCategory: 'Fund Wallet',
        transactionId: 100872323,
        amount: 6000,
        time: '12:00pm',
        balance: 6000,
    },
    {
        id: '3',
        date: '07-Aug, 2021',
        transactionType: 'Debit',
        transactionCategory: 'Fund Wallet',
        transactionId: 100872323,
        amount: 8000,
        time: '1:00pm',
        balance: 12000,
    },
    {
        id: '4',
        date: '02-May, 2021',
        transactionType: 'Debit',
        transactionCategory: 'Fund Wallet',
        transactionId: 100872323,
        amount: 6000,
        time: '12:00pm',
        balance: 6000,
    },
    {
        id: '5',
        date: '02-May, 2021',
        transactionType: 'Credit',
        transactionCategory: 'Fund Wallet',
        transactionId: 100872323,
        amount: 6000,
        time: '12:00pm',
        balance: 6000,
    },
    {
        id: '6',
        date: '02-May, 2021',
        transactionType: 'Credit',
        transactionCategory: 'Fund Wallet',
        transactionId: 100872323,
        amount: 6000,
        time: '12:00pm',
        balance: 6000,
    },
    {
        id: '7',
        date: '02-May, 2021',
        transactionType: 'Debit',
        transactionCategory: 'Fund Wallet',
        transactionId: 100872323,
        amount: 6000,
        time: '12:00pm',
        balance: 6000,
    },
]

const TransactionHistory = () => {
    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <Table
                fetch_url={'/manager/get/all'}
                title={'transactionHistory'}
                view_page_url={'/superAdmin/estateManagers/view/'}
                add_page_url={'/superAdmin/estateManagers/add'}
                is_add_btn={false}
                is_dropdown={false}
                THeader={['resident name', 'amount', 'date']}
                data_to_display={['resident name', 'amount', 'created_at']}
                deactivateProp={{ url: 'change/user/status' }}
            />
        </div>
    )
}

const ResidentWallet = () => {
    const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

    const [selectedTrend, setSelectedTrend] = useState<string | null>(trend[0])

    type Path = 'resident-balance' | 'transaction-history'

    const paths: Path[] = ['resident-balance', 'transaction-history']

    const [currentPath, setcurrentPath] = useState<Path>('resident-balance')

    const handlePathSwitch = new Map([
        ['transaction-history', <TransactionHistory />],
        ['resident-balance', <></>],
    ]) satisfies Map<Path, JSX.Element>

    return (
        <div>
            <div className='grid mt-12 pb-10 rounded-lg  items-baseline gap-10'>
                <div className='flex justify-between items-center content-start bg-white p-8 rounded-lg'>
                    <OverviewWallet
                        amount={200_333_500.89}
                        title='Resident Wallet'
                        isWalletScreen
                    />
                    <section>
                        <div>
                            <p className='font-Satoshi-Medium text-[2rem]'>Wallet Trend</p>
                            <div className='w-[13rem]'>
                                <Select
                                    state={trend}
                                    selectedState={selectedTrend}
                                    setSelectedState={setSelectedTrend}
                                />
                            </div>
                        </div>
                        <WalletBarChart />
                    </section>
                </div>
                <div className='grid gap-10'>
                    <div className='estateDetail__radioBox'>
                        {paths.map((path) => (
                            <>
                                <input
                                    type='radio'
                                    name='resident'
                                    id={path}
                                    className='hidden'
                                    onChange={() => setcurrentPath(path)}
                                    checked={path === currentPath}
                                />
                                <label htmlFor={path} className='capitalize'>
                                    {path.replace('-', ' ')}
                                </label>
                            </>
                        ))}
                    </div>
                    <div className='mt-8 grid gap-8'>
                        <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                            {handlePathSwitch.get(currentPath)}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidentWallet
