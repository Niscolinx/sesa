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
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../utils/useFetchData'

type DialogType = 'warning' | 'add-Category'

export interface IViewArtisanCategory {
    id: string
    artisanName: string
    businessName: string
    phoneNumber: string
}

const VIEW_ARTISAN_CATEGORY: IViewArtisanCategory[] = [
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
    {
        id: '1',
        artisanName: 'Chibuzor Okafor',
        businessName: 'Lariza Orjo',
        phoneNumber: '08012345678',
    },
]

type Actions = 'Delete' | 'View Details'

const ViewArtisanCategory = () => {
    const navigate = useNavigate()

    const [isWarning, setIsWarning] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [fetchedArtisanCategories, setFetchedArtisanCategories] = useState<
        IViewArtisanCategory[]
    >([])

    useEffect(() => {
        setTimeout(() => {
            setFetchedArtisanCategories(VIEW_ARTISAN_CATEGORY)
            //setIsLoaded(true)
        }, 200)
    }, [])

    const { data: category_detail, isLoading: category_detail_loading } =
        useFetchData({
            url: '/admin/category/get/single/2',
            name: 'category_single',
        })

 
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
                        ) : (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />

                                <p>
                                    Are you sure you want to delete this
                                    Artisan?
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
            </dialog>
            <div className='grid text-[1.6rem] bg-white px-10 rounded-lg'>
                <div className='flex gap-8 py-10 max-w-[50rem] items-end'>
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
               
            </div>
        </>
    )
}

export default ViewArtisanCategory
