

import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown, GrUp } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { EstateChart } from '../../../../components/SuperAdmin/charts/OverviewChart'
import ReportChart from '../../../../components/SuperAdmin/charts/ReportsChart'
import { EstateBarChart } from '../../../../components/SuperAdmin/charts/WalletBarChart'

export interface ReportDetail {
    id: number
    accessCode: string
    mode_of_contact: string
    name: string
    phoneNumber: string
    accessType: string
    time: string
    date: string
}

export const EVENTS_REPORT: ReportDetail[] = Array.from({
    length: 10,
}).map((_, i) => ({
    id: i,
    date: '12-May-2023',
    accessCode: 'EV-908423',
    mode_of_contact: 'Resident Code',
    accessType: 'check-In',
    time: '3:18PM',
    phoneNumber: '08138428423',
    name: 'Lalas Oyanka',
}))

type SortBy = 'Today' | 'This week' | 'This Month'

function WorkRate() {
    const navigate = useNavigate()

    const [workRate, setWorkRate] = useState<ReportDetail[]>([])

    useEffect(() => {
        setTimeout(() => {
            setWorkRate(EVENTS_REPORT)
        }, 500)
    }, [])

    const sortBy: Array<SortBy> = ['Today', 'This week', 'This Month']

    const [toggleMenu, setToggleMenu] = useState(false)
    const [sortType, setSortType] = useState<SortBy>('Today')

    const menuToggler = () => setToggleMenu(!toggleMenu)

    const handleSortType = (item: SortBy) => {
        setSortType(item)
        setToggleMenu(false)
    }

    const actions = ['View Details'] as const

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

    const selectAction = (item: 'View Details', id: number) => {
        if (item === 'View Details') {
            navigate(`/estateManager/reports/view/:${id}`)
        }
    }

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: ReportDetail[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(workRate.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ReportDetail[][] = []
        for (let i = 0; i < workRate.length; i += item) {
            slicedPages.push(workRate.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(workRate.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ReportDetail[][] = []
        for (let i = 0; i < workRate.length; i += paginate.itemsPerPage) {
            slicedPages.push(workRate.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    workRate.length / paginate.itemsPerPage
                ),
            }
        })
    }, [workRate])

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

    return (
        <>
            <div className='mt-8 grid gap-8'>
                <div className='grid gap-10'>
                    <div className='mt-8 flex gap-8 justify-between'>
                        <div className='bg-white p-8 rounded-lg grid justify-center'>
                            <section className='flex items-center mb-20'>
                                <p className='text-[1.8rem] whitespace-nowrap'>
                                    Check-In
                                </p>
                                <div className='flex justify-center gap-20 w-full '>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#08d231] w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>Security Guard</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#f7e541] w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>System</p>
                                    </div>
                                </div>
                            </section>
                            <EstateBarChart color1='#08D231' color2='#f7e541' />
                        </div>
                        <div className='bg-white p-8 rounded-lg'>
                            <section className='overviewChart__box'>
                                <EstateChart />

                                <div className='overviewChart__label'>
                                    <p className='text-[3rem] font-bold relative'>
                                        50,000
                                    </p>
                                    <p className='text-[1.2rem] max-w-[9.8rem]'>
                                        Total Check-Out
                                    </p>
                                </div>
                            </section>
                            <div>
                                <section className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#08d231] rounded-full w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>Security Guard</p>
                                    </div>
                                    <p>20,000</p>
                                </section>
                                <section className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#f7e541] rounded-full w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>SESA</p>
                                    </div>
                                    <p>30,000</p>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 flex gap-8 justify-between'>
                        <div className='bg-white p-8 rounded-lg grid justify-center'>
                            <section className='flex items-center mb-20'>
                                <p className='text-[1.8rem] whitespace-nowrap'>
                                    Check-Out
                                </p>
                                <div className='flex justify-center gap-20 w-full '>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#08d231] w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>Security Guard</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#f7e541] w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>System</p>
                                    </div>
                                </div>
                            </section>
                            <EstateBarChart color1='#3d08d2' color2='#F74183' />
                        </div>
                        <div className='bg-white p-8 rounded-lg'>
                            <section className='overviewChart__box'>
                                <EstateChart
                                    color1='#3d08d2'
                                    color2='#F74183'
                                />

                                <div className='overviewChart__label'>
                                    <p className='text-[3rem] font-bold relative'>
                                        50,000
                                    </p>
                                    <p className='text-[1.2rem] max-w-[9.8rem]'>
                                        Total Check-Out
                                    </p>
                                </div>
                            </section>
                            <div>
                                <section className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#3d08d2] rounded-full w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>Security Guard</p>
                                    </div>
                                    <p>20,000</p>
                                </section>
                                <section className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#F74183] rounded-full w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>SESA</p>
                                    </div>
                                    <p>30,000</p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                    <div className='grid border rounded-lg'>
                        <div className='grid p-10'>
                            <p className=' font-bold'>
                                Site Worker Report List <span>(200)</span>
                            </p>
                            <div className='flex w-full justify-start items-end gap-12 bg-white rounded-lg'>
                                <div className='relative flex items-center'>
                                    <img
                                        src='/icons/admins/search.svg'
                                        alt=''
                                        className='absolute left-4 text-[4rem]'
                                    />
                                    <input
                                        type='text'
                                        placeholder='Search Parameters'
                                        className='pl-16 w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                                    />
                                </div>
                                <div className='relative flex items-center'>
                                    <select className=' cursor-pointer w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'>
                                        <option hidden value=''>
                                            Sort By
                                        </option>
                                        <option value='date'>date</option>
                                        <option value='alpha'>Alpha</option>
                                    </select>
                                    <GrDown className='absolute right-4 text-[1.3rem]' />
                                </div>
                                <div className='relative grid items-center'>
                                    <label htmlFor=''>From</label>
                                    <input
                                        type='date'
                                        placeholder='Search Parameters'
                                        className=' w-[20rem] rounded-lg border border-color-blue-light cursor-pointer outline-none p-4'
                                    />
                                </div>
                                <div className='relative grid items-center'>
                                    <label htmlFor=''>To</label>
                                    <input
                                        type='date'
                                        placeholder='Search Parameters'
                                        className=' w-[20rem] rounded-lg border border-color-blue-light cursor-pointer outline-none p-4'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='grid bg-white'>
                            <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-9 gap-8 text-[1.4rem] items-center'>
                                <p className='flex items-center gap-4'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />

                                    <span> Date</span>
                                </p>
                                <p>Event Code</p>
                                <p>Event Name</p>
                                <p>Prop Code</p>
                                <p>Expected Guest</p>
                                <p>Total Check-In</p>
                                <p>Start Date</p>
                                <p>End Date</p>
                                <p>Action</p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            (
                                                {
                                                    id,
                                                    date,
                                                    accessCode,
                                                    name,
                                                    time,
                                                    phoneNumber,
                                                    mode_of_contact,
                                                    endDate,
                                                    accessType,
                                                },
                                                i
                                            ) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown

                                                return (
                                                    <div className='grid justify-between border-b grid-cols-9 items-center gap-8 py-4'>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <span> {date}</span>
                                                        </p>
                                                        <p>{accessCode}</p>
                                                        <p>{name}</p>
                                                        <p>{accessType}</p>
                                                        <p>{time}</p>
                                                        <p>{phoneNumber}</p>
                                                        <p>{mode_of_contact}</p>
                                                        <p>{endDate}</p>

                                                        <div className='relative'>
                                                            <label
                                                                className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                                htmlFor={i.toString()}
                                                                onClick={() =>
                                                                    setToggleDropDown(
                                                                        (
                                                                            prev
                                                                        ) => {
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
                                                                    dropDownHandler(
                                                                        e,
                                                                        i
                                                                    )
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
                                                                                    onClick={() =>
                                                                                        selectAction(
                                                                                            item,
                                                                                            id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
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
        </>
    )
}

export default WorkRate
