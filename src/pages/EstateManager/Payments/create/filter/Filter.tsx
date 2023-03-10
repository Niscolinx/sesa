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
