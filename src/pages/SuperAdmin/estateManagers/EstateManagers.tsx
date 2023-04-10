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
                    data_to_display={[
                        'name',
                        'gender',
                        'phone',
                        'created_at',
                        'image',
                        'status',
                    ]}
                    deactivate_url={'change/user/status'}
                />
        
        </div>
    )
}

export default EstateManagers
