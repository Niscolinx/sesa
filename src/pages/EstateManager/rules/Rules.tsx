import React, { useRef } from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'

export interface Rule {
    id: string
    date: string
    description: string
    moreRules: string[]
}

export const RULES = Array.from({ length: 10 }).map((_, i) => ({
    id: `rule${i + 1}`,
    date: '07 April 2023',
    description: 'No cars allowed to park overnight on the road',
    moreRules: [
        'No pets Allowed',
        'No pets Allowed',
        'No pets Allowed',
        'No pets Allowed',
        'No pets Allowed',
    ],
})) satisfies Rule[]

type Actions = 'delete' | 'deactivate' | 'moreRules'
const actions: Omit<Actions, 'moreRules'>[] = ['delete', 'deactivate']

function Rules() {
    const [isRules, setIsRules] = useState(false)
    const [rulesList, setRulesList] = useState<Rule[]>([])
    const [search, setSearch] = useState<string>('')

    const [selectedAction, setSelectedAction] = useState<{
        [key: string]: Omit<Actions, 'moreRules'>
    }>(null as any)

    const [toggleDropDown, setToggleDropDown] = useState<{
        isDropDownOpen: boolean
        index?: string | null
    }>({
        isDropDownOpen: false,
        index: null,
    })

    const [dialogType, setDialogType] = useState<Actions>('deactivate')

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const [moreRulesData, setMoreRulesData] = useState<string[]>([])

    const addRulesHandler = () => {
        setIsRules(true)
    }

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

    const openMoreRules = (content: string[]) => {
        setDialogType('moreRules')
        setMoreRulesData(content)
        handleOpen()
    }

    const handleDeleteRule = () => {
        handleClose()

        //  toast('Rule deleted successfully', {
        //      type: 'error',
        //      className: 'bg-red-100 text-red-600 text-[1.4rem]',
        //  })
    }
    const handleDeactivateRule = () => {
        handleClose()

        //  toast('Rule deactivated successfully', {
        //      type: 'error',
        //      className: 'bg-red-100 text-red-600 text-[1.4rem]',
        //  })
    }

    const dropDownHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: string
    ) => {
        setToggleDropDown((prev) => {
            return {
                ...prev,
                isDropDownOpen: e.target.checked,
                index,
            }
        })
    }

    const selectAction = (
        e: React.MouseEvent,
        item: Omit<Actions, 'moreRules'>,
        index: string
    ) => {
        setSelectedAction((prev) => {
            return {
                ...prev,
                [index]: item,
            }
        })

        if (item === 'delete') {
            setDialogType('delete')
        }

        if (item === 'deactivate') {
            setDialogType('deactivate')
        }

        handleOpen()
        setToggleDropDown((prev) => {
            return {
                isDropDownOpen: false,
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setRulesList(RULES)
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
    const perPage = 6

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

        const filtered = RULES.filter((item) =>
            item.id.toLowerCase().includes(value.toLowerCase())
        )
        setRulesList([...filtered])
    }

    return (
        <div className='grid'>
            <div className='rounded-lg h-[80vh] min-w-[112rem]'>
                {isRules ? (
                    <>
                        <dialog className='dialog' ref={dialogRef}>
                            <section className='grid place-content-center w-full h-[100vh]'>
                                <div
                                    className={`bg-white rounded-2xl ${
                                        dialogType === 'moreRules'
                                            ? 'min-w-[64rem] py-[5rem] px-10 relative'
                                            : 'grid  place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'
                                    } `}
                                >
                                    {dialogType === 'deactivate' ? (
                                        <>
                                            <img
                                                src='/icons/admins/modalDeactivate.svg'
                                                alt=''
                                                className='animated animated__pulse'
                                                style={{
                                                    animationIterationCount:
                                                        'infinite',
                                                }}
                                            />
                                            <p className='text-[1.6rem]'>
                                                Are you sure you want to
                                                deactivate this Rule
                                            </p>

                                            <div className='flex w-full justify-center gap-8'>
                                                <button
                                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                                    onClick={() =>
                                                        handleClose()
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                                    onClick={
                                                        handleDeactivateRule
                                                    }
                                                >
                                                    Deactivate
                                                </button>
                                            </div>
                                        </>
                                    ) : dialogType === 'delete' ? (
                                        <>
                                            <img
                                                src='/icons/admins/modalWarning.svg'
                                                alt=''
                                                className='animated animated__pulse'
                                                style={{
                                                    animationIterationCount:
                                                        'infinite',
                                                }}
                                            />
                                            <p className='text-[1.6rem]'>
                                                Are you sure you want to delete
                                                this Rule
                                            </p>

                                            <div className='flex w-full justify-center gap-8'>
                                                <button
                                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                                    onClick={() =>
                                                        handleClose()
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                                    onClick={handleDeleteRule}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <IoMdClose
                                                className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                                                onClick={() => handleClose()}
                                            />
                                            <ol className='grid gap-4 justify-items-start'>
                                                {moreRulesData?.map(
                                                    (rule, i) => (
                                                        <li
                                                            key={rule + i}
                                                            className='list-decimal'
                                                        >
                                                            {rule}
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </>
                                    )}
                                </div>
                            </section>
                        </dialog>

                        <div className='grid'>
                            <div className='grid text-[1.6rem]  rounded-lg my-10'>
                                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                                    <p className=' font-bold'>
                                        Rule lists <span>(200)</span>
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
                                        gridTemplateColumns: `repeat(auto-fit, minmax(40rem, 1fr))`,
                                    }}
                                >
                                    {slicedPages && slicedPages.length > 0 ? (
                                        React.Children.toArray(
                                            slicedPages[paginate.index].map(
                                                (rulesBody) => {
                                                    const {
                                                        id,
                                                        description,
                                                        date,
                                                        moreRules,
                                                    } = rulesBody

                                                    const {
                                                        isDropDownOpen,
                                                        index,
                                                    } = toggleDropDown
                                                    return (
                                                        <div
                                                            className='grid relative p-4 items-baseline bg-white rounded-lg gap-8 justify-items-start'
                                                            key={id}
                                                        >
                                                            <div className='flex justify-between gap-4 capitalize w-full'>
                                                                <p className='text-[#ED49E0] bg-[#FCE2FA] p-2 rounded-lg'>
                                                                    {id}
                                                                </p>
                                                                <div className=' flex items-center gap-6'>
                                                                    <p>
                                                                        {date}
                                                                    </p>
                                                                    <div className='relative'>
                                                                        <label
                                                                            className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                                            htmlFor={id.toString()}
                                                                            onClick={() =>
                                                                                setToggleDropDown(
                                                                                    (
                                                                                        prev
                                                                                    ) => {
                                                                                        return {
                                                                                            isDropDownOpen:
                                                                                                !prev.isDropDownOpen,
                                                                                            index: id,
                                                                                        }
                                                                                    }
                                                                                )
                                                                            }
                                                                        >
                                                                            <span className='text-[1.8rem]'>
                                                                                <BiDotsVerticalRounded />
                                                                            </span>
                                                                        </label>
                                                                        <input
                                                                            type='radio'
                                                                            name='dropdown'
                                                                            className='hidden'
                                                                            id={id.toString()}
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                dropDownHandler(
                                                                                    e,
                                                                                    id
                                                                                )
                                                                            }
                                                                        />

                                                                        {isDropDownOpen &&
                                                                            index ===
                                                                                id && (
                                                                                <div className='absolute top-0 right-[3rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                                                                    {actions.map(
                                                                                        (
                                                                                            item,
                                                                                            index
                                                                                        ) => (
                                                                                            <p
                                                                                                className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                                                                key={
                                                                                                    index +
                                                                                                    id
                                                                                                }
                                                                                                onClick={(
                                                                                                    e
                                                                                                ) =>
                                                                                                    selectAction(
                                                                                                        e,
                                                                                                        item,
                                                                                                        id
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {item ===
                                                                                                'delete' ? (
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
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    {
                                                                        description
                                                                    }
                                                                </p>
                                                                <button
                                                                    className='text-color-blue'
                                                                    onClick={() =>
                                                                        openMoreRules(
                                                                            moreRules
                                                                        )
                                                                    }
                                                                >
                                                                    View More
                                                                </button>
                                                            </div>
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

                                    <HiOutlineChevronRight
                                        onClick={handleNext}
                                        className='cursor-pointer'
                                    />
                                </ul>
                            </footer>
                        </div>
                    </>
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
