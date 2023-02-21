import React, { useState, useEffect, ChangeEvent } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'

import { Link, useNavigate } from 'react-router-dom'

export interface Message {
    id: number
    date: string
    transmissionDate: string
    recipients: string[]
    transmissionChannel: string
    subject: string
    description: string
    status: 'Sent' | 'Pending'
}

const recipients = ['Thomas Nwaje', 'Solomon Nwaje']

export const MESSAGE_LIST: Message[] = Array.from({ length: 10 }).map(
    (_, i) => ({
        id: i + 1,
        date: '19-May-2023',
        transmissionDate: '19-May-2023',
        recipients,
        transmissionChannel: `Channel ${i + 1}`,
        subject: `Monday Workings`,
        description: 'The report for the month of May is ready for review ',
        status: Math.random() > 0.5 ? 'Sent' : 'Pending',
    })
)

function RenderedMessages() {
    const navigate = useNavigate()

    const [messageList, setMessageList] = useState<Message[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            setMessageList(MESSAGE_LIST)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Message[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(messageList.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Message[][] = []
        for (let i = 0; i < messageList.length; i += item) {
            slicedPages.push(messageList.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(messageList.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Message[][] = []
        for (let i = 0; i < messageList.length; i += paginate.itemsPerPage) {
            slicedPages.push(messageList.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    messageList.length / paginate.itemsPerPage
                ),
            }
        })
    }, [messageList])

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

        const filtered = MESSAGE_LIST.filter((item) =>
            item.subject.toLowerCase().includes(value.toLowerCase())
        )
        setMessageList([...filtered])
    }

    const composeMessageHandler = () => {
        navigate('/securityCompany/messages/compose')
    }

    return (
        <div className='grid gap-10 rounded-lg border min-w-[112rem]'>
            <div className='grid text-[1.6rem] border rounded-lg'>
                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-bold'>
                        Messages <span>(200)</span>
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

                    <button
                        className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize'
                        onClick={composeMessageHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>compose Message</p>
                    </button>
                </div>

                <div className='grid gap-8 mt-8' style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))'
                }}>
                    {slicedPages && slicedPages.length > 0 ? (
                        React.Children.toArray(
                            slicedPages[paginate.index].map(
                                (messageBody) => {
                                    const {
                                        id,
                                        date,
                                        subject,
                                        description,
                                        status,
                                        transmissionChannel,
                                        transmissionDate,
                                    } = messageBody
                                    return (
                                        <div className='grid relative p-8 bg-white rounded-lg gap-2'>
                                            <div className='flex items-center gap-2 absolute right-0 top-0 p-8'>
                                                <p>Status:</p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {status === 'Sent' ? (
                                                        <span className='text-green-600'>
                                                            {status}
                                                        </span>
                                                    ) : (
                                                        <span className='text-orange-500'>
                                                            {status}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <p>Date:</p>
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
                                                <p>Transmission Date:</p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {transmissionDate}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-2 max-w-[40rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                <p>Recipients:</p>
                                                <div
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                    className='flex gap-2'
                                                >
                                                    {recipients.map(
                                                        (recipient, i) => (
                                                            <div
                                                                className='flex gap-2 items-center  text-ellipsis whitespace-nowrap'
                                                                key={i}
                                                            >
                                                                <p className=''>
                                                                    {recipient}
                                                                    {i !==
                                                                        recipients.length -
                                                                            1 &&
                                                                        ','}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                    <span className='text-color-blue '>
                                                        {' '}
                                                        + 20 others
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <p>Transmission Channel:</p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {transmissionChannel}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <p>Subject:</p>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    {subject}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-2 my-5'>
                                                <p className='overflow-hidden text-ellipsis whitespace-nowrap '>
                                                    {description}
                                                </p>
                                            </div>

                                            <Link
                                            to={`/securityCompany/messages/view/${id}`}
                                            state={messageBody}
                                            
                                                className='text-color-blue'
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

export default RenderedMessages
