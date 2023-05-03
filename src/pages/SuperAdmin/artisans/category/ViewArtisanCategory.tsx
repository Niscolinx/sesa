// import React, {
//     ChangeEvent,
//     FC,
//     FormEvent,
//     useEffect,
//     useRef,
//     useState,
// } from 'react'
// import { CgSpinnerTwo } from 'react-icons/cg'
// import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
// import { IoMdAdd, IoMdClose } from 'react-icons/io'
// import { useNavigate } from 'react-router'
// import { toast, ToastContainer } from 'react-toastify'
// import useFetchData from '../../../../utils/useFetchData'
// import Table from '../../../../components/UI/table/Table'

// type DialogType = 'warning' | 'add-Category'

// export interface IViewArtisanCategory {
//     id: string
//     artisanName: string
//     businessName: string
//     phoneNumber: string
// }

// const VIEW_ARTISAN_CATEGORY: IViewArtisanCategory[] = [
//     {
//         id: '1',
//         artisanName: 'Chibuzor Okafor',
//         businessName: 'Lariza Orjo',
//         phoneNumber: '08012345678',
//     },
//     {
//         id: '1',
//         artisanName: 'Chibuzor Okafor',
//         businessName: 'Lariza Orjo',
//         phoneNumber: '08012345678',
//     },
//     {
//         id: '1',
//         artisanName: 'Chibuzor Okafor',
//         businessName: 'Lariza Orjo',
//         phoneNumber: '08012345678',
//     },
//     {
//         id: '1',
//         artisanName: 'Chibuzor Okafor',
//         businessName: 'Lariza Orjo',
//         phoneNumber: '08012345678',
//     },
//     {
//         id: '1',
//         artisanName: 'Chibuzor Okafor',
//         businessName: 'Lariza Orjo',
//         phoneNumber: '08012345678',
//     },
// ]

// type Actions = 'Delete' | 'View Details'

// const ViewArtisanCategory = () => {
//     const navigate = useNavigate()

//     const handleDialogSubmit = (e: FormEvent) => {
//         e.preventDefault()
//         handleClose()

//         toast('Category Created successfully', {
//             type: 'success',
//             className: 'bg-green-100 text-green-600 text-[1.4rem]',
//         })
//     }

//     const { data: category_detail, isLoading: category_detail_loading } =
//         useFetchData({
//             url: '/admin/category/get/single/2',
//             name: 'category_single',
//         })

//     const dialogRef = useRef<HTMLDialogElement | null>(null)

//     const handleClose = () => {
//         if (dialogRef.current) {
//             dialogRef.current.close()
//         }
//     }

//     const handleOpen = () => {
//         if (dialogRef.current) {
//             dialogRef.current.showModal()
//         }
//     }

   

  
//     return (
//         <>
//             <ToastContainer />
//             <dialog className='dialog' ref={dialogRef}>
//                 <section className='grid place-content-center w-full h-[100vh]'>
//                     <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
//                         <IoMdClose
//                             className='absolute right-4 top-4 text-[2rem] cursor-pointer'
//                             onClick={() => handleClose()}
//                         />

//                         <form
//                             className='grid gap-12'
//                             onSubmit={handleDialogSubmit}
//                         >
//                             <h3
//                                 className='text-[2rem] font-Satoshi-Medium border-b '
//                                 style={{
//                                     fontFamily: 'Satoshi-Medium',
//                                 }}
//                             >
//                                 Create Artisan Category
//                             </h3>

//                             <div className='w-full grid gap-4'>
//                                 <label
//                                     htmlFor='artisanName'
//                                     className='text-[1.4rem] font-semibold'
//                                 >
//                                     Name
//                                 </label>

//                                 <input
//                                     type='text'
//                                     required
//                                     id='artisanName'
//                                     className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
//                                 />
//                             </div>

//                             <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
//                                 Create
//                             </button>
//                         </form>
//                     </div>
//                 </section>
//             </dialog>
//             <div className='grid text-[1.6rem] bg-white px-10 rounded-lg'>
//                 <div className='flex gap-8 py-10 max-w-[50rem] items-end'>
//                     <div className='w-full grid gap-4'>
//                         <label
//                             htmlFor='categoryName'
//                             className='text-[1.4rem] font-semibold'
//                         >
//                             Category Name
//                         </label>

//                         <input
//                             type='text'
//                             required
//                             placeholder='Plumber'
//                             id='categoryName'
//                             className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
//                         />
//                     </div>

//                     <button className='btn bg-[#0556E5] text-white rounded-lg py-4 w-[15rem]'>
//                         Update
//                     </button>
//                 </div>

//                 <Table
//                     fetch_url={'/admin/category/get/single/users/2'}
//                     title={'category'}
//                     view_page_url={'/superAdmin/artisan/category/'}
//                     is_add_btn={true}
//                     isCategory={true}
//                     isStrictAction
//                     actions={['view details', 'delete']}
//                     delete_item_url={'/admin/category/delete/'}
//                     THeader={[
//                         'name',
//                         'No of Artisans',
//                         'created at',
//                         'actions',
//                     ]}
//                     data_to_display={['name', 'artisan_count', 'created_at']}
//                     deactivateProp={{
//                         url: '/admin/artisan/changeStatus',
//                         tag: 'id',
//                     }}
//                 />
//             </div>
//         </>
//     )
// }

// export default ViewArtisanCategory


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
import { toast, ToastContainer } from 'react-toastify'

type DialogType = 'warning' | 'add-Category'

export interface IViewArtisanCategory {
    id: string
    artisanName: string
    businessName: string
    phoneNumber: string
}

const VIEW_ARTISAN_CATEGORY: IViewArtisanCategory[] = [
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
]

type Actions = 'Delete' | 'View Details'

const ViewArtisanCategory = () => {
    const navigate = useNavigate()

    const [isWarning, setIsWarning] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [fetchedArtisanCategories, setFetchedArtisanCategories] = useState<
        IViewArtisanCategory[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedArtisanCategories(VIEW_ARTISAN_CATEGORY)
            //setIsLoaded(true)
        }, 200)
    }, [])

    // const { data: estates_data, isLoading: estates_loading } = useFetchData({
    //     url: '/admin/category/get/single/2',
    //     name: 'category_single',
    // })

    const handleDialogSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleClose()

        toast('Category Created successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const actions = ['View Details', 'Delete'] satisfies Actions[]

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

        if (item === 'View Details') {
            navigate('/superAdmin/artisan/category/:Id')
        }

        setToggleDropDown({
            isDropDownOpen: false,
            index: null,
        })
    }

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IViewArtisanCategory[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetchedArtisanCategories.length / perPage),
        slicedPages: null,
    })

    // const handleSelectedSort = (item: SortBy) => {
    //     setToggleSortMenu(false)
    // }

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IViewArtisanCategory[][] = []
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
        const slicedPages: IViewArtisanCategory[][] = []
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
                totalPage: Math.ceil(
                    fetchedArtisanCategories.length / paginate.itemsPerPage
                ),
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
        // navigate('/superAdmin/viewArtisanCategory/add')
        handleOpen('add-Category')
    }

    const confirmDeactivation = () => {
        handleClose()
        toast('Artisan deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
    return (
        <>
            <ToastContainer />
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
                                    className='text-[2rem] font-Satoshi-Medium border-b '
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
                                    Are you sure you want to delete this
                                    Artisan?
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={confirmDeactivation}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid text-[1.6rem] bg-white px-10 rounded-lg'>
                <div className='flex gap-8 py-10 max-w-[50rem] items-end'>
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='categoryName'
                            className='text-[1.4rem] font-semibold'
                        >
                            Category Name
                        </label>

                        <input
                            type='text'
                            required
                            placeholder='Plumber'
                            id='categoryName'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>

                    <button className='btn bg-[#0556E5] text-white rounded-lg py-4 w-[15rem]'>
                        Update
                    </button>
                </div>
                <div className='flex w-full items-center gap-12 py-8 bg-white rounded-lg'>
                    <p className=' font-Satoshi-Medium'>
                        Category Users <span>(3)</span>
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
                </div>

                <div className='grid gap-10'>
                    <div
                        className='grid justify-between text-color-dark-1 bg-color-grey items-center p-8 grid-cols-4 gap-8'
                        style={{
                            fontSize: '1.4rem',
                        }}
                    >
                        <p className='flex items-center gap-2'>
                            <input type='checkbox' className='cursor-pointer' />
                            <p> Name</p>
                        </p>
                        <p>Business Name</p>
                        <p>Phone Number</p>
                        <p>Actions</p>
                    </div>

                    <div className='grid gap-8 p-8'>
                        {slicedPages && slicedPages.length > 0 ? (
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    (
                                        {
                                            artisanName,
                                            businessName,
                                            phoneNumber,
                                        },
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

                                                    <span>{artisanName}</span>
                                                </p>
                                                <p>{businessName}</p>
                                                <p>{phoneNumber}</p>

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

export default ViewArtisanCategory

