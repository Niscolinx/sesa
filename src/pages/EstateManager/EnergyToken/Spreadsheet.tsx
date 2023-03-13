import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'

interface Spreadsheet {
    id: string
    tokenSerialNo: string
    tokenCode: string
    denomination: string
    customNotification: string
    convenienceFee: string
    message: string
}

const SPREADSHEET: Spreadsheet[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: `i + ${i}`,
    tokenSerialNo: `H${Math.floor(Math.random() * 3000 + 1000)}`,
    tokenCode: '*********',
    denomination: Math.random() > 0.5 ? '5,000' : '10,000',
    customNotification: 'upcoming',
    convenienceFee: Math.random() > 0.5 ? '200' : '500',
    message: 'Message Alert',
}))

const EnergyTokenSpreadsheet = ({
    closeDialog,
}: {
    closeDialog: () => void
}) => {
    const [fetchedSpreadsheetData, setFetchedSpreadsheetData] = useState<
        Spreadsheet[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedSpreadsheetData(SPREADSHEET)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Spreadsheet[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedSpreadsheetData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Spreadsheet[][] = []
        for (let i = 0; i < fetchedSpreadsheetData.length; i += item) {
            slicedPages.push(fetchedSpreadsheetData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedSpreadsheetData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Spreadsheet[][] = []
        for (
            let i = 0;
            i < fetchedSpreadsheetData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedSpreadsheetData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedSpreadsheetData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedSpreadsheetData])

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

    return (
        <main className='relative h-[100vh] grid rounded-2xl overflow-hidden '>
            <section
                className='grid '
                style={{
                    gridTemplateRows: '.3fr 1fr',
                }}
            >
                <div className=' bg-[#098DFF] relative p-8 capitalize h-full'></div>
                <div className='h-full bg-blue-100'></div>
            </section>
            <section className=' rounded-lg overflow-scroll max-h-[90vh] absolute m-10 w-[90vw] justify-self-center'>
                <div className='text-white bg-[#098DFF] relative p-8 capitalize h-full'>
                    <IoMdClose
                        className='absolute right-0 top-0 text-[2.5rem] cursor-pointer m-5'
                        onClick={() => closeDialog()}
                    />
                    <p className='font-Satoshi-Medium text-[2rem]'>
                        Energy Token Speed 01
                    </p>
                    <p className='text-[1.2rem]'>Energy token speed 01</p>
                </div>
                <div className='grid text-[1.6rem] bg-white pt-10 rounded-2xl'>
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
                        <div className='ml-auto flex items-center gap-16'>
                            <button className='border text-color-blue-1 border-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'>
                                Print
                                <img src='/icons/print.svg' alt='' />
                            </button>
                            <button className='border text-color-blue-1 border-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'>
                                Download
                                <img src='/icons/file_download.svg' alt='' />
                            </button>
                        </div>
                    </div>

                    <div className='grid'>
                        <div
                            className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-6 gap-6'
                            style={{
                                fontSize: '1.6rem',
                            }}
                        >
                            <p className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    className='cursor-pointer'
                                />
                                <p>Token Serial No.</p>
                            </p>
                            <p>Token Code</p>
                            <p>Denomination(N)</p>
                            <p>Customer Notification</p>
                            <p>Convenience Fee</p>
                            <p>Message</p>
                        </div>

                        <div className='grid gap-8 mt-8 p-8'>
                            {slicedPages && slicedPages.length > 0 ? (
                                React.Children.toArray(
                                    slicedPages[paginate.index].map(
                                        ({
                                            id,
                                            tokenSerialNo,
                                            tokenCode,
                                            customNotification,
                                            message,
                                            convenienceFee,
                                            denomination,
                                      
                                        }) => {
                                            return (
                                                <div className='grid justify-between border-b grid-cols-6 gap-8 py-4 capitalize'>
                                                    <p className='flex items-center gap-4'>
                                                        <input
                                                            type='checkbox'
                                                            className='cursor-pointer'
                                                        />

                                                        <span>
                                                            {tokenSerialNo}
                                                        </span>
                                                    </p>
                                                   <p>{tokenCode}</p>
                                                    <p>{denomination}</p>
                                                    <p>{customNotification}</p>

                                                    <p>{convenienceFee}</p>
                                                    <p>{message}</p>
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
                </div>{' '}
            </section>
        </main>
    )
}

export default EnergyTokenSpreadsheet
