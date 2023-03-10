import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'

interface Payment {
    id: string
    propertyCode: string
    address: string
    propertyCategory: string
    propertyName: string
    paid: boolean
    propertyType: string
    tenancyType: string
    date: string
}

const PropertyNames = [
    'Dangote',
    'Ed Schools',
    'Cement Depo',
    'Mo Complex',
    'Maz Homes',
]

const PAYMENT: Payment[] = Array.from({
    length: 20,
}).map((_, i) => ({
    id: `i + ${i}`,
    propertyName:
        PropertyNames[Math.floor(Math.random() * PropertyNames.length)],
    propertyCategory: Math.random() > 0.5 ? 'Business' : 'Residential',
    propertyCode: `H${Math.floor(Math.random() * 3000 + 1000)}`,
    address: 'Blk.2, Flt. 3, Zone A',
    propertyType: Math.random() > 0.5 ? '2-Bedroom Self Con.' : 'Duplex',
    tenancyType:
        Math.random() > 0.5 ? 'Landlord (Developer)' : 'Tenant (Resident)',
    paid: Math.random() > 0.3 ? true : false,
    date: '12 May, 2023',
}))

const HouseholdFilter: FC = () => {
    const [fetchedPaymentData, setFetchedPaymentData] = useState<Payment[]>([])
    const [filter, setFilter] = useState<string | null>(null)

    useEffect(() => {
        setTimeout(() => {
            setFetchedPaymentData(PAYMENT)
        }, 1000)
    }, [])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Payment[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]
    const perPage = 4

    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,
        totalPage: Math.ceil(fetchedPaymentData.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Payment[][] = []
        for (let i = 0; i < fetchedPaymentData.length; i += item) {
            slicedPages.push(fetchedPaymentData.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedPaymentData.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Payment[][] = []
        for (
            let i = 0;
            i < fetchedPaymentData.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedPaymentData.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedPaymentData.length / paginate.itemsPerPage
                ),
            }
        })
    }, [fetchedPaymentData])

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

    const downloadDocHandler = () => {
        //closePaymentDialog()
    }

    return (
        <main className='grid gap-9'>
            <div className='w-[40rem] p-8'>
                <p className='font-Satoshi-Medium text-[2rem]'>
                    {' '}
                    Filter Selection{' '}
                </p>
                <Select
                    state={['Households', 'Residents']}
                    selectedState={filter}
                    setSelectedState={setFilter}
                    placeholder='Households'
                />
            </div>
           
        </main>
    )
}

export default HouseholdFilter
