import React, {
    useState,
    useEffect,
    ChangeEvent,
    FormEvent,
    useRef,
} from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown, GrUp } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

import { useNavigate } from 'react-router-dom'
import ReportChart from '../../../../components/SuperAdmin/charts/ReportsChart'

export interface TransactionHistory {
    id: number
    transactionType: string
    transactionCategory: string
    transactionId: number
    amount: number
    time: string
    date: string
    balance: number
}

export const TRANSACTION_HISTORY: TransactionHistory[] = Array.from({
    length: 10,
}).map((_, i) => ({
    id: i,
    transactionType: 'Credit',
    transactionCategory: 'Fund ResidentAccess',
    transactionId: 783239232,
    amount: 10000,
    time: '12:00pm',
    date: '12-May-2023',
    balance: 100000,
}))

type Trend = 'This Week' | 'This Month' | 'This Year'

function ResidentAccess() {
    const navigate = useNavigate()

    const [transactionHistory, setTransactionHistory] = useState<
        TransactionHistory[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setTransactionHistory(TRANSACTION_HISTORY)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: TransactionHistory[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(transactionHistory.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: TransactionHistory[][] = []
        for (let i = 0; i < transactionHistory.length; i += item) {
            slicedPages.push(transactionHistory.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(transactionHistory.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: TransactionHistory[][] = []
        for (
            let i = 0;
            i < transactionHistory.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                transactionHistory.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    transactionHistory.length / paginate.itemsPerPage
                ),
            }
        })
    }, [transactionHistory])

    const handleNext = () => {
        console.log(paginate.currentPage, paginate.totalPage)
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

    const detailsHandler = (id: number) => {
        navigate(`/estateManager/residentAccess/transaction-details/:${id}`)
    }

    return (
        <>
            <div className='estateDetail'>
                <div className='mt-8 grid gap-8'>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        Resident Access Report
                    </p>
                    <section
                        className=' text-[1.4rem] grid gap-8 bg-white py-8 px-16 rounded-lg'
                        style={{
                            gridTemplateColumns: 'auto 60%',
                        }}
                    >
                        <div className=' grid items-baseline border-r'>
                            <p className='text-[1.8rem] font-Satoshi-Medium'>
                                Count
                            </p>
                            <div className='flex items-center gap-16'>
                                <div className='grid gap-4 justify-start'>
                                    <p>Check - In</p>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src='/icons/report/walk1.svg'
                                            alt=''
                                        />
                                        <p>3000</p>
                                    </div>
                                </div>
                                <div className='grid gap-4 justify-start'>
                                    <p>Check - Out</p>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src='/icons/report/walk2.svg'
                                            alt=''
                                        />
                                        <p>3000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' grid gap-16'>
                            <div className='flex justify-between items-baseline'>
                                <p className='text-[1.8rem] font-Satoshi-Medium'>
                                    Trend
                                </p>

                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#1D9F5F] w-[1rem] h-[1rem] rounded-full'>
                                            &nbsp;
                                        </span>
                                        <span>Check-in</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#EA0B90] w-[1rem] h-[1rem] rounded-full'>
                                            &nbsp;
                                        </span>
                                        <span>Check-out</span>
                                    </div>
                                </div>
                            </div>
                            <ReportChart />
                        </div>
                    </section>
                    <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                        <div className='grid text-[1.6rem] border rounded-lg'>
                            <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                                <p className=' font-bold'>
                                    Transaction History <span>(200)</span>
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
                                        className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                                    />
                                </div>
                                <div className='relative flex items-center'>
                                    <select className=' cursor-pointer w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'>
                                        <option hidden value=''>
                                            Sort By
                                        </option>
                                        <option value='date'>date</option>
                                        <option value='alpha'>Alpha</option>
                                    </select>
                                    <GrDown className='absolute right-4 text-[1.3rem]' />
                                </div>
                            </div>

                            <div className='grid bg-white'>
                                <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-9 gap-8 text-[1.4rem] items-center'>
                                    <p className='flex items-center gap-4'>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer'
                                        />

                                        <span> Date</span>
                                    </p>
                                    <p>Transaction Type</p>
                                    <p>Transaction Category</p>
                                    <p>Transaction ID</p>
                                    <p>Narration</p>
                                    <p>Amount</p>
                                    <p>Time</p>
                                    <p>Balance</p>
                                    <p>Actions</p>
                                </div>

                                <div className='grid gap-8 mt-8 p-8'>
                                    {slicedPages && slicedPages.length > 0 ? (
                                        React.Children.toArray(
                                            slicedPages[paginate.index].map(
                                                ({
                                                    id,
                                                    date,
                                                    transactionType,
                                                    transactionCategory,
                                                    transactionId,
                                                    amount,
                                                    time,
                                                    balance,
                                                }) => {
                                                    return (
                                                        <div className='grid justify-between border-b grid-cols-9 items-center gap-8 py-4'>
                                                            <p className='flex items-center gap-4'>
                                                                <input
                                                                    type='checkbox'
                                                                    className='cursor-pointer'
                                                                />

                                                                <span>
                                                                    {' '}
                                                                    {date}
                                                                </span>
                                                            </p>
                                                            <p>
                                                                {
                                                                    transactionType
                                                                }
                                                            </p>
                                                            <p>
                                                                {
                                                                    transactionCategory
                                                                }
                                                            </p>
                                                            <p>
                                                                {transactionId}
                                                            </p>

                                                            <p className='flex items-center gap-.5'>
                                                                <img
                                                                    src='/icons/Naira.svg'
                                                                    alt=''
                                                                />
                                                                <span>
                                                                    {amount.toLocaleString()}
                                                                </span>
                                                            </p>
                                                            <p>{time}</p>
                                                            <p className='flex items-center gap-.5'>
                                                                <img
                                                                    src='/icons/Naira.svg'
                                                                    alt=''
                                                                />
                                                                <span>
                                                                    {balance.toLocaleString()}
                                                                </span>
                                                            </p>
                                
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
                                        {itemsPerPageArr.map((item, index) => (
                                            <option
                                                value={item}
                                                key={index}
                                                selected={item === itemsPerPage}
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
                    </section>
                </div>
            </div>
        </>
    )
}

export default ResidentAccess
