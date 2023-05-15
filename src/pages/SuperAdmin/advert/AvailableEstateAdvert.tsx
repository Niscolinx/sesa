import Table from '../../../Components/UI/table/Table'

function Advert() {
    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={'/advert/get/all'}
                title={'advert'}
                view_page_url={'/superAdvert/advert/view/'}
                add_page_url={'/superAdvert/advert/add'}
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
                deactivateProp={{ url: '/advert/deactivate_activate' }}
            />
        </div>
    )
}

export default Advert
