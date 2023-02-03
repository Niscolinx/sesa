import React, {
    ChangeEvent,
    FC,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router'

type DialogType = 'warning' | 'add-Category'
export interface IArtisanCategory {
    id: string
    name: string
    NoOfArtisans: number
    createdAt: string
}

type Actions = 'Delete'

const ArtisanCategory: FC<{
    fetchedArtisanCategories: IArtisanCategory[]
}> = ({ fetchedArtisanCategories }) => {
    const navigate = useNavigate()

    const [isWarning, setIsWarning] = useState(true)

   

    const handleDialogSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    const actions = [
        'Delete'
    ] satisfies Actions[]

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

    const selectAction = (e: React.MouseEvent, item: Actions) => {
        if (item === 'Delete') {
            handleOpen('warning')
        }
    }

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IArtisanCategory[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: 6,

        totalPage: Math.ceil(fetchedArtisanCategories.length / 2),
        slicedPages: null,
    })

    // const handleSelectedSort = (item: SortBy) => {
    //     setToggleSortMenu(false)
    // }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IArtisanCategory[][] = []
        for (let i = 0; i < fetchedArtisanCategories.length; i += item) {
            slicedPages.push(fetchedArtisanCategories.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedArtisanCategories.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: IArtisanCategory[][] = []
        for (
            let i = 0;
            i < fetchedArtisanCategories.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedArtisanCategories.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedArtisanCategories])

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

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState: DialogType) => {
        if (modalState === 'warning') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const addCategoryHandler = () => {
        // navigate('/dashboard/artisanCategory/add')
        handleOpen('add-Category')
    }

    const confirmDeactivation = () => {
        handleClose()
    }
    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        {!isWarning ? (
                            <form
                                className='grid gap-12'
                                onSubmit={handleDialogSubmit}
                            >
                                    <h3
                                        className='text-[2rem] font-bold border-b '
                                        style={{
                                            fontFamily: 'Satoshi-Medium',
                                        }}
                                    >
                                        Create Artisan Category
                                    </h3>
                               
                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='artisanName'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Name
                                    </label>

                                    <input
                                        type='text'
                                        required
                                        id='artisanName'
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                    />
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Create
                                </button>
                            </form>
                        ) : (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />

                                <p>
                                    Are you sure you want to deactivate this
                                    security company?
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={confirmDeactivation}
                                    >
                                        Deactivate
                                    </button>

                                    <button
                                        className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid text-[1.6rem]'>
                <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-bold'>
                        Artisan Category <span>(10)</span>
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
                            className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                        />
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg ml-auto'
                        onClick={addCategoryHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Artisan Category
                    </button>
                </div>

                <div className='grid'>
                    <div
                        className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-4 gap-8'
                        style={{
                            fontSize: '1.4rem',
                        }}
                    >
                        <p className='flex items-center gap-2'>
                            <input type='checkbox' className='cursor-pointer' />
                            <p> Name</p>
                        </p>
                        <p>No of Artisans</p>
                        <p>Created At</p>
                        <p>Actions</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        {slicedPages && slicedPages.length > 0 ? (
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    (
                                        { name, createdAt, NoOfArtisans, id },
                                        i
                                    ) => {
                                        const { isDropDownOpen, index } =
                                            toggleDropDown
                                        return (
                                            <div className='grid justify-between border-b grid-cols-4 gap-8 '>
                                                <p className='flex items-center gap-4'>
                                                    <input
                                                        type='checkbox'
                                                        className='cursor-pointer'
                                                    />

                                                    <span>{name}</span>
                                                </p>
                                                <p>{NoOfArtisans}</p>
                                                <p>{createdAt}</p>

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
                                                            dropDownHandler(
                                                                e,
                                                                i
                                                            )
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
        </>
    )
}

export default ArtisanCategory
