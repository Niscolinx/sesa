import React, { useRef } from 'react'
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

import { useAppDispatch } from '../../store/app/hooks'
import { setSecurityCompanyPath } from '../../store/features/routeChange'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

type SecurityCompanyDetails = {
    companyName: string
    CompanyAddress: string

    walletBalance: number
    joinedDate: Date

    NoOfGuards: number
    status: string
}

type SecurityCompany = {
    id: string
    img: string

    details: SecurityCompanyDetails
}

const SECURITYCOMPANYDATA: SecurityCompany[] = [
    {
        id: '1',
        img: '/img/security/img1.png',
        details: {
            companyName: 'Proton Security',
            CompanyAddress: '04, Wright Avenue Lagos, Nigeria',
            walletBalance: 5000,
            joinedDate: new Date(),
            NoOfGuards: 3400,
            status: 'active',
        },
    },
    {
        id: '2',
        img: '/img/security/img2.png',
        details: {
            companyName: 'Proton Security',
            CompanyAddress: '04, Wright Avenue Lagos, Nigeria',
            walletBalance: 5000,
            joinedDate: new Date(),
            NoOfGuards: 3400,
            status: 'active',
        },
    },
    {
        id: '3',
        img: '/img/security/img3.png',
        details: {
            companyName: 'Proton Security',
            CompanyAddress: '04, Wright Avenue Lagos, Nigeria',
            walletBalance: 5000,
            joinedDate: new Date(),
            NoOfGuards: 3400,
            status: 'active',
        },
    },
]

export type Actions = 'View Details' | 'Activate' | 'Deactivate'

function RenderedSecurityCompanies() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [fetchedSecurityCompanies, setFetchedSecurityCompanies] = useState<
        SecurityCompany[] | null
    >([])

    
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
                index
            }
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedSecurityCompanies(SECURITYCOMPANYDATA)
            }, 1000)
        }
        fetchData()
    }, [])

    
    const handlePathSwitch = () => {
        dispatch(setSecurityCompanyPath('addSecurityCompany'))
    }

    

     const dialogRef = useRef<HTMLDialogElement | null>(null)

     const handleClose = () => {
         if (dialogRef.current) {
             dialogRef.current.close()
         }
     }

     const handleOpen = () => {
         
         if (dialogRef.current) {
             dialogRef.current.showModal()
         }
     }

     const handleRouteChange = () => {
         handleClose()
     }

     const handleSelectedAction = (item: string, index: string) => {
         console.log({ item, index })

         setToggleDropDown(() => {
             return {
                 isDropDownOpen: false,
                 index: null,
             }
         })

         if (item === 'View Details') {
             navigate(`/dashboard/security-company/:${index}`)
         }

         if (item === 'Deactivate') {
             handleOpen()
         }
     }


    const actions: Array<Actions> = ['View Details', 'Activate', 'Deactivate']

    return (
        <div className='w-full grid item rounded-lg'>
            <div
                className='grid text-[1.6rem] gap-10'
                style={{
                    fontFamily: 'Satoshi-Regular',
                }}
            >
                <dialog className='dialog' ref={dialogRef}>
                    <section className='grid place-content-center w-full h-[100vh]'>
                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                            <p>Are you sure you want to deactivate this security company?</p>

                            <div className='flex w-full justify-center gap-8'>
                                <button className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'>
                                    Cancel
                                </button>
                                <button
                                    className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={handleRouteChange}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </section>
                </dialog>
                <div className='flex w-full justify-between items-center gap-12 p-8 bg-color-white rounded-lg'>
                    <p className='text-[1.6rem] font-bold'>
                        SecurityCompany List <span>(202)</span>
                    </p>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/admins/search.svg'
                            alt=''
                            className='absolute left-4'
                        />
                        <input
                            type='text'
                            placeholder='Search Parameters'
                            className='pl-16 w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'
                        />
                    </div>
                    <div className='relative flex items-center'>
                        <select className='cursor-pointer w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'>
                            <option hidden>Category</option>
                            <option>date</option>
                            <option>Alpha</option>
                        </select>
                        <GrDown className='absolute right-4 text-[1.3rem]' />
                    </div>
                    <button
                        className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8'
                        onClick={handlePathSwitch}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>Add Company</p>
                    </button>
                </div>
                <div className='w-full'>
                    <div className='grid gap-8 '>
                        {fetchedSecurityCompanies &&
                        fetchedSecurityCompanies.length > 0 ? (
                            React.Children.toArray(
                                fetchedSecurityCompanies.map(
                                    (
                                        {
                                            img,
                                            id,
                                            details: {
                                                companyName,
                                                CompanyAddress,
                                                walletBalance,
                                                joinedDate,
                                                NoOfGuards,
                                                status,
                                            },
                                        },
                                        i
                                    ) => {
                                        const { isDropDownOpen, index } =
                                            toggleDropDown
                                        return (
                                            <div
                                                className='p-8 flex bg-white border border-color-grey rounded-lg '
                                                style={{
                                                    justifyContent:
                                                        'repeat(4, minmax(min-content, 1fr))',
                                                }}
                                            >
                                                <div className='w-full py-8 grid items-start gap-4 '>
                                                    <img
                                                        src={img}
                                                        alt=''
                                                        className='w-[21rem] h-[18rem] object-cover rounded-lg'
                                                    />
                                                </div>
                                                <div className='w-full py-8 grid items-start gap-4 '>
                                                    <div>
                                                        <p className='text-[1.4rem] text-[#043FA7]'>
                                                            Name
                                                        </p>
                                                        <p className='font-[1.6rem] whitespace-nowrap'>
                                                            {companyName}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className='text-[#043FA7]'>
                                                            Address
                                                        </p>
                                                        <address className='not-italic max-w-[20rem]'>
                                                            {CompanyAddress}
                                                        </address>
                                                    </div>
                                                </div>
                                                <div className='w-full py-8 grid items-start gap-4 '>
                                                    <div>
                                                        <p className='text-[#043FA7]'>
                                                            Wallet Balance
                                                        </p>
                                                        <p className='flex items-center'>
                                                            <TbCurrencyNaira className='text-[2rem]' />
                                                            {walletBalance.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className='text-[#043FA7]'>
                                                            Joined Date
                                                        </p>
                                                        <p>
                                                            {joinedDate.toLocaleDateString(
                                                                undefined,
                                                                {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='w-full py-8 grid items-start gap-4  content-start'>
                                                    <div>
                                                        <p className='text-[#043FA7]'>
                                                            No of Security
                                                            Guards
                                                        </p>
                                                        <p>{NoOfGuards}</p>
                                                    </div>
                                                    <div className=' mt-10'>
                                                        <p className='text-[#043FA7]'>
                                                            Status
                                                        </p>
                                                        <p>
                                                            {status ===
                                                            'active' ? (
                                                                <span className=' text-color-green-light'>
                                                                    Active
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    Deactivated
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

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
                                                        <button>
                                                            <HiOutlineDotsVertical className='text-[2rem]' />
                                                        </button>
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
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handleSelectedAction(
                                                                                    item,
                                                                                    id
                                                                                )
                                                                            }
                                                                        >
                                                                            {item ===
                                                                            'Activate' ? (
                                                                                <span className='text-green-600'>
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </span>
                                                                            ) : item ===
                                                                              'Deactivate' ? (
                                                                                <span className='text-red-600'>
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </span>
                                                                            ) : (
                                                                                item
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
                            <div className='relative'>
                                <div className='absolute w-full grid place-content-center'>
                                    <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <footer className='flex items-center p-8 mt-8 bg-white rounded-lg'>
                    <div className='flex gap-8 items-center'>
                        <p>View</p>
                        <div className='flex items-center border px-4 rounded-lg'>
                            <input
                                type='number'
                                className='w-8 outline-none border-none cursor-pointer'
                                defaultValue={6}
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
            </div>
        </div>
    )
}

export default RenderedSecurityCompanies
