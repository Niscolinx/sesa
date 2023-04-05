import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderedEstates, { ESTATEDATA } from './RenderedEstates'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../store/app/hooks'
import AxiosRequest from '../../../utils/axios'
import React from 'react'
import { GrDown } from 'react-icons/gr'
import {
    HiOutlineDotsVertical,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from 'react-icons/hi'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import useAxios from '../../../components/hooks/useAxios'

type EstateDetails = {
    estateName: string
    securityCompany: string
    status: string

    estateBalance: number
    NoOfResidents: number
    signOutRequired: boolean

    estateManager: string
    NoOfHouseholds: number
}

type Estate = {
    id: string
    img: string

    details: EstateDetails
}

function Estates() {
    type Actions = 'view details' | 'deactivate'

    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [fetchedEstates, setFetchedEstates] = useState<Estate[]>(ESTATEDATA)
    const [sortBy, setSortBy] = useState<string | null>(null)

    const handleAddEstate = () => {
        navigate('/superAdmin/estates/add')
    }

    const fetchEstates = () => {
        return axiosInstance({
            url: '/estate/getall',
        })
    }

    const {
        isLoading: get_estates_loading,
        data: get_estates_response,
        isError: get_estates_isError,
        error: get_estates_error,
        // isFetching: get_estates_fetching,
    } = useQuery('estates', fetchEstates) as any

    useEffect(() => {
        if (get_estates_response?.data.success) {
            // setFetchedEstates(get_estates_response.data)
            console.log(get_estates_response.data, 'fetchedData')
        }
    }, [get_estates_response])

    const actions = ['view details', 'deactivate'] satisfies Actions[]

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

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Estate[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const perPage = 6
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetchedEstates?.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Estate[][] = []
        for (let i = 0; i < fetchedEstates?.length; i += item) {
            slicedPages.push(fetchedEstates?.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedEstates?.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Estate[][] = []
        for (
            let i = 0;
            i < fetchedEstates?.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedEstates?.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedEstates])

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

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleSelectedAction = (item: Actions, id: string) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'view details') {
            navigate(`/superAdmin/estates/detail/:${id}`)
        }

        if (item === 'deactivate') {
            openDialog()
        }
    }

    const deactivateHandler = () => {
        closeDialog()

        toast('Admin deactivated successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }
    console.log({
        get_estates_loading,
        get_estates_isError,
        get_estates_error,
        get_estates_response,
    })

    if (get_estates_loading) {
        return <p>Loading...</p>
    }

    if (get_estates_isError) {
        return <p>{get_estates_error.message}</p>
    }

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {fetchedEstates.length > 0 ? (
                    <div className='rounded-lg mt-[3rem] '>
                        <div className='grid text-[1.6rem]'>
                            <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                                <p className=' font-Satoshi-Medium'>
                                    Estate List <span>(10)</span>
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
                                <div className='w-[10rem] grid self-baseline '>
                                    <Select
                                        state={['A-Z', 'Date']}
                                        selectedState={sortBy}
                                        placeholder={'A-Z'}
                                        setSelectedState={setSortBy}
                                    />
                                </div>
                                <button
                                    className='btn admins__btn ml-auto'
                                    onClick={handleAddEstate}
                                >
                                    <span>
                                        <IoMdAdd />
                                    </span>{' '}
                                    <p>Add Estate</p>
                                </button>
                            </div>
                            <div className=''>
                                {/* <tbody className='renderedEstates__table--body'> */}
                                <div className='grid gap-8 mt-8'>
                                    {slicedPages &&
                                        slicedPages?.length > 0 &&
                                        React.Children.toArray(
                                            slicedPages[paginate.index].map(
                                                (
                                                    {
                                                        img,
                                                        id,
                                                        details: {
                                                            estateBalance,
                                                            estateManager,
                                                            estateName,
                                                            NoOfHouseholds,
                                                            NoOfResidents,
                                                            securityCompany,
                                                            signOutRequired,
                                                            status,
                                                        },
                                                    },
                                                    i
                                                ) => {
                                                    const {
                                                        isDropDownOpen,
                                                        index,
                                                    } = toggleDropDown
                                                    return (
                                                        <div className='w-full flex gap-4 justify-between border-gray-100 bg-white p-8 rounded-lg'>
                                                            <div>
                                                                <img
                                                                    src={img}
                                                                    alt=''
                                                                    className='table__img'
                                                                />
                                                            </div>

                                                            <div className='grid'>
                                                                <div>
                                                                    <p className='text-[1.4rem] text-[#043FA7]'>
                                                                        Estate&nbsp;Name
                                                                    </p>
                                                                    <p className='font-[1.6rem] whitespace-nowrap'>
                                                                        {
                                                                            estateName
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className='text-[#043FA7]'>
                                                                        Security
                                                                        Company
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            securityCompany
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className='text-[#043FA7]'>
                                                                        Status
                                                                    </p>
                                                                    <p className='text-[#1D9F5F]'>
                                                                        {status}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className='grid'>
                                                                <div>
                                                                    <p className='text-[#043FA7]'>
                                                                        Estate
                                                                        Balance
                                                                    </p>
                                                                    <p className='flex items-center'>
                                                                        <TbCurrencyNaira className='text-[2rem]' />
                                                                        {
                                                                            estateBalance
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className='text-[#043FA7]'>
                                                                        No of
                                                                        Residents
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            NoOfResidents
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className='text-[#043FA7]'>
                                                                        Sign Out
                                                                        Required
                                                                    </p>
                                                                    <p>
                                                                        {signOutRequired
                                                                            ? 'Yes'
                                                                            : 'No'}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className=' grid content-start'>
                                                                <div>
                                                                    <p className='text-[#043FA7]'>
                                                                        Estate
                                                                        Manager
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            estateManager
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className=' mt-10'>
                                                                    <p className='text-[#043FA7]'>
                                                                        {' '}
                                                                        No of
                                                                        Households
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            NoOfHouseholds
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className='relative flex items-start content-start mr-4'>
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
                                                                    <HiOutlineDotsVertical className='text-[2rem]' />
                                                                </label>
                                                                <input
                                                                    type='radio'
                                                                    name='dropdown'
                                                                    className='hidden'
                                                                    id={i.toString()}
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        dropDownHandler(
                                                                            e,
                                                                            i
                                                                        )
                                                                    }
                                                                />

                                                                {isDropDownOpen &&
                                                                    index ===
                                                                        i && (
                                                                        <div className='absolute top-0 translate-x-[-10rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
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
                                                                                            handleSelectedAction(
                                                                                                item,
                                                                                                id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {item ===
                                                                                        'deactivate' ? (
                                                                                            <span className='text-red-600'>
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </span>
                                                                                        ) : (
                                                                                            <span>
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </span>
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

                                    <HiOutlineChevronRight
                                        onClick={handleNext}
                                        className='cursor-pointer'
                                    />
                                </ul>
                            </footer>
                        </div>
                    </div>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Estate yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={handleAddEstate}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Estate
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Estates
