import Table from '../../../../../components/UI/table/Table'

function PropertyType() {
    return (
        <Table
            fetch_url={'/platformsettings/propertytype/getall'}
            title={'propertyType'}
            view_page_url={'/superAdmin/platformSettings/view/'}
            add_page_url={'/superAdmin/platformSettings/addProperty'}
            is_add_btn={true}
            isStrictAction
            actions={['view details']}
            THeader={['property type', 'description', 'actions']}
            data_to_display={['property_type', 'description', 'view details']}
        />
    )
}

export default PropertyType
