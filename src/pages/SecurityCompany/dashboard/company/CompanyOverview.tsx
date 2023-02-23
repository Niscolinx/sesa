import React, { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import OverviewCard from '../../../../components/SuperAdmin/overview/OverviewCard'

interface CompanyOverview {
    id: number
    guardCode: number
    guardName: string
    phoneNumber: string
    assignedEstate: string
    status: 'Active' | 'Deactivated'
    kys: 'Validated' | 'Not Validated'
}

const COMPANY_OVERVIEW_DATA: CompanyOverview[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: i,
    guardName: 'John Doe',
    phoneNumber: '+2347024954270',
    guardCode: Math.floor(Math.random() * 3000 + 1000),
    assignedEstate: 'Estate 1',
    status: Math.random() > 0.5 ? 'Active' : 'Deactivated',
    kys: Math.random() > 0.5 ? 'Validated' : 'Not Validated',
}))

const CompanyHome = () => {
    const navigate = useNavigate()

    const [fetchedCompanyOverviewData, setFetchedCompanyOverviewData] =
        useState<CompanyOverview[]>([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedCompanyOverviewData(COMPANY_OVERVIEW_DATA)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: CompanyOverview[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedCompanyOverviewData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: CompanyOverview[][] = []
        for (let i = 0; i < fetchedCompanyOverviewData.length; i += item) {
            slicedPages.push(fetchedCompanyOverviewData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedCompanyOverviewData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: CompanyOverview[][] = []
        for (
            let i = 0;
            i < fetchedCompanyOverviewData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedCompanyOverviewData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedCompanyOverviewData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedCompanyOverviewData])

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

    const handleAddSecurityGuard = () => {
        console.log('add security guard')

        navigate(`/securityCompany/company-overview/addSecurity`)
    }

    const detailsHandler = (id: number) => {
        console.log(id)
        navigate(`/securityCompany/company-overview/viewGuard/${id}`)
    }
    return (
        <div>
            <main className='mt-10 grid gap-9'>
                <section className='bg-white rounded-lg p-8 grid text-[1.4rem] w-max'>
                    <div className='overview flex gap-8'>
                        <OverviewCard
                            title='Security Guard'
                            number={1532}
                            iconUrl='/icons/securityCompany/securityGuards.svg'
                            bgColor='bg-[#F5F9FA]'
                            textColor='text-[#00C2FF]'
                        />
                        <OverviewCard
                            title='Assigned Security Guards'
                            number={18_000}
                            iconUrl='/icons/securityCompany/totalEstates.svg'
                            bgColor='bg-[#DDFCDC]'
                            textColor='text-[#1A8F56]'
                        />
                    </div>
                </section>

                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    <div className='grid text-[1.6rem]'>
                        <caption className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                            <p className=' font-bold'>
                                Security Guard List <span>(4)</span>
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
                                    className='pl-16 w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                                />
                            </div>
                            <div className='relative flex items-center'>
                                <select className=' cursor-pointer w-[18rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                                    <option hidden value=''>
                                        Sort By
                                    </option>
                                    <option value='date'>date</option>
                                    <option value='alpha'>Alpha</option>
                                </select>
                                <GrDown className='absolute right-4 text-[1.3rem]' />
                            </div>
                            <div className='ml-auto'>
                                <button
                                    className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                    onClick={handleAddSecurityGuard}
                                >
                                    <span>
                                        <IoMdAdd />
                                    </span>{' '}
                                    Add Security Guard
                                </button>
                            </div>
                        </caption>

                        <div className='grid'>
                            <div
                                className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-7 gap-8'
                                style={{
                                    fontSize: '1.6rem',
                                }}
                            >
                                <p className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        className='cursor-pointer'
                                    />
                                    <p>Guard Code</p>
                                </p>
                                <p>Guard Name</p>
                                <p>Phone Number</p>
                                <p>Assigned Estate</p>
                                <p>Status</p>
                                <p>KYG</p>
                                <p>Action </p>
                            </div>

                            <div className='grid gap-8 mt-8 p-8'>
                                {slicedPages && slicedPages.length > 0 ? (
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            ({
                                                guardCode,
                                                guardName,
                                                assignedEstate,
                                                kys,
                                                status,
                                                id,
                                                phoneNumber,
                                            }) => {
                                                return (
                                                    <div className='grid justify-between border-b grid-cols-7 gap-8 py-4'>
                                                        <p className='flex items-center gap-4'>
                                                            <input
                                                                type='checkbox'
                                                                className='cursor-pointer'
                                                            />

                                                            <span>
                                                                {guardCode}
                                                            </span>
                                                        </p>
                                                        <p>{guardName}</p>
                                                        <p>{phoneNumber}</p>
                                                        <p>{assignedEstate}</p>
                                                        <p>
                                                            {status ===
                                                            'Active' ? (
                                                                <span className='text-[#1A8F56]'>
                                                                    {status}
                                                                </span>
                                                            ) : (
                                                                <span className='text-red-600'>
                                                                    {status}
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p>
                                                            {kys ===
                                                            'Validated' ? (
                                                                <span className='text-[#1A8F56]'>
                                                                    {kys}
                                                                </span>
                                                            ) : (
                                                                <span className='text-red-600'>
                                                                    {kys}
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
                    </div>{' '}
                </section>
            </main>
        </div>
    )
}

export default CompanyHome
