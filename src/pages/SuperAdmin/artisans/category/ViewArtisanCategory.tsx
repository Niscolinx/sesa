import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../utils/useFetchData'
import Table from '../../../../components/UI/table/Table'
import { useMutation } from 'react-query'
import useAxios from '../../../../components/hooks/useAxios'

const ViewArtisanCategory = () => {
    const navigate = useNavigate()
    const params = useParams()

    const category_id = params.id?.replace(':', '')
    const axiosInstance = useAxios()

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
            <ToastContainer />
        
            <div className=' text-[1.6rem] bg-white rounded-lg min-h-[70vh] '>
                <form
                    className='flex gap-8 py-10 max-w-[50rem] items-end px-10 '
                    onSubmit={onSubmit}
                >
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='categoryName'
                            className='text-[1.4rem] font-semibold'
                        >
                            Category Name
                        </label>

                        <input
                            type='text'
                            required
                            defaultValue={category_detail?.name}
                            onChange={(e) => setName(e.target.value)}
                            id='categoryName'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>

                    <button className='btn bg-[#0556E5] text-white rounded-lg py-4 w-[15rem]'>
                        {isLoading ? 'Loading...' : 'Update'}
                    </button>
                </form>

                <Table
                    // fetch_url={`/admin/category/get/single/users/2`}
                    // fetch_url={`/admin/category/get/single/users/${category_id}`}
                    title={'category users'}
                    isDataProvided
                    providedData={category_users.data}
                    view_page_url={'/superAdmin/artisan/category/'}
                    isStrictAction
                    actions={['delete']}
                    titleDialog={'Category User'}
                    delete_item_url={'/admin/category/delete/'}
                    THeader={[
                        'name',
                        'Business Name',
                        'Phone Number',
                        'actions',
                    ]}
                    data_to_display={[
                        'firstname',
                        'business_name',
                        'phone_number',
                    ]}
                />
            </div>
        </>
    )
}

export default ViewArtisanCategory
