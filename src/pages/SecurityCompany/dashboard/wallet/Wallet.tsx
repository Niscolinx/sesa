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
import { IoMdAdd, IoMdClose } from 'react-icons/io'

import { Link, useNavigate } from 'react-router-dom'
import WalletBarChart from '../../../../components/SuperAdmin/charts/WalletBarChart'
import OverviewCard from '../../../../components/SuperAdmin/overview/OverviewCard'
import { OverviewWallet } from '../../../../components/SuperAdmin/overview/OverviewWallets'

export interface TransactionHistory {
    id: number
    transactionType: string
    transactionCategory: string
    transactionId: number
    narration: string
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
    transactionCategory: 'Fund Wallet',
    transactionId: 783239232,
    narration: '---',
    amount: 10000,
    time: '12:00pm',
    date: '12-May-2023',
    balance: 100000,
}))

type Trend = 'This Week' | 'This Month' | 'This Year'

function Wallet() {
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
        navigate(`/securityCompany/wallet/transactions/${id}`)
    }

    const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

    const [toggleMenu, setToggleMenu] = useState(false)
    const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')
    const [isWithdrawal, setIsWithdrawal] = useState(true)

    const menuToggler = () => setToggleMenu(!toggleMenu)

    const handleSelectedTrend = (item: Trend) => {
        setSelectedTrend(item)
        setToggleMenu(false)
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState: 'withdraw' | 'request') => {
        if (modalState === 'withdraw') {
            setIsWithdrawal(true)
        } else {
            setIsWithdrawal(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        <h3
                            className='text-[2rem] font-bold border-b '
                            style={{
                                fontFamily: 'Satoshi-Medium',
                            }}
                        >
                            {isWithdrawal ? 'Withdrawal' : 'Request For Funds'}
                        </h3>

                        {isWithdrawal ? (
                            <form
                                className='grid gap-12'
                                onSubmit={handleFormSubmit}
                            >
                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='amount'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Amount
                                    </label>
                                    <div className='relative flex items-center'>
                                        <img
                                            src='/icons/Naira.svg'
                                            alt=''
                                            className='absolute left-3'
                                        />
                                        <input
                                            type='number'
                                            required
                                            id='amount'
                                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                        />
                                    </div>
                                </div>
                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='description'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Description
                                    </label>

                                    <input
                                        type='text'
                                        required
                                        id='description'
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                    />
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Withdraw
                                </button>
                            </form>
                        ) : (
                            <form
                                className='grid gap-12'
                                onSubmit={handleFormSubmit}
                            >
                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='amount'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Amount
                                    </label>
                                    <div className='relative flex items-center'>
                                        <img
                                            src='/icons/Naira.svg'
                                            alt=''
                                            className='absolute left-3'
                                        />
                                        <input
                                            type='number'
                                            required
                                            id='amount'
                                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                        />
                                    </div>
                                </div>
                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='description'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Description
                                    </label>

                                    <input
                                        type='text'
                                        required
                                        id='description'
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                    />
                                </div>

                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='commissionWalletAttachment'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Attach An Item
                                    </label>

                                    <input
                                        type='file'
                                        id='commissionWalletAttachment'
                                        name='commissionWalletAttachment'
                                        required
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] appearance-none'
                                    />
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Request
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </dialog>

            <div className='estateDetail'>
                <h1 className='heading2'>Overview</h1>
                <div className='mt-8 grid gap-8'>
                    <section
                        className=' text-[1.4rem] grid gap-8'
                        style={{
                            gridTemplateColumns: '60% auto',
                        }}
                    >
                        <div className='border-l border-l-color-grey bg-white rounded-lg p-8 grid gap-10'>
                            <div className='flex justify-between'>
                                <p className='text-[1.6rem] font-bold p-8'>
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
                                        {toggleMenu ? (
                                            <GrUp className='absolute right-4' />
                                        ) : (
                                            <GrDown className='absolute right-4' />
                                        )}
                                    </div>

                                    {toggleMenu && (
                                        <div className='absolute top-[8rem]  left-0 border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                            {trend.map((item, index) => (
                                                <p
                                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                    key={index}
                                                    onClick={() =>
                                                        handleSelectedTrend(
                                                            item
                                                        )
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

                        <div className='bg-white p-8 rounded-lg grid justify-center'>
                            <div className='grid items-end'>
                                <OverviewWallet
                                    amount={160_847}
                                    title={'Security Company Wallet'}
                                    isWalletScreen
                                    bgImgUri='/icons/overview/card/bgS.svg'
                                    lefIconUri='/icons/overview/card/leftS.svg'
                                    bgColor='bg-[#6AB95F]'
                                />
                            </div>
                            <div className='flex justify-center mt-auto gap-4'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleOpen('request')}
                                >
                                    Request
                                </button>
                                <button
                                    className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleOpen('withdraw')}
                                >
                                    Fund Wallet
                                </button>
                            </div>
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
                                    <p>Date</p>
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
                                                    narration,
                                                    amount,
                                                    time,
                                                    balance,
                                                }) => {
                                                    return (
                                                        <div className='grid justify-between border-b grid-cols-9 items-center gap-8 py-4'>
                                                            <p>{date}</p>
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

                                                            <p>{narration}</p>
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
                                                            <button
                                                                className='text-color-primary text-left'
                                                                onClick={() =>
                                                                    detailsHandler(
                                                                        id
                                                                    )
                                                                }
                                                            >
                                                                View Details
                                                            </button>
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

export default Wallet
