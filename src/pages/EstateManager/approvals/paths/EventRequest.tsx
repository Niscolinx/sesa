import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'

import { Link, useNavigate } from 'react-router-dom'

type Status = 'pending' | 'declined' | 'approved'
export interface Approval {
    id: number
    title: string
    status: Status
    requester: {
        resident_name: string
        property_code: string
        phone_number: string
        tenancy_type: string
        resident_code: string
        property_category: string[]
        property_type: string
        date: string
        time: string
    }
    event: {
        event_code: string
        event_name: string
        event_address: string
        event_type: string
        expected_no_of_guests: number
        start_time: string
        end_time: string
        imgUrl: string
    }
}

const status: Status[] = ['approved', 'declined', 'pending']

export const APPROVAL_LIST: Approval[] = Array.from({
    length: 10,
}).map((_, i) => ({
    id: i + 1,
    title: 'event request',
    status: status[Math.floor(Math.random() * status.length)],
    requester: {
        resident_name: 'Osaji Valentine',
        property_code: '092382',
        phone_number: '0902382323',
        tenancy_type: 'tenancyType',
        property_type: 'one-bed',
        resident_code: 'R08923',
        property_category: ['Commercial, residential'],
        date: '19-May-2023',
        time: '12:30PM',
    },
    event: {
        event_code: 'H08232',
        event_name: 'peter Obi at 60',
        event_address: 'No. 1 Osaji str. Woods Bam.',
        expected_no_of_guests: 50,
        event_type: 'Birthday',
        start_time: '09:00AM',
        end_time: '02:45PM',
        imgUrl: '/img'
    },
}))

function EventRequest() {
    const navigate = useNavigate()

    const [approvalList, setApprovalList] = useState<Approval[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            setApprovalList(APPROVAL_LIST)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Approval[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(approvalList.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Approval[][] = []
        for (let i = 0; i < approvalList.length; i += item) {
            slicedPages.push(approvalList.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(approvalList.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Approval[][] = []
        for (let i = 0; i < approvalList.length; i += paginate.itemsPerPage) {
            slicedPages.push(approvalList.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    approvalList.length / paginate.itemsPerPage
                ),
            }
        })
    }, [approvalList])

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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        const filtered = APPROVAL_LIST.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        )
        setApprovalList([...filtered])
    }

    const composeApprovalHandler = () => {
        navigate('/securityCompany/approvals/compose')
    }

    return (
        <div className='grid gap-10 rounded-lg border min-w-[112rem]'>
            <div className='grid text-[1.6rem] border rounded-lg'>
                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-bold'>
                        Event Request <span>(200)</span>
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

                <div
                    className='grid gap-8 mt-8'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(40rem, 1fr))',
                    }}
                >
                    {slicedPages && slicedPages.length > 0 ? (
                        React.Children.toArray(
                            slicedPages[paginate.index].map(
                                (approvalBody, i) => {
                                    const {
                                        id,
                                        status,
                                        title,
                                        requester: {
                                            date,
                                            property_code,
                                            resident_name,
                                        },
                                    } = approvalBody
                                    return (
                                        <div className='grid relative p-8 bg-white rounded-lg gap-2 capitalize'>
                                            <div className='flex justify-between items-center gap-4 mb-10'>
                                                <p className='flex items-center gap-4'>
                                                    <span className='bg-green-600 text-white p-4 rounded-2xl'>
                                                        {title}
                                                    </span>
                                                    {i === 0 && (
                                                        <span className='text-red-500 font-Satoshi-Medium'>
                                                            New
                                                        </span>
                                                    )}
                                                </p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {date}
                                                </p>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <p>resident Name:</p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {resident_name}
                                                </p>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <p>Property Code:</p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {property_code}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <p>Status:</p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {status === 'approved' ? (
                                                        <span className='text-green-600'>
                                                            {status}
                                                        </span>
                                                    ) : status ===
                                                      'declined' ? (
                                                        <span className='text-red-600'>
                                                            {status}
                                                        </span>
                                                    ) : (
                                                        <span className='text-orange-400'>
                                                            {status}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>

                                            <Link
                                                to={`/estateManager/approvals/view/:${id}`}
                                                state={approvalBody}
                                                className='text-color-blue mt-10'
                                                style={{
                                                    fontFamily:
                                                        'Satoshi-Medium',
                                                }}
                                            >
                                                View More Details
                                            </Link>
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
                                        onClick={(e) => jumpToPage(e, index)}
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
    )
}

export default EventRequest
