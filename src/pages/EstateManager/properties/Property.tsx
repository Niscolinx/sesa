import { EstateChart } from '../../../components/superAdmin/charts/OverviewChart'
import useFetchData from '../../../components/hooks/UseFetchData'
import Spinner from '../../../components/ui/Spinner'
import Table from '../../../components/ui/table/Table'

function Property() {
    const { isLoading: chart_loading, data: chart_data } = useFetchData({
        url: '/property/propertyData',
        name: 'property_data',
    })
    const { isLoading: type_loading, data: type_data } = useFetchData({
        url: '/property/propertyTypeData',
        name: 'property_type_data',
    })

    const { isLoading, data } = useFetchData({
        url: '/property/getall',
        name: 'property_all',
    })

    if (isLoading || type_loading || chart_loading) {
        return <Spinner start={isLoading} />
    }

    const property_data = [
        { name: 'residential', value: chart_data.resident_property },
        { name: 'business', value: chart_data.business_property },
    ]

    return (
        <>
            <section className=' grid grid-cols-2 gap-16 '>
                <div className='flex items-center gap-8 bg-white rounded-lg p-8'>
                    <div className='overviewChart__box'>
                        <EstateChart
                            color1='#098DFF'
                            color2='#23C375'
                            data={property_data}
                        />

                        <div className='overviewChart__label'>
                            <p className='text-[3rem] font-Satoshi-Medium relative'>
                                {chart_data.resident_property +
                                    chart_data.business_property}
                            </p>
                            <p className='text-[1.2rem] max-w-[9.8rem]'>
                                Total Properties
                            </p>
                        </div>
                    </div>
                    <div className='grid gap-4'>
                        <section className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-2'>
                                <span className='bg-[#098DFF] rounded-full w-[1rem] h-[1rem] flex'>
                                    {' '}
                                </span>{' '}
                                <p>Residential</p>
                            </div>
                            <p>{data.resident_property}</p>
                        </section>
                        <section className='flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-2'>
                                <span className='bg-[#23C375] rounded-full w-[1rem] h-[1rem] flex'>
                                    {' '}
                                </span>{' '}
                                <p>Business</p>
                            </div>
                            <p>{data.business_property}</p>
                        </section>
                    </div>
                </div>
                <div className='flex justify-between bg-white rounded-lg p-8 max-h-[30rem] overflow-y-auto'>
                    <div>
                        <p className='font-Satoshi-Medium text-[1.8rem] mb-5'>
                            Property Type
                        </p>

                        <div className='grid gap-4'>
                            {type_data.data.map(
                                (type: Record<string, string>, i: number) => {
                                    return (
                                        <p
                                            className='flex items-center gap-4'
                                            key={i}
                                        >
                                            <span className='bg-[#5856D6] rounded-full w-[1rem] h-[1rem] flex'>
                                                &nbsp;
                                            </span>
                                            {type.property_type}
                                        </p>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <div>
                        <p className='font-Satoshi-Medium text-[1.8rem] mb-5'>
                            Count
                        </p>

                        <div className='grid gap-4'>
                            {type_data.data.map(
                                (type: Record<string, string>, i: number) => {
                                    return (
                                        <p
                                            className='flex items-center gap-4'
                                            key={i}
                                        >
                                            {type.property_count}
                                        </p>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                <Table
                    title={'property'}
                    isDataProvided
                    providedData={data.data}
                    view_page_url={'/estateManager/estate-admin/view/'}
                    add_page_url={'/estateManager/estate-admin/add'}
                    is_add_btn={true}
                    THeader={[
                        'name',
                        'code',
                        'address',
                        'type',
                        'category',
                        'status',
                        'actions',
                    ]}
                    data_to_display={[
                        'estate_name',
                        'image_url',
                        'property_code',
                        'property_address',
                        'property_type',
                        'property_category',
                        'status',
                    ]}
                    deactivateProp={{
                        url: '/property/deactivate_activate',
                    }}
                />
            </div>
        </>
    )
}

export default Property
