import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

interface Recipient {
    id: string
    residentCode: string
    residentName: string
    propertyCategory: string
    propertyName: string
    isAlpha: boolean
    propertyType: string
    tenancyType: string
}

const RECIPIENT: Recipient[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: `i + ${i}`,
    residentName: 'John Emmanuel',
    propertyCategory: Math.random() > 0.5 ? 'Business' : 'Residential',
    residentCode: `H${Math.floor(Math.random() * 3000 + 1000)}`,
    propertyName: Math.random() > 0.5 ? 'Auto Finance' : 'Chrisland Schools',
    propertyType: Math.random() > 0.5 ? '2-Bedroom Self Con.' : 'Duplex',
    tenancyType:
        Math.random() > 0.5 ? 'Landlord (Developer)' : 'Tenant (Resident)',
    isAlpha: Math.random() > 0.3 ? true : false,
}))

interface IResidentFilter {
    closeResidentFilterDialog: () => void
}

const ResidentFilter: FC<IResidentFilter> = ({ closeResidentFilterDialog }) => {

    const [fetchedRecipientData, setFetchedRecipientData] = useState<
        Recipient[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedRecipientData(RECIPIENT)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Recipient[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedRecipientData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Recipient[][] = []
        for (let i = 0; i < fetchedRecipientData.length; i += item) {
            slicedPages.push(fetchedRecipientData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedRecipientData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Recipient[][] = []
        for (
            let i = 0;
            i < fetchedRecipientData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedRecipientData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedRecipientData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedRecipientData])

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

    const saveChangesHandler = () => {
        closeResidentFilterDialog()
    }

    return (
        <main className='mt-10 grid gap-9'>
            <section className='bg-color-white rounded-lg border overflow-scroll max-h-[80vh]'>
                <div className='grid text-[1.6rem]'>
                  

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
                                <p>Resident Code</p>
                            </p>
                            <p>Resident Name</p>
                            <p>Property Category</p>
                            <p>Property Name</p>
                            <p>Property Type</p>
                            <p>Tenancy Type</p>
                        </div>

                        <div className='grid gap-8 mt-8 p-8'>
                            {slicedPages && slicedPages.length > 0 ? (
                                React.Children.toArray(
                                    slicedPages[paginate.index].map(
                                        ({
                                            id,
                                            residentCode,
                                            residentName,
                                            propertyName,
                                            tenancyType,
                                            propertyType,
                                            propertyCategory,
                                            isAlpha,
                                        }) => {
                                            return (
                                                <div className='grid justify-between border-b grid-cols-6 gap-8 py-4'>
                                                    <p className='flex items-center gap-4'>
                                                        <input
                                                            type='checkbox'
                                                            className='cursor-pointer'
                                                        />

                                                        <span>
                                                            {residentCode}
                                                        </span>
                                                    </p>
                                                    <p className='flex items-center gap-2'>
                                                        <span>
                                                            {residentName}
                                                        </span>
                                                        {isAlpha ? (
                                                            <img
                                                                src='/img/alpha.svg'
                                                                alt=''
                                                            />
                                                        ) : null}
                                                    </p>
                                                    <p>{propertyCategory}</p>
                                                    <p>{propertyName}</p>

                                                    <p>{propertyType}</p>
                                                    <p>{tenancyType}</p>
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

export default ResidentFilter
