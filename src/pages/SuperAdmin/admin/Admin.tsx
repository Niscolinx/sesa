import Table from '../../../components/ui/table/Table'

function Admin() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/admin/get/all'}
                title={'admin'}
                view_page_url={'/superAdmin/admin/view/'}
                add_page_url={'/superAdmin/admin/add'}
                is_add_btn={true}
                THeader={[
                    'name',
                    'gender',
                    'phone number',
                    'onboarding date',
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
                deactivateProp={{ url: '/admin/deactivate_activate' }}
            />
        </div>
    )
}

export default Admin
