import React, {
    ChangeEvent,
    FC,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import EstateListTable from './EstateListTable'
import { useQuery } from 'react-query'
import useAxios from '../../../../components/hooks/useAxios'
import Table from '../../../../components/UI/table/Table'

type DialogType = 'warning'

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

    const fetchRequest = () => {
        return axiosInstance({
            url: `/admin/group/getSingleGroup/${groupId}`,
        })
    }

    const { data, isLoading } = useQuery<any>(
        ['group_artisan_list'],
        fetchRequest
    )

   

  
    // const dialogRef = useRef<HTMLDialogElement | null>(null)

    // const handleClose = () => {
    //     if (dialogRef.current) {
    //         dialogRef.current.close()
    //     }
    // }

    // const handleOpen = (modalState: DialogType) => {
    //     if (modalState === 'warning') {
    //         setIsWarning(true)
    //     } else {
    //         setIsWarning(false)
    //     }

    //     if (dialogRef.current) {
    //         dialogRef.current.showModal()
    //     }
    // }

    // const addGroupHandler = () => {
    //     // navigate('/superAdmin/viewArtisanGroup/add')
    // }

    // const confirmDeactivation = () => {
    //     handleClose()
    //     toast('Artisan Group deleted successfully', {
    //         type: 'error',
    //         className: 'bg-red-100 text-red-600 text-[1.4rem]',
    //     })
    // }

    if (isLoading) {
        return <p className='p-8'>Loading...</p>
    }

    console.log({ data })

    return (
        <>
            <ToastContainer />
            {/* <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        {!isWarning ? (
                            <form
                                className='grid gap-12'
                                onSubmit={handleDialogSubmit}
                            >
                                <h3
                                    className='text-[2rem] font-Satoshi-Medium border-b '
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    Create Artisan Group
                                </h3>

                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='artisanName'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Name
                                    </label>

                                    <input
                                        type='text'
                                        required
                                        id='artisanName'
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                    />
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Create
                                </button>
                            </form>
                        ) : (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />

                                <p>
                                    Are you sure you want to delete this Artisan
                                    Group?
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={confirmDeactivation}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </dialog> */}
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
                    THeader={[
                        'estate name',
                        'location',
                        'actions',
                    ]}
                    actions={['remove']}
                    data_to_display={[
                        'estate_name',
                        'address'
                      
                    ]}
                    isDataProvided={true}
                    providedData={data.data}
                />
            </div>
        </>
    )
}

export default ViewArtisanGroup
