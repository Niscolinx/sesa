import React, { ChangeEvent, useEffect, useState } from 'react'
import { FC } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

export interface ResidentTransactions {
    id: string
    date: string
    residentName: string
    amount: number
    status?: 'Paid' | 'Unpaid'
}

export const RESIDENT_TRANSACTION_HISTORY: ResidentTransactions[] = [
    {
        id: '1',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
    {
        id: '2',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
    {
        id: '3',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
    {
        id: '4',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
    {
        id: '5',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
    {
        id: '6',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
    {
        id: '7',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
    {
        id: '8',
        date: '12 May, 2021',
        residentName: 'Peace Estate',
        amount: 10000,
    },
]

export const RESIDENT_BALANCE: ResidentTransactions[] = [
    {
        id: '1',
        date: '11 Aug, 2021',
        status: 'Paid',
        amount: 10000,
        residentName: 'Peace Estate',
    },
    {
        id: '2',
        date: '12 Aug, 2021',
        status: 'Unpaid',
        amount: 10000,
        residentName: 'Peace Estate',
    },
    {
        id: '3',
        date: '15 Aug, 2021',
        status: 'Paid',
        amount: 10000,
        residentName: 'Peace Estate',
    },
    {
        id: '4',
        date: '02 Aug, 2021',
        status: 'Unpaid',
        amount: 10000,
        residentName: 'Peace Estate',
    },
    {
        id: '5',
        date: '11 Aug, 2021',
        status: 'Paid',
        amount: 10000,
        residentName: 'Peace Estate',
    },
    {
        id: '6',
        date: '12 May, 2021',
        status: 'Paid',
        amount: 10000,
        residentName: 'Peace Estate',
    },
]
interface Paginate {
    index: number
    currentPage: number
    itemsPerPage: number
    totalPage: number
    slicedPages: ResidentTransactions[][] | null
}

interface ResidentTransactionsProps {
    fetchedResidentTransactions: ResidentTransactions[]
    isResidentBalance?: boolean
}

export const ResidentTransactions: FC<ResidentTransactionsProps> = ({
    fetchedResidentTransactions,
    isResidentBalance,
}) => {
    const itemsPerPageArr = [2, 4, 6, 8]

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: 4,

        totalPage: Math.ceil(fetchedResidentTransactions.length / 2),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ResidentTransactions[][] = []
        for (let i = 0; i < fetchedResidentTransactions.length; i += item) {
            slicedPages.push(fetchedResidentTransactions.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedResidentTransactions.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ResidentTransactions[][] = []
        for (
            let i = 0;
            i < fetchedResidentTransactions.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedResidentTransactions.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedResidentTransactions])

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

    const jumpToPage = (e: React.MouseEvent, index: number) => {
        setPaginate((prev) => {
            return {
                ...prev,
                index,
                currentPage: index + 1,
            }
        })
    }

    const { currentPage, slicedPages, itemsPerPage } = paginate

    return (
        <div className='grid text-[1.6rem]'>
            <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-bold'>
                    {isResidentBalance
                        ? 'Resident Balance'
                        : 'Resident Transactions'}
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
            </div>

            <div className='grid px-8'>
                <div
                    className={`grid justify-between text-color-dark-1 bg-color-grey p-8 gap-8 ${isResidentBalance ? 'grid-cols-4' : 'grid-cols-3'}`}
                    style={{
                        fontSize: '1.6rem',
                    }}
                >
                    <p>Estate Name</p>
                    <p>Amount</p>
                    {isResidentBalance && <p>Status</p>}
                    <p>Date</p>
                </div>

                <div className='grid gap-8 mt-8 p-8'>
                    {slicedPages && slicedPages.length > 0 ? (
                        React.Children.toArray(
                            slicedPages[paginate.index].map(
                                ({
                                    id,
                                    residentName,
                                    amount,
                                    status,
                                    date,
                                }) => {
                                    return (
                                        <div
                                            className={`grid justify-start border-b gap-8 ${
                                                isResidentBalance
                                                    ? 'grid-cols-4'
                                                    : 'grid-cols-3'
                                            }`}
                                        >
                                            <p>{residentName}</p>
                                            <p>{amount}</p>
                                            {isResidentBalance && (
                                                <p>
                                                    {status === 'Paid' ? (
                                                        <span className='text-green-600'>
                                                            {status}
                                                        </span>
                                                    ) : (
                                                        <span className='text-red-600'>
                                                            {status}
                                                        </span>
                                                    )}
                                                </p>
                                            )}
                                            <p>{date}</p>
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
                                        onClick={(e) => jumpToPage(e, index)}
                                    >
                                        {index + 1}
                                    </span>
                                )}
                            </li>
                        )
                    })}

                    <HiOutlineChevronRight
                        onClick={handleNext}
                        className='cursor-pointer'
                    />
                </ul>
            </footer>
        </div>
    )
}
