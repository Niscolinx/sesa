import React, { useState, useEffect, ChangeEvent, useRef } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

import { Link, useNavigate } from 'react-router-dom'
import OverviewCard from '../../../components/SuperAdmin/overview/OverviewCard'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../store/app/hooks'
import { setAdminPath } from '../../../store/features/routeChange'
import { AxiosRequest } from '../../../utils/axios'

interface EstateManager {
    id: string
    propertyCode: string
    address: string
    propertyCategory: string
    propertyName: string
    occupants: number
    RFID: number
    accessCard: number
    status: string
}

type Actions = 'view details' | 'deactivate'

const ESTATEMANAGERDATA: EstateManager[] = Array.from({ length: 10 }).map(
    (_, i) => {
        return {
            id: `${i + 1}`,
            propertyCode: 'H09985',
            address: 'Blk.2, Flt. 3, Zone A',
            propertyCategory: 'Residential',
            propertyName: `Property ${i + 1}`,
            occupants: Math.floor(Math.random() * 122 + 100),
            RFID: 12331,
            accessCard: 8212,
            status: 'Active',
        }
    }
)

function EstateDetail() {
    //BEFORE
    // const [fetchedUsers, setFetchedUsers] = useState<EstateManager[] | null>([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setTimeout(() => {
    //             setFetchedUsers(ESTATEMANAGERDATA)
    //         }, 200)
    //     }
    //     fetchData()
    // }, [])

    //AFTER

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [fetchedEstateDetails, setFetchedEstateDetails] = useState<
        EstateManager[]
    >([])

    const fetchEstateDetails = () => {
        return AxiosRequest({
            dispatch,
            // url: '/admin/get/all',
            url: '/users',
        })
    }

    const {
        isLoading: get_estateDetails_loading,
        data: get_estateDetails_response,
        isError: get_estateDetails_isError,
        error: get_estateDetails_error,
        // isFetching: get_estateDetails_fetching,
    } = useQuery('estateDetails', fetchEstateDetails) as any

    useEffect(() => {
        if (get_estateDetails_response?.status === 200) {
            // setFetchedEstateDetails(get_estateDetails_response.data)
            console.log(get_estateDetails_response.data, 'fetchedData')
        }
    }, [get_estateDetails_response])

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
        slicedPages: EstateManager[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const perPage = 6
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetchedEstateDetails?.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: EstateManager[][] = []
        for (let i = 0; i < fetchedEstateDetails?.length; i += item) {
            slicedPages.push(fetchedEstateDetails?.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedEstateDetails?.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: EstateManager[][] = []
        for (
            let i = 0;
            i < fetchedEstateDetails?.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedEstateDetails?.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedEstateDetails])

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
            navigate(`/superAdmin/estateDetails/view/:${id}`)
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
        get_estateDetails_loading,
        get_estateDetails_isError,
        get_estateDetails_error,
        get_estateDetails_response,
    })

    if (get_estateDetails_loading) {
        return <p>Loading...</p>
    }

    if (get_estateDetails_isError) {
        return <p>{get_estateDetails_error.message}</p>
    }

    const estateDetailsLoaded =
        get_estateDetails_response.status === 200 &&
        get_estateDetails_response.data.length > 0

    return (
        <div className='estateDetail'>
            <div className='mt-8 grid gap-8'>
                <section className='bg-white rounded-lg p-8 grid h-[28rem] text-[1.4rem]'>
                    <div className='flex w-full justify-between'>
                        <p>Iba Housing Estate</p>
                        <p className='text-[#666869]'>
                            Joined:{' '}
                            <span className='text-black'>08 May, 2022</span>
                        </p>
                    </div>
                    <div className='overview flex justify-between'>
                        <OverviewCard
                            title='Residents'
                            number={18_000}
                            iconUrl='/icons/overview/residents.svg'
                            bgColor='bg-[#DDFCDC]'
                            textColor='text-[#1A8F56]'
                        />
                        <OverviewCard
                            title='Property'
                            number={4}
                            iconUrl='/icons/overview/property.svg'
                            bgColor='bg-[#F5F9FA]'
                            textColor='text-[#00C2FF]'
                        />
                        <OverviewCard
                            title='Household'
                            number={40}
                            iconUrl='/icons/overview/household2.svg'
                            bgColor='bg-[#FCF3FA]'
                            textColor='text-[#B6008E]'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Link
                            to={`/superAdmin/estates/detail/report/:4`}
                            className='text-[#0660FE] text-[1.4rem]'
                        >
                            View Estate Report
                        </Link>
                    </div>
                </section>
                <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                    <div className='grid text-[1.6rem]'>
                        <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-Satoshi-Medium'>
                                Estate List <span>(200)</span>
                            </p>
                            <div className='relative flex items-center'>
                                <img
                                    src='/icons/estateDetails/search.svg'
                                    alt=''
                                    className='absolute left-4 text-[4rem]'
                                />
                                <input
                                    type='text'
                                    placeholder='Search Parameters'
                                    className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                                />
                            </div>
                            <div className='relative flex items-center'>
                                <select className=' cursor-pointer w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'>
                                    <option hidden value=''>
                                        Sort By
                                    </option>
                                    <option value='date'>date</option>
                                    <option value='alpha'>Alpha</option>
                                </select>
                                <GrDown className='absolute right-4 text-[1.3rem]' />
                            </div>
                        </caption>

                        <div className='grid'>
                            <div
                                className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-8 gap-8'
                                style={{
                                    fontSize: '1.4rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input type='checkbox' />
                                    <p>Property Code</p>
                                </p>
                                <p>Address</p>
                                <p>Property Category</p>
                                <p>Property Name</p>
                                <p>Occupants</p>
                                <p>RFID</p>
                                <p>Access Card</p>
                                <p>Status</p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages &&
                                    slicedPages?.length > 0 &&
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            ({
                                                propertyCategory,
                                                propertyCode,
                                                propertyName,
                                                status,
                                                accessCard,
                                                address,
                                                RFID,
                                                occupants,
                                            }) => {
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-8 gap-8 '>
                                                        <p className='flex items-center gap-4'>
                                                            <input type='checkbox' />

                                                            <span>
                                                                {propertyCode}
                                                            </span>
                                                        </p>
                                                        <p>{address}</p>
                                                        <p>
                                                            {propertyCategory}
                                                        </p>
                                                        <p>{propertyName}</p>
                                                        <p>{occupants}</p>
                                                        <p>{RFID}</p>
                                                        <p>{accessCard}</p>
                                                        <p>{status}</p>
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
                </section>
            </div>
        </div>
    )
}

export default EstateDetail
