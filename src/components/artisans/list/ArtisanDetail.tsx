import React, {
    FormEvent,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import { BsQuestionCircle } from 'react-icons/bs'
import Select from '../../UI/Select'
import { toast, ToastContainer } from 'react-toastify'

type Actions = 'Deactivate' | 'Delete'

const ArtisanDetail = () => {
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const [isArtisanDetail, setIsArtisanDetail] = useState(true)
    const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (dialogType: Actions) => {
        if (dialogType === 'Deactivate') {
            setDialogType('Deactivate')
        }
        if (dialogType === 'Delete') {
            setDialogType('Delete')
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleSelectedAction = (item: Actions) => {
        if (item === 'Deactivate') {
            handleOpen('Deactivate')
        }

        if (item === 'Delete') {
            handleOpen('Delete')
        }
    }

    const handleDeleteArtisan = () => {
        handleClose()

        toast('Artisan deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
    const handleDeactivateArtisan = () => {
        handleClose()

        toast('Artisan deactivated successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        {dialogType === 'Deactivate' ? (
                            <>
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to deactivate this
                                    Artisan
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeactivateArtisan}
                                    >
                                        Deactivate
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to delete this Artisan
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeleteArtisan}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </dialog>

            <div className='grid p-8 bg-white items-baseline overflow-y-scroll rounded-lg'>
                <div className='flex justify-between items-center'>
                    <label
                        htmlFor='photoUpload'
                        className='grid gap-4 cursor-pointer justify-items-center'
                    >
                        <img
                            src={photoUrl ? photoUrl : '/img/me.jpeg'}
                            alt='photoPreview'
                            className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                        />
                        <span className='text-color-blue-1 text-[1.4rem]'>
                            Edit
                        </span>
                    </label>
                    <input
                        type='file'
                        name='photoUpload'
                        id='photoUpload'
                        accept='image/*'
                        className='hidden'
                        onClick={handlePhotoPreview}
                    />

                    <div className='flex gap-8'>
                        <button
                            className='border border-color-blue-1 text-color-blue-1 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={() => handleSelectedAction('Deactivate')}
                        >
                            <span className=' text-[1.4rem] font-semibold'>
                                Deactivate
                            </span>
                        </button>
                        <button
                            className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={() => handleSelectedAction('Delete')}
                        >
                            <img src='/icons/admins/delete.svg' alt='' />
                            <span className='text-red-600 text-[1.4rem] font-semibold'>
                                Delete
                            </span>
                        </button>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='fullName'
                            className='text-[1.4rem] font-medium'
                        >
                            Full Name *
                        </label>
                        <input
                            type='text'
                            required
                            id='fullName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='artisanCode'
                            className='text-[1.4rem] font-medium'
                        >
                            Artisan Code
                        </label>
                        <input
                            type='text'
                            required
                            id='artisanCode'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='DateOfBirth'
                            className='text-[1.4rem] font-medium'
                        >
                            Date of Birth
                        </label>
                        <input
                            type='text'
                            required
                            id='DateOfBirth'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='email'
                            className='text-[1.4rem] font-medium'
                        >
                            Email Address
                        </label>
                        <input
                            type='email'
                            required
                            id='email'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <div className='grid gap-4'>
                        <label
                            htmlFor='phoneNumber'
                            className='text-[1.4rem] font-medium'
                        >
                            Phone Number *
                        </label>

                        <div className='flex text-[1.6rem] gap-4   h-[5rem]'>
                            <select className='w-[30%] rounded-lg border border-color-grey py-4.8 px-4 outline-none cursor-pointer text-color-dark relative h-full'>
                                <option value='234'>+234</option>
                            </select>
                            <input
                                required
                                type='number'
                                inputMode='numeric'
                                id='phoneNumber'
                                placeholder='Phone Number'
                                className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                            />
                        </div>
                    </div>
                    <Select
                        label='Gender'
                        state={['Male', 'Female']}
                        placeholder='Male'
                        selectedState={selectedGender}
                        setSelectedState={setSelectedGender}
                    />

                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='homeAddress'
                            className='text-[1.4rem] font-medium'
                        >
                            Home Address
                        </label>
                        <input
                            type='text'
                            required
                            id='homeAddress'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='businessName'
                            className='text-[1.4rem] font-medium'
                        >
                            Business Name
                        </label>
                        <input
                            type='text'
                            required
                            id='businessName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='artisanGroup'
                            className='text-[1.4rem] font-medium'
                        >
                            Artisan Group
                        </label>
                        <input
                            type='text'
                            required
                            id='artisanGroup'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='overallRating'
                            className='text-[1.4rem] font-medium'
                        >
                            Overall Rating
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='overallRating'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='idNumber'
                            className='text-[1.4rem] font-medium'
                        >
                            ID Number
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='idNumber'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='dateOfOnboarding'
                            className='text-[1.4rem] font-medium'
                        >
                            Date of Onboarding
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='dateOfOnboarding'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='status'
                            className='text-[1.4rem] font-medium'
                        >
                            Status
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='status'
                            value={'Active'}
                            className='w-full rounded-lg border-none text-[1.6rem] outline-none text-green-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='kya'
                            className='text-[1.4rem] font-medium'
                        >
                            KYA
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='kya'
                            value={'Not validated'}
                            className='w-full rounded-lg border-none text-[1.6rem] outline-none underline text-red-500'
                        />
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-10'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>{' '}
                        Save Changes
                    </button>
                </form>


                <div className='grid grid-cols-2'>
                    <div className='grid gap-8'>
                        <div className='flex gap-4 justify-between'>

                        </div>
                    </div>
                    <div className='grid gap-8'>
                        <h3>Wonderful Service</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla optio labore autem provident, dolore dolorum dicta vel tempore voluptatibus deserunt recusandae porro deleniti dolores illum, temporibus eveniet earum. Ducimus, repellendus?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos adipisci voluptatem molestias, obcaecati molestiae veritatis libero eveniet porro accusamus, reiciendis facilis. Illum et doloremque fuga quo aut laudantium consequatur nemo.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArtisanDetail
