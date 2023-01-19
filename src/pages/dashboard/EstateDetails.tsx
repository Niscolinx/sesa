import React, { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import {
    HiOutlineDotsVertical,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import OverviewCard from '../../components/overview/OverviewCard'

type EstateManager = {
    id: string
    name: string
    gender: string
    phoneNumber: string
    status: string
    onboardingDate: string
}

const ESTATEMANAGERDATA: EstateManager[] = [
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
]

function EstateDetails() {
    const [fetchedUsers, setFetchedUsers] = useState<EstateManager[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ESTATEMANAGERDATA)
            }, 2000)
        }
        fetchData()
    }, [])

    const handlePathSwitch = () => {}

    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Estate Details</h1>
            <div className='mt-8 grid gap-8'>
                <section className='bg-white rounded-lg p-8 grid h-[28rem]'>
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
                        <Link to='/' className='text-[#0660FE] text-[1.4rem]'>
                            View Estate Report
                        </Link>
                    </div>
                </section>
                <section className='bg-color-white'>
                    <div className='grid text-[1.6rem]'>
                        <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                EstateManager List <span>(200)</span>
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

                        <div className='grid p-8'>
                            <div className='flex justify-between text-[1.4rem] text-color-dark-1'>
                                <h3 className='flex items-center gap-2'>
                                    <input type='checkbox' />
                                    <p>Property Code</p>
                                </h3>
                                <h3>Address</h3>
                                <h3>Property Category</h3>
                                <h3>Property Name</h3>
                                <h3>Occupants</h3>
                                <h3>RFID</h3>
                                <h3>Access Card</h3>
                                <h3>Status</h3>
                                <h3>Actions</h3>
                            </div>

                            <div className='renderedEstateManagers__table--body'>
                                {fetchedUsers && fetchedUsers.length > 0 ? (
                                    fetchedUsers.map((value, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <input type='checkbox' />
                                                    <img
                                                        src='/img/me.jpeg'
                                                        alt=''
                                                        className='w-10 h-10 rounded-full
                                                        object-cover
                                                        object-top'
                                                    />
                                                    <span>{value.name}</span>
                                                </td>
                                                <td>{value.gender}</td>
                                                <td>{value.phoneNumber}</td>
                                                <td>{value.onboardingDate}</td>
                                                <td>{value.status}</td>
                                                <td>
                                                    <button>
                                                        <img
                                                            src='/icons/estateManagers/threeDots.svg'
                                                            alt=''
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td className='relative'>
                                            <div className='absolute w-full grid place-content-center'>
                                                <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </div>
                        </div>
                        <footer className='renderedEstateManagers__footer'>
                            <div className='flex gap-8 items-center'>
                                <p>View</p>
                                <div className='flex items-center border px-4 rounded-lg'>
                                    <input
                                        type='number'
                                        className='w-8 outline-none border-none cursor-pointer'
                                        value={6}
                                    />
                                    <GrDown className='text-[1.3rem]' />
                                </div>
                                <p className='text'>List per page</p>
                            </div>
                            <ul className='flex items-center gap-5 ml-10'>
                                <HiOutlineChevronLeft />
                                <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                                    1
                                </li>
                                <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                                    2
                                </li>
                                <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                                    3
                                </li>
                                <li className='grid place-content-center border w-[3rem] h-[3rem]'>
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

export default EstateDetails
