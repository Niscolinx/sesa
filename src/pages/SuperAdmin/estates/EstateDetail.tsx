import { useParams } from 'react-router-dom'

import OverviewCard from '../../../components/SuperAdmin/overview/OverviewCard'
import useFetchData from '../../../utils/useFetchData'
import Table from '../../../components/UI/table/Table'

interface EstateManager {
    id: string
    propertyCode: string
    address: string
    propertyCategory: string
    propertyName: string
    occupants: number
    RFID: number
    accessCard: number
    status: string
}

function EstateDetail() {
    const { data, isLoading } = useFetchData({
        url: `/estate/getall`,
        name: 'estate_details',
    })

    if (isLoading) {
        //     <p>Property Code</p>
        // </p>
        // <p>Address</p>
        // <p>Property Category</p>
        // <p>Property Name</p>
        // <p>Occupants</p>
        // <p>RFID</p>
        // <p>Access Card</p>
        // <p>Status</p>
        return <p>Loading...</p>
    }

    return (
        <div className='mt-8 grid gap-8'>
            <section className='bg-white rounded-lg p-8 grid h-[28rem] text-[1.4rem]'>
                <div className='flex w-full justify-between'>
                    <p>Iba Housing Estate</p>
                    <p className='text-[#666869]'>
                        Joined: <span className='text-black'>08 May, 2022</span>
                    </p>
                </div>
                <div className='overview flex justify-between'>
                    <OverviewCard
                        title='Residents'
                        number={18_000}
                        iconUrl='/icons/overview/residents.svg'
                        bgColor='bg-[#DDFCDC]'
                        textColor='text-[#1A8F56]'
                    />
                    <OverviewCard
                        title='Property'
                        number={4}
                        iconUrl='/icons/overview/property.svg'
                        bgColor='bg-[#F5F9FA]'
                        textColor='text-[#00C2FF]'
                    />
                    <OverviewCard
                        title='Household'
                        number={40}
                        iconUrl='/icons/overview/household2.svg'
                        bgColor='bg-[#FCF3FA]'
                        textColor='text-[#B6008E]'
                    />
                </div>
                {/* <div className='flex justify-end'>
                            <Link
                                to={`/superAdmin/estates/detail/report/:4`}
                                className='text-[#0660FE] text-[1.4rem]'
                            >
                                View Estate Report
                            </Link>
                        </div> */}
            </section>
            <Table
                title={'artisan'}
                THeader={['address', 'property category', 'property name', 'occupants', 'RFID', 'access card', 'actions']}
                actions={['remove']}
                data_to_display={['firstname', 'business_name', 'phone_number']}
                isDataProvided={true}
                providedData={data.data}
                deactivateProp={{ url: '/admin/deactivate_activate' }}
            />
        </div>
    )
}

export default EstateDetail
