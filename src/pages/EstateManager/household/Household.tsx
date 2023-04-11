import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Select } from '../../../components/SuperAdmin/UI/Select'

interface Household {
    id: number
    housecode: string
    propertyType: string
    propertyCategory: 'business/nestle' | 'residential'
    tenancyType: string
    occupants: number
    RFID: number
    AccessCard: number
    status: 'active' | 'inactive'
}

const HOUSEHOLD_DATA: Household[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: i + 1,
    housecode: `H${(Math.random() * 0.1 + 0.9).toFixed(7).split('.')[1]}`,
    propertyType: Math.random() > 0.5 ? 'duplex' : '1-bedroom',
    propertyCategory: Math.random() > 0.5 ? 'business/nestle' : 'residential',
    tenancyType: 'landland(resident)',
    occupants: Math.floor(Math.random() * 10 + 3),
    RFID: Math.floor(Math.random() * 7 + 3),
    AccessCard: Math.floor(Math.random() * 7 + 3),
    status: 'active',
}))

export type Actions = 'View Details' | 'Edit Details' | 'Delete'

function HouseHold() {
    const [isHousehold, setIsHousehold] = useState(false)
    const [propertyCode, setPropertyCode] = useState<string>('')
    const addhousehold = () => {
        setIsHousehold(true)
    }

    const navigate = useNavigate()
    const [selectedList, setSelectedList] = useState<Map<string, number>>(
        new Map()
    )

    const [fetchedHousehold, setFetchedHousehold] = useState<Household[]>([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedHousehold(HOUSEHOLD_DATA)
        }, 500)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Household[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedHousehold.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Household[][] = []
        for (let i = 0; i < fetchedHousehold.length; i += item) {
            slicedPages.push(fetchedHousehold.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedHousehold.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Household[][] = []
        for (
            let i = 0;
            i < fetchedHousehold.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedHousehold.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedHousehold.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedHousehold])

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

    const detailsHandler = (id: number) => {
        console.log(id)
    }

    const actions: Actions[] = ['View Details', 'Edit Details', 'Delete']
    const [selectedAction, setSelectedAction] = useState<{
        [key: string]: Actions
    }>(null as any)
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
        setToggleDropDown((prev) => {
            return {
                isDropDownOpen: e.target.checked,
                index,
            }
        })
    }

    const handleChecked = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        if (e.target.checked) {
            const newMap = new Map(selectedList)
            newMap.set(e.target.name, id)
            setSelectedList(newMap)
        } else {
            const newMap = new Map(selectedList)
            newMap.delete(e.target.name)
            setSelectedList(newMap)
        }
    }

    const deleteSelectedList = () => {
        console.log(selectedList)
    }

    const selectAction = (
        e: React.MouseEvent,
        item: Actions,
        index: number
    ) => {
        setSelectedAction((prev) => {
            return {
                ...prev,
                [index]: item,
            }
        })

        if (item === 'View Details') {
            navigate(`/estateManager/household/view-details/:${index}`)
        }

        if (item === 'Edit Details') {
            navigate(`/estateManager/household/edit-household/:${index}`)
        }
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        dialogRef.current?.close()
    }

    const handleOpen = () => {
        dialogRef.current?.showModal()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        <div className='grid gap-12'>
                            <h3
                                className='text-[2rem] font-Satoshi-Medium border-b '
                                style={{
                                    fontFamily: 'Satoshi-Medium',
                                }}
                            >
                                Create Household
                            </h3>
                            <div className='w-[30rem]'>
                                <Select
                                    state={[
                                        'ThomasEstate/SO-2345CDGK1',
                                        'ThomasEstate/SO-2345CDGK2',
                                        'ThomasEstate/SO-2345CDGK3',
                                        'ThomasEstate/SO-2345CDGK4',
                                        'ThomasEstate/SO-2345CDGK5',
                                    ]}
                                    label='Property Code*'
                                    isSearchable
                                    selectedState={propertyCode}
                                    setSelectedState={setPropertyCode}
                                />
                            </div>
                            <button
                                className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'
                                onClick={() =>
                                    navigate(
                                        '/estateManager/household/create-household',
                                        {
                                            state: {
                                                propertyCode,
                                            },
                                        }
                                    )
                                }
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            {isHousehold ? (
                <div className='rounded-lg mt-[3rem] h-[80vh]'>
                    <main className='mt-10 grid gap-9'>
                        <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                            <div className='grid text-[1.6rem]'>
                                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                                    <p className=' font-Satoshi-Medium'>
                                        Household List <span>(50)</span>
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
                                        {selectedList.size > 0 ? (
                                            <button
                                                className='btn text-white bg-red-600 flex items-center gap-4 py-4 px-16 rounded-lg'
                                                onClick={deleteSelectedList}
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button
                                                className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                                onClick={() => handleOpen()}
                                            >
                                                <span>
                                                    <IoMdAdd />
                                                </span>{' '}
                                                Create Household
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className='grid'>
                                    <div className='grid items-center justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-9 gap-8'>
                                        <p className='flex items-center gap-4'>
                                            <input
                                                type='checkbox'
                                                className='cursor-pointer'
                                            />
                                            <p>Property Code</p>
                                        </p>
                                        <p>Property Type</p>
                                        <p>Category/Name</p>
                                        <p>Tenancy Type</p>
                                        <p>Occupants</p>
                                        <p>RFID</p>
                                        <p>Access Card</p>
                                        <p>Status</p>
                                        <p>Action </p>
                                    </div>

                                    <div className='grid gap-8 mt-8 p-8'>
                                        {slicedPages &&
                                        slicedPages.length > 0 ? (
                                            React.Children.toArray(
                                                slicedPages[paginate.index].map(
                                                    ({
                                                        housecode,
                                                        propertyType,
                                                        propertyCategory,
                                                        tenancyType,
                                                        status,
                                                        occupants,
                                                        RFID,
                                                        AccessCard,
                                                        id,
                                                    }) => {
                                                        const {
                                                            isDropDownOpen,
                                                            index,
                                                        } = toggleDropDown
                                                        return (
                                                            <div className='grid justify-between border-b grid-cols-9 gap-8 py-4 items-center capitalize'>
                                                                <p className='flex items-center gap-4'>
                                                                    <input
                                                                        type='checkbox'
                                                                        className='cursor-pointer'
                                                                        name={`checkbox-${id}`}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleChecked(
                                                                                e,
                                                                                id
                                                                            )
                                                                        }
                                                                    />

                                                                    <span>
                                                                        {
                                                                            housecode
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    {
                                                                        propertyType
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        propertyCategory
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        tenancyType
                                                                    }
                                                                </p>
                                                                <p className='text-center'>
                                                                    {occupants}
                                                                </p>
                                                                <p>{RFID}</p>
                                                                <p>
                                                                    {AccessCard}
                                                                </p>

                                                                <p className='text-green-600'>
                                                                    {status}
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
                                                                            <div className='absolute top-0 translate-x-[5rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
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
                                                                                            'Delete' ? (
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
                                            {itemsPerPageArr.map(
                                                (item, index) => (
                                                    <option
                                                        value={item}
                                                        key={index}
                                                        selected={
                                                            item ===
                                                            itemsPerPage
                                                        }
                                                        className='capitalize cursor-pointer bg-white'
                                                    >
                                                        {item}
                                                    </option>
                                                )
                                            )}
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
                                                    {index + 1 ===
                                                    currentPage ? (
                                                        <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                                            {index + 1}
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
                                                            onClick={(e) =>
                                                                jumpToPage(
                                                                    e,
                                                                    index
                                                                )
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
            ) : (
                <div className='h-[80vh]'>
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not any household list yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={addhousehold}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add household
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default HouseHold
