import React from 'react'
import Table from '../../../components/ui/table/Table'

function SiteWorker() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/site-worker/getall'}
                title={'siteWorker'}
                view_page_url={'/estateManager/site-worker/view/'}
                add_page_url={'/estateManager/site-worker/add'}
                is_add_btn={true}
                THeader={[
                    'SW Code',
                    'SW Name',
                    'Phone Number',
                    'P',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'staff_code',
                    'staff_name',
                    'phone_number',
                    'work_days',
                    'status',
                ]}
                deactivateProp={{
                    url: '/manager/estate-admin/deactivate_activate',
                }}
            />
        </div>
    )
}

export default SiteWorker
