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

const ResidentWallet = () => {
    const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

    const [selectedTrend, setSelectedTrend] = useState<string | null>(trend[0])

    // const [togglResidentMenu, setTogglResidentMenu] = useState(false)
    // const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')

    // const menuToggler = () => setTogglResidentMenu(!togglResidentMenu)

    // const handleSelectedTrend = (item: Trend) => {
    //     setSelectedTrend(item)
    //     setTogglResidentMenu(false)
    // }

    // const [fetchedTransactions, setFetchedTransactions] = useState<
    //     ITransactions[]
    // >([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setTimeout(() => {
    //             setFetchedTransactions(TRANSACTION_HISTORY)
    //         }, 200)
    //     }
    //     fetchData()
    // }, [])

    // const navigate = useNavigate()

    // type Actions = 'View Details'

    // const actions = ['View Details'] satisfies Actions[]

    // const [toggleDropDown, setToggleDropDown] = useState<{
    //     isDropDownOpen: boolean
    //     index: number | null
    // }>({
    //     isDropDownOpen: false,
    //     index: null,
    // })

    // const dropDownHandler = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     index: number
    // ) => {
    //     setToggleDropDown(() => {
    //         return {
    //             isDropDownOpen: e.target.checked,
    //             index,
    //         }
    //     })
    // }

    // const selectAction = (e: React.MouseEvent, item: string) => {
    //     if (item === 'View Details') {
    //         navigate('/superAdmin/wallet/resident/:id')
    //     }
    // }

    // const sortBy: SortBy[] = ['A-Z', 'date']

    // interface Paginate {
    //     index: number
    //     currentPage: number
    //     itemsPerPage: number
    //     totalPage: number
    //     slicedPages: ITransactions[][] | null
    // }

    // const [toggleSortMenu, setToggleSortMenu] = useState(false)
    // const itemsPerPageArr = [2, 4, 6, 8]

    // const [selectedSort, setSelectedSort] = useState<SortBy | null>(null)
    // const [paginate, setPaginate] = useState<Paginate>({
    //     index: 0,
    //     currentPage: 1,
    //     itemsPerPage: 6,

    //     totalPage: Math.ceil(fetchedTransactions.length / 2),
    //     slicedPages: null,
    // })

    // const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu)

    // const handleSelectedSort = (item: SortBy) => {
    //     setSelectedSort(item)
    //     setToggleSortMenu(false)
    // }

    // const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    //     const item = parseInt(e.target.value)

    //     const slicedPages: ITransactions[][] = []
    //     for (let i = 0; i < fetchedTransactions.length; i += item) {
    //         slicedPages.push(fetchedTransactions.slice(i, i + item))
    //     }

    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             itemsPerPage: item,
    //             index: 0,
    //             currentPage: 1,
    //             slicedPages,
    //             totalPage: Math.ceil(fetchedTransactions.length / item),
    //         }
    //     })
    // }

    // useEffect(() => {
    //     const slicedPages: ITransactions[][] = []
    //     for (
    //         let i = 0;
    //         i < fetchedTransactions.length;
    //         i += paginate.itemsPerPage
    //     ) {
    //         slicedPages.push(
    //             fetchedTransactions.slice(i, i + paginate.itemsPerPage)
    //         )
    //     }

    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             slicedPages,
    //         }
    //     })
    // }, [fetchedTransactions])

    // const handleNext = () => {
    //     if (paginate.currentPage === paginate.totalPage) return
    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             index: prev.index + 1,
    //             currentPage: prev.currentPage + 1,
    //         }
    //     })
    // }

    // const handlePrev = () => {
    //     if (paginate.currentPage === 1) return
    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             index: prev.index - 1,
    //             currentPage: prev.currentPage - 1,
    //         }
    //     })
    // }

    // const { currentPage, slicedPages, itemsPerPage } = paginate

    // const jumpToPage = (e: React.MouseEvent, index: number) => {
    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             index,
    //             currentPage: index + 1,
    //         }
    //     })
    // }

    // const handleSelectedAction = (item: Actions, index: string) => {
    //     setToggleDropDown(() => {
    //         return {
    //             isDropDownOpen: false,
    //             index: null,
    //         }
    //     })

    //     if (item === 'View Details') {
    //         navigate(`/superAdmin/wallet/resident/:${index}`)
    //     }
    // }

    // const [fetchedResidentBalance, setFetchedResidentBalance] = useState<
    //     ResidentTransactions[] | null
    // >(null)
    // const [fetchedTransactionHistory, setFetchedTransactionHistory] = useState<
    //     ResidentTransactions[] | null
    // >(null)

    type Path = 'transaction-history' | 'resident-balance'

    // useEffect(() => {
    //     setTimeout(() => {
    //         setFetchedResidentBalance(RESIDENT_BALANCE)
    //         setFetchedTransactionHistory(RESIDENT_TRANSACTION_HISTORY)
    //     }, 200)
    // }, [])

    const [pathIndex, setpathIndex] = useState<Path>('resident-balance')

    const handlePathSwitch = new Map([
        ['transaction-history', <></>],
        ['resident-balance', <></>],
    ]) satisfies Map<Path, JSX.Element>

    return (
        <div>
            <div className='grid mt-12 pb-10 rounded-lg  items-baseline gap-10'>
                <div className='flex justify-between items-center content-start bg-white p-8 rounded-lg'>
                    <div className=''>
                        <OverviewWallet
                            amount={200_333_500.89}
                            title='Resident Wallet'
                            isWalletScreen
                        />
                    </div>

                    <Select
                        label='Wallet Trend'
                        state={trend}
                        selectedState={selectedTrend}
                        setSelectedState={setSelectedTrend}
                    />
                </div>
                <div className='grid gap-10'>
                    <div className='estateDetail'>
                        <div className='estateDetail__radioBox'>
                            {}
                            <input
                                defaultChecked
                                type='radio'
                                name='resident'
                                id='residentTransactionHistory'
                                className='hidden'
                                onChange={() =>
                                    setpathIndex('resident-transaction-history')
                                }
                            />
                            <label htmlFor='residentTransactionHistory'>
                                Transaction History
                            </label>

                            <input
                                type='radio'
                                name='resident'
                                id='residentBalance'
                                className='hidden'
                                onChange={() =>
                                    setpathIndex('resident-balance')
                                }
                            />
                            <label htmlFor='residentBalance'>
                                Resident Balance
                            </label>
                        </div>
                        <div className='mt-8 grid gap-8'>
                            <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                                {handlePathSwitch.get(pathIndex)}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidentWallet
