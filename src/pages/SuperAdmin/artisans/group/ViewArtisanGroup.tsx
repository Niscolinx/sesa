import { useNavigate, useParams } from 'react-router'
import Table from '../../../../Components/UI/table/Table'
import useFetchData from '../../../../utils/useFetchData'
import { useState, FormEvent, useEffect } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useAxios from '../../../../Components/hooks/useAxios'

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
    const [name, setName] = useState('')

    const { data: response_data, isLoading } = useFetchData({
        url: `/admin/group/getSingleGroup/16`,
        name: `view_group_${groupId}`,
        nested: false,

        // url: `/admin/group/getSingleGroup/${groupId}`,
    })

    useEffect(() => {
        if (response_data) {
            setName(response_data.name)
        }
    }, [response_data])

    const updateRequest = () => {
        return axiosInstance({
            // url: `/admin/group/update/2`,
            url: `/admin/group/update/${groupId}`,
            method: 'post',
            data: { name },
        })
    }
    const { isLoading: update_loading, mutate } = useMutation(
        'update_group_name',
        updateRequest,
        {
            onSuccess: () => {
                toast('Group updated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },

            onError: () => {
                toast('Failed to update group', {
                    type: 'error',
                    className: 'bg-red-100 text-red-600 text-[1.4rem]',
                })
            },
        }
    )

    const { data: group_artisans, isLoading: group_artisans_loading } =
        useFetchData({
            url: `/admin/group/getSingleGroupUsers/${groupId}`,
            name: 'group_artisans',
        })
    const { data: group_estates, isLoading: group_estates_loading } =
        useFetchData({
            url: `/admin/group/getSingleGroupEstate/${groupId}`,
            name: 'group_estates',
        })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (name === '') {
            toast('Update the name of the group', {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem]',
            })
            return
        }

        mutate()
    }

    if (isLoading || group_artisans_loading || group_estates_loading) {
        return <p className='p-8'>Loading...</p>
    }

    console.log({ group_estates })

    return (
        <>
            <div className='grid text-[1.6rem] bg-white px-10 rounded-lg'>
                <form
                    className='flex gap-8 py-10 max-w-[50rem] items-end'
                    onSubmit={onSubmit}
                >
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id='groupName'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>
                    <button className='btn bg-[#0556E5] text-white rounded-lg py-4 w-[15rem]'>
                        {update_loading ? 'Updating...' : 'Update'}
                    </button>
                </form>

                <Table
                    title={'artisan'}
                    view_page_url={'/superAdmin/admin/view/'}
                    THeader={[
                        'name',
                        'business name',
                        'phone number',
                        'actions',
                    ]}
                    isStrictAction
                    actions={['remove']}
                    secondary_id={'artisan_id'}
                    view_with_secondary_id={true}
                    data_to_display={[
                        'firstname',
                        'business_name',
                        'phone_number',
                    ]}
                    isDataProvided={true}
                    providedData={group_artisans.data}
                    deactivateProp={{ url: '/admin/group/removeGroupUsers' }}
                />
                <Table
                    title={'estate'}
                    view_page_url={'/superAdmin/admin/view/'}
                    THeader={['estate name', 'location', 'actions']}
                    actions={['remove']}
                    deactivateProp={{ url: '/admin/group/removeGroupEstates' }}
                    data_to_display={['estate_name', 'address']}
                    isDataProvided={true}
                    providedData={group_estates.data}
                />
            </div>
        </>
    )
}

export default ViewArtisanGroup
