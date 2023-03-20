import React, { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { IoMdAdd } from 'react-icons/io'

export interface IPropertyType {
    id: string
    propertyType: string
    description: string
}

export const PROPERTY_TYPE: IPropertyType[] = [
    {
        id: '1',
        propertyType: '2 Bedroom Flat',
        description: 'Flat with 2 bedrooms and parlour with POP finishing',
    },
    {
        id: '1',
        propertyType: 'Duplex',
        description: 'Flat with 2 bedrooms and parlour with POP finishing',
    },
    {
        id: '1',
        propertyType: 'Semi Detached Duplex',
        description: 'Flat with 2 bedrooms and parlour with POP finishing',
    },
]

const PropertyType = () => {
    const navigate = useNavigate()

    const [fetchedPropertyType, setFetchedPropertyType] = useState<
        IPropertyType[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedPropertyType(PROPERTY_TYPE)
        }, 200)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IPropertyType[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedPropertyType.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IPropertyType[][] = []
        for (let i = 0; i < fetchedPropertyType.length; i += item) {
            slicedPages.push(fetchedPropertyType.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedPropertyType.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: IPropertyType[][] = []
        for (
            let i = 0;
            i < fetchedPropertyType.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedPropertyType.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedPropertyType.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedPropertyType])

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

    const addPropertyHandler = () => {
        navigate('/superAdmin/platformSettings/addProperty')
    }

    return (
        <>
            <div className='grid text-[1.6rem] border rounded-lg'>
                <div className=' p-10 bg-white rounded-lg '>
                    <div className='flex w-full border-b items-center pb-5'>
                        <h2 className='heading2'>Property Type</h2>

                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg ml-auto'
                            onClick={addPropertyHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Property
                        </button>
                    </div>
                </div>

                <div className='grid bg-white'>
                    <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-2 gap-8 text-[1.6rem]'>
                        <p>Property Type</p>
                        <p>Description</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        {slicedPages && slicedPages.length > 0 ? (
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    ({ id, propertyType, description }, i) => {
                                        return (
                                            <div className='grid justify-between border-b grid-cols-2 items-center gap-8 '>
                                                <p>{propertyType}</p>
                                                <p>{description}</p>
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
        </>
    )
}

export default PropertyType
