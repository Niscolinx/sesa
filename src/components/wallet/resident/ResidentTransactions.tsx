import React from 'react'
import { FC } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
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

interface ResidentTransactionsProps {
    fetchedResidentTransactions: ResidentTransactions[]
    isResidentBalance?: boolean
}

export const ResidentTransactions: FC<ResidentTransactionsProps> = ({
    fetchedResidentTransactions,
    isResidentBalance,
}) => {

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: 6,

        totalPage: Math.ceil(fetchedTransactions.length / 2),
        slicedPages: null,
    })

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
    return (
        <div className='grid text-[1.6rem]'>
            <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-bold'>
                    Activity Report List <span>(4)</span>
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
                        className='pl-16 w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                    />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            Sort By
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            Start Date
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            End Date
                        </option>
                        <option value='date'>date</option>
                        <option value='alpha'>Alpha</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
            </caption>

            <div className='grid'>
                <div
                    className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-6 gap-8'
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
                    {fetchedResidentTransactions &&
                    fetchedResidentTransactions.length > 0 ? (
                        React.Children.toArray(
                            fetchedResidentTransactions.map(
                                ({
                                    id,
                                    residentName,
                                    amount,
                                    status,                                
                                    date,
                                }) => {
                                    return (
                                        <div className='grid justify-between border-b grid-cols-5 gap-8 '>
                                            
                                            <p>{residentName}</p>
                                            <p>{amount}</p>
                                            {isResidentBalance && <p>{status === 'Paid' ? (<span className='text-green-600]'>
                                                {status}
                                            </span>) : (
                                                <span className='text-red-600'>
                                                    {status}
                                                </span>
                                            )}</p>}
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
                    <p>View</p>
                    <div className='flex items-center border px-4 rounded-lg'>
                        <input
                            type='text'
                            className='w-8 outline-none border-none cursor-pointer '
                            value={6}
                            inputMode='numeric'
                        />
                        <GrDown className='text-[1.3rem]' />
                    </div>
                    <p className='text'>List per page</p>
                </div>
                <ul className='flex items-center gap-5 ml-10'>
                    <HiOutlineChevronLeft />
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        1
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        2
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        3
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        4
                    </li>
                    <li className='grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                        ....
                    </li>
                    <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                        10
                    </li>
                    <HiOutlineChevronRight />
                </ul>
            </footer>
        </div>
    )
}
