import Table from '../../../components/UI/table/Table'

function SecurityManagers() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/security-company-manager/get/all'}
                title={'securityManager'}
                view_page_url={'/superAdmin/securityManagers/view/'}
                add_page_url={'/security-company-manager/get/all'}
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
                    'onboarding_date',
                    'status',
                ]}
                deactivateProp={{ url: 'change/user/status' }}
            />
        </div>
    )
}

export default SecurityManagers
