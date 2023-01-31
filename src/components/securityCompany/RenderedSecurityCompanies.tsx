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

import { useAppDispatch } from '../../store/app/hooks'
import { setSecurityCompanyPath } from '../../store/features/routeChange'
import { Link } from 'react-router-dom'

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
            CompanyAddress: '04, Wright Avenue Lagos,Nigeria',
            walletBalance: 5000,
            joinedDate: new Date(),
            NoOfGuards: 3400,
            status: 'Active',

        },
    },
    {
        id: '2',
        img: '/img/security/img2.png',
        details: {
            companyName: 'Proton Security',
            CompanyAddress: '04, Wright Avenue Lagos,Nigeria',
            walletBalance: 5000,
            joinedDate: new Date(),
            NoOfGuards: 3400,
            status: 'Active',

        },
    },
    {
        id: '3',
        img: '/img/security/img3.png',
        details: {
            companyName: 'Proton Security',
            CompanyAddress: '04, Wright Avenue Lagos,Nigeria',
            walletBalance: 5000,
            joinedDate: new Date(),
            NoOfGuards: 3400,
            status: 'Active',

        },
    },

]

function RenderedSecurityCompanies() {
    const dispatch = useAppDispatch()

    const [fetchedSecurityCompanies, setFetchedSecurityCompanies] = useState<SecurityCompany[] | null>([])

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

    return (
        <div className='w-full grid item rounded-lg'>
            <div
                className='grid text-[1.6rem] gap-10'
                style={{
                    fontFamily: 'Satoshi-Regular',
                }}
            >
                <caption className='flex w-full justify-between items-center gap-12 p-8 bg-color-white rounded-lg'>
                    <p className='text-[1.6rem] font-bold'>
                        SecurityCompany List <span>(202)</span>
                    </p>
                    <div className='relative flex items-center'>
                        <img src='/icons/admins/search.svg' alt='' className='absolute left-4' />
                        <input type='text' placeholder='Search Parameters' className='pl-16 w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none' />
                    </div>
                    <div className='relative flex items-center'>
                        <select className='cursor-pointer w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'>
                            <option hidden value=''>
                                Category
                            </option>
                            <option value='date'>date</option>
                            <option value='alpha'>Alpha</option>
                        </select>
                        <GrDown className='absolute right-4 text-[1.3rem]'/>
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
                </caption>
                <div className='w-full'>
                    <div className='grid gap-8 '>
                        {fetchedSecurityCompanies &&
                        fetchedSecurityCompanies.length > 0 ? (
                            React.Children.toArray(
                                fetchedSecurityCompanies.map(
                                    ({
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
                                    }) => {
                                        return (
                                            <Link
                                                to={`/dashboard/security-companies/:${id}`}
                                            >
                                                <div className='p-8 flex bg-white border border-color-grey rounded-lg ' style={{
                                                    justifyContent: 'repeat(4, minmax(min-content, 1fr))',
                                                }}>
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
                                                                {
                                                                    companyName
                                                                }
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
                                                        
                                                    </div>
                                                    <div className='w-full py-8 grid items-start gap-4 '>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                SecurityCompany
                                                                Balance
                                                            </p>
                                                            <p className='flex items-center'>
                                                                <TbCurrencyNaira className='text-[2rem]' />
                                                                {
                                                                    securityCompanyBalance
                                                                }
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
                                                    </div>
                                                   <div className='w-full py-8 grid items-start gap-4  content-start'>
                                                        <div>
                                                            <p className='text-[#043FA7]'>
                                                                SecurityCompany
                                                                Manager
                                                            </p>
                                                            <p>
                                                                {
                                                                    securityCompanyManager
                                                                }
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
                                                    </div>

                                                    <div
                                                        className='flex items-start content-start mr-4'
                                                        style={{
                                                            width: '1rem',
                                                        }}
                                                    >
                                                        <button>
                                                            <HiOutlineDotsVertical className='text-[2rem]' />
                                                        </button>
                                                    </div>
                                                </div>
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
                    </div>
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
            </div>
        </div>
    )
}

export default RenderedSecurityCompanies
