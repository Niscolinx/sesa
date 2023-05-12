import Table from '../../../components/UI/table/Table'

function SecurityManagers() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/security-company-manager/get/all'}
                title={'securityManager'}
                view_page_url={'/superAdmin/securityManagers/view/'}
                add_page_url={'/superAdmin/securityManagers/add'}
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
                deactivateProp={{
                    url: '/security-company-manager/deactivate_activate',
                }}
            />
        </div>
    )
}

export default SecurityManagers
