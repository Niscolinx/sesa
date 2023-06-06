import { useParams } from 'react-router-dom'

import OverviewCard from '../../../components/superadmin/overview/OverviewCard'
import useFetchData from '../../../components/hooks/useFetchData'
import Table from '../../../components/ui/table/Table'

function EstateDetail() {
    const params = useParams()

    const estate_id = params.id?.replace(':', '')

    const { data, isLoading } = useFetchData({
        url: `/estate/getbyid/${estate_id}`,
        name: `get_estate_${estate_id}`,
    })
    const { data: estate_data, isLoading: estate_isLoading } = useFetchData({
        url: `/estate/get/estate-household?estate_id=${estate_id}&perPage=1`,
        name: `estate_detail_${estate_id}`,
    })

    if (isLoading || estate_isLoading) {
        return <p>Loading...</p>
    }

    if (data?.estate_name === undefined) {
        return <p>No Data Found</p>
    }

    const {
        resident_count,
        household_count,
        property_count,
        estate_name,
        onboarding_date,
    } = data

    return (
        <div className='mt-8 grid gap-8'>
            <section className='bg-white rounded-lg p-8 grid h-[28rem] text-[1.4rem]'>
                <div className='flex w-full justify-between capitalize'>
                    <p>{estate_name}</p>
                    <p className='text-[#666869]'>
                        Joined:{' '}
                        <span className='text-black'>{onboarding_date}</span>
                    </p>
                </div>
                <div className='overview flex justify-between'>
                    <OverviewCard
                        title='Residents'
                        number={resident_count}
                        iconUrl='/icons/overview/residents.svg'
                        bgColor='bg-[#DDFCDC]'
                        textColor='text-[#1A8F56]'
                    />
                    <OverviewCard
                        title='Property'
                        number={property_count}
                        iconUrl='/icons/overview/property.svg'
                        bgColor='bg-[#F5F9FA]'
                        textColor='text-[#00C2FF]'
                    />
                    <OverviewCard
                        title='Household'
                        number={household_count}
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
                title={'household'}
                THeader={[
                    'address',
                    'property category',
                    'property name',
                    'occupants',
                    'RFID',
                    'access card',
                ]}
                is_dropdown={false}
                data_to_display={[
                    'address',
                    'property_category',
                    'property_name',
                    'house_hold_resident_count',
                    'rfid_count',
                    'access_card_count',
                ]}
                isDataProvided={true}
                providedData={estate_data.data}
            />
        </div>
    )
}

export default EstateDetail
