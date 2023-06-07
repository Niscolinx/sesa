import Table from '../../../components/ui/table/Table'

function SecurityGuard() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/manager/estate-admin/get/all'}
                title={'securityGuard'}
                view_page_url={'/estateManager/estate-admin/view/'}
                add_page_url={'/estateManager/estate-admin/add'}
                is_add_btn={true}
                THeader={[
                    'name',
                    'gender',
                    'phone number',
                    'estate',
                    'onboarding date',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'name',
                    'image',
                    'gender',
                    'phone',
                    'estate_name',
                    'onboarding_date',
                    'status',
                ]}
                deactivateProp={{
                    url: '/manager/estate-admin/deactivate_activate',
                }}
            />
        </div>
    )
}

export default SecurityGuard
