import { IoMdAdd } from 'react-icons/io'
import { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'
import React from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Select } from '../../SuperAdmin/UI/Select'
import { useTableContext } from './Table'
import SlicedPages from './SlicedPages'

export type ToggleDropDown = {
    isDropDownOpen: boolean
    index: number | null
}

export interface Paginate {
    index: number
    currentPage: number
    itemsPerPage: number
    totalPage: number
    slicedPages: any[][] | null
}

const TableData = () => {
    const {
        navigate,
        axiosInstance,
        filterBy,
        data_to_display,
        setFilterBy,
        fetchedData,
        setFetchedData,
        title,
        fetch_url,
        add_page_url,
        providedData,
        isDataProvided,
        THeader,
        is_checkbox,
        is_add_btn,
        isCategory,
        setIsDialogOpen,
    } = useTableContext()

    const [toggleDropDown, setToggleDropDown] = useState<ToggleDropDown>({
        isDropDownOpen: false,
        index: null,
    })
    const [search, setSearch] = useState('')
    const [searchFields, setSearchFields] = useState<string[]>([])
    const [extractedData, setExtractedData] = useState<any[]>([])

    const check_type = (toCheck: any) => {
        if (typeof toCheck === 'string') {
            return toCheck.toLowerCase()
        }

        return toCheck
    }

    useEffect(() => {
        const fields = [...THeader].filter(
            (item) =>
                item.toLowerCase() !== 'actions' &&
                item.toLowerCase() !== 'status'
        )

        setSearchFields(fields)
        setFilterBy(fields[0])
    }, [])

    const fetchData = () => {
        return axiosInstance({
            url: fetch_url,
        })
    }

    const {
        isLoading: get_data_loading,
        isError: get_data_isError,
        error: get_data_error,
        data: get_data_response,
        isFetching,
    } = useQuery(title, fetchData, {
        enabled: !isDataProvided,
    }) as any

    useEffect(() => {
        const filterHandler = (data: any[]) => {
            const filterOut_image = data_to_display.filter(
                (item) => item !== 'image'
            )

            const transFormed_data: Record<string, string>[] =
                filterOut_image.map((item, i) => {
                    return {
                        [item]: THeader[i],
                    }
                })

           const map_transformed_data =  data.map((item) => {

                transFormed_data.forEach((item) => {
                    console.log(item)

                    const [[key, value]] = Object.entries(item)

                    console.log({ key, item })
                    // if(key !== value){
                    //     searchFrom[key] = check_type(item[key])

                    // }

                    return {
                        name: ''
                    }
                })

                
            })

            console.log({ transFormed_data, THeader, data_to_display })

            setExtractedData(map_transformed_data)
        }

        if (get_data_response) {
            const res: any[] =
                get_data_response.data.data || get_data_response.data
            setFetchedData(res)
            filterHandler(res)
        }

        if (isDataProvided && providedData) {
            setFetchedData(providedData)

            filterHandler(providedData)
        }
    }, [get_data_response, isDataProvided, providedData])

    useEffect(() => {
        const slicedPages: any[][] = []
        for (let i = 0; i < fetchedData?.length; i += paginate.itemsPerPage) {
            slicedPages.push(fetchedData?.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(fetchedData?.length / perPage),
            }
        })
    }, [fetchedData])

    const fetched: any[] = isDataProvided
        ? providedData
        : get_data_response?.data.data || get_data_response?.data

    const itemsPerPageArr = [10, 20, 50, 100]

    const perPage = 10
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedData?.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: any[][] = []
        for (let i = 0; i < fetchedData?.length; i += item) {
            slicedPages.push(fetchedData?.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedData?.length / item),
            }
        })
    }

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

    if (fetch_url && get_data_loading) {
        return <p>Loading...</p>
    }

    if (fetch_url && !isFetching && get_data_isError) {
        return <p>{get_data_error.message}</p>
    }

    const handlePathSwitch = () => {
        if (isCategory) {
            return setIsDialogOpen({
                isOpen: true,
                type: 'create',
            })
        }
        navigate(`${add_page_url}`)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        console.log({ extractedData })

        const foundData = extractedData.filter((item) => {
            console.log({ item, value }, item[check_type(filterBy)])
            return check_type(item[check_type(filterBy)]).includes(
                check_type(value)
            )
        })

        setFetchedData(foundData)
    }

    return (
        <div>
            <div className='rounded-lg mt-[3rem]'>
                {fetched.length > 0 ? (
                    <>
                        <ToastContainer />

                        <div className='rounded-lg mt-[3rem] '>
                            <div className='grid text-[1.6rem]'>
                                <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                                    <p className=' font-Satoshi-Medium capitalize'>
                                        {title.replaceAll('_', ' ')} list
                                        <span> ({fetched.length})</span>
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
                                            value={search}
                                            onChange={handleSearch}
                                            className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                                        />
                                    </div>
                                    <div className='w-max grid self-baseline '>
                                        {searchFields.length > 0 && (
                                            <Select
                                                state={searchFields}
                                                selectedState={filterBy}
                                                placeholder={searchFields.find(
                                                    Boolean
                                                )}
                                                setSelectedState={setFilterBy}
                                            />
                                        )}
                                    </div>
                                    {is_add_btn && (
                                        <button
                                            className='btn btn-blue ml-auto'
                                            onClick={handlePathSwitch}
                                        >
                                            <span>
                                                <IoMdAdd />
                                            </span>{' '}
                                            <p>
                                                Add{' '}
                                                {title
                                                    .replace(
                                                        /([a-z])([A-Z])/g,
                                                        '$1 $2'
                                                    )
                                                    .replace(/^\w/, (c) =>
                                                        c.toUpperCase()
                                                    )}
                                            </p>
                                        </button>
                                    )}
                                </div>

                                <div className='grid bg-white'>
                                    <div
                                        className={`grid justify-between text-color-dark-1 bg-color-grey p-8  items-center gap-8 text-[1.4rem] capitalize grid-cols-${THeader.length}`}
                                    >
                                        {THeader.map(
                                            (header: string, idx: number) =>
                                                idx === 0 ? (
                                                    <div
                                                        className='flex items-center gap-2'
                                                        key={idx}
                                                    >
                                                        {' '}
                                                        {is_checkbox && (
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />
                                                        )}
                                                        <p>
                                                            {header.replaceAll(
                                                                '_',
                                                                ' '
                                                            )}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p key={idx}>
                                                        {header.replaceAll(
                                                            '_',
                                                            ' '
                                                        )}
                                                    </p>
                                                )
                                        )}
                                    </div>

                                    <div className='grid gap-8 mt-8 p-8'>
                                        <SlicedPages
                                            pages={slicedPages || []}
                                            index={paginate.index}
                                            toggleDropDown={toggleDropDown}
                                            setToggleDropDown={
                                                setToggleDropDown
                                            }
                                        />
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
                                            {itemsPerPageArr.map(
                                                (item, index) => (
                                                    <option
                                                        value={item}
                                                        key={index}
                                                        selected={
                                                            item ===
                                                            itemsPerPage
                                                        }
                                                        className='capitalize cursor-pointer bg-white'
                                                    >
                                                        {item}
                                                    </option>
                                                )
                                            )}
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
                                                    {index + 1 ===
                                                    currentPage ? (
                                                        <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                                            {index + 1}
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
                                                            onClick={(e) =>
                                                                jumpToPage(
                                                                    e,
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {index + 1}
                                                        </span>
                                                    )}
                                                </li>
                                            )
                                        })}

                                        <HiOutlineChevronRight
                                            onClick={handleNext}
                                            className='cursor-pointer'
                                        />
                                    </ul>
                                </footer>
                            </div>
                        </div>
                    </>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any {title} yet
                        </p>
                        {!isDataProvided && (
                            <button
                                className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                onClick={handlePathSwitch}
                            >
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                Add {title}
                            </button>
                        )}
                    </section>
                )}
            </div>
        </div>
    )
}

export default TableData
