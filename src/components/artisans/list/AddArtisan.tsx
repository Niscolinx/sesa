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

type DialogType = 'validate' | 'add-Artisan'

const AddArtisan = () => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)
    const [toggleGenderMenu, setToggleGenderMenu] = useState(false)
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const [isAddArtisan, setIsAddArtisan] = useState(true)

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
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

    const handleOpen = (modalState: DialogType) => {
        if (modalState === 'validate') {
            setIsAddArtisan(true)
        } else {
            setIsAddArtisan(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const addArtisanHandler = () => {
        // navigate('/dashboard/artisanCategory/add')
        handleOpen('add-Artisan')
    }

    const confirmAddArtisan = () => {
        handleClose()
        toast('Artisan Created successfully', {
            type: 'success',
            className:
                'bg-green-100 text-green-600 text-[1.4rem] outline-green-200 outline',
        })
    }

    const handleDialogSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleClose()

        toast('Category Created successfully', {
            type: 'success',
            className:
                'bg-green-100 text-green-600 text-[1.4rem] outline-green-200 outline',
        })
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

                        {isAddArtisan ? (
                            <form
                                className='grid gap-12'
                                onSubmit={handleDialogSubmit}
                            >
                                <h3
                                    className='text-[2rem] font-bold border-b '
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    Know Your Artisan (KYA)
                                </h3>

                                <div className='grid gap-4'>
                                    <label
                                        htmlFor='phoneNumber'
                                        className='text-[1.4rem] font-medium'
                                    >
                                        Phone Number
                                    </label>

                                    <div className='flex text-[1.6rem] gap-4 h-[5rem] max-w-[40rem]'>
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
                                <p
                                    className='text-[#043FA7] flex items-center gap-2'
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    What is KYA <BsQuestionCircle />
                                </p>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Validate
                                </button>
                            </form>
                        ) : (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                <img
                                    src='/icons/admins/modalSuccess.svg'
                                    alt=''
                                />

                                <p>You have successfully added an Artisan</p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={confirmAddArtisan}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='grid gap-8 max-w-[40rem]'>
                    <p className='text-[2rem] font-bold'>
                        KYA <span className='text-gray-500'>(Optional)</span>
                    </p>
                    <div className='flex justify-between text-[1.6rem]'>
                        <p
                            className='text-[#098DFF] cursor-pointer'
                            onClick={() => handleOpen('validate')}
                        >
                            Click her to validate this person
                        </p>
                        <p
                            className='text-[#043FA7] flex items-center gap-2'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            What is KYA <BsQuestionCircle />
                        </p>
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
                            htmlFor='firstName'
                            className='text-[1.4rem] font-medium'
                        >
                            First Name *
                        </label>
                        <input
                            type='text'
                            required
                            id='firstName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='lastName'
                            className='text-[1.4rem] font-medium'
                        >
                            Last Name *
                        </label>
                        <input
                            type='text'
                            required
                            id='lastName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <Select
                        label='Gender'
                        state={['Male', 'Female']}
                        selectedState={selectedGender}
                        setSelectedState={setSelectedGender}
                    />
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
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='email'
                            className='text-[1.4rem] font-medium'
                        >
                            Email Address *
                        </label>
                        <input
                            type='email'
                            required
                            id='email'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='address1'
                            className='text-[1.4rem] font-medium'
                        >
                            Address Line 1*
                        </label>
                        <input
                            type='text'
                            required
                            id='address1'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='address2'
                            className='text-[1.4rem] font-medium'
                        >
                            Address Line 2*
                        </label>
                        <input
                            type='text'
                            required
                            id='address2'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <Select
                        label='State'
                        state={['Lagos', 'Imo', 'Abia', 'FCT']}
                        placeholder='Select State'
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                    />
                    <Select
                        label='Artisan Category'
                        state={[
                            'Plumber',
                            'Electrician',
                            'Carpenter',
                            'Painter',
                        ]}
                        selectedState={selectedArtisan}
                        setSelectedState={setSelectedArtisan}
                    />
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='businessName'
                            className='text-[1.4rem] font-medium'
                        >
                            Business Name
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='businessName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
                        <label
                            htmlFor='photoUpload'
                            className='flex justify-center gap-4 items-center cursor-pointer'
                        >
                            <img src='/icons/admins/photo_library.svg' alt='' />
                            <p
                                className='text-color-dark-1'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Drag estate manager picture here or{' '}
                                <span className='text-color-blue font-bold'>
                                    click
                                </span>{' '}
                                to upload
                            </p>
                        </label>
                        <input
                            type='file'
                            name='photoUpload'
                            id='photoUpload'
                            accept='image/*'
                            className='hidden'
                            onClick={handlePhotoPreview}
                        />

                        {photoUrl && (
                            <div className='flex justify-center justify-self-center'>
                                <img
                                    src={photoUrl}
                                    alt='photoPreview'
                                    className='object-cover w-[11rem] h-[11rem] rounded-full'
                                />
                            </div>
                        )}
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                        style={{ justifySelf: 'start' }}
                        onClick={addArtisanHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Artisan
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddArtisan
