import React from 'react'
import Table from '../../../../../components/UI/table/Table'

function SOSTable() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                title={'artisan'}
                fetch_url={'/platformsettings/sos/getall/'}
                view_page_url={'/superAdmin/admin/view/'}
                THeader={['name', 'business name', 'estate_count', 'actions']}
                actions={['remove']}
                data_to_display={['firstname', 'business_name', 'phone_number']}
                deactivateProp={{ url: '/admin/deactivate_activate' }}
            />
        </div>
    )
}

export default SOSTable
