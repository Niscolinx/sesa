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
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export interface IAdvertClickView {
    id: string
    estateName: string
    state: string
    address: string
    noOfResidents: number
}

export const ADVERT_CLICK_VIEW: IAdvertClickView[] = [
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
]

const AdvertClickView = () => {
    const navigate = useNavigate()

    const [fetchedAdvertClickView, setFetchedAdvertClickView] = useState<
        IAdvertClickView[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedAdvertClickView(ADVERT_CLICK_VIEW)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: IAdvertClickView[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedAdvertClickView.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: IAdvertClickView[][] = []
        for (let i = 0; i < fetchedAdvertClickView.length; i += item) {
            slicedPages.push(fetchedAdvertClickView.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedAdvertClickView.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: IAdvertClickView[][] = []
        for (
            let i = 0;
            i < fetchedAdvertClickView.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedAdvertClickView.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedAdvertClickView])

    const handleNext = () => {
        console.log(paginate.currentPage, paginate.totalPage, slicedPages)
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

    const addAdvert = () => {
        navigate('/dashboard/advert/group/add')
    }

    return (
        <>
            <div className='grid text-[1.6rem]'>
                <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-bold'>
                        Availabe Estate Adverts <span>(10)</span>
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

                    {/* <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg ml-auto'
                        onClick={addAdvert}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Advert
                    </button> */}
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
                            <p>Estate Name</p>
                        </p>
                        <p>State</p>
                        <p>Address</p>
                        <p>No of Residents</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        {slicedPages && slicedPages.length > 0 ? (
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    (
                                        {
                                            estateName,
                                            state,
                                            address,
                                            noOfResidents,
                                        },
                                        i
                                    ) => {
                                        return (
                                            <div className='grid justify-between border-b grid-cols-4 items-center gap-8 '>
                                                <p className='flex items-center gap-4'>
                                                    <input
                                                        type='checkbox'
                                                        className='cursor-pointer'
                                                    />

                                                    <span>{estateName}</span>
                                                </p>
                                                <p>{state}</p>
                                                <p>{address}</p>
                                                <p>{noOfResidents}</p>
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

export default AdvertClickView
