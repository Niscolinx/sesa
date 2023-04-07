import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import useAxios from '../../../components/hooks/useAxios'
import { Select } from '../../../components/SuperAdmin/UI/Select'

export interface ResidentPackageList {
    id: string

    package_name: string
    frequency: string
    price: number
    status: string
}

interface ResponseData {
    fetched: []
}

const ResidentPackageList: FC<ResponseData> = ({ fetched }) => {
    type Actions = 'view details' | 'activate' | 'deactivate' | 'delete'

    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string | null>(null)
    const [packageId, setPackageId] = useState('')

    const postDeactivate = () => {
        return axiosInstance({
            url: '/admin/resident/user/package/changestatus',
            method: 'post',
            data: { id: packageId },
        })
    }

    const {
        mutate: deactivate_package_mutation,
        isLoading: deactivate_package_loading,
    } = useMutation(postDeactivate, {
        onSuccess: () => {
            closeDialog()

            toast('Package deactivated successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
        },
    }) as any

    const actions = [
        'view details',
        'activate',
        'deactivate',
        'delete',
    ] satisfies Actions[]

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
        slicedPages: ResidentPackageList[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const perPage = 6
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetched?.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ResidentPackageList[][] = []
        for (let i = 0; i < fetched?.length; i += item) {
            slicedPages.push(fetched?.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetched?.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ResidentPackageList[][] = []
        for (let i = 0; i < fetched?.length; i += paginate.itemsPerPage) {
            slicedPages.push(fetched?.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(fetched?.length / perPage),
            }
        })
    }, [])

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
            navigate(`/superAdmin/resident-user-package/view/:${id}`)
        }

        if (item === 'deactivate') {
            setPackageId(id)
            openDialog()
        }
    }

    const deactivateHandler = () => {
        closeDialog()

        toast('Package deactivated successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const handlePathSwitch = () => {
        navigate('/superAdmin/resident-user-package/add')
    }

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img
                            src='/icons/admins/modalWarning.svg'
                            alt=''
                            className='animate__animated animate__pulse '
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>Are you sure you want to deactivate this Package?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-500 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                onClick={() => deactivate_package_mutation()}
                            >
                                {deactivate_package_loading
                                    ? 'Loading...'
                                    : 'deactivate'}
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>

            <div className='grid text-[1.6rem]'>
                <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-Satoshi-Medium'>
                        Package List <span>({fetched.length})</span>
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
                        onClick={handlePathSwitch}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>Add Package</p>
                    </button>
                </div>

                <div className='grid bg-white'>
                    <div
                        className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-5 items-center gap-8'
                        style={{
                            fontSize: '1.4rem',
                        }}
                    >
                        <p className='flex items-center gap-2'>
                            <input type='checkbox' className='cursor-pointer' />
                            <p>Package Name</p>
                        </p>
                        <p>Frequency</p>
                        <p>Price</p>
                        <p>Status</p>
                        <p>Actions</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        {slicedPages &&
                            slicedPages?.length > 0 &&
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    (
                                        {
                                            id,
                                            package_name,
                                            frequency,
                                            price,
                                            status,
                                        },
                                        i
                                    ) => {
                                        const { isDropDownOpen, index } =
                                            toggleDropDown
                                        return (
                                            <div className='grid justify-between border-b grid-cols-5 items-center gap-8 text-[1.6rem] py-4 table__ellipsis'>
                                                <div className='flex items-center gap-4  '>
                                                    <input
                                                        type='checkbox'
                                                        className='cursor-pointer'
                                                    />

                                                    <p>{package_name}</p>
                                                </div>
                                                <p>{frequency}</p>
                                                <div className='flex items-center'>
                                                    <img
                                                        src='/icons/Naira.svg'
                                                        alt='naira'
                                                    />

                                                    <p>{price}</p>
                                                </div>

                                                <p>
                                                    {status === 'active' ? (
                                                        <span className='text-green-600'>
                                                            {status}
                                                        </span>
                                                    ) : (
                                                        <span className='text-red-500'>
                                                            {status}
                                                        </span>
                                                    )}
                                                </p>
                                                <div className='relative'>
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
                                                                i
                                                            )
                                                        }
                                                    />

                                                    {isDropDownOpen &&
                                                        index === i && (
                                                            <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
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
        </>
    )
}

export default ResidentPackageList
