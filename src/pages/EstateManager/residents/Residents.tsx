import OverviewCard from '../../../components/estateManager/OverviewCard'
import useFetchData from '../../../components/hooks/UseFetchData'
import Spinner from '../../../components/ui/Spinner'
import Table from '../../../components/ui/table/Table'

function Residents() {
    
    const {isLoading, data} = useFetchData({
        url: '/manager/resident/getall/residentStatistics',
        name: 'residentStatistics'
    })

    if(isLoading){
        return <Spinner start={isLoading}/>
    }



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
                        number={1532}
                        iconUrl='/icons/estateManager/people.svg'
                        bgColor='bg-[#F5F9FA]'
                        textColor='text-[#00C2FF]'
                        bottomLeft='Alpha 56%'
                        bottomRight='Res. User 44%'
                    />
                    <OverviewCard
                        title='KYR Validation'
                        number='45%'
                        iconUrl='/icons/estateManager/validation.svg'
                        bgColor='bg-[#EDFDEC]'
                        textColor='text-[#1A8F56]'
                        bottomLeft='% of residents whose identity has been validated'
                    />
                   
                </div>
            </section>

            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                <Table
                    fetch_url={'/manager/resident/getall'}
                    title={'residents'}
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
