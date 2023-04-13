import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderedEstates, { ESTATEDATA } from './RenderedEstates'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import React from 'react'
import {
    HiOutlineDotsVertical,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from 'react-icons/hi'
import { TbCurrencyNaira } from 'react-icons/tb'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import useAxios from '../../../components/hooks/useAxios'

type Estate = {
    id: string
    image: string

    estate_name: string
    security_company: any
    status: number

    wallet: {
        balance: number
    }
    resident_count: number
    signOutRequired: boolean

    estate_manager: any
    household_count: number
}

function Estates() {
    type Actions = 'view details' | 'deactivate'

    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [fetchedEstates, setFetchedEstates] = useState<Estate[]>([])
    const [sortBy, setSortBy] = useState<string>('')
    const [estateId, setEstateId] = useState('')

    const handleAddEstate = () => {
        navigate('/superAdmin/estates/add')
    }

    const fetchEstates = () => {
        return axiosInstance({
            url: '/estate/getall',
        }).then(({ data }) => data)
    }

    const {
        isLoading: get_estates_loading,
        data: get_estates_response,
        isError: get_estates_isError,
        error: get_estates_error,
        // isFetching: get_estates_fetching,
    } = useQuery('estates', fetchEstates) as any

      const postRequest = () => {
        

        
          return axiosInstance({
              url: '/estate/change/status',
              method: 'post',
              data: { estate_id: estateId },
          })
      }

      const { mutate, isLoading } = useMutation(postRequest, {
          onSuccess: (data) => {
              if ((data as any).success) {
                  closeDialog()
                  const messageTitle = title
                      .replace(/([a-z])([A-Z])/g, '$1 $2')
                      .replace(/^\w/, (c) => c.toUpperCase())

                  const type = isDialogOpen?.type

                  toast(`${messageTitle} ${type + 'd'} successfully`, {
                      type: 'success',
                      className: 'bg-green-100 text-green-600 text-[1.4rem]',
                  })
              }
          },
      })

    useEffect(() => {
        if (get_estates_response) {
            console.log(get_estates_response.data)
            setFetchedEstates(get_estates_response.data)
        }
    }, [get_estates_response])

    const actions = ['view details'] satisfies Actions[]

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

        toast('Estate deactivated successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    if (get_estates_loading) {
        return <p>Loading...</p>
    }

    if (get_estates_isError) {
        return <p>{get_estates_error.message}</p>
    }

    const fetched = get_estates_response?.data

    return (
        <div>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 relative'>
                        
                            <>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />
                                <p>
                                    Are you sure you want to deactivate this{' '}
                                    <span className='capitalize'>
                                        Estate ?
                                    </span>
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={closeDialog}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-500 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                        onClick={() => mutate()}
                                    >
                                        {isLoading
                                            ? 'Loading...'
                                            : 'deactivate'}
                                    </button>
                                </div>
                            </>
                        
                    </div>
                </section>
            </dialog>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {fetched.length > 0 ? (
                    <div className='grid text-[1.6rem] rounded-lg mt-[3rem]'>
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
                        <div className='grid gap-8 mt-8'>
                            {slicedPages &&
                                slicedPages?.length > 0 &&
                                React.Children.toArray(
                                    slicedPages[paginate.index].map(
                                        (
                                            {
                                                image,
                                                id,

                                                wallet: { balance },
                                                estate_manager,
                                                estate_name,
                                                household_count,
                                                resident_count,
                                                security_company,
                                                status,
                                            },
                                            i
                                        ) => {
                                            const { isDropDownOpen, index } =
                                                toggleDropDown
                                            return (
                                                <div className='w-full flex gap-4 justify-between border-gray-100 bg-white p-8 rounded-lg capitalize'>
                                                    <div>
                                                        <img
                                                            src={image}
                                                            alt=''
                                                            className='table__img'
                                                        />
                                                    </div>

                                                    <div className='grid gap-4'>
                                                        <div>
                                                            <p className='text-[1.4rem] text-[#043FA7]'>
                                                                Estate&nbsp;Name
                                                            </p>
                                                            <p className='font-[1.6rem] whitespace-nowrap'>
                                                                {estate_name}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                Security Company
                                                            </p>
                                                            <p>
                                                                {
                                                                    security_company
                                                                        .user
                                                                        .name
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                Status
                                                            </p>
                                                            <p>
                                                                {status ===
                                                                1 ? (
                                                                    <span className='text-green-600'>
                                                                        active
                                                                    </span>
                                                                ) : (
                                                                    <span className='text-red-600'>
                                                                        inactive
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='grid'>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                Estate Balance
                                                            </p>
                                                            <p className='flex items-center'>
                                                                <TbCurrencyNaira className='text-[2rem]' />
                                                                {balance}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                No of Residents
                                                            </p>
                                                            <p>
                                                                {resident_count}
                                                            </p>
                                                        </div>
                                                        {/* <div>
                                                            <p className='text-[#043FA7]'>
                                                                Sign Out
                                                                Required
                                                            </p>
                                                            <p>
                                                                {signOutRequired
                                                                    ? 'Yes'
                                                                    : 'No'}
                                                            </p>
                                                        </div> */}
                                                    </div>
                                                    <div className=' grid content-start'>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                Estate Manager
                                                            </p>
                                                            <p>
                                                                {
                                                                    estate_manager
                                                                        .user
                                                                        .name
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className=' mt-10'>
                                                            <p className='text-[#043FA7]'>
                                                                {' '}
                                                                No of Households
                                                            </p>
                                                            <p>
                                                                {
                                                                    household_count
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
                                                                    (prev) => {
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
                                                            onChange={(e) =>
                                                                dropDownHandler(
                                                                    e,
                                                                    i
                                                                )
                                                            }
                                                        />

                                                        {isDropDownOpen &&
                                                            index === i && (
                                                                <div className='absolute top-0 translate-x-[-10rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                                                    {[
                                                                        ...actions,
                                                                        status ===
                                                                        1
                                                                            ? 'deactivate'
                                                                            : 'activate',
                                                                    ].map(
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
                                                                                        item as Actions,
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
                                                                                ) : item ===
                                                                                  'activate' ? (
                                                                                    <span className='text-green-600'>
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
