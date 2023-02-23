import React, { FormEvent, useRef } from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrUp, GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import { IoMdClose } from 'react-icons/io'
import WalletBarChart from '../../../../components/SuperAdmin/charts/WalletBarChart'
import { OverviewWallet } from '../../../../components/SuperAdmin/overview/OverviewWallets'

type Trend = 'This Week' | 'This Month' | 'This Year'

export interface ITransactionHistory {
    id: string
    date: string
    transactionType: 'Credit' | 'Debit'
    transactionCategory: string
    transactionId: number
    amount: number
    time: string
    balance: number
}

interface CommissionWalletList {
    id: string
    commissionName: string
    amount: number
    imgUri: string
}

type SortBy = 'A-Z' | 'date'

export const TRANSACTION_HISTORY: ITransactionHistory[] = [
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

const CommissionWallet = () => {
    const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']
    const sendToArr: string[] = ['Howuja', 'Oluwaseun', 'Wojusun', 'Petherkwa']
    const [isWithdrawal, setIsWithdrawal] = useState(true)

    const [togglCommissionMenu, setTogglCommissionMenu] = useState(false)
    const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')
    const [sendTo, setSendTo] = useState<string | null>(null)
    const [sendToMenu, setSendToMenu] = useState(false)

    const menuToggler = () => setTogglCommissionMenu(!togglCommissionMenu)
    const sendToMenuToggle = () => setSendToMenu(!sendToMenu)

    const handleSelectedTrend = (item: Trend) => {
        setSelectedTrend(item)
        setTogglCommissionMenu(false)
    }

    const handleSendTo = (item: string) => {
        setSendTo(item)
        setSendToMenu(false)
    }

    const [fetchedTransactionHistory, setFetchedTransactionHistory] = useState<
        ITransactionHistory[]
    >([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedTransactionHistory(TRANSACTION_HISTORY)
            }, 1000)
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

    const sortBy: SortBy[] = ['A-Z', 'date']

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: ITransactionHistory[][] | null
    }

    const [toggleSortMenu, setToggleSortMenu] = useState(false)
    const itemsPerPageArr = [2, 4, 6, 8]

    const [selectedSort, setSelectedSort] = useState<SortBy | null>(null)
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: 6,

        totalPage: Math.ceil(fetchedTransactionHistory.length / 2),
        slicedPages: null,
    })

    const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu)

    const handleSelectedSort = (item: SortBy) => {
        setSelectedSort(item)
        setToggleSortMenu(false)
    }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ITransactionHistory[][] = []
        for (let i = 0; i < fetchedTransactionHistory.length; i += item) {
            slicedPages.push(fetchedTransactionHistory.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedTransactionHistory.length / item),
            }
        })
    }

    useEffect(() => {
        console.log({ slicedPages })
    }, [paginate.slicedPages])

    useEffect(() => {
        const slicedPages: ITransactionHistory[][] = []
        for (
            let i = 0;
            i < fetchedTransactionHistory.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedTransactionHistory.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedTransactionHistory])

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

    const handleSelectedAction = (item: Actions, index: string) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'View Details') {
            navigate(`/superAdmin/wallet/commission/:${index}`)
        }
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <div>
            <ToastContainer />

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

                                <div className='relative grid gap-4'>
                                    <p className='text-[1.4rem] font-semibold'>
                                        SendTo
                                    </p>
                                    <div className='relative flex items-center w-[20rem]'>
                                        <p
                                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                            onClick={sendToMenuToggle}
                                        >
                                            {sendTo}
                                        </p>
                                        {sendToMenu ? (
                                            <GrUp className='absolute right-4' />
                                        ) : (
                                            <GrDown className='absolute right-4' />
                                        )}
                                    </div>

                                    {sendToMenu && (
                                        <div className='absolute top-[-2rem]  left-[22rem] border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                            {sendToArr.map((item, index) => (
                                                <p
                                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                    key={index}
                                                    onClick={() =>
                                                        handleSendTo(item)
                                                    }
                                                >
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Request
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid mt-12 pb-10 rounded-lg  items-baseline gap-10'>
                <div className='grid grid-cols-2 justify-between items-center content-start bg-white p-8 rounded-lg'>
                    <div className='grid self-stretch justify-start'>
                        <div className='grid items-end'>
                            <OverviewWallet
                                amount={4_000_832}
                                title={'Commission Wallet'}
                                isWalletScreen
                                bgImgUri='/icons/overview/card/bgC.svg'
                                lefIconUri='/icons/overview/card/leftC.svg'
                                bgColor='bg-[#333333]'
                            />
                        </div>
                        <div className='flex justify-center mt-auto gap-4'>
                            <button
                                className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleOpen('withdraw')}
                            >
                                Withdraw
                            </button>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleOpen('request')}
                            >
                                Request
                            </button>
                        </div>
                    </div>

                    <div className='border-l border-l-color-grey'>
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
                                    {togglCommissionMenu ? (
                                        <GrUp className='absolute right-4' />
                                    ) : (
                                        <GrDown className='absolute right-4' />
                                    )}
                                </div>

                                {togglCommissionMenu && (
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

                <div className='grid text-[1.6rem] gap-10 bg-white p-8 rounded-lg'>
                    <div className='flex w-full items-center gap-12 '>
                        <p className=' font-bold'>
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
                                    paginate.slicedPages[paginate.index].map(
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
                                            const { isDropDownOpen, index } =
                                                toggleDropDown
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
                                                    <p>{transactionCategory}</p>
                                                    <p>{transactionId}</p>
                                                    <p className='flex items-center gap-.5'>
                                                        <img
                                                            src='/icons/Naira.svg'
                                                            alt=''
                                                        />
                                                        <span>{amount}</span>
                                                    </p>
                                                    <p>{time}</p>
                                                    <p className='flex items-center gap-.5'>
                                                        <img
                                                            src='/icons/Naira.svg'
                                                            alt=''
                                                        />
                                                        <span>{balance}</span>
                                                    </p>

                                                    <div className='relative'>
                                                        <label
                                                            className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                            htmlFor={i.toString()}
                                                            onClick={() =>
                                                                setToggleDropDown(
                                                                    (prev) => {
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

export default CommissionWallet
