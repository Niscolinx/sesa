import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'

import { Link, useNavigate } from 'react-router-dom'
import OverviewCard from '../../../../components/SuperAdmin/overview/OverviewCard'
import { OverviewWallet } from '../../../../components/SuperAdmin/overview/OverviewWallets'

export interface Overview {
    id: number
    guardName: string
    guardCode: number
    phoneNumber: number
    kyc: 'Validated' | 'NotValidated'
}

export const SECURITY_GUARDS: Overview[] = [
    {
        id: 1,
        guardName: 'John Doe',
        guardCode: 123456,
        phoneNumber: 08023238423,
        kyc: 'Validated',
    },
    {
        id: 2,
        guardName: 'Samuel Eky',
        guardCode: 123456,
        phoneNumber: 08023238423,
        kyc: 'Validated',
    },
    {
        id: 3,
        guardName: 'Kingsley Bush',
        guardCode: 123456,
        phoneNumber: 08023238423,
        kyc: 'Validated',
    },
    {
        id: 4,
        guardName: 'Innocent Eze',
        guardCode: 123456,
        phoneNumber: 08023238423,
        kyc: 'Validated',
    },
]

function ViewEstate() {
    const navigate = useNavigate()

    const [securityGuards, setSecurityGuards] = useState<Overview[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            setSecurityGuards(SECURITY_GUARDS)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Overview[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(securityGuards.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Overview[][] = []
        for (let i = 0; i < securityGuards.length; i += item) {
            slicedPages.push(securityGuards.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(securityGuards.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Overview[][] = []
        for (let i = 0; i < securityGuards.length; i += paginate.itemsPerPage) {
            slicedPages.push(securityGuards.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    securityGuards.length / paginate.itemsPerPage
                ),
            }
        })
    }, [securityGuards])

    const handleNext = () => {
        console.log(paginate.currentPage, paginate.totalPage)
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

    const addSOSHandler = () => {
        navigate('/superAdmin/platformSettings/addSOS')
    }

    const detailsHandler = (id: number) => {
        // navigate(`/superAdmin/platformSettings/SOSDetails/${id}`)
        alert('navigate' + id)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        const filtered = SECURITY_GUARDS.filter((item) =>
            item.guardName.toLowerCase().includes(value.toLowerCase())
        )
        setSecurityGuards([...filtered])
    }

    return (
        <div className='estateDetail'>
            <h1 className='heading2'>Estates</h1>
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
                            to={`/dashboard/estates/detail/:4`}
                            className='text-[#0660FE] text-[1.4rem]'
                        >
                            View Estate Report
                        </Link>
                    </div>
                </section>

                <section className='bg-color-white rounded-lg border min-w-[112rem]'>
                    <div className='grid text-[1.6rem] border rounded-lg'>
                        <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                Security Guards <span>(200)</span>
                            </p>
                            <div className='relative flex items-center'>
                                <img
                                    src='/icons/admins/search.svg'
                                    alt=''
                                    className='absolute left-4 text-[4rem]'
                                />
                                <input
                                    type='text'
                                    value={search}
                                    onChange={handleSearch}
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
                        </div>

                        <div className='grid bg-white'>
                            <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-4 gap-8 text-[1.6rem]'>
                                <p className='flex items-center gap-4'>
                                    <input
                                        type='checkbox'
                                        name='sos'
                                        id='sos'
                                        className='cursor-pointer'
                                    />
                                    <label htmlFor='sos'>Guard Name</label>
                                </p>
                                <p>Guard Code</p>
                                <p>Phone Number</p>
                                <p>KYC</p>
                                <p>Actions</p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            ({
                                                id,
                                                guardName,
                                                guardCode,
                                                phoneNumber,
                                                kyc,
                                            }) => {
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-4 items-center gap-8 '>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />
                                                            <label htmlFor='file'>
                                                                {guardName}
                                                            </label>
                                                        </p>
                                                        <p>{guardCode}</p>
                                                        <p>{phoneNumber}</p>
                                                        <p>
                                                            {kyc ===
                                                            'Validated' ? (
                                                                <span className='text-green-600'>
                                                                    {kyc}
                                                                </span>
                                                            ) : (
                                                                <span className='text-red-600'>
                                                                    {kyc}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <button
                                                            className='text-color-primary text-left'
                                                            onClick={() =>
                                                                detailsHandler(
                                                                    id
                                                                )
                                                            }
                                                        >
                                                            View Details
                                                        </button>
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
                </section>
            </div>
        </div>
    )
}

export default ViewEstate
