import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        type: 'number',
        width: 160,
    },
    {
        field: 'onboardingDate',
        headerName: 'Onboarding Date',
        width: 160,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 160,
    },
]

const rows = [
    {
        id: 1,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
    {
        id: 2,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
    {
        id: 3,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
    {
        id: 4,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
    {
        id: 5,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
    {
        id: 6,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
    {
        id: 7,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
    {
        id: 8,
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
        actions: '',
    },
]

export default function RenderedAdmins() {
    return (
        <div className='renderedAdmins'>
            <DataGrid
                className='renderedAdmins__table'
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}
