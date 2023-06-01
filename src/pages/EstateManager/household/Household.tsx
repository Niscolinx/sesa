import Table from '../../../components/ui/table/Table'

function Household() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/site-worker/getall'}
                title={'household'}
                view_page_url={'/estateManager/site-worker/view/'}
                add_page_url={'/estateManager/site-worker/add'}
                is_add_btn={true}
                isCategory={true}
                THeader={[
                    'SW Code',
                    'SW Name',
                    'Phone Number',
                    'Work days',
                    'Work Period',
                    'Work Location',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'site_worker_code',
                    'firstname',
                    'phone_number',
                    'work_days',
                    'access_period_start_date',
                    'address',
                    'status',
                ]}
                deactivateProp={{
                    url: '/site-worker/deactivate_activate',
                }}
            />
        </div>
    )
}

export default Household
