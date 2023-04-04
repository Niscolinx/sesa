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
// import {
//     ResidentTransactions,
//     RESIDENT_BALANCE,
//     RESIDENT_TRANSACTION_HISTORY,
// } from '../../../components/SuperAdmin/wallet/resident/ResidentTransactions'

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
    const [isWarning, setIsWarning] = useState(true)

    const [togglResidentMenu, setTogglResidentMenu] = useState(false)
    const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')

    const menuToggler = () => setTogglResidentMenu(!togglResidentMenu)

    const handleSelectedTrend = (item: Trend) => {
        setSelectedTrend(item)
        setTogglResidentMenu(false)
    }

    const [fetchedTransactions, setFetchedTransactions] = useState<
        ITransactions[]
    >([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedTransactions(TRANSACTION_HISTORY)
            }, 200)
        }
        fetchData()
    }, [])

    const navigate = useNavigate()

    type Actions = 'View Details'

    const actions = ['View Details'] satisfies Actions[]

    const [toggleDropDown, setToggleDropDown] = useState<{
        isDropDownOpen: boolean
        index: number | null
    }>({
        isDropDownOpen: false,
        index: null,
    })

    const dropDownHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: e.target.checked,
                index,
            }
        })
    }

    const selectAction = (e: React.MouseEvent, item: string) => {
        if (item === 'View Details') {
            navigate('/superAdmin/wallet/resident/:id')
        }
    }

    const sortBy: SortBy[] = ['A-Z', 'date']

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: ITransactions[][] | null
    }

    const [toggleSortMenu, setToggleSortMenu] = useState(false)
    const itemsPerPageArr = [2, 4, 6, 8]

    const [selectedSort, setSelectedSort] = useState<SortBy | null>(null)
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: 6,

        totalPage: Math.ceil(fetchedTransactions.length / 2),
        slicedPages: null,
    })

    const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu)

    const handleSelectedSort = (item: SortBy) => {
        setSelectedSort(item)
        setToggleSortMenu(false)
    }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ITransactions[][] = []
        for (let i = 0; i < fetchedTransactions.length; i += item) {
            slicedPages.push(fetchedTransactions.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedTransactions.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ITransactions[][] = []
        for (
            let i = 0;
            i < fetchedTransactions.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedTransactions.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedTransactions])

    const handleNext = () => {
        if (paginate.currentPage === paginate.totalPage) return
        setPaginate((prev) => {
            return {
                ...prev,
                index: prev.index + 1,
                currentPage: prev.currentPage + 1,
            }
        })
    }

    const handlePrev = () => {
        if (paginate.currentPage === 1) return
        setPaginate((prev) => {
            return {
                ...prev,
                index: prev.index - 1,
                currentPage: prev.currentPage - 1,
            }
        })
    }

    const { currentPage, slicedPages, itemsPerPage } = paginate

    const jumpToPage = (e: React.MouseEvent, index: number) => {
        setPaginate((prev) => {
            return {
                ...prev,
                index,
                currentPage: index + 1,
            }
        })
    }

    const handleSelectedAction = (item: Actions, index: string) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'View Details') {
            navigate(`/superAdmin/wallet/resident/:${index}`)
        }
    }

    const [fetchedResidentBalance, setFetchedResidentBalance] = useState<
        ResidentTransactions[] | null
    >(null)
    const [fetchedTransactionHistory, setFetchedTransactionHistory] = useState<
        ResidentTransactions[] | null
    >(null)

    type PathIndex = 'resident-transaction-history' | 'resident-balance'

    useEffect(() => {
        setTimeout(() => {
            setFetchedResidentBalance(RESIDENT_BALANCE)
            setFetchedTransactionHistory(RESIDENT_TRANSACTION_HISTORY)
        }, 200)
    }, [])

    const [pathIndex, setpathIndex] = useState<PathIndex>(
        'resident-transaction-history'
    )

    const handlePathSwitch = {
        'resident-transaction-history': (
            <ResidentTransactions
                fetchedResidentTransactions={fetchedTransactionHistory ?? []}
            />
        ),
        'resident-balance': (
            <ResidentTransactions
                fetchedResidentTransactions={fetchedResidentBalance ?? []}
                isResidentBalance
            />
        ),
    }

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

                    <div className='border-l border-l-color-grey'>
                        <div className='flex justify-between'>
                            <p className='text-[1.6rem] font-Satoshi-Medium p-8'>
                                Wallet Trend
                            </p>

                            <div className='relative grid gap-4'>
                                <div className='relative flex items-center w-[12rem]'>
                                    <p
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                        onClick={menuToggler}
                                    >
                                        {selectedTrend}
                                    </p>
                                    {togglResidentMenu ? (
                                        <GrUp className='absolute right-4' />
                                    ) : (
                                        <GrDown className='absolute right-4' />
                                    )}
                                </div>

                                {togglResidentMenu && (
                                    <div className='absolute top-[8rem]  left-0 border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                        {trend.map((item, index) => (
                                            <p
                                                className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                key={index}
                                                onClick={() =>
                                                    handleSelectedTrend(item)
                                                }
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <WalletBarChart />
                    </div>
                </div>
                <div className='grid gap-10'>
                    <div className='estateDetail'>
                        <div className='estateDetail__radioBox'>
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
                                {fetchedResidentBalance &&
                                    handlePathSwitch[pathIndex]}
                            </section>
                        </div>
                    </div>
                    <div className='grid text-[1.6rem] gap-10 bg-white p-8 rounded-lg'>
                        <div className='flex w-full items-center gap-12 '>
                            <p className=' font-Satoshi-Medium'>
                                Withdrawal History <span>(10)</span>
                            </p>
                            <div className='relative flex items-center'>
                                <img
                                    src='/icons/admins/search.svg'
                                    alt=''
                                    className='absolute left-4 text-[4rem]'
                                />
                                <input
                                    type='text'
                                    placeholder='Search Parameters'
                                    className='pl-16 w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                                />
                            </div>
                            <div className='relative flex items-center w-[20rem] justify-items-start cursor-pointer'>
                                <p
                                    className='border border-color-primary-light p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left'
                                    onClick={sortMenuToggler}
                                >
                                    {selectedSort || 'Today'}
                                </p>

                                {toggleSortMenu && (
                                    <div className='absolute top-[5rem]  left-0 border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                        {sortBy.map((item, index) => (
                                            <p
                                                className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left'
                                                key={index}
                                                onClick={() =>
                                                    handleSelectedSort(item)
                                                }
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                {toggleSortMenu ? (
                                    <GrUp className='absolute right-4 text-[1.3rem]' />
                                ) : (
                                    <GrDown className='absolute right-4 text-[1.3rem]' />
                                )}
                            </div>
                            <div className='relative flex items-center w-[20rem] justify-items-start cursor-pointer'>
                                <p
                                    className='border border-color-primary-light p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left'
                                    onClick={sortMenuToggler}
                                >
                                    {selectedSort || 'Sort By'}
                                </p>

                                {toggleSortMenu && (
                                    <div className='absolute top-[5rem]  left-0 border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                        {sortBy.map((item, index) => (
                                            <p
                                                className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left'
                                                key={index}
                                                onClick={() =>
                                                    handleSelectedSort(item)
                                                }
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                {toggleSortMenu ? (
                                    <GrUp className='absolute right-4 text-[1.3rem]' />
                                ) : (
                                    <GrDown className='absolute right-4 text-[1.3rem]' />
                                )}
                            </div>
                        </div>

                        <div className='grid'>
                            <div
                                className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-8 gap-8 items-center'
                                style={{
                                    fontSize: '1.4rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <p>Date</p>
                                </p>
                                <p>Transaction Type</p>
                                <p>Transaction Category</p>
                                <p>Transaction ID</p>
                                <p>Amount</p>
                                <p>Time</p>
                                <p>Balance</p>
                                <p>Actions</p>
                            </div>

                            <div className='grid gap-8 p-8'>
                                {paginate.slicedPages &&
                                paginate.slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        paginate.slicedPages[
                                            paginate.index
                                        ].map(
                                            (
                                                {
                                                    id,
                                                    transactionCategory,
                                                    transactionId,
                                                    transactionType,
                                                    balance,
                                                    time,
                                                    date,
                                                    amount,
                                                },
                                                i
                                            ) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-8 gap-8 items-center py-5'>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <span>{date}</span>
                                                        </p>
                                                        <p>
                                                            {transactionType ===
                                                            'Credit' ? (
                                                                <span className='text-green-600'>
                                                                    {
                                                                        transactionType
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span className='text-red-600'>
                                                                    {
                                                                        transactionType
                                                                    }
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p>
                                                            {
                                                                transactionCategory
                                                            }
                                                        </p>
                                                        <p>{transactionId}</p>
                                                        <p className='flex items-center gap-.5'>
                                                            <img
                                                                src='/icons/Naira.svg'
                                                                alt=''
                                                            />
                                                            <span>
                                                                {amount}
                                                            </span>
                                                        </p>
                                                        <p>{time}</p>
                                                        <p className='flex items-center gap-.5'>
                                                            <img
                                                                src='/icons/Naira.svg'
                                                                alt=''
                                                            />
                                                            <span>
                                                                {balance}
                                                            </span>
                                                        </p>

                                                        <div className='relative'>
                                                            <label
                                                                className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                                htmlFor={i.toString()}
                                                                onClick={() =>
                                                                    setToggleDropDown(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                isDropDownOpen:
                                                                                    !prev.isDropDownOpen,
                                                                                index: i,
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <span className='text-color-primary'>
                                                                    <img
                                                                        src='/icons/admins/threeDots.svg'
                                                                        alt=''
                                                                    />
                                                                </span>
                                                            </label>
                                                            <input
                                                                type='radio'
                                                                name='dropdown'
                                                                className='hidden'
                                                                id={i.toString()}
                                                                onChange={(e) =>
                                                                    dropDownHandler(
                                                                        e,
                                                                        i
                                                                    )
                                                                }
                                                            />

                                                            {isDropDownOpen &&
                                                                index === i && (
                                                                    <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                                                        {actions.map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <p
                                                                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                                                    key={
                                                                                        index +
                                                                                        i
                                                                                    }
                                                                                    onClick={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleSelectedAction(
                                                                                            item,
                                                                                            id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </p>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    )
                                ) : (
                                    <div>
                                        <div className='relative'>
                                            <div className='absolute w-full grid place-content-center'>
                                                <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <footer className='flex items-center p-4 mt-4 bg-color-white rounded-lg'>
                            <div className='flex gap-8 items-center'>
                                <p>View</p>
                                <select
                                    name=''
                                    id=''
                                    className='flex items-center border px-4 rounded-lg outline-none cursor-pointer'
                                    onChange={handleItemsPerPage}
                                >
                                    <option hidden>{itemsPerPage}</option>
                                    {itemsPerPageArr.map((item, index) => (
                                        <option
                                            value={item}
                                            key={index}
                                            className='capitalize cursor-pointer bg-white'
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <p className='text'>List per page</p>
                            </div>
                            <ul className='flex items-center gap-5 ml-10'>
                                <HiOutlineChevronLeft
                                    onClick={handlePrev}
                                    className='cursor-pointer'
                                />

                                {slicedPages?.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {index + 1 === currentPage ? (
                                                <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                                    {index + 1}
                                                </span>
                                            ) : (
                                                <span
                                                    className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
                                                    onClick={(e) =>
                                                        jumpToPage(e, index)
                                                    }
                                                >
                                                    {index + 1}
                                                </span>
                                            )}
                                        </li>
                                    )
                                })}

                                {/* <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        {totalPage}
                    </li> */}
                                <HiOutlineChevronRight
                                    onClick={handleNext}
                                    className='cursor-pointer'
                                />
                            </ul>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidentWallet
