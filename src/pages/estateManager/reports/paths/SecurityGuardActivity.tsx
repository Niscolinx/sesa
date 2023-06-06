import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown, GrUp } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import ReportChart from '../../../../components/superadmin/charts/ReportsChart'

export interface ReportDetail {
    id: number
    guardName: string
    imgUrl: string
    date: string
    guardCode: string
    checkInCount: number
    checkOutCount: number
    panicAlert: number
}

export const SECURITY_GUARD: ReportDetail[] = Array.from({
    length: 10,
}).map((_, i) => ({
    id: i,
    date: '12-May-2023',
    guardName: 'Chinedu Mmadu',
    imgUrl: '/img/avatar11.png',
    guardCode: 'A88238',
    checkInCount: 3,
    checkOutCount: 6,
    panicAlert: 0,
}))

type SortBy = 'Today' | 'This week' | 'This Month'

function SecurityGuardActivity() {
    const navigate = useNavigate()

    const [securityGuardActivity, setSecurityGuardActivity] = useState<
        ReportDetail[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setSecurityGuardActivity(SECURITY_GUARD)
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
        totalPage: Math.ceil(securityGuardActivity.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ReportDetail[][] = []
        for (let i = 0; i < securityGuardActivity.length; i += item) {
            slicedPages.push(securityGuardActivity.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(securityGuardActivity.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ReportDetail[][] = []
        for (
            let i = 0;
            i < securityGuardActivity.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                securityGuardActivity.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    securityGuardActivity.length / paginate.itemsPerPage
                ),
            }
        })
    }, [securityGuardActivity])

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
                <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                    <div className='grid border rounded-lg'>
                        <div className='grid p-10'>
                            <p className=' font-Satoshi-Medium'>
                                Guard Report List <span>(200)</span>
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
                            <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-6 gap-8 text-[1.4rem] items-center'>
                                <p className='flex items-center gap-4'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />

                                    <span>Guard Name</span>
                                </p>
                                <p>Date</p>
                                <p>Guard Code</p>
                                <p>Check - in Count</p>
                                <p>Check - out Count</p>
                                {/* <p>Panic Alert</p> */}
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            (
                                                {
                                                    id,
                                                    date,
                                                    guardName,
                                                    panicAlert,
                                                    guardCode,
                                                    checkInCount,
                                                    checkOutCount,
                                                    imgUrl,
                                                },
                                                i
                                            ) => {
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-6 items-center gap-8 py-4'>
                                                        <div className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <div className='flex items-center gap-4'>
                                                                <img
                                                                    src={imgUrl}
                                                                    alt=''
                                                                    className='w-[3.5rem] h-[3.5rem] rounded-full object-cover'
                                                                />
                                                                <p className='font-Satoshi-Medium'>
                                                                    {guardName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p>{date}</p>
                                                        <p>{guardCode}</p>
                                                        <p>{checkInCount}</p>
                                                        <p>{checkOutCount}</p>
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

export default SecurityGuardActivity
