import { useNavigate, useParams } from 'react-router'
import Table from '../../../../components/UI/table/Table'
import useFetchData from '../../../../utils/useFetchData'
import { useState, FormEvent } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useAxios from '../../../../components/hooks/useAxios'

export interface IViewArtisanGroup {
    id: string
    firstname: string
    lastname: string
    business_name: string
    phone_number: string
}


const ViewArtisanGroup = () => {
    const params = useParams()
    const axiosInstance = useAxios()

    const groupId = params.id?.replace(':', '')

    const { data: artisan_data, isLoading: artisan_loading } = useFetchData({
        url: `/admin/group/getSingleGroup/${groupId}`,
    })

     const [name, setName] = useState('')

     const updateRequest = () => {
         return axiosInstance({
             url: `/admin/category/update/2`,
             // url: `/admin/category/update/${category_id}`,
             method: 'post',
             data: { name },
         })
     }
     const { isLoading, mutate } = useMutation(
         'update_category_name',
         updateRequest,
         {
             onSuccess: () => {
                 toast('Category updated successfully', {
                     type: 'success',
                     className: 'bg-green-100 text-green-600 text-[1.4rem]',
                 })
             },

             onError: () => {
                 toast('Failed to update category', {
                     type: 'error',
                     className: 'bg-red-100 text-red-600 text-[1.4rem]',
                 })
             },
         }
     )

     const { data: category_detail, isLoading: category_detail_loading } =
         useFetchData({
             url: '/admin/category/get/single/2',
             name: 'category_single',
         })
     const { data: category_users, isLoading: category_users_loading } =
         useFetchData({
             url: '/admin/category/get/single/users/2',
             name: 'category_users',
         })

     const onSubmit = (e: FormEvent) => {
         e.preventDefault()

         if (name === '') {
             toast('Update the name of the category', {
                 type: 'error',
                 className: 'bg-red-100 text-red-600 text-[1.4rem]',
             })
             return
         }

         mutate()
     }

     if (category_detail_loading || category_users_loading) {
         return <p className='p-8'>Loading...</p>
     }


  

    

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
{/* 
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
                    providedData={artisan_data.data}
                    deactivateProp={{ url: '/admin/deactivate_activate' }}
                />
                <Table
                    title={'estate'}
                    view_page_url={'/superAdmin/admin/view/'}
                    THeader={['estate name', 'location', 'actions']}
                    actions={['remove']}
                    data_to_display={['estate_name', 'address']}
                    isDataProvided={true}
                    providedData={artisan_data.data}
                />
                */}
                </div> 
        </>
    )
}

export default ViewArtisanGroup
