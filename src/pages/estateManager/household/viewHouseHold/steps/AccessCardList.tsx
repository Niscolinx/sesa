import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { ViewHouseHoldContext } from '../ViewHouseHold'

function AccessCardList() {
    const { closeDialog } = useContext(ViewHouseHoldContext)

    interface AccessCard {
        id: string
        serialNum: string
        holderName: string
        phoneNum: string
        imgUrl: string
    }

    const ACCESSCARD_LIST: AccessCard[] = Array.from({ length: 2 }, (_, i) => {
        return {
            id: `1 + ${i}`,
            serialNum: `R${
                (Math.random() * 0.1 + 0.9).toFixed(5).split('.')[1]
            }`,
            imgUrl: '/img/avatar11.png',
            holderName: 'Darlene Robert',
            phoneNum: '(+234) 814 324 6719',
        }
    })

    const [fetchedAccessCardData, setFetchedAccessCardData] = useState<
        AccessCard[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedAccessCardData(ACCESSCARD_LIST)
        }, 100)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: AccessCard[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedAccessCardData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: AccessCard[][] = []
        for (let i = 0; i < fetchedAccessCardData.length; i += item) {
            slicedPages.push(fetchedAccessCardData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedAccessCardData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: AccessCard[][] = []
        for (
            let i = 0;
            i < fetchedAccessCardData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedAccessCardData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedAccessCardData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedAccessCardData])

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

    const saveChangesHandler = () => {
        console.log('add security guard')

        closeDialog()
    }

    return (
        <section className='bg-color-white rounded-lg border  overflow-scroll h-full'>
            <div className='grid text-[1.6rem]'>
                <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/admins/search.svg'
                            alt=''
                            className='absolute left-4 text-[4rem]'
                        />
                        <input
                            type='text'
                            placeholder='Search Parameters'
                            className='pl-16 w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                        />
                    </div>
                    <div className='relative flex items-center'>
                        <select className=' cursor-pointer w-[20rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                            <option hidden value=''>
                                Sort By
                            </option>
                            <option value='date'>date</option>
                            <option value='alpha'>Alpha</option>
                        </select>
                        <GrDown className='absolute right-4 text-[1.3rem]' />
                    </div>
                </div>

                <div className='grid'>
                    <div className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-3 gap-6 capitalize'>
                        <p>Access Card Seriel Nos.</p>
                        <p>Holder’s Name</p>
                        <p>Phone Number</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        {slicedPages && slicedPages.length > 0 ? (
                            React.Children.toArray(
                                slicedPages[paginate.index].map(
                                    ({
                                        id,
                                        serialNum,
                                        holderName,
                                        phoneNum,
                                        imgUrl,
                                    }) => {
                                        return (
                                            <div className='grid justify-between border-b grid-cols-3 gap-8 py-4 items-center'>
                                                <p>{serialNum}</p>
                                                <p className='flex items-center gap-4'>
                                                    <img
                                                        src={imgUrl}
                                                        alt=''
                                                        className='w-[3.5rem] h-[h-3.5rem] rounded-full object-cover'
                                                    />

                                                    <span className=' max-w-[40rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                        {holderName}
                                                    </span>
                                                </p>
                                                <p>{phoneNum}</p>
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
            </div>{' '}
        </section>
    )
}

export default AccessCardList
