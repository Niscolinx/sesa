import React, { useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'

import { Select } from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'

type Actions = 'Deactivate' | 'Delete'

export type ValidateInputTypes =
    | 'Phone Number'
    | 'BVN Number'
    | 'NIN Number'
    | 'Drivers License'
    | 'International Passport'
    | 'Voters Card'

const ViewResident = () => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const [isValidated, setIsValidated] = useState(false)

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

    const validatedDialogRef = useRef<HTMLDialogElement | null>(null)
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeValidatedDialog = () => {
        if (validatedDialogRef.current) {
            validatedDialogRef.current.close()
        }
    }
    const openValidatedDialog = () => {
        if (validatedDialogRef.current) {
            validatedDialogRef.current.showModal()
        }
    }

    const openDeleteOrDeactivateDialog = (dialogType: Actions) => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleCloseDeleteOrDeactivateDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleDeactivateResident = () => {
        handleCloseDeleteOrDeactivateDialog()

        toast('Resident deactivated successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={validatedDialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[90rem] min-h-[30rem] p-10 text-[1.6rem] relative gap-20'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => closeValidatedDialog()}
                        />

                        <div className='relative h-[14rem] bg-blue-600 w-full mt-10 rounded-lg'>
                            <img
                                src='/img/me.jpeg'
                                alt=''
                                className='w-[10rem] h-[10rem] border rounded-full border-green-600 object-cover absolute bottom-[-6rem] left-10 object-top'
                            />
                        </div>
                        <div className='mt-20'>
                            <h2>Validation Result</h2>

                            <div className='border grid mt-5'>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Validation Option
                                    </p>
                                    <p className='py-4'>
                                        Phone Number | (+234) 813238432
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Full Name
                                    </p>
                                    <p className='py-4'>Michael Okonkwo</p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Date of Birth
                                    </p>
                                    <p className='py-4'>15 May, 1998</p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Phone Number
                                    </p>
                                    <p className='py-4'> (+234) 813238432</p>
                                </div>
                                <div className='grid grid-cols-2  gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Gender
                                    </p>
                                    <p className='py-4'>Male</p>
                                </div>
                            </div>
                        </div>
                        <button
                            className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem] justify-self-center'
                            onClick={() => closeValidatedDialog()}
                        >
                            Ok
                        </button>
                    </div>
                </section>
            </dialog>

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <>
                            <img
                                src='/icons/admins/modalDeactivate.svg'
                                alt=''
                            />
                            <p className='text-[1.6rem]'>
                                Are you sure you want to deactivate this
                                resident?
                            </p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() =>
                                        handleCloseDeleteOrDeactivateDialog()
                                    }
                                >
                                    Cancel
                                </button>
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={handleDeactivateResident}
                                >
                                    Deactivate
                                </button>
                            </div>
                        </>
                    </div>
                </section>
            </dialog>
            <main className='bg-white grid gap-10 rounded-lg py-10'>
                <section className='grid p-8 bg-white items-baseline rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-8 items-center'>
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
                            <div className='grid gap-2 justify-items-start'>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    Guard Code :{' '}
                                    <span
                                        style={{
                                            fontFamily: 'Satoshi-Medium',
                                        }}
                                    >
                                        SG09897
                                    </span>
                                </p>
                                <p className='flex items-center gap-4'>
                                    <span className='flex items-center gap-2'>
                                        KYR Status <BsQuestionCircle />:
                                    </span>
                                    {isValidated ? (
                                        <span
                                            className='text-green-600'
                                            style={{
                                                fontFamily: 'Satoshi-Light',
                                            }}
                                        >
                                            Validated
                                        </span>
                                    ) : (
                                        <span
                                            className='text-red-600'
                                            style={{
                                                fontFamily: 'Satoshi-Light',
                                            }}
                                        >
                                            Not Validated
                                        </span>
                                    )}
                                </p>
                                <button
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                    className='text-color-blue'
                                    onClick={() => openValidatedDialog()}
                                >
                                    Click here to view results
                                </button>
                            </div>
                        </div>

                        <div className='flex gap-8'>
                            <button
                                className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() =>
                                    openDeleteOrDeactivateDialog('Deactivate')
                                }
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className='text-red-600 text-[1.4rem] font-semibold'>
                                    Deactivate
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
                                htmlFor='firstName'
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Middle Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-Satoshi-Medium'
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

                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Date of Birth
                            </label>
                            <input
                                type='date'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4'>
                            <label
                                htmlFor='phoneNumber'
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                                className='text-[1.4rem] font-Satoshi-Medium'
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
                        <Select
                            label='Gender'
                            state={['Male', 'Female']}
                            selectedState={selectedGender}
                            setSelectedState={setSelectedGender}
                        />
                    </form>
                </section>
                {/* <button
                    className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full'
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
                </button> */}
            </main>
        </>
    )
}

export default ViewResident
