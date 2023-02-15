import React, { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import { Link } from 'react-router-dom'
import OverviewCard from '../../../components/SuperAdmin/overview/OverviewCard'

interface Overview {
    id: string
    propertyCode: string
    address: string
    propertyCategory: string
    propertyName: string
    occupants: number
    RFID: number
    accessCard: number
    status: string
}

const OVERVIEWDATA: Overview[] = [
    {
        id: '1',
        propertyCode: 'H09985',
        address: 'Blk.2, Flt. 3, Zone A',
        propertyCategory: 'Residential',
        propertyName: 'Property 1',
        occupants: 122,
        RFID: 12331,
        accessCard: 8212,
        status: 'Active',
    },
    {
        id: '2',
        propertyCode: 'H09985',
        address: 'Blk.2, Flt. 3, Zone A',
        propertyCategory: 'Residential',
        propertyName: 'Property 1',
        occupants: 122,
        RFID: 12331,
        accessCard: 8212,
        status: 'Active',
    },
    {
        id: '3',
        propertyCode: 'H09985',
        address: 'Blk.2, Flt. 3, Zone A',
        propertyCategory: 'Residential',
        propertyName: 'Property 1',
        occupants: 122,
        RFID: 12331,
        accessCard: 8212,
        status: 'Active',
    },
    {
        id: '4',
        propertyCode: 'H09985',
        address: 'Blk.2, Flt. 3, Zone A',
        propertyCategory: 'Residential',
        propertyName: 'Property 1',
        occupants: 122,
        RFID: 12331,
        accessCard: 8212,
        status: 'Active',
    },
    {
        id: '5',
        propertyCode: 'H09985',
        address: 'Blk.2, Flt. 3, Zone A',
        propertyCategory: 'Residential',
        propertyName: 'Property 1',
        occupants: 122,
        RFID: 12331,
        accessCard: 8212,
        status: 'Active',
    },
    {
        id: '6',
        propertyCode: 'H09985',
        address: 'Blk.2, Flt. 3, Zone A',
        propertyCategory: 'Residential',
        propertyName: 'Property 1',
        occupants: 122,
        RFID: 12331,
        accessCard: 8212,
        status: 'Active',
    },
    {
        id: '7',
        propertyCode: 'H09985',
        address: 'Blk.2, Flt. 3, Zone A',
        propertyCategory: 'Residential',
        propertyName: 'Property 1',
        occupants: 122,
        RFID: 12331,
        accessCard: 8212,
        status: 'Active',
    },
]

function SecurityCompanyOverview() {
    const [fetchedUsers, setFetchedUsers] = useState<Overview[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(OVERVIEWDATA)
            }, 1000)
        }
        fetchData()
    }, [])

    const handlePathSwitch = () => {}

    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Iba Estate Report</h1>
            <div className='mt-8 grid gap-8'>
                <section className='bg-white rounded-lg p-8 grid h-[28rem] text-[1.4rem]'>
                    <div className='flex w-full justify-between'>
                        <p>Iba Housing Estate</p>
                        <p className='text-[#666869]'>
                            Joined:{' '}
                            <span className='text-black'>08 May, 2022</span>
                        </p>
                    </div>
                    <div className='overview flex justify-between'>
                        <OverviewCard
                            title='Residents'
                            number={18_000}
                            iconUrl='/icons/overview/residents.svg'
                            bgColor='bg-[#DDFCDC]'
                            textColor='text-[#1A8F56]'
                        />
                        <OverviewCard
                            title='Property'
                            number={4}
                            iconUrl='/icons/overview/property.svg'
                            bgColor='bg-[#F5F9FA]'
                            textColor='text-[#00C2FF]'
                        />
                        <OverviewCard
                            title='Household'
                            number={40}
                            iconUrl='/icons/overview/household2.svg'
                            bgColor='bg-[#FCF3FA]'
                            textColor='text-[#B6008E]'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Link
                            to={`/dashboard/estates/detail/:4`}
                            className='text-[#0660FE] text-[1.4rem]'
                        >
                            View Estate Report
                        </Link>
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
