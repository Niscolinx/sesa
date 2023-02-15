import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'

import { Link, useNavigate } from 'react-router-dom'
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

function SecurityCompanyOverview() {
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

    const addSOSHandler = () => {
        navigate('/superAdmin/platformSettings/addSOS')
    }

    const detailsHandler = (id: number) => {
        // navigate(`/superAdmin/platformSettings/SOSDetails/${id}`)
        alert('navigate' + id)
    }

    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Estates</h1>
            <div className='mt-8 grid gap-8'>
                <div className=' justify-center bg-white rounded-lg p-8 grid w-[40rem] '>
                    <OverviewCard
                        title='Total Estates'
                        number={18_000}
                        iconUrl='/icons/securityCompany/totalEstates.svg'
                        percent={5}
                        arrow='/icons/securityCompany/arrowUp.svg'
                        bgColor='bg-[#DDFCDC]'
                        textColor='text-[#1A8F56]'
                    />
                </div>

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
                                                            {noOfSecurityGuards}
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
    )
}

export default SecurityCompanyOverview
