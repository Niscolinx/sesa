import React, { FC, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useAppDispatch } from '../../store/app/hooks'
import { Actions } from './ResidentUsersList'

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
    
    }
]

const ResidentUserHistory: FC<{
    fetchedResidentUserHistory: IResidentUserHistory[]
}> = ({ fetchedResidentUserHistory }) => {

     const [actions, _] = useState<Actions[]>([
         'View Details',
         'Deactivate'
     ])
     const [selectedAction, setSelectedAction] = useState<{
         [key: string]: Actions
     }>(null as any)
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
                 index: index,
             }
         })
     }

     const selectAction = (
         e: React.MouseEvent,
         item: string,
         index: number
     ) => {
         setSelectedAction((prev) => {
             return {
                 ...prev,
                 [index]: item,
             }
         })
     }

  

    return (
        <div className='grid text-[1.6rem]'>
            <caption className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-bold'>
                    Resident User List <span>(4)</span>
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

            </caption>

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
                    {fetchedResidentUserHistory &&
                    fetchedResidentUserHistory.length > 0 ? (
                        React.Children.toArray(
                            fetchedResidentUserHistory.map(
                                (
                                    { packageName, userName, frequency, amount, startDate, endDate, transactionType, status },
                                    i
                                ) => {
                                    const { isDropDownOpen, index } =
                                        toggleDropDown
                                    return (
                                        <div className='grid justify-between border-b grid-cols-9 gap-8 '>
                                            <p className='flex items-center gap-4'>
                                                <input
                                                    type='checkbox'
                                                    className='cursor-pointer'
                                                />

                                                <span>{packageName}</span>
                                            </p>
                                            <p>{userName}</p>
                                            <p>{frequency}</p>
                                            <p className='flex items-center gap-.5'>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                <span>{amount}</span>
                                            </p>
                                            <p>{startDate}</p>
                                            <p>{endDate}</p>
                                            <p>{transactionType}</p>
                                            <p>{status}</p>
                                            <div className='relative'>
                                                <label
                                                    className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                    htmlFor={i.toString()}
                                                    onClick={() =>
                                                        setToggleDropDown(
                                                            (prev) => {
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
                                                        dropDownHandler(e, i)
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
                                                                            selectAction(
                                                                                e,
                                                                                item,
                                                                                i
                                                                            )
                                                                        }
                                                                    >
                                                                        { item ===
                                                                          'Deactivate' ? (
                                                                            <span className='text-red-600'>
                                                                                {
                                                                                    item
                                                                                }
                                                                            </span>
                                                                        ) : (
                                                                            item
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
    )
}

export default ResidentUserHistory
