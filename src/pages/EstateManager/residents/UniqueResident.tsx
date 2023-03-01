import React, { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

interface UniqueResidents {
    id: number
    residentCode: string
    name: string
    gender: string
    phoneNumber: string
    NoOfProfiles: number
    status: 'Active'
    kyr: 'Validated'
}

const UNIQUE_RESIDENTS_DATA: UniqueResidents[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: i,
    residentCode: (Math.random() * 0.100000 + 0.90000).toFixed(7).split('.')[1],
    name: `Resident ${i}`,
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    phoneNumber: `+234 801234567${i}`,
    NoOfProfiles: Math.floor(Math.random() * 5 + 1),
    status: 'Active',
    kyr: 'Validated',
}))

export type Actions = 'View Details' | 'Edit Details' | 'Delete'

const UniqueResident = () => {
    const navigate = useNavigate()

    const [fetchedUniqueResidents, setFetchedUniqueResidents] =
        useState<UniqueResidents[]>([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedUniqueResidents(UNIQUE_RESIDENTS_DATA)
        }, 500)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: UniqueResidents[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedUniqueResidents.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: UniqueResidents[][] = []
        for (let i = 0; i < fetchedUniqueResidents.length; i += item) {
            slicedPages.push(fetchedUniqueResidents.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedUniqueResidents.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: UniqueResidents[][] = []
        for (
            let i = 0;
            i < fetchedUniqueResidents.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedUniqueResidents.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedUniqueResidents.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedUniqueResidents])

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

    const handleAddUniqueResident = () => {
        console.log('add security guard')

        // navigate(`/securityCompany/security-guard/addSecurity`)
    }

    const detailsHandler = (id: number) => {
        console.log(id)
    }

    const [actions, setActions] = useState<Actions[]>([
        'View Details',
        'Edit Details',
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

    const selectedList = new Set()
    const dropDownHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        setToggleDropDown((prev) => {
            return {
                isDropDownOpen: e.target.checked,
                index
            }
        })

        if (e.target.checked) {
            selectedList.add(index)
        } else {
            selectedList.delete(index)
        }
    }

    const selectAction = (e: React.MouseEvent, item: string, index: number) => {
        setSelectedAction((prev) => {
            return {
                ...prev,
                [index]: item,
            }
        })
    }
    return (
        <div>
            <main className='mt-10 grid gap-9'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    <div className='grid text-[1.6rem]'>
                        <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                Unique Resident <span>(4)</span>
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
                                    onClick={handleAddUniqueResident}
                                >
                                    <span>
                                        <IoMdAdd />
                                    </span>{' '}
                                    Add Resident
                                </button>
                                <button
                                    className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                    onClick={deleteSelectedList}
                                >
                                   
                                    Deactivate
                                </button>
                            </div>
                        </caption>

                        <div className='grid'>
                            <div
                                className='grid items-center justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-8 gap-8'
                                style={{
                                    fontSize: '1.6rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <p>Resident Code</p>
                                </p>
                                <p> Name</p>
                                <p>Gender</p>
                                <p>Phone Number</p>
                                <p>No of Profiles</p>
                                <p>Status</p>
                                <p>KYR</p>
                                <p>Action </p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            (
                                                {
                                                    residentCode,
                                                    name,
                                                    id,
                                                    gender,
                                                    phoneNumber,
                                                    status,
                                                    kyr,
                                                    NoOfProfiles,

                                                },
                                                i
                                            ) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-8 gap-8 py-4 items-center'>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <span>
                                                                {residentCode}
                                                            </span>
                                                        </p>
                                                        <p>{name}</p>
                                                        <p>{gender}</p>
                                                        <p>{phoneNumber}</p>
                                                        <p>{NoOfProfiles}</p>
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
                                                            {kyr ===
                                                            'Validated' ? (
                                                                <span className='text-[#1A8F56]'>
                                                                    {kyr}
                                                                </span>
                                                            ) : (
                                                                <span className='text-red-600'>
                                                                    {kyr}
                                                                </span>
                                                            )}
                                                        </p>
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
                                                                id={i.toString()}
                                                                onChange={(e) =>
                                                                    dropDownHandler(
                                                                        e,
                                                                        id
                                                                    )
                                                                }
                                                            />

                                                            {isDropDownOpen &&
                                                                index === id && (
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
                                                                                            i
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    { item ===
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
            </main>
        </div>
    )
}

export default UniqueResident
