import React, { useRef } from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrUp, GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import WalletBarChart from '../../../components/charts/WalletBarChart'
import { OverviewWallet } from '../../../components/overview/OverviewWallets'

type Trend = 'This Week' | 'This Month' | 'This Year'

export interface IWithdrawalHistory {
    id: string
    time: string
    date: string
    estateName: string
    status: 'Pending' | 'Denied' | 'Successful'
    description: string
    amount: number
}

interface EstateWalletList {
    id: string
    estateName: string
    amount: number
    imgUri: string
}

type SortBy = 'A-Z' | 'date'

export const WITHDRAWAL_HISTORY: IWithdrawalHistory[] = [
    {
        id: '1',
        time: '3:18pm',
        date: '02-May-2022',
        estateName: 'Thomas Estate',
        status: 'Denied',
        description: 'Ago palace funding and request',
        amount: 5000,
    },
    {
        id: '2',
        time: '4:12pm',
        date: '04-May-2022',
        estateName: 'Ahike Estate',
        status: 'Successful',
        description: 'Ago palace funding and request',
        amount: 8000,
    },
    {
        id: '3',
        time: '4:12pm',
        date: '04-May-2022',
        estateName: 'Lekki Estate',
        status: 'Successful',
        description: 'Ago palace funding and request',
        amount: 8000,
    },
    {
        id: '4',
        time: '4:12pm',
        date: '04-May-2022',
        estateName: 'Bavaeri Estate',
        status: 'Pending',
        description: 'Ago palace funding and request',
        amount: 8000,
    },
    {
        id: '5',
        time: '4:12pm',
        date: '04-May-2022',
        estateName: 'Ahike Estate',
        status: 'Denied',
        description: 'A canteen funding and request',
        amount: 8000,
    },
    {
        id: '6',
        time: '4:12pm',
        date: '04-May-2022',
        estateName: 'Ahike Estate',
        status: 'Successful',
        description: 'Cool palace funding and request',
        amount: 8000,
    },
    {
        id: '7',
        time: '4:12pm',
        date: '04-May-2022',
        estateName: 'Ahike Estate',
        status: 'Pending',
        description: 'baba palace funding and request',
        amount: 8000,
    },
    {
        id: '8',
        time: '4:12pm',
        date: '04-May-2022',
        estateName: 'Ahike Estate',
        status: 'Denied',
        description: ' Serenity building funding and request',
        amount: 8000,
    },
]

const EstateWallet = () => {
    const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']
    const [isWarning, setIsWarning] = useState(true)

    const [togglEstateMenu, setTogglEstateMenu] = useState(false)
    const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')

    const menuToggler = () => setTogglEstateMenu(!togglEstateMenu)

    const handleSelectedTrend = (item: Trend) => {
        setSelectedTrend(item)
        setTogglEstateMenu(false)
    }

    const [fetchedWithdrawalHistory, setFetchedWithdrawalHistory] = useState<
        IWithdrawalHistory[]
    >([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedWithdrawalHistory(WITHDRAWAL_HISTORY)
            }, 1000)
        }
        fetchData()
    }, [])

    const navigate = useNavigate()

    type Actions = 'View Details' | 'Approve' | 'Deny'

    const actions = ['View Details', 'Approve', 'Deny'] satisfies Actions[]

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
            navigate('/dashboard/wallet/estate/:id')
        }
    }

    const sortBy: SortBy[] = ['A-Z', 'date']

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IWithdrawalHistory[][] | null
    }

    const [toggleSortMenu, setToggleSortMenu] = useState(false)
    const itemsPerPageArr = [2, 4, 6, 8]

    const [selectedSort, setSelectedSort] = useState<SortBy | null>(null)
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: 6,

        totalPage: Math.ceil(fetchedWithdrawalHistory.length / 2),
        slicedPages: null,
    })

    const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu)

    const handleSelectedSort = (item: SortBy) => {
        setSelectedSort(item)
        setToggleSortMenu(false)
    }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IWithdrawalHistory[][] = []
        for (let i = 0; i < fetchedWithdrawalHistory.length; i += item) {
            slicedPages.push(fetchedWithdrawalHistory.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedWithdrawalHistory.length / item),
            }
        })
    }

    useEffect(() => {
        console.log({ slicedPages })
    }, [paginate.slicedPages])

    useEffect(() => {
        const slicedPages: IWithdrawalHistory[][] = []
        for (
            let i = 0;
            i < fetchedWithdrawalHistory.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedWithdrawalHistory.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedWithdrawalHistory])

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

    const estateWalletList: EstateWalletList[] = [
        {
            id: '1',
            estateName: 'Peace Estate',
            amount: 5000,
            imgUri: '/img/estate1.png',
        },
        {
            id: '2',
            estateName: 'Peace Estate',
            amount: 5000,
            imgUri: '/img/estate1.png',
        },
        {
            id: '3',
            estateName: 'Peace Estate',
            amount: 5000,
            imgUri: '/img/estate1.png',
        },
        {
            id: '4',
            estateName: 'Peace Estate',
            amount: 5000,
            imgUri: '/img/estate1.png',
        },
        {
            id: '5',
            estateName: 'Peace Estate',
            amount: 5000,
            imgUri: '/img/estate1.png',
        },
    ]

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState: 'warning' | 'success') => {
        if (modalState === 'warning') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmDeactivation = () => {
        handleClose()
    }

    const handleSelectedAction = (item: Actions, index: string) => {
        console.log({ item, index })

        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'View Details') {
            navigate(`/dashboard/wallet/estate/:${index}`)
        }

        if (item === 'Approve') {
            handleOpen('success')
        }
    }

    return (
        <div>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                        {isWarning ? (
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                        ) : (
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                        )}

                        {isWarning ? (
                            <p>
                                Are you sure you want to deactivate this
                                security company?
                            </p>
                        ) : (
                            <p className='max-w-[45rem] text-center'>
                                Are you sure you want to approve this request?
                                If you click on approve, this estate request
                                will be approved.
                            </p>
                        )}

                        <div className='flex w-full justify-center gap-8'>
                          
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </button>
                           
                            {isWarning ? (
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={confirmDeactivation}
                                >
                                    Deny
                                </button>
                            ) : (
                                <button
                                    className='btn text-white bg-green-600 border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Approve
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </dialog>
            <h1 className='heading2'>Estate Wallet</h1>
            <div className='grid mt-12 pb-10 rounded-lg  items-baseline gap-10'>
                <div className='flex justify-between items-center content-start bg-white p-8 rounded-lg'>
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
                                    {togglEstateMenu ? (
                                        <GrUp className='absolute right-4' />
                                    ) : (
                                        <GrDown className='absolute right-4' />
                                    )}
                                </div>

                                {togglEstateMenu && (
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
                    <div className='grid text-[1.6rem] gap-[3rem] bg-white p-8 rounded-lg'>
                        <div className='flex w-full items-center gap-12 '>
                            <p className=' font-bold'>
                                Estate List <span>(200)</span>
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
                        {/* <div
                            className='grid border-t border-t-color-grey p-10 gap-10'
                            style={{
                                gridTemplateColumns: '1fr 1rem 1fr',
                            }}
                        >
                            <div className='grid grid-cols-2'>
                                <div className='grid gap-8'>
                                    <p>Estate List</p>
                                    <div className='grid gap-4'>
                                        {estateWalletList.map((item) => (
                                            <div className='flex items-center gap-2 border-b border-b-color-grey h-[5rem]'>
                                                <img
                                                    src={item.imgUri}
                                                    alt=''
                                                    className='w-[3rem] h-[3rem] object-cover rounded-full'
                                                />
                                                <p>{item.estateName}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='grid gap-8'>
                                    <p>Wallet Balance</p>
                                    <div className='grid gap-4'>
                                        {estateWalletList.map((item) => (
                                            <div className='flex items-center gap-2 border-b border-b-color-grey h-[5rem]'>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                <p>
                                                    {item.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='h-full w-[.1rem] bg-color-grey justify-self-center'></div>
                            <div className='grid grid-cols-2 '>
                                <div className='grid gap-8'>
                                    <p>Estate List</p>
                                    <div className='grid gap-4'>
                                        {estateWalletList.map((item) => (
                                            <div className='flex items-center gap-2 border-b border-b-color-grey h-[5rem]'>
                                                <img
                                                    src={item.imgUri}
                                                    alt=''
                                                    className='w-[3rem] h-[3rem] object-cover rounded-full'
                                                />
                                                <p>{item.estateName}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='grid gap-8'>
                                    <p>Wallet Balance</p>
                                    <div className='grid gap-4'>
                                        {estateWalletList.map((item) => (
                                            <div className='flex items-center gap-2 border-b border-b-color-grey h-[5rem]'>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                <p>
                                                    {item.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <table>
                            <thead>
                                <tr className='border-b border-b-color-grey'>
                                    <th align='left' className='py-4'>
                                        Estate Name
                                    </th>
                                    <th align='left' className='py-4'>
                                        Wallet Balance
                                    </th>
                                    <th align='left' className='py-4'>
                                        Estate Name
                                    </th>
                                    <th align='left' className='py-4'>
                                        Wallet Balance
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {estateWalletList.map((item, index) => (
                                    <tr className='border-b'>
                                        <td>
                                            <div className='flex items-center gap-2  h-[5rem]'>
                                                <img
                                                    src={item.imgUri}
                                                    alt=''
                                                    className='w-[3rem] h-[3rem] object-cover rounded-full'
                                                />
                                                <p>{item.estateName}</p>
                                            </div>{' '}
                                        </td>
                                        <td>
                                            {' '}
                                            <div className='flex items-center'>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                {item.amount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex items-center gap-2  h-[5rem]'>
                                                <img
                                                    src={item.imgUri}
                                                    alt=''
                                                    className='w-[3rem] h-[3rem] object-cover rounded-full'
                                                />
                                                <p>{item.estateName}</p>
                                            </div>{' '}
                                        </td>
                                        <td>
                                            <div className='flex items-center'>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                {item.amount.toLocaleString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='text-[1.6rem] place-self-end text-[#0660FE] font-semibold'>
                            View More
                        </button>
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
                                className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-7 gap-8'
                                style={{
                                    fontSize: '1.4rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <p>Estate Name</p>
                                </p>
                                <p>Time</p>
                                <p>Date</p>
                                <p>Status</p>
                                <p>Description</p>
                                <p>Amount</p>
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
                                                    estateName,
                                                    time,
                                                    date,
                                                    status,
                                                    description,
                                                    amount,
                                                },
                                                i
                                            ) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-7 gap-8 items-center py-5'>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <span>
                                                                {estateName}
                                                            </span>
                                                        </p>
                                                        <p>{time}</p>
                                                        <p>{date}</p>
                                                        <p>
                                                            {status ===
                                                            'Denied' ? (
                                                                <span className='text-red-600'>
                                                                    {status}
                                                                </span>
                                                            ) : status ===
                                                              'Successful' ? (
                                                                <span className='text-green-600'>
                                                                    {status}
                                                                </span>
                                                            ) : (
                                                                <span className='text-yellow-600'>
                                                                    {status}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className=' overflow-hidden text-ellipsis whitespace-nowrap'>
                                                            {description}
                                                        </p>
                                                        <p className='flex items-center gap-.5'>
                                                            <img
                                                                src='/icons/Naira.svg'
                                                                alt=''
                                                            />
                                                            <span>
                                                                {amount}
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
                                                                                    {item ===
                                                                                    'Deny' ? (
                                                                                        <span className='text-red-600'>
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </span>
                                                                                    ) : item ===
                                                                                      'Approve' ? (
                                                                                        <span className='text-green-600'>
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </span>
                                                                                    ) : (
                                                                                        <span className='text-black'>
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </span>
                                                                                    )}
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

export default EstateWallet
