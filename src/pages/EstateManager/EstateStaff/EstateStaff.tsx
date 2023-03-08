import React, { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

interface EstateStaff {
    id: number
    staffCode: string
    staffName: string
    phoneNumber: string
    workDays: string
    status: 'Active' | 'Inactive'
    kys: 'Validated' | 'Not Validated' | 'Full Match'
}

const ESTATE_STAFF: EstateStaff[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: i,
    staffName: 'John Doe',
    phoneNumber: '+2347024954270',
    staffCode: `H${(Math.random() * 0.1 + 0.9).toFixed(5).split('.')[1]}`,
    workDays: 'Mon, Tue, Wed',
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    kys: Math.random() > 0.3 ? 'Validated' : 'Not Validated',
}))

export type Actions = 'View Details' | 'Edit Details' | 'Delete'

const EstateStaff = () => {
    const navigate = useNavigate()

    const [isEstateStaff, setIsEstateStaff] = useState(true)

    const [fetchedEstateStaffData, setFetchedEstateStaffData] = useState<
        EstateStaff[]
    >([])

    const addEstateStaff = () => {
        setIsEstateStaff(true)
    }
    useEffect(() => {
        setTimeout(() => {
            setFetchedEstateStaffData(ESTATE_STAFF)
        }, 1000)
    }, [])

    const actions: Actions[] = ['View Details', 'Edit Details', 'Delete']
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
        setToggleDropDown((prev) => {
            return {
                isDropDownOpen: e.target.checked,
                index,
            }
        })
    }



    const selectAction = (
        e: React.MouseEvent,
        item: Actions,
        index: number
    ) => {
        setSelectedAction((prev) => {
            return {
                ...prev,
                [index]: item,
            }
        })

        if (item === 'View Details') {
            navigate(`/estateManager/residents/view/:${index}`)
        }

        if (item === 'Edit Details') {
            navigate(`/estateManager/residents/edit/:${index}`)
        }
    }
    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: EstateStaff[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedEstateStaffData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: EstateStaff[][] = []
        for (let i = 0; i < fetchedEstateStaffData.length; i += item) {
            slicedPages.push(fetchedEstateStaffData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedEstateStaffData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: EstateStaff[][] = []
        for (
            let i = 0;
            i < fetchedEstateStaffData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedEstateStaffData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedEstateStaffData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedEstateStaffData])

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

    const handleAddSecurityGuard = () => {

        navigate(`/estateManager/estate-staff/add`)
    }

   
    return (
        <>
            {isEstateStaff ? (
                <div>
                    <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                        <div className='grid text-[1.6rem]'>
                            <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                                <p className=' font-bold'>
                                    Estate Staff List <span>(4)</span>
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
                                <div className='ml-auto'>
                                    <button
                                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                        onClick={handleAddSecurityGuard}
                                    >
                                        <span>
                                            <IoMdAdd />
                                        </span>{' '}
                                        Add Estate Staff
                                    </button>
                                </div>
                            </caption>

                            <div className='grid'>
                                <div
                                    className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-7 gap-8 capitalize'
                                    style={{
                                        fontSize: '1.6rem',
                                    }}
                                >
                                    <p className='flex items-center gap-2'>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer'
                                        />
                                        <p>Staff Code</p>
                                    </p>
                                    <p>Staff Name</p>
                                    <p>Phone Number</p>
                                    <p>Work Days</p>
                                    <p>Status</p>
                                    <p>KYG</p>
                                    <p>Action </p>
                                </div>

                                <div className='grid gap-8 mt-8 p-8'>
                                    {slicedPages && slicedPages.length > 0 ? (
                                        React.Children.toArray(
                                            slicedPages[paginate.index].map(
                                                ({
                                                    staffCode,
                                                    staffName,
                                                    workDays,
                                                    kys,
                                                    status,
                                                    id,
                                                    phoneNumber,
                                                }) => {
                                                    const {
                                                        isDropDownOpen,
                                                        index,
                                                    } = toggleDropDown

                                                    return (
                                                        <div className='grid justify-between border-b grid-cols-7 gap-8 py-4'>
                                                            <p className='flex items-center gap-4'>
                                                                <input
                                                                    type='checkbox'
                                                                    className='cursor-pointer'
                                                                />

                                                                <span>
                                                                    {staffCode}
                                                                </span>
                                                            </p>
                                                            <p>{staffName}</p>
                                                            <p>{phoneNumber}</p>
                                                            <p>{workDays}</p>
                                                            <p>
                                                                {status ===
                                                                'Active' ? (
                                                                    <span className='text-[#1A8F56]'>
                                                                        {status}
                                                                    </span>
                                                                ) : (
                                                                    <span className='text-red-600'>
                                                                        {status}
                                                                    </span>
                                                                )}
                                                            </p>
                                                            <p>
                                                                {kys ===
                                                                'Validated' ? (
                                                                    <span className='text-[#1A8F56]'>
                                                                        {kys}
                                                                    </span>
                                                                ) : (
                                                                    <span className='text-red-600'>
                                                                        {kys}
                                                                    </span>
                                                                )}
                                                            </p>
                                                            <div className='relative'>
                                                                <label
                                                                    className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                                    htmlFor={id.toString()}
                                                                    onClick={() =>
                                                                        setToggleDropDown(
                                                                            (
                                                                                prev
                                                                            ) => {
                                                                                return {
                                                                                    isDropDownOpen:
                                                                                        !prev.isDropDownOpen,
                                                                                    index: id,
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
                                                                    id={id.toString()}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        dropDownHandler(
                                                                            e,
                                                                            id
                                                                        )
                                                                    }
                                                                />

                                                                {isDropDownOpen &&
                                                                    index ===
                                                                        id && (
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
                                                                                            id
                                                                                        }
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            selectAction(
                                                                                                e,
                                                                                                item,
                                                                                                id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {item ===
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
                        </div>{' '}
                    </section>
                </div>
            ) : (
                <div className='h-[80vh]'>
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not any estate staff yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={addEstateStaff}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Estate Staff
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default EstateStaff
