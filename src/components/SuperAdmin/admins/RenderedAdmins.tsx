import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useAppDispatch } from '../../../store/app/hooks'
import { setAdminPath } from '../../../store/features/routeChange'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

interface IAdmin{
    id: string
    name: string
    gender: string
    phoneNumber: string
    status: string
    onboardingDate: string
}

const ADMINDATA: IAdmin[] = [
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
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
]

type Actions = 'View Details'


function RenderedAdmins() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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


    const [fetchedAdmins, setFetchedAdmins] = useState<
        IAdmin[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedAdmins(ADMINDATA)
        }, 100)
    }, [])

    const actions = ['View Details'] satisfies Actions[]

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
        for (
            let i = 0;
            i < fetchedAdmins.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedAdmins.slice(i, i + paginate.itemsPerPage)
            )
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

    const addArtisan = () => {
        navigate('/superAdmin/artisan/add')
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    // const handleOpen = (dialogType: Actions) => {
    //     if (dialogType === 'Deactivate') {
    //         setDialogType('Deactivate')
    //     }
    //     if (dialogType === 'Delete') {
    //         setDialogType('Delete')
    //     }

    //     if (dialogRef.current) {
    //         dialogRef.current.showModal()
    //     }
    // }

    const handleSelectedAction = (item: Actions, id: string) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'View Details') {
            navigate(`/estateManager/artisan/view/:${id}`)
        }

        // if (item === 'Deactivate') {
        //     handleOpen('Deactivate')
        // }

        // if (item === 'Delete') {
        //     handleOpen('Delete')
        // }
    }

    const handleDeleteArtisan = () => {
        handleClose()

        toast('Artisan deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
    const handleDeactivateArtisan = () => {
        handleClose()

        toast('Artisan deactivated successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }


    return (
        <div className='renderedAdmins'>
            <table className='renderedAdmins__tableBox'>
                <caption className='renderedAdmins__caption'>
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
                    <button
                        className='btn admins__btn'
                        onClick={handlePathSwitch}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>Add Admin</p>
                    </button>
                </caption>
                <div className='renderedAdmins__table'>
                    <thead className='renderedAdmins__table--head'>
                        <tr>
                            <th>
                                <input type='checkbox' />
                                <p>Name</p>
                            </th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='renderedAdmins__table--body'>
                        {fetchedUsers && fetchedUsers.length > 0 ? (
                            fetchedUsers.map((value, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <input type='checkbox' />
                                            <img src='/img/me.jpeg' alt='' />
                                            <span>{value.name}</span>
                                        </td>
                                        <td>{value.gender}</td>
                                        <td>{value.phoneNumber}</td>
                                        <td>{value.onboardingDate}</td>
                                        <td>{value.status}</td>
                                        <td>
                                            <button>
                                                <img
                                                    src='/icons/admins/threeDots.svg'
                                                    alt=''
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td className='relative'>
                                    <div className='absolute w-full grid place-content-center'>
                                        <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </div>
                <footer className='renderedAdmins__footer'>
                    <div className='flex gap-8 items-center'>
                        <p>View</p>
                        <div className='flex items-center border px-4 rounded-lg'>
                            <input
                                type='number'
                                className='w-8 outline-none border-none cursor-pointer'
                                value={6}
                            />
                            <GrDown className='text-[1.3rem]' />
                        </div>
                        <p className='text'>List per page</p>
                    </div>
                    <ul className='flex items-center gap-5 ml-10'>
                        <HiOutlineChevronLeft />
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            1
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            2
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            3
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            4
                        </li>
                        <HiOutlineChevronRight />
                    </ul>
                </footer>
            </table>
        </div>
    )
}

export default RenderedAdmins
