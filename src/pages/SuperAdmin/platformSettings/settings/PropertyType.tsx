import React from 'react'
import Table from '../../../../components/UI/table/Table'

function PropertyType() {
    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <Table
                fetch_url={'/platformsettings/propertytype/getall'}
                title={'propertyType'}
                is_dropdown={false}
                add_page_url={'/superAdmin/platformSettings/addProperty'}
                is_add_btn={true}
                THeader={['property type', 'description']}
                data_to_display={['property_type', 'description']}
            />
        </div>
    )
}

export default PropertyType
