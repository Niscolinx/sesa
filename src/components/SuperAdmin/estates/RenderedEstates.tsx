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


import { Link } from 'react-router-dom'
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
    const dispatch = useAppDispatch()

    const [fetchedUsers, setFetchedUsers] = useState<Estate[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ESTATEDATA)
            }, 1000)
        }
        fetchData()
    }, [])

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
                <div className='renderedEstates__table'>
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
                                            <Link to={`/dashboard/estates/report/:${id}`}>
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
