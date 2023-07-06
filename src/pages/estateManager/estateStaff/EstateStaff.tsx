import Table from '../../../components/ui/table/Table'

function EstateStaff() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/estate-staff/getall'}
                title={'estateStaff'}
                view_page_url={'/estateManager/estate-staff/view/'}
                add_page_url={'/estateManager/estate-staff/add'}
                is_add_btn={true}
                THeader={[
                    'staff code',
                    'staff name',
                    'phone number',
                    'work days',
                    'KYR',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'estate_staff_code',
                    'firstname',
                    'phone_number',
                    'work_days',
                    'kyr',
                    'status',
                ]}
                deactivateProp={{
                    url: '/estate-staff/deactivate_activate',
                }}
            />
        </div>
    )
}

export default EstateStaff
