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

export interface Overview {
    id: number
    estateName: string
    address: string
    noOfSecurityGuards: number
}

export const HOUSEHOLD_LIST: Overview[] = [
    {
        id: 1,
        estateName: 'Estate 1',
        address: 'No 1, Ogunlana Drive, Surulere, Lagos',
        noOfSecurityGuards: 10,
    },
    {
        id: 2,
        estateName: 'Estate 1',
        address: 'No 1, Ogunlana Drive, Surulere, Lagos',
        noOfSecurityGuards: 10,
    },
    {
        id: 3,
        estateName: 'Estate 1',
        address: 'No 1, Ogunlana Drive, Surulere, Lagos',
        noOfSecurityGuards: 10,
    },
    {
        id: 4,
        estateName: 'Estate 1',
        address: 'No 1, Ogunlana Drive, Surulere, Lagos',
        noOfSecurityGuards: 10,
    },
]
type Trend = 'This Week' | 'This Month' | 'This Year'

function Wallet() {
    const navigate = useNavigate()

    const [houseHoldList, setHouseHoldList] = useState<Overview[]>([])

    useEffect(() => {
        setTimeout(() => {
            setHouseHoldList(HOUSEHOLD_LIST)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Overview[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(houseHoldList.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Overview[][] = []
        for (let i = 0; i < houseHoldList.length; i += item) {
            slicedPages.push(houseHoldList.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(houseHoldList.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Overview[][] = []
        for (let i = 0; i < houseHoldList.length; i += paginate.itemsPerPage) {
            slicedPages.push(houseHoldList.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    houseHoldList.length / paginate.itemsPerPage
                ),
            }
        })
    }, [houseHoldList])

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
        // navigate(`/superAdmin/platformSettings/SOSDetails/${id}`)
        alert('navigate' + id)
    }

    const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

    const [toggleMenu, setToggleMenu] = useState(false)
    const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')
    const [isWithdrawal, setIsWithdrawal] = useState(true)
    const [sendToMenu, setSendToMenu] = useState(false)

    const menuToggler = () => setToggleMenu(!toggleMenu)

    const handleSelectedTrend = (item: Trend) => {
        setSelectedTrend(item)
        setToggleMenu(false)
    }


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
                        className=' text-[1.4rem] grid '
                        style={{
                            gridTemplateColumns: '60% auto',
                        }}
                    >
                        <div
                            className='overview justify-between bg-white rounded-lg p-8 grid gap-10'
                            style={{
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(30rem, 1fr))',
                            }}
                        >
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
                        </div>
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
                    </section>
                    <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                        <div className='grid text-[1.6rem] border rounded-lg'>
                            <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                                <p className=' font-bold'>
                                    HouseHold List <span>(200)</span>
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
                                <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-4 gap-8 text-[1.6rem]'>
                                    <p className='flex items-center gap-4'>
                                        <input
                                            type='checkbox'
                                            name='sos'
                                            id='sos'
                                            className='cursor-pointer'
                                        />
                                        <label htmlFor='sos'>Estate Name</label>
                                    </p>
                                    <p>Address</p>
                                    <p>No of Security Guards</p>
                                    <p>Actions</p>
                                </div>

                                <div className='grid gap-8 mt-8 p-8'>
                                    {slicedPages && slicedPages.length > 0 ? (
                                        React.Children.toArray(
                                            slicedPages[paginate.index].map(
                                                ({
                                                    id,
                                                    estateName,
                                                    noOfSecurityGuards,
                                                    address,
                                                }) => {
                                                    return (
                                                        <div className='grid justify-between border-b grid-cols-4 items-center gap-8 '>
                                                            <p className='flex items-center gap-4'>
                                                                <input
                                                                    type='checkbox'
                                                                    className='cursor-pointer'
                                                                />
                                                                <label htmlFor='file'>
                                                                    {estateName}
                                                                </label>
                                                            </p>
                                                            <p>{address}</p>
                                                            <p>
                                                                {
                                                                    noOfSecurityGuards
                                                                }
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
