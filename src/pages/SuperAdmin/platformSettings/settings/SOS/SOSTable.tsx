import Table from '../../../../../components/UI/table/Table'

function SOSTable() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                title={'SOS'}
                fetch_url={'/platformsettings/sos/getall'}
                view_page_url={'/superAdmin/platformSettings/SOSDetail/'}
                add_page_url={'/superAdmin/platformSettings/addSOS'}
                is_add_btn={true}
                THeader={['name', 'estate_count', 'created_at', 'actions']}
                data_to_display={['name', 'estate_count', 'created_at']}
                deactivateProp={{ url: '/admin/deactivate_activate' }}
            />
        </div>
    )
}

export default SOSTable
