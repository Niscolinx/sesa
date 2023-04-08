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

import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/app/hooks'
import useAxios from '../../../components/hooks/useAxios'
import { useMutation, useQuery } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'

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

export const SECURITYCOMPANYDATA: SecurityCompany[] = [
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

export type Actions = 'view details' | 'activate' | 'deactivate'

const actions: Array<Actions> = ['view details', 'activate', 'deactivate']

function RenderedSecurityCompanies() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [fetchedSecurityCompanies, setFetchedSecurityCompanies] = useState<
        SecurityCompany[] | null
    >([])

    const [securityCompanyId, setSecurityCompanyId] = useState('')

    const postDeactivateSecurityCompany = () => {
        return axiosInstance({
            url: '/change/user/status',
            method: 'post',
            data: { user_id: securityCompanyId },
        })
    }

    const fetchSecurityCompanies = () => {
        return axiosInstance({
            // url: '/admin/get/all',
            url: '/manager/get/all',
        })
    }

    const {
        mutate: deactivate_securityCompany_mutation,
        isLoading: deactivate_securityCompany_loading,
    } = useMutation(postDeactivateSecurityCompany, {
        onSuccess: (data) => {
            if ((data as any).success as any) {
                closeDialog()

                toast('Estate Manager deactivated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            } else {
                console.log({ data }, 'failed')
            }
        },
    })
    const {
        isLoading: get_securityCompanies_loading,
        isError: get_securityCompanies_isError,
        error: get_securityCompanies_error,
        data: get_securityCompanies_response,
    } = useQuery('securityCompanies', fetchSecurityCompanies, {}) as any

    useEffect(() => {
        if (get_securityCompanies_response) {
            setFetchedSecurityCompanies(SECURITYCOMPANYDATA)
            //  setFetchedSecurityCompanies(get_securityCompanies_response.data.data)
        }
    }, [get_securityCompanies_response])

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

    const handlePathSwitch = () => {
        navigate('/superAdmin/security-company/add')
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

    const handleSelectedAction = (item: string, id: string) => {

        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'View Details') {
            console.log('view')
            navigate(`/superAdmin/security-company/view/:${id}`)
        }

        if (item === 'Deactivate') {
            setSecurityCompanyId(id)
            openDialog()
        }
    }

    if (get_securityCompanies_loading) {
        return <p>Loading...</p>
    }

    if (get_securityCompanies_isError) {
        return <p>{get_securityCompanies_error.message}</p>
    }

   

    const fetched = get_securityCompanies_response?.data.data

    return (
        <div className='w-full grid item rounded-lg'>
             {/* {fetched.length > 0 ? (
                    <>
                        <ToastContainer />
            <div className='grid gap-10'>
                <dialog className='dialog' ref={dialogRef}>
                    <section className='grid place-content-center w-full h-[100vh]'>
                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                            <p>
                                Are you sure you want to deactivate this
                                security company?
                            </p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => closeDialog()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                    onClick={() => deactivate_securityCompany_mutation()}
                                >
                                    {deactivate_securityCompany_loading ? 'Loading...' : 'deactivate'}
                                </button>
                            </div>
                        </div>
                    </section>
                </dialog>
                <div className='flex w-full justify-between items-center gap-12 p-8 bg-color-white rounded-lg'>
                    <p className='text-[1.6rem] font-Satoshi-Medium'>
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
                        {slicedPages &&
                                            slicedPages?.length > 0 &&
                                            React.Children.toArray(
                                                slicedPages[paginate.index].map(
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
                                                                            'activate' ? (
                                                                                <span className='text-green-600'>
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </span>
                                                                            ) : item ===
                                                                              'deactivate' ? (
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
                       }
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
            </>): (
                <>
                
                </>
            )} */}
        </div>
    )
}

export default RenderedSecurityCompanies
