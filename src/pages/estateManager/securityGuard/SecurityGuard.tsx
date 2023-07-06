import Table from '../../../components/ui/table/Table'

function SecurityGuard() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/security-guard/getguards'}
                title={'securityGuard'}
                view_page_url={'/estateManager/security-guard/view/'}
                add_page_url={'/estateManager/security-guard/add'}
                is_add_btn={true}
                THeader={[
                    'guard code',
                    'name',
                    'phone number',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'security_guard_code',
                    'name',
                    'phone_number',
                    'status',
                ]}
                deactivateProp={{
                    url: '/manager/security-guard/deactivate_activate',
                }}
            />
        </div>
    )
}

export default SecurityGuard
