import { Actions } from '@reduxjs/toolkit'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export interface IEstateListTable {
    id: string
    name: string
    location: string
}

const ESTATE_LIST_TABLE: IEstateListTable[] = [
    {
        id: '1',
        name: 'Jacintha Sage',
        location: 'Lagos',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        location: 'Lagos',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        location: 'Lagos',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        location: 'Lagos',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        location: 'Lagos',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        location: 'Lagos',
    },
]

function EstateListTable() {
    const [fetchedEstateList, setFetchedEstateList] = useState<
        IEstateListTable[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedEstateList(ESTATE_LIST_TABLE)
        }, 200)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IEstateListTable[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetchedEstateList.length / perPage),
        slicedPages: null,
    })

    // const handleSelectedSort = (item: SortBy) => {
    //     setToggleSortMenu(false)
    // }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IEstateListTable[][] = []
        for (let i = 0; i < fetchedEstateList.length; i += item) {
            slicedPages.push(fetchedEstateList.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedEstateList.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: IEstateListTable[][] = []
        for (
            let i = 0;
            i < fetchedEstateList.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedEstateList.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedEstateList.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedEstateList])

    const handleNext = () => {
        console.log(paginate.currentPage, paginate.totalPage, slicedPages)
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
        <div className='grid text-[1.6rem] bg-white rounded-lg mt-20'>
            <div className='flex w-full items-center gap-12 py-8 bg-white rounded-lg'>
                <p className=' font-Satoshi-Medium'>
                    Estate List <span>(5)</span>
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
            </div>

            <div className='grid gap-10'>
                <div
                    className='grid justify-between text-color-dark-1 bg-color-grey items-center p-8 grid-cols-4 gap-8'
                    style={{
                        fontSize: '1.4rem',
                    }}
                >
                    <p className='flex items-center gap-2'>
                        <input type='checkbox' className='cursor-pointer' />
                        <p> Name</p>
                    </p>
                    <p>Location</p>
                </div>

                <div className='grid gap-8 p-8'>
                    {slicedPages && slicedPages.length > 0 ? (
                        React.Children.toArray(
                            slicedPages[paginate.index].map(
                                ({ name, location }, i) => {
                                    return (
                                        <div className='grid justify-between border-b grid-cols-4 gap-8 '>
                                            <p className='flex items-center gap-4'>
                                                <input
                                                    type='checkbox'
                                                    className='cursor-pointer'
                                                />

                                                <span>{name}</span>
                                            </p>
                                            <p>{location}</p>
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
                                        onClick={(e) => jumpToPage(e, index)}
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
    )
}

export default EstateListTable
