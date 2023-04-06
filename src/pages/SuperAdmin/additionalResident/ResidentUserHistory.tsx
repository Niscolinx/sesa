import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown, GrUp } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { Select } from '../../../components/SuperAdmin/UI/Select'

export interface IResidentUserHistory {
    id: string
    packageName: string
    userName: string
    frequency: string
    amount: number
    startDate: string
    endDate: string
    transactionType: 'purchase' | 'renewal'
    status: 'active' | 'inactive'
}


export const RESIDENT_HISTORY: IResidentUserHistory[] = [
    {
        id: '1',
        packageName: 'history',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '2',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '3',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '4',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '5',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '6',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '7',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '8',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '9',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '10',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
]

const ResidentUserHistory = () => {
    const navigate = useNavigate()

    const [sortBy, setSortBy] = useState<string | null>(null)

    const actions = ['View Details', 'Deactivate']
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

    const selectAction = (
        e: React.MouseEvent,
        item: 'View Details' | 'Deactivate'
    ) => {
        if (item === 'View Details') {
            navigate('/superAdmin/additional-resident/:Id')
        }
    }

    return (
        <div className='grid text-[1.6rem]'>
            <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-Satoshi-Medium'>
                    Resident User History
                    <span>(2)</span>
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
                <div className='w-[10rem] grid self-baseline '>
                    <Select
                        state={['A-Z', 'Date']}
                        selectedState={sortBy}
                        placeholder={'A-Z'}
                        setSelectedState={setSortBy}
                    />
                </div>
                {/* <button
                                        className='btn admins__btn ml-auto'
                                        onClick={handlePathSwitch}
                                    >
                                        <span>
                                            <IoMdAdd />
                                        </span>{' '}
                                        <p>Add EstateManager</p>
                                    </button> */}
            </div>

            <div className='grid'>
                <div
                    className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-9 gap-8'
                    style={{
                        fontSize: '1.4rem',
                    }}
                >
                    <p className='flex items-center gap-2'>
                        <input type='checkbox' className='cursor-pointer' />
                        <p>Package Name</p>
                    </p>
                    <p>User Name</p>
                    <p>Frequency</p>
                    <p>Amount</p>
                    <p>Start Date</p>
                    <p>End Date</p>
                    <p>Transaction Type</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>

                <div className='grid gap-8 mt-8 p-8'>
                    {RESIDENT_HISTORY.map(
                        (
                            {
                                packageName,
                                userName,
                                frequency,
                                amount,
                                startDate,
                                endDate,
                                transactionType,
                                status,
                                id,
                            },
                            i
                        ) => {
                            const { isDropDownOpen, index } = toggleDropDown
                            return (
                                <div className='grid justify-between border-b grid-cols-9 gap-8 '>
                                    <p className='flex items-center gap-4'>
                                        {id}
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer'
                                        />

                                        <span>{packageName}</span>
                                    </p>
                                    <p>{userName}</p>
                                    <p>{frequency}</p>
                                    <p className='flex items-center gap-.5'>
                                        <img src='/icons/Naira.svg' alt='' />
                                        <span>{amount}</span>
                                    </p>
                                    <p>{startDate}</p>
                                    <p>{endDate}</p>
                                    <p>{transactionType}</p>
                                    <p>{status}</p>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResidentUserHistory
