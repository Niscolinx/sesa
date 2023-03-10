import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

interface Payment {
    id: string
    propertyCode: string
    address: string
    propertyCategory: string
    propertyName: string
    paid: boolean
    propertyType: string
    residentialClass: string
    date: string
}

const PropertyNames = [
    'Dangote',
    'Ed Schools',
    'Cement Depo',
    'Mo Complex',
    'Maz Homes',
]

const PAYMENT: Payment[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: `i + ${i}`,
    propertyName:
        PropertyNames[Math.floor(Math.random() * PropertyNames.length)],
    propertyCategory: Math.random() > 0.5 ? 'Business' : 'Residential',
    propertyCode: `H${Math.floor(Math.random() * 3000 + 1000)}`,
    address: 'Blk.2, Flt. 3, Zone A',
    propertyType: Math.random() > 0.5 ? '2-Bedroom Self Con.' : 'Duplex',
    residentialClass:
        Math.random() > 0.5 ? 'Landlord Developer' : 'Tenant Property',
    paid: Math.random() > 0.3 ? true : false,
    date: '12 May, 2023',
}))

interface IPaymentList {
    closePaymentDialog: () => void
}

const PaymentList: FC<IPaymentList> = ({ closePaymentDialog }) => {
    const [fetchedPaymentData, setFetchedPaymentData] = useState<Payment[]>([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedPaymentData(PAYMENT)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Payment[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedPaymentData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Payment[][] = []
        for (let i = 0; i < fetchedPaymentData.length; i += item) {
            slicedPages.push(fetchedPaymentData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedPaymentData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Payment[][] = []
        for (
            let i = 0;
            i < fetchedPaymentData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedPaymentData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedPaymentData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedPaymentData])

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

    const downloadDocHandler = () => {
        closePaymentDialog()
    }

    return (
        <main className='mt-10 grid gap-9'>
            <section className='bg-color-white rounded-lg border overflow-scroll max-h-[80vh]'>
                <div className='grid text-[1.6rem]'>
                    <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                       <p className='font-Satoshi-Medium text-[2rem]'>Household Payment List(500)</p>
                        <div className='ml-auto'>
                            <button
                                className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                onClick={downloadDocHandler}
                            >
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                Download
                            </button>
                        </div>
                    </div>

                    <div className='grid'>
                        <div className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-7 gap-6 items-center capitalize'>
                            <p>Property Code</p>
                            <p>Address</p>
                            <p>Property Category</p>
                            <p>Property Name</p>
                            <p>Property Type</p>
                            <p>Residential Class</p>
                            <p className='text-center'>Date</p>
                        </div>

                        <div className='grid gap-8 mt-8 p-8'>
                            {slicedPages && slicedPages.length > 0 ? (
                                React.Children.toArray(
                                    slicedPages[paginate.index].map(
                                        ({
                                            id,
                                            propertyCode,
                                            propertyName,
                                            address,
                                            date,
                                            residentialClass,
                                            propertyType,
                                            propertyCategory,
                                            paid,
                                        }) => {
                                            return (
                                                <div className='grid justify-between border-b grid-cols-7 gap-8 py-4 whitespace-nowrap text-ellipsis'>
                                                    <p>{propertyCode}</p>
                                                    <p>{address}</p>
                                                    <p>{propertyCategory}</p>
                                                    <p>{propertyName}</p>
                                                    <p>{propertyType}</p>
                                                    <p>{residentialClass}</p>
                                                    <p className='flex items-center gap-2 justify-end'>
                                                        {paid ? (
                                                            <img
                                                                src='/img/paid.svg'
                                                                alt=''
                                                            />
                                                        ) : null}
                                                        <span>{date}</span>
                                                    </p>
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

                            <HiOutlineChevronRight
                                onClick={handleNext}
                                className='cursor-pointer'
                            />
                        </ul>
                    </footer>
                </div>{' '}
            </section>
        </main>
    )
}

export default PaymentList
