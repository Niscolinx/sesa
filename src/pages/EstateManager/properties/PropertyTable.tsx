import React, { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

interface PropertyTable {
    id: number
    propertyCode: string
    address: string
    propertyType: string
    propertyCategory: 'business' | 'residential'
    propertyName: string
}

const PROPERTY_DATA: PropertyTable[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: i + 1,
    propertyCode: (Math.random() * 0.1 + 0.9).toFixed(7).split('.')[1],
    address: 'Blk.2, Flt. 3, Zone ',
    propertyType: '2-bedroom Self Con',
    propertyCategory: Math.random() > 0.5 ? 'business' : 'residential',
    propertyName: 'grey autos',
}))

export type Actions = 'View Details' | 'Edit Details' | 'Delete'

const PropertyTable = () => {
    const navigate = useNavigate()
    const [selectedList, setSelectedList] = useState<Map<string, number>>(
        new Map()
    )

    const [fetchedPropertyTable, setFetchedPropertyTable] = useState<
        PropertyTable[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedPropertyTable(PROPERTY_DATA)
        }, 500)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: PropertyTable[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedPropertyTable.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: PropertyTable[][] = []
        for (let i = 0; i < fetchedPropertyTable.length; i += item) {
            slicedPages.push(fetchedPropertyTable.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedPropertyTable.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: PropertyTable[][] = []
        for (
            let i = 0;
            i < fetchedPropertyTable.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedPropertyTable.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedPropertyTable.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedPropertyTable])

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

    const handleAddPropertyTable = () => {
        navigate('/estateManager/property/add')
        // navigate(`/securityCompany/security-guard/addSecurity`)
    }

    const detailsHandler = (id: number) => {
        console.log(id)
    }

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

    const handleChecked = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        if (e.target.checked) {
            const newMap = new Map(selectedList)
            newMap.set(e.target.name, id)
            setSelectedList(newMap)
        } else {
            const newMap = new Map(selectedList)
            newMap.delete(e.target.name)
            setSelectedList(newMap)
        }
    }

    const deleteSelectedList = () => {
        console.log(selectedList)
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
            navigate(`/estateManager/property/view/:${index}`)
        }

        if (item === 'Edit Details') {
            navigate(`/estateManager/property/view/:${index}`)
        }
    }
    return (
        <div>
            <main className='mt-10 grid gap-9'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    <div className='grid text-[1.6rem]'>
                        <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                Property List <span>(50)</span>
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
                                {selectedList.size > 0 ? (
                                    <button
                                        className='btn text-white bg-red-600 flex items-center gap-4 py-4 px-16 rounded-lg'
                                        onClick={deleteSelectedList}
                                    >
                                        Deactivate
                                    </button>
                                ) : (
                                    <button
                                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                        onClick={handleAddPropertyTable}
                                    >
                                        <span>
                                            <IoMdAdd />
                                        </span>{' '}
                                        Add Property
                                    </button>
                                )}
                            </div>
                        </caption>

                        <div className='grid'>
                            <div
                                className='grid items-center justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-6 gap-8'
                                style={{
                                    fontSize: '1.6rem',
                                }}
                            >
                                <p className='flex items-center gap-4'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <p>Property Code</p>
                                </p>
                                <p> Address</p>
                                <p>Property Type</p>
                                <p>Property Category</p>
                                <p>Property Name</p>

                                <p>Action </p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            ({
                                                propertyCategory,
                                                propertyCode,
                                                propertyName,
                                                propertyType,
                                                address,
                                                id,
                                            }) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-6 gap-8 py-4 items-center capitalize'>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                                name={`checkbox-${id}`}
                                                                onChange={(e) =>
                                                                    handleChecked(
                                                                        e,
                                                                        id
                                                                    )
                                                                }
                                                            />

                                                            <span>
                                                                {propertyCode}
                                                            </span>
                                                        </p>
                                                        <p>{address}</p>
                                                        <p>{propertyType}</p>
                                                        <p>
                                                            {propertyCategory}
                                                        </p>
                                                        <p>{propertyName}</p>

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
                                                                onChange={(e) =>
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
            </main>
        </div>
    )
}

export default PropertyTable
