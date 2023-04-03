import React from 'react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { setAdminPath } from '../../../store/features/routeChange'
import { useAppDispatch } from '../../../store/app/hooks'

interface IAdmin {
    id: string
    name: string
    gender: string
    phoneNumber: string
    status: string
    onboardingDate: string
    imgUrl?: string
}

const ADMINDATA: IAdmin[] = [
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        imgUrl: '/img/avatar11.png',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
]

type Actions = 'view details' | 'edit details' | 'deactivate'

function RenderedAdmins() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [fetchedUsers, setFetchedUsers] = useState<IAdmin[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ADMINDATA)
            }, 200)
        }
        fetchData()
    }, [])

    const handlePathSwitch = () => {
        dispatch(setAdminPath('addAdmin'))
    }

    const [fetchedAdmins, setFetchedAdmins] = useState<IAdmin[]>([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedAdmins(ADMINDATA)
        }, 100)
    }, [])

    const actions = [
        'view details',
        'edit details',
        'deactivate',
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

    //const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IAdmin[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const perPage = 6
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetchedAdmins.length / perPage),
        slicedPages: null,
    })

    // const handleSelectedSort = (item: SortBy) => {
    //     setToggleSortMenu(false)
    // }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IAdmin[][] = []
        for (let i = 0; i < fetchedAdmins.length; i += item) {
            slicedPages.push(fetchedAdmins.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedAdmins.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: IAdmin[][] = []
        for (let i = 0; i < fetchedAdmins.length; i += paginate.itemsPerPage) {
            slicedPages.push(fetchedAdmins.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedAdmins])

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
            navigate(`/superAdmin/admins/view/:${id}`)
        }

        if (item === 'edit details') {
            navigate(`/superAdmin/admins/edit/:${id}`)
        }

        if (item === 'deactivate') {
            openDialog()
        }
    }

    const handleDeactivateArtisan = () => {
        closeDialog()

        toast('Artisan deactivated successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }

    ;<caption className='renderedAdmins__caption'>
        <p className='caption__title'>
            Admin List <span>(200)</span>
        </p>
        <div className='caption__searchBox'>
            <img src='/icons/admins/search.svg' alt='' />
            <input type='text' placeholder='Search Parameters' />
        </div>
        <div className='caption__select'>
            <select>
                <option hidden value=''>
                    Sort By
                </option>
                <option value='date'>date</option>
                <option value='alpha'>Alpha</option>
            </select>
            <GrDown />
        </div>
        <button className='btn admins__btn' onClick={handlePathSwitch}>
            <span>
                <IoMdAdd />
            </span>{' '}
            <p>Add Admin</p>
        </button>
    </caption>
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
                        <p>Are you sure you want to deactivate this admin?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-500 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                <>
                    <div className='grid text-[1.6rem]'>
                        <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                Admin List <span>(10)</span>
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
                            <div className='relative flex items-center'>
                                <select>
                                    <option hidden value=''>
                                        Sort By
                                    </option>
                                    <option value='date'>date</option>
                                    <option value='alpha'>Alpha</option>
                                </select>
                            </div>
                            <button
                                className='btn admins__btn ml-auto'
                                onClick={handlePathSwitch}
                            >
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                <p>Add Admin</p>
                            </button>
                        </div>

                        <div className='grid bg-white'>
                            <div
                                className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-6 items-center gap-8'
                                style={{
                                    fontSize: '1.4rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <p> Name</p>
                                </p>
                                <p>Gender</p>
                                <p>Phone Number</p>
                                <p>joined Date</p>
                                <p>Status</p>
                                <p>Actions</p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            (
                                                {
                                                    phoneNumber,
                                                    id,
                                                    gender,
                                                    name,
                                                    onboardingDate,
                                                    status,
                                                    imgUrl,
                                                },
                                                i
                                            ) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-6 items-center gap-8 text-[1.6rem] py-4'>
                                                        <div className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <div className='flex items-center gap-2'>
                                                                {imgUrl && (
                                                                    <img
                                                                        src={
                                                                            imgUrl
                                                                        }
                                                                        alt=''
                                                                        className='w-[3.5rem] h-[h-3.5rem] rounded-full object-cover'
                                                                    />
                                                                )}

                                                                <p className='min-w-[30rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                                    {name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p>{gender}</p>
                                                        <p>{phoneNumber}</p>
                                                        <p>{onboardingDate}</p>

                                                        <p>
                                                            {status ===
                                                            'Active' ? (
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
            </div>
        </>
    )
}

export default RenderedAdmins
