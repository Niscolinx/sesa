import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'

import { Link, useNavigate } from 'react-router-dom'

export interface Payments {
    id: string
    paymentCode: string
    paymentName: string
    paymentType: 'fixed' | 'flexible'
    paymentPlan: string
    paymentAmount: string
    startDate: string
    endDate: string
    trackPayment: string
    status: 'active' | 'inactive'
    createDate: string
    totalResidents: number
    paidResidents: number
    amountPaid: string
    progressPercent: number
    expectedAmount: string
}

const recipients = ['Thomas Nwaje', 'Solomon Nwaje']

export const PAYMENTS_LIST: Payments[] = Array.from({ length: 10 }).map(
    (_, i) => ({
        id: `i + 1`,
        paymentCode: `XXSD${
            (Math.random() * 0.1 + 0.9).toFixed(7).split('.')[1]
        }`,
        paymentName: 'Estate Dues 2023',
        paymentType: Math.random() > 0.5 ? 'fixed' : 'flexible',
        paymentAmount: Math.floor(
            Math.random() * 50000 + 10000
        ).toLocaleString(),
        paidResidents: Math.floor(Math.random() * 45 + 10),
        paymentPlan: 'full',
        trackPayment: 'Yes',
        startDate: '02 Jan, 2023',
        endDate: '03 Mar, 2023',
        status: Math.random() > 0.5 ? 'active' : 'inactive',
        createDate: '01 Jan, 2023',
        amountPaid: '2,000',
        totalResidents: Math.floor(Math.random() * 200 + 150),
        progressPercent: Math.floor(Math.random() * 45 + 30),
        expectedAmount: '5,000',
    })
)

function RenderedPayments() {
    const navigate = useNavigate()

    const [paymentsList, setPaymentsList] = useState<Payments[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            setPaymentsList(PAYMENTS_LIST)
        }, 100)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Payments[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(paymentsList.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Payments[][] = []
        for (let i = 0; i < paymentsList.length; i += item) {
            slicedPages.push(paymentsList.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(paymentsList.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Payments[][] = []
        for (let i = 0; i < paymentsList.length; i += paginate.itemsPerPage) {
            slicedPages.push(paymentsList.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    paymentsList.length / paginate.itemsPerPage
                ),
            }
        })
    }, [paymentsList])

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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        const filtered = PAYMENTS_LIST.filter((item) =>
            item.paymentName.toLowerCase().includes(value.toLowerCase())
        )
        setPaymentsList([...filtered])
    }

    const createPaymentHandler = () => {
        navigate('/estateManager/payments/create')
    }

    return (
        <div className='grid gap-10 rounded-lg border min-w-[112rem]'>
            <div className='grid text-[1.6rem] border rounded-lg'>
                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-bold'>
                        Payments <span>(200)</span>
                    </p>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/admins/search.svg'
                            alt=''
                            className='absolute left-4 text-[4rem]'
                        />
                        <input
                            type='text'
                            value={search}
                            onChange={handleSearch}
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

                    <button
                        className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize'
                        onClick={createPaymentHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>Create Payments</p>
                    </button>
                </div>

                <div className='grid gap-8 mt-8'>
                    {slicedPages && slicedPages.length > 0 ? (
                        React.Children.toArray(
                            slicedPages[paginate.index].map((paymentsBody) => {
                                const {
                                    id,
                                    paymentAmount,
                                    paymentCode,
                                    paymentName,
                                    paymentPlan,
                                    paymentType,
                                    totalResidents,
                                    trackPayment,
                                    paidResidents,
                                    progressPercent,
                                    startDate,
                                    endDate,
                                    status,
                                    amountPaid,
                                    createDate,
                                    expectedAmount,
                                } = paymentsBody
                                return (
                                    <div className='grid relative p-16 bg-white rounded-lg gap-2'>
                                        <section className='grid gap-4 capitalize'>
                                            <div className='flex justify-between gap-4 '>
                                                <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                                    <p className='text-gray-700 font-Satoshi-Light'>
                                                        Payment Code:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {paymentCode}
                                                    </p>
                                                </div>
                                                <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                                    <p className='text-gray-700 font-Satoshi-Light '>
                                                        Start Date:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {startDate}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex justify-between gap-4 '>
                                                <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                                    <p className='text-gray-700 font-Satoshi-Light  '>
                                                        Payment Name:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {paymentName}
                                                    </p>
                                                </div>
                                                <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                                    <p className='text-gray-700 font-Satoshi-Light '>
                                                        End Date:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {endDate}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex justify-between gap-4 '>
                                                <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                                    <p className='text-gray-700 font-Satoshi-Light  '>
                                                        Payment Type
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {paymentType}
                                                    </p>
                                                </div>
                                                <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                                    <p className='text-gray-700 font-Satoshi-Light '>
                                                        Track Payment:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {trackPayment}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex justify-between gap-4 '>
                                                <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                                    <p className='text-gray-700 font-Satoshi-Light  '>
                                                        Payment Plan:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {paymentPlan}
                                                    </p>
                                                </div>
                                                <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                                    <p className='text-gray-700 font-Satoshi-Light '>
                                                        Status
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {status === 'active' ? (
                                                            <span className='text-green-600'>
                                                                {status}
                                                            </span>
                                                        ) : (
                                                            <span className='text-red-600'>
                                                                {status}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex justify-between gap-4 '>
                                                <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                                    <p className='text-gray-700 font-Satoshi-Light  '>
                                                        Payment Amount:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        ₦{paymentAmount}
                                                    </p>
                                                </div>
                                                <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                                    <p className='text-gray-700 font-Satoshi-Light '>
                                                        Create Date:
                                                    </p>
                                                    <p className='font-Satoshi-Medium'>
                                                        {createDate}
                                                    </p>
                                                </div>
                                            </div>
                                        </section>

                                        <section className='mt-[5rem] grid gap-16'>
                                            <p className='flex items-center gap-2'>
                                                <span className='font-Satoshi-Medium'>
                                                    Payment Status:{' '}
                                                </span>{' '}
                                            </p>

                                            <div className='grid grid-cols-60-auto gap-4 items-center -pt-8'>
                                                <div className='progressBar'>
                                                    <progress
                                                        className='progressBar__item'
                                                        max={100}
                                                        value={progressPercent}
                                                    />
                                                        
                                                    
                                                    <p className={`absolute right-4 text-color-tertiary bg-red-600 `}>
                                                        <span>
                                                            {progressPercent}%
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className='flex items-center justify-between font-Satoshi-Light'>
                                                    <p>
                                                        {paidResidents} of{' '}
                                                        {totalResidents}{' '}
                                                        resident paid
                                                    </p>
                                                    <p>₦{expectedAmount}</p>

                                                    <Link to=''>
                                                        <p className='text-[#076AFF] capitalize'>
                                                            More details
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )
                            })
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
                                        onClick={(e) => jumpToPage(e, index)}
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
    )
}

export default RenderedPayments
