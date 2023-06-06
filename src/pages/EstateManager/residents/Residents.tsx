import OverviewCard from '../../../components/estatemanager/OverviewCard'
import useFetchData from '../../../components/hooks/usseFetchData'
import Spinner from '../../../components/ui/Spinner'
import Table from '../../../components/ui/table/Table'

function Residents() {
    const { isLoading: statistics_loading, data: statistics_data } =
        useFetchData({
            url: '/manager/resident/getall/residentStatistics',
            name: 'residentStatistics',
        })

    const { isLoading, data } = useFetchData({
        url: '/manager/resident/getall',
        name: 'resident',
    })

    if (isLoading || statistics_loading) {
        return <Spinner start={isLoading} />
    }

    const { residents: res_num } = statistics_data

    const kyr = Math.floor(statistics_data.kyr)
    const resident_user = Math.floor(statistics_data.resident_user)
    const alpha = Math.floor(statistics_data.alpha)

    return (
        <>
            <section className='bg-white rounded-lg p-8 grid text-[1.4rem] '>
                <div
                    className=' grid gap-8'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(30rem, 1fr))',
                    }}
                >
                    <OverviewCard
                        title='Unique Residents'
                        number={res_num}
                        iconUrl='/icons/estateManager/people.svg'
                        bgColor='bg-[#F5F9FA]'
                        textColor='text-[#00C2FF]'
                        bottomLeft={`Alpha %${alpha}`}
                        bottomRight={`Res. User %${resident_user}`}
                    />
                    <OverviewCard
                        title='KYR Validation'
                        number={`%${kyr}`}
                        iconUrl='/icons/estateManager/validation.svg'
                        bgColor='bg-[#EDFDEC]'
                        textColor='text-[#1A8F56]'
                        bottomLeft={`${kyr}% of residents whose identity has been validated`}
                    />
                </div>
            </section>

            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                <Table
                    title={'resident'}
                    isDataProvided
                    providedData={data.data}
                    view_page_url={'/estateManager/resident/view/'}
                    add_page_url={'/estateManager/resident/add'}
                    is_add_btn={true}
                    THeader={[
                        'name',
                        'resident code',
                        'gender',
                        'phone number',
                        'status',
                        'actions',
                    ]}
                    data_to_display={[
                        'name',
                        'image',
                        'resident_code',
                        'gender',
                        'phone',
                        'status',
                    ]}
                    deactivateProp={{
                        url: '/manager/resident/deactivate_activate',
                    }}
                />
            </div>
        </>
    )
}

export default Residents
