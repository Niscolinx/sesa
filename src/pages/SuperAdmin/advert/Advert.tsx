import { useState } from 'react'
import AdvertList from './AdvertList'
import AvailableEstateAdvert from './AvailableEstateAdvert'
import Table from '../../../components/UI/table/Table'

function Advert() {
    type PathSwitch = 'advertList'

    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('advertList')

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        advertList: <AdvertList />,
        // availableEstates: <AvailableEstateAdvert />,
    }

    return (
            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                <Table
                    fetch_url={'/advert/getall'}
                    title={'advert'}
                    view_page_url={'/superAdmin/advert/detail/'}
                    add_page_url={'/superAdmin/advert/add'}
                    is_add_btn={true}
                    THeader={[
                        'advert_name',
                        'start_date',
                        'end_date',
                        'joined date',
                        'status',
                        'actions',
                    ]}
                    data_to_display={[
                        'advert_name',
                        'start_date',
                        'end_date',
                        'created_at',
                        'status',
                    ]}
                    deactivateProp={{ url: '/advert/deactivate_activate' }}
                />
            </div>
    )
}

export default Advert
