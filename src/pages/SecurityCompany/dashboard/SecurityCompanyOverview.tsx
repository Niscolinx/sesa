import React, { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import { Link, useNavigate } from 'react-router-dom'
import OverviewCard from '../../../components/SuperAdmin/overview/OverviewCard'
import { OverviewWallet } from '../../../components/SuperAdmin/overview/OverviewWallets'


export interface ISOSTable {
    id: string
    file: string
    count: number
    estates: number
    createdAt: string
}

export const PROPERTY_TYPE: ISOSTable[] = [
    {
        id: '1',
        file: 'file 1',
        count: 2,
        estates: 2,
        createdAt: '01 Feb 2023 12:00pm',
    },
    {
        id: '2',
        file: 'file 2',
        count: 22,
        estates: 42,
        createdAt: '01 Feb 2023 12:00pm',
    },
    {
        id: '1',
        file: 'file 3',
        count: 31,
        estates: 12,
        createdAt: '01 Feb 2023 12:00pm',
    },
    {
        id: '1',
        file: 'file 4',
        count: 2,
        estates: 2,
        createdAt: '01 Feb 2023 12:00pm',
    },
]

function SecurityCompanyOverview() {
   

    const navigate = useNavigate()

    const [fetchedSOSTable, setFetchedSOSTable] = useState<ISOSTable[]>([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedSOSTable(PROPERTY_TYPE)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: ISOSTable[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedSOSTable.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ISOSTable[][] = []
        for (let i = 0; i < fetchedSOSTable.length; i += item) {
            slicedPages.push(fetchedSOSTable.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedSOSTable.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ISOSTable[][] = []
        for (
            let i = 0;
            i < fetchedSOSTable.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedSOSTable.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedSOSTable.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedSOSTable])

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

    const detailsHandler = (id: string) => {
        navigate(`/superAdmin/platformSettings/SOSDetails/${id}`)
    }

    

    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Overview</h1>
            <div className='mt-8 grid gap-8'>
                <section className=' text-[1.4rem] grid ' style={{
                    gridTemplateColumns: '60% auto'
                }}>
                    <div
                        className='overview justify-between bg-white rounded-lg p-8 grid gap-10'
                        style={{
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(30rem, 1fr))',
                        }}
                    >
                        <OverviewCard
                            title='Total Estates'
                            number={18_000}
                            iconUrl='/icons/securityCompany/totalEstates.svg'
                            percent={5}
                            arrow='/icons/securityCompany/arrowUp.svg'
                            bgColor='bg-[#DDFCDC]'
                            textColor='text-[#1A8F56]'
                        />
                        <OverviewCard
                            title='Security Guard'
                            number={1532}
                            iconUrl='/icons/securityCompany/securityGuards.svg'
                            percent={5}
                            arrow='/icons/securityCompany/arrowUp.svg'
                            bgColor='bg-[#F5F9FA]'
                            textColor='text-[#00C2FF]'
                        />
                        <OverviewCard
                            title='Assigned Security Guards'
                            number={1200}
                            iconUrl='/icons/securityCompany/AssignedSecurityGuards.svg'
                            percent={5}
                            arrow='/icons/securityCompany/arrowUp.svg'
                            bgColor='bg-[#FCF3FA]'
                            textColor='text-[#B6008E]'
                        />
                    </div>
                    <div className='w-full grid justify-center'>
                        <OverviewWallet
                            amount={20_333_500.89}
                            title={'Security Wallet'}
                            isWalletScreen
                            bgImgUri='/icons/overview/card/bgS.svg'
                            lefIconUri='/icons/overview/card/leftS.svg'
                            bgColor='bg-[#6AB95F]'
                        />

                        <button className='btn bg-green-700 text-white self-center rounded-lg'>
                            Fund Wallet
                        </button>
                    </div>
                </section>
                <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                    <div className='grid text-[1.6rem]'>
                        <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                Overview List <span>(200)</span>
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
                        </caption>

                        <div className='grid'>
                            <div
                                className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-8 gap-8'
                                style={{
                                    fontSize: '1.4rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input type='checkbox' />
                                    <p>Property Code</p>
                                </p>
                                <p>Address</p>
                                <p>Property Category</p>
                                <p>Property Name</p>
                                <p>Occupants</p>
                                <p>RFID</p>
                                <p>Access Card</p>
                                <p>Status</p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {fetchedUsers && fetchedUsers.length > 0 ? (
                                    React.Children.toArray(
                                        fetchedUsers.map(
                                            ({
                                                propertyCategory,
                                                propertyCode,
                                                propertyName,
                                                status,
                                                accessCard,
                                                address,
                                                RFID,
                                                occupants,
                                            }) => {
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-8 gap-8 '>
                                                        <p className='flex items-center gap-4'>
                                                            <input type='checkbox' />

                                                            <span>
                                                                {propertyCode}
                                                            </span>
                                                        </p>
                                                        <p>{address}</p>
                                                        <p>
                                                            {propertyCategory}
                                                        </p>
                                                        <p>{propertyName}</p>
                                                        <p>{occupants}</p>
                                                        <p>{RFID}</p>
                                                        <p>{accessCard}</p>
                                                        <p>{status}</p>
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
                                <HiOutlineChevronRight />
                            </ul>
                        </footer>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default SecurityCompanyOverview
