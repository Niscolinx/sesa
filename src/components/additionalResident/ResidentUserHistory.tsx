import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown, GrUp } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { useNavigate } from 'react-router'
export interface IResidentUserHistory {
    id: string
    packageName: string
    userName: string
    frequency: string
    amount: number
    startDate: string
    endDate: string
    transactionType: 'purchase' | 'renewal'
    status: 'active' | 'inactive'
}

type SortBy = 'A-Z' | 'date'

const ResidentUserHistory: FC<{
    fetchedResidentUserHistory: IResidentUserHistory[]
}> = ({ fetchedResidentUserHistory }) => {
    const navigate = useNavigate()

    const [actions, _] = useState<['View Details', 'Deactivate']>([
        'View Details',
        'Deactivate',
    ])
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

    const selectAction = (
        e: React.MouseEvent,
        item: 'View Details' | 'Deactivate'
    ) => {
        if (item === 'View Details') {
            navigate('/dashboard/additional-resident/:Id')
        }
    }

    const sortBy: SortBy[] = ['A-Z', 'date']

    interface Paginate {
      
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IResidentUserHistory[][] | null
    }

    const [toggleSortMenu, setToggleSortMenu] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState({
        arr: [2, 4, 6, 8],
    })
    const [selectedSort, setSelectedSort] = useState<SortBy>('A-Z')
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: 2,

        totalPage: Math.ceil(fetchedResidentUserHistory.length / 2),
        slicedPages: null,
    })

    const sortMenuToggler = () => setToggleSortMenu(!toggleSortMenu)

    const handleSelectedSort = (item: SortBy) => {
        setSelectedSort(item)
        setToggleSortMenu(false)
    }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IResidentUserHistory[][] = []
        for (let i = 0; i < fetchedResidentUserHistory.length; i += item) {
            slicedPages.push(fetchedResidentUserHistory.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedResidentUserHistory.length / item),
            }
        })
    }

    useEffect(() => {
        console.log({ slicedPages })
    }, [paginate.slicedPages])

    useEffect(() => {
        const slicedPages: IResidentUserHistory[][] = []
        for (
            let i = 0;
            i < fetchedResidentUserHistory.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedResidentUserHistory.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedResidentUserHistory])

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

    const {  currentPage, slicedPages } =
        paginate

    console.log({ paginate })
    const jumpToPage = (e: React.MouseEvent, index: number) => {
        console.log({ index })

        setPaginate((prev) => {
            return {
                ...prev,
                index,
                currentPage: index + 1,
            }
        })
    }

    return (
        <div className='grid text-[1.6rem]'>
            <caption className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-bold'>
                    Resident User List <span>(4)</span>
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
                <div className='relative flex items-center w-[10rem] justify-items-start cursor-pointer'>
                    <p
                        className='border border-color-primary-light p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointe text-left'
                        onClick={sortMenuToggler}
                    >
                        {selectedSort}
                    </p>

                    {toggleSortMenu && (
                        <div className='absolute top-[5rem]  left-0 border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                            {sortBy.map((item, index) => (
                                <p
                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left'
                                    key={index}
                                    onClick={() => handleSelectedSort(item)}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                    {toggleSortMenu ? (
                        <GrUp className='absolute right-4 text-[1.3rem]' />
                    ) : (
                        <GrDown className='absolute right-4 text-[1.3rem]' />
                    )}
                </div>
            </caption>

            <div className='grid'>
                <div
                    className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-9 gap-8'
                    style={{
                        fontSize: '1.4rem',
                    }}
                >
                    <p className='flex items-center gap-2'>
                        <input type='checkbox' className='cursor-pointer' />
                        <p>Package Name</p>
                    </p>
                    <p>User Name</p>
                    <p>Frequency</p>
                    <p>Amount</p>
                    <p>Start Date</p>
                    <p>End Date</p>
                    <p>Transaction Type</p>
                    <p>Status</p>
                    <p>Actions</p>
                </div>

                <div className='grid gap-8 mt-8 p-8'>
                    {paginate.slicedPages && paginate.slicedPages.length > 0 ? (
                        React.Children.toArray(
                            paginate.slicedPages[paginate.index].map(
                                (
                                    {
                                        packageName,
                                        userName,
                                        frequency,
                                        amount,
                                        startDate,
                                        endDate,
                                        transactionType,
                                        status,
                                        id,
                                    },
                                    i
                                ) => {
                                    const { isDropDownOpen, index } =
                                        toggleDropDown
                                    return (
                                        <div className='grid justify-between border-b grid-cols-9 gap-8 '>
                                            <p className='flex items-center gap-4'>
                                                {id}
                                                <input
                                                    type='checkbox'
                                                    className='cursor-pointer'
                                                />

                                                <span>{packageName}</span>
                                            </p>
                                            <p>{userName}</p>
                                            <p>{frequency}</p>
                                            <p className='flex items-center gap-.5'>
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                <span>{amount}</span>
                                            </p>
                                            <p>{startDate}</p>
                                            <p>{endDate}</p>
                                            <p>{transactionType}</p>
                                            <p>{status}</p>
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
                                                    <span className='text-color-primary'>
                                                        <img
                                                            src='/icons/admins/threeDots.svg'
                                                            alt=''
                                                        />
                                                    </span>
                                                </label>
                                                <input
                                                    type='radio'
                                                    name='dropdown'
                                                    className='hidden'
                                                    id={i.toString()}
                                                    onChange={(e) =>
                                                        dropDownHandler(e, i)
                                                    }
                                                />

                                                {isDropDownOpen &&
                                                    index === i && (
                                                        <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
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
                                                                            selectAction(
                                                                                e,
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        {item ===
                                                                        'Deactivate' ? (
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
                        {itemsPerPage.arr.map((item, index) => (
                            <option
                                value={item}
                                key={index}
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

export default ResidentUserHistory
