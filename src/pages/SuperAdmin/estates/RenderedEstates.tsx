import React from 'react'
import { useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import {
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineDotsVertical,
} from 'react-icons/hi'
import { TbCurrencyNaira } from 'react-icons/tb'

import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/app/hooks'
import { setEstatePath } from '../../../store/features/routeChange'

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

const ESTATEDATA: Estate[] = [
    {
        id: '1',
        img: '/img/img1.png',
        details: {
            estateName: 'Iba Housing Estate',
            securityCompany: 'Proton',
            status: 'Active',

            estateBalance: 5000,
            NoOfResidents: 3400,
            signOutRequired: true,

            estateManager: 'Sladin Ama',
            NoOfHouseholds: 45,
        },
    },
    {
        id: '2',
        img: '/img/img2.png',
        details: {
            estateName: 'Iba Housing Estate',
            securityCompany: 'Proton',
            status: 'Active',

            estateBalance: 5000,
            NoOfResidents: 3400,
            signOutRequired: true,

            estateManager: 'Sladin Ama',
            NoOfHouseholds: 45,
        },
    },
    {
        id: '3',
        img: '/img/img3.png',
        details: {
            estateName: 'Iba Housing Estate',
            securityCompany: 'Proton',
            status: 'Active',

            estateBalance: 5000,
            NoOfResidents: 3400,
            signOutRequired: true,

            estateManager: 'Sladin Ama',
            NoOfHouseholds: 45,
        },
    },
]

function RenderedEstates() {


     const navigate = useNavigate()
     const dispatch = useAppDispatch()

     const [fetchedEstates, setFetchedEstates] = useState<IAdmin[]>([])
     const [sortBy, setSortBy] = useState<string | null>(null)

    

     const handleAddAdmin = () => {
         navigate('/superAdmin/admins/add')
     }

     const fetchAdmins = () => {
         return AxiosRequest({
             dispatch,
             // url: '/admin/get/all',
             url: '/users',
         })
     }

     const {
         isLoading: get_admins_loading,
         data: get_admins_response,
         isError: get_admins_isError,
         error: get_admins_error,
         // isFetching: get_admins_fetching,
     } = useQuery('admins', fetchAdmins) as any

     useEffect(() => {
         if (get_admins_response?.status === 200) {
             // setFetchedEstates(get_admins_response.data)
             console.log(get_admins_response.data, 'fetchedData')
         }
     }, [get_admins_response])

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
         slicedPages: IAdmin[][] | null
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

         const slicedPages: IAdmin[][] = []
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
         const slicedPages: IAdmin[][] = []
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
             navigate(`/superAdmin/admins/view/:${id}`)
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
         get_admins_loading,
         get_admins_isError,
         get_admins_error,
         get_admins_response,
     })

     if (get_admins_loading) {
         return <p>Loading...</p>
     }

     if (get_admins_isError) {
         return <p>{get_admins_error.message}</p>
     }

     const adminsLoaded =
         get_admins_response.status === 200 &&
         get_admins_response.data.length > 0

    const handlePathSwitch = () => {
        dispatch(setEstatePath('addEstate'))
    }



    return (
        <div className='renderedEstates'>
            <table className='renderedEstates__tableBox'>
                <caption className='renderedEstates__caption'>
                    <p className='caption__title'>
                        Estate List <span>(202)</span>
                    </p>
                    <div className='caption__searchBox'>
                        <img src='/icons/estates/search.svg' alt='' />
                        <input type='text' placeholder='Search Parameters' />
                    </div>
                    <div className='caption__select'>
                        <select>
                            <option hidden value=''>
                                Category
                            </option>
                            <option value='date'>date</option>
                            <option value='alpha'>Alpha</option>
                        </select>
                        <GrDown />
                    </div>
                    <button
                        className='btn addEstate__btn'
                        onClick={handlePathSwitch}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>Add Estate</p>
                    </button>
                </caption>
                <div className=''>
                    <tbody className='renderedEstates__table--body'>
                        {fetchedUsers && fetchedUsers.length > 0 ? (
                            React.Children.toArray(
                                fetchedUsers.map(
                                    ({
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
                                    }) => {
                                        return (
                                            <Link
                                                to={`/superAdmin/estates/detail/:${id}`}
                                            >
                                                <tr className='w-full'>
                                                    <td>
                                                        <img
                                                            src={img}
                                                            alt=''
                                                            className='table__img'
                                                        />
                                                    </td>

                                                    <td>
                                                        <div>
                                                            <p className='text-[1.4rem] text-[#043FA7]'>
                                                                Estate&nbsp;Name
                                                            </p>
                                                            <p className='font-[1.6rem] whitespace-nowrap'>
                                                                {estateName}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                Security Company
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
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                Estate Balance
                                                            </p>
                                                            <p className='flex items-center'>
                                                                <TbCurrencyNaira className='text-[2rem]' />
                                                                {estateBalance}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                No of Residents
                                                            </p>
                                                            <p>
                                                                {NoOfResidents}
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
                                                    </td>
                                                    <td className=' grid content-start'>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                Estate Manager
                                                            </p>
                                                            <p>
                                                                {estateManager}
                                                            </p>
                                                        </div>
                                                        <div className=' mt-10'>
                                                            <p className='text-[#043FA7]'>
                                                                {' '}
                                                                No of Households
                                                            </p>
                                                            <p>
                                                                {NoOfHouseholds}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td
                                                        className='flex items-start content-start mr-4'
                                                        style={{
                                                            width: '1rem',
                                                        }}
                                                    >
                                                        <button>
                                                            <HiOutlineDotsVertical className='text-[2rem]' />
                                                        </button>
                                                    </td>
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
                                                </tr>
                                            </Link>
                                        )
                                    }
                                )
                            )
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
                <footer className='renderedEstates__footer'>
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

export default RenderedEstates
