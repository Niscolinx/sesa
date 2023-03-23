import React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export type RuleContent = {
    date: string
    description: string
    id: string
}
export interface Rule {
    id: string
    title: string
    createAt: string
    content: RuleContent[]
}

export const RULES_LIST: Rule[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `${i + 1}`,
    title: 'Ajao Estate Rules and Regulations',
    createAt: '12-Feb 2023',
    content: Array.from({ length: 6 }, (_, idx) => ({
        id: `rule${idx + 1}`,
        date: '07 April 2023',
        description: 'No cars allowed to park overnight on the road',
    })),
}))

function Rules() {
    const [isRules, setIsRules] = useState(false)

    const addRulesHandler = () => {
        setIsRules(true)
    }

    const navigate = useNavigate()

    const [rulesList, setRulesList] = useState<Rule[]>([])
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        setTimeout(() => {
            setRulesList(RULES_LIST)
        }, 100)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Rule[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(rulesList.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Rule[][] = []
        for (let i = 0; i < rulesList.length; i += item) {
            slicedPages.push(rulesList.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(rulesList.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Rule[][] = []
        for (let i = 0; i < rulesList.length; i += paginate.itemsPerPage) {
            slicedPages.push(rulesList.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(rulesList.length / paginate.itemsPerPage),
            }
        })
    }, [rulesList])

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

        const filtered = RULES_LIST.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        )
        setRulesList([...filtered])
    }

    return (
        <div className='grid'>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isRules ? (
                    <section className='rounded-lg'>
                        <div className='grid gap-10 rounded-lg  min-w-[112rem]'>
                            <div className='grid text-[1.6rem]  rounded-lg'>
                                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                                    <p className=' font-bold'>
                                        Rules <span>(200)</span>
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
                                    <Link
                                        to='/estateManager/estate-rules-and-regulations/add'
                                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg ml-auto'
                                    >
                                        <span>
                                            <IoMdAdd />
                                        </span>{' '}
                                        Add Rule
                                    </Link>
                                </div>

                                <div className='grid gap-8 mt-8'>
                                    {slicedPages && slicedPages.length > 0 ? (
                                        React.Children.toArray(
                                            slicedPages[paginate.index].map(
                                                (rulesBody) => {
                                                    const {
                                                        id,
                                                        title,
                                                        createAt,
                                                    } = rulesBody
                                                    return (
                                                        <div
                                                            className='grid relative p-16 bg-white rounded-lg gap-2 justify-items-start'
                                                            key={id}
                                                        >
                                                            <p className='flex items-center gap-4'>
                                                                <span className='w-[1rem] h-[1rem] rounded-full bg-[#EF6AF2] object-cover'></span>
                                                                <span>
                                                                    {title}
                                                                </span>
                                                            </p>
                                                            <p className='text-gray-500'>
                                                                Created{' '}
                                                                {createAt}
                                                            </p>
                                                            <Link
                                                                to={`/estateManager/estate-rules-and-regulations/view/:${id}`}
                                                                className='text-color-blue'
                                                                state={
                                                                    rulesBody.content
                                                                }
                                                            >
                                                                View Details
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

                                    {slicedPages?.map((_, index) => {
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

                                    <HiOutlineChevronRight
                                        onClick={handleNext}
                                        className='cursor-pointer'
                                    />
                                </ul>
                            </footer>
                        </div>
                    </section>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any rules and regulations
                            yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addRulesHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Rule
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Rules
