import React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'



export interface Voting {
    id: number
    startDate: string
    endDate: string
    electionTitle: string
    NoOfEligibleVoters: string
    category: string
}

export const VOTING_DATA: Voting[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    startDate: '19-May-2023',
    endDate: '19-May-2023',
    electionTitle: 'Iba General Elections',
    NoOfEligibleVoters: `12,423`,
}))

function Voting() {
    const [isVoting, setIsVoting] = useState(false)

    const addVotingHandler = () => {
        setIsVoting(true)
    }


    const [votingList, setVotingList] = useState<Voting[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            setVotingList(VOTING_DATA)
        }, 100)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Voting[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(votingList.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Voting[][] = []
        for (let i = 0; i < votingList.length; i += item) {
            slicedPages.push(votingList.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(votingList.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Voting[][] = []
        for (let i = 0; i < votingList.length; i += paginate.itemsPerPage) {
            slicedPages.push(votingList.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    votingList.length / paginate.itemsPerPage
                ),
            }
        })
    }, [votingList])

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

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        const filtered = VOTING_DATA.filter((item) =>
            item.electionTitle.toLowerCase().includes(value.toLowerCase())
        )
        setVotingList([...filtered])
    }

   

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isVoting ? (
                    <div className='grid gap-10 rounded-lg min-w-[112rem]'>
                        <p className='font-Satoshi-Medium text-[2.5rem]'>
                            Voting & Election
                        </p>
                        <div className='grid text-[1.6rem] rounded-lg'>
                            <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                                <p className=' font-bold'>
                                    Votings <span>(200)</span>
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
                                        <option value='startDate'>
                                            startDate
                                        </option>
                                        <option value='alpha'>Alpha</option>
                                    </select>
                                    <GrDown className='absolute right-4 text-[1.3rem]' />
                                </div>

                                <Link
                                    to='/estateManager/voting-and-election/create-new-poll'
                                    className='ml-auto'
                                >
                                    <button className='btn  bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize'>
                                        <span>
                                            <IoMdAdd />
                                        </span>{' '}
                                        <p>New Voting Poll</p>
                                    </button>
                                </Link>
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
                                            (messageBody) => {
                                                const {
                                                    id,
                                                    startDate,
                                                    NoOfEligibleVoters,
                                                    endDate,
                                                    electionTitle,
                                                } = messageBody
                                                return (
                                                    <div className='grid relative p-8 bg-white rounded-lg gap-2 capitalize'>
                                                        <div className='flex items-center gap-2'>
                                                            <p>
                                                                Election Title:
                                                            </p>
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Satoshi-Medium',
                                                                }}
                                                            >
                                                                {electionTitle}
                                                            </p>
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <p>start Date:</p>
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Satoshi-Medium',
                                                                }}
                                                            >
                                                                {startDate}
                                                            </p>
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <p>end Date:</p>
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Satoshi-Medium',
                                                                }}
                                                            >
                                                                {endDate}
                                                            </p>
                                                        </div>

                                                        <div className='flex items-center gap-2'>
                                                            <p>
                                                                No of Eligible
                                                                Voters:
                                                            </p>
                                                            <p
                                                                style={{
                                                                    fontFamily:
                                                                        'Satoshi-Medium',
                                                                }}
                                                            >
                                                                {
                                                                    NoOfEligibleVoters
                                                                }
                                                            </p>
                                                        </div>

                                                        <Link
                                                            to={`/estateManager/message/view/:${id}`}
                                                            state={messageBody}
                                                            className='text-[#098DFF] mt-[2rem]'
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
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you do not have any Voting Polls created yet{' '}
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addVotingHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Create Poll
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Voting
