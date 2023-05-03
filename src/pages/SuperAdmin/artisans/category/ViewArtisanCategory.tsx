import { FormEvent, useRef } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../utils/useFetchData'
import Table from '../../../../components/UI/table/Table'

const ViewArtisanCategory = () => {
    const navigate = useNavigate()

    const handleDialogSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleClose()

        toast('Category Created successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const { data: category_detail, isLoading: category_detail_loading } =
        useFetchData({
            url: '/admin/category/get/single/2',
            name: 'category_single',
        })

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

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
                                Create Artisan Category
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
                    </div>
                </section>
            </dialog>
            <div className='grid text-[1.6rem] bg-white rounded-lg'>
                <div className='flex gap-8 py-10 max-w-[50rem] items-end px-10 '>
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
                            placeholder='Plumber'
                            id='categoryName'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>

                    <button className='btn bg-[#0556E5] text-white rounded-lg py-4 w-[15rem]'>
                        Update
                    </button>
                </div>

                <Table
                    fetch_url={'/admin/category/get/single/users/2'}
                    title={'category users'}
                    view_page_url={'/superAdmin/artisan/category/'}
                    isStrictAction
                    actions={['delete']}
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
