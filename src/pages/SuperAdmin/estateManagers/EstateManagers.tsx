import Table from '../../../components/UI/table/Table'

function EstateManagers() {
    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <Table
                fetch_url={'/manager/get/all'}
                title={'estateManager'}
                view_page_url={'/superAdmin/estateManagers/view/'}
                add_page_url={'/superAdmin/estateManagers/add'}
                is_add_btn={true}
                THeader={[
                    'name',
                    'gender',
                    'phone number',
                    'joined date',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'name',
                    'image',
                    'gender',
                    'phone',
                    'created_at',
                    'status',
                ]}
                deactivateProp={{ url: 'change/user/status' }}
            />
        </div>
    )
}

export default EstateManagers
