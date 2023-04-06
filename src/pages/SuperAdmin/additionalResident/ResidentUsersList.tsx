import React, { FC, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useAppDispatch } from '../../../store/app/hooks'

export interface IResidentUsersList {
    id: string
    packageName: string
    frequency: string
    price: number
    status: string
}

export type Actions = 'View Details' | 'Activate' | 'Deactivate' | 'Delete'


export const RESIDENT_LISTS: IResidentUsersList[] = [
    {
        id: '1',
        packageName: 'Gold',
        frequency: 'Monthly',
        price: 6000,
        status: 'Active',
    },
    {
        id: '1',
        packageName: 'Gold',
        frequency: 'Monthly',
        price: 12000,
        status: 'Active',
    },
    {
        id: '1',
        packageName: 'Gold',
        frequency: 'Monthly',
        price: 8000,
        status: 'Active',
    },
]

const ResidentUsersList = () => {
    const dispatch = useAppDispatch()

    const [actions, setActions] = useState<Actions[]>([
        'View Details',
        'Activate',
        'Deactivate',
        'Delete',
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
        console.log('clicked')
        setToggleDropDown((prev) => {
            return {
                isDropDownOpen: e.target.checked,
                index: index,
            }
        })
    }

    const selectAction = (e: React.MouseEvent, item: string, index: number) => {
        setSelectedAction((prev) => {
            return {
                ...prev,
                [index]: item,
            }
        })
    }

    const handleAddPackage = () => {
        //dispatch(setAdditionalResidentPath('addResidentUserPackage'))
    }

    return (
        <div className='grid text-[1.6rem]'>
            <caption className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-Satoshi-Medium'>
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
                <button
                    className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg py-4 px-16 text-[1.6rem] ml-auto'
                    onClick={handleAddPackage}
                >
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    Add Package
                </button>
            </caption>

            <div className='grid'>
                <div
                    className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-5 gap-8'
                    style={{
                        fontSize: '1.6rem',
                    }}
                >
                    <p className='flex items-center gap-2'>
                        <input type='checkbox' className='cursor-pointer' />
                        <p>Package Name</p>
                    </p>
                    <p>Frequency</p>
                    <p>Price</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>

                <div className='grid gap-8 mt-8 p-8'>
                    {fetchedResidentUsers && fetchedResidentUsers.length > 0 ? (
                        React.Children.toArray(
                            fetchedResidentUsers.map(
                                (
                                    { packageName, price, frequency, status },
                                    i
                                ) => {
                                    const { isDropDownOpen, index } =
                                        toggleDropDown
                                    return (
                                        <div className='grid justify-between border-b grid-cols-5 gap-8 '>
                                            <p className='flex items-center gap-4'>
                                                <input
                                                    type='checkbox'
                                                    className='cursor-pointer'
                                                />

                                                <span>{packageName}</span>
                                            </p>
                                            <p>{frequency}</p>
                                            <p className='flex items-center gap-.5'>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                <span>{price}</span>
                                            </p>
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
                                                        <div className='absolute top-0 translate-x-[5rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
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
                                                                        {item ===
                                                                        'Activate' ? (
                                                                            <span className='text-green-600'>
                                                                                {
                                                                                    item
                                                                                }
                                                                            </span>
                                                                        ) : item ===
                                                                          'Delete' ? (
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

export default ResidentUsersList
