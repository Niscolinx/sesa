import { useParams } from 'react-router'
import Table from '../../../components/UI/table/Table'

const AdvertViews = () => {
    const params = useParams()
    const advert_id = params.id

    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={`/advertstatistics/clickorview/details?advert_id=${advert_id}&category=click&perPage=10`}
                title={'clicks'}
                is_dropdown={false}
                THeader={[
                    'estate_name',
                    'address',
                    'resident_count',
                    'clicks_count',
                ]}
                data_to_display={[
                    'estate_name',
                    'address',
                    'no_of_resident',
                    'clicks',
                ]}
            />
        </div>
    )
}

export default AdvertViews
