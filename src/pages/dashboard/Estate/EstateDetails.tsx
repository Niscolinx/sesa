import React, { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import { Link } from 'react-router-dom'
import OverviewCard from '../../../components/overview/OverviewCard'

interface EstateDetails {
    id: string
    guardName: string
    phoneNumber: string
    date: string
    guardCode: number
    clockIn: number
    clockOut: number
}

const ESTATEDETAILSDATA: EstateDetails[] = [
    {
        id: '1',
        guardName: 'John Doe',
        phoneNumber: '08012345678',
        date: '12/12/2021',
        guardCode: 1234,
        clockIn: 8,
        clockOut: 5,
    },
    {
        id: '1',
        guardName: 'John Doe',
        phoneNumber: '08012345678',
        date: '12/12/2021',
        guardCode: 1234,
        clockIn: 8,
        clockOut: 5,
    },
    {
        id: '1',
        guardName: 'John Doe',
        phoneNumber: '08012345678',
        date: '12/12/2021',
        guardCode: 1234,
        clockIn: 8,
        clockOut: 5,
    },
    {
        id: '1',
        guardName: 'John Doe',
        phoneNumber: '08012345678',
        date: '12/12/2021',
        guardCode: 1234,
        clockIn: 8,
        clockOut: 5,
    },
    {
        id: '1',
        guardName: 'John Doe',
        phoneNumber: '08012345678',
        date: '12/12/2021',
        guardCode: 1234,
        clockIn: 8,
        clockOut: 5,
    },
    {
        id: '1',
        guardName: 'John Doe',
        phoneNumber: '08012345678',
        date: '12/12/2021',
        guardCode: 1234,
        clockIn: 8,
        clockOut: 5,
    },
]

function EstateDetails() {
    const [fetchedUsers, setFetchedUsers] = useState<EstateDetails[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ESTATEDETAILSDATA)
            }, 2000)
        }
        fetchData()
    }, [])

    const getDate = () => {
        const newDate = new Date()

        const date = newDate.toLocaleString('en-GB', { dateStyle: 'full' })

        return date
    }

    const dateString = getDate()

    getDate()

    const handlePathSwitch = () => {}

    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Estate Details</h1>
                <div className='estateDetail__radioBox'>
                    <input
                        defaultChecked
                        type='radio'
                        name='report'
                        id='activityReport'
                        className='hidden'
                    />
                    <label htmlFor='activityReport'>Activity Report</label>

                    <input
                        type='radio'
                        name='report'
                        id='attendanceReport'
                        className='hidden'
                    />
                    <label htmlFor='attendanceReport'>Attendance Report</label>
                </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-white rounded-lg p-8 grid h-[28rem] text-[1.4rem]'>
                    <div className='flex w-full justify-between'>
                        <p className='font-medium text-[2rem]'>
                            Security Report
                        </p>
                        <p className='text-[#666869]'>
                            Showing current Day:{' '}
                            <span className='text-black'>{dateString}</span>
                        </p>
                    </div>
                    <div className='overview flex gap-8'>
                        <OverviewCard
                            title='Total number of Guards'
                            number={14}
                            iconUrl='/icons/admins/people.svg'
                            bgColor='bg-[#F5F9FA]'
                            textColor='text-[#00C2FF]'
                        />
                        <OverviewCard
                            title='Guards on Duty'
                            number={40}
                            iconUrl='/icons/admins/housePeople.svg'
                            bgColor='bg-[#FCF3FA]'
                            textColor='text-[#B6008E]'
                        />
                    </div>
                </section>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    <div className='grid text-[1.6rem]'>
                        <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                Attendance Report List <span>(4)</span>
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
                                    className='pl-16 w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                                />
                            </div>
                            <div className='relative flex items-center'>
                                <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                                    <option hidden value=''>
                                        Sort By
                                    </option>
                                    <option value='date'>date</option>
                                    <option value='alpha'>Alpha</option>
                                </select>
                                <GrDown className='absolute right-4 text-[1.3rem]' />
                            </div>
                            <div className='relative flex items-center'>
                                <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                                    <option hidden value=''>
                                        Start Date
                                    </option>
                                    <option value='date'>date</option>
                                    <option value='alpha'>Alpha</option>
                                </select>
                                <GrDown className='absolute right-4 text-[1.3rem]' />
                            </div>
                            <div className='relative flex items-center'>
                                <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                                    <option hidden value=''>
                                        End Date
                                    </option>
                                    <option value='date'>date</option>
                                    <option value='alpha'>Alpha</option>
                                </select>
                                <GrDown className='absolute right-4 text-[1.3rem]' />
                            </div>
                        </caption>

                        <div className='grid'>
                            <div
                                className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-6 gap-8'
                                style={{
                                    fontSize: '1.6rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <p>Guard Name</p>
                                </p>
                                <p>Phone Number</p>
                                <p>Date</p>
                                <p>Guard Code</p>
                                <p>Clock In</p>
                                <p>Clock Out</p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {fetchedUsers && fetchedUsers.length > 0 ? (
                                    React.Children.toArray(
                                        fetchedUsers.map(
                                            ({
                                                guardCode,
                                                guardName,
                                                phoneNumber,
                                                clockIn,
                                                clockOut,
                                                date,
                                            }) => {
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-6 gap-8 '>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <span>
                                                                {guardName}
                                                            </span>
                                                        </p>
                                                        <p>{phoneNumber}</p>
                                                        <p>{date}</p>
                                                        <p>{guardCode}</p>
                                                        <p>{clockIn}</p>
                                                        <p>{clockOut}</p>
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
                                <li className='grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                    ....
                                </li>
                                <li className='grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'>
                                    10
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
