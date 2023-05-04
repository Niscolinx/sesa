import { useNavigate, useParams } from 'react-router'
import { useQuery } from 'react-query'
import useAxios from '../../../../components/hooks/useAxios'
import Table from '../../../../components/UI/table/Table'
import useFetchData from '../../../../utils/useFetchData'

export interface IViewArtisanGroup {
    id: string
    firstname: string
    lastname: string
    business_name: string
    phone_number: string
}

type Actions = 'view details' | 'remove'

const ViewArtisanGroup = () => {
    const navigate = useNavigate()
    const axiosInstance = useAxios()
    const params = useParams()

    const groupId = params.id?.replace(':', '')

    const { data: artisan_data, isLoading: artisan_loading } = useFetchData({
        url: `/admin/group/getSingleGroup/${groupId}`,
    })

  

    

    return (
        <>
           
            <div className='grid text-[1.6rem] bg-white px-10 rounded-lg'>
                <div className='flex gap-8 py-10 max-w-[50rem] items-end'>
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='groupName'
                            className='text-[1.4rem] font-semibold'
                        >
                            Group Name
                        </label>

                        <input
                            type='text'
                            required
                            placeholder='Mainland group 1'
                            id='groupName'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>

                    <button className='btn bg-[#0556E5] text-white rounded-lg py-4 w-[15rem]'>
                        Update
                    </button>
                </div>

                <Table
                    title={'artisan'}
                    view_page_url={'/superAdmin/admin/view/'}
                    THeader={[
                        'name',
                        'business name',
                        'phone number',
                        'actions',
                    ]}
                    actions={['remove']}
                    data_to_display={[
                        'firstname',
                        'business_name',
                        'phone_number',
                    ]}
                    isDataProvided={true}
                    providedData={data.data}
                    deactivateProp={{ url: '/admin/deactivate_activate' }}
                />
                <Table
                    title={'estate'}
                    view_page_url={'/superAdmin/admin/view/'}
                    THeader={['estate name', 'location', 'actions']}
                    actions={['remove']}
                    data_to_display={['estate_name', 'address']}
                    isDataProvided={true}
                    providedData={data.data}
                />
            </div>
        </>
    )
}

export default ViewArtisanGroup
