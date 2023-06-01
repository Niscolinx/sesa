import Table from '../../../components/ui/table/Table'

function Household() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/si/getall'}
                title={'household'}
                view_page_url={'/estateManager/site-worker/view/'}
                add_page_url={'/estateManager/site-worker/add'}
                is_add_btn={true}
                is_addWithin={true}
                THeader={[
                   'Property Code', 
                   'Property Type', 
                   'Category/Name',
                   'Occupants',
                   'RFID',
                   'Access Card',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'property_code',
                    'property_type',
                    'property_code',
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
