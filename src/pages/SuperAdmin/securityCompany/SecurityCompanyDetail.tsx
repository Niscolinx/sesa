import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router'
import { SelectProps } from '../../../components/UI/input/Input'
import useAxios from '../../../components/hooks/useAxios'

const SecurityCompanyDetail = () => {
    interface Inputs {
        email_address: string
        first_name: string
        last_name: string
        dob: string
        gender: string
        phone_number: number | null
        photoUrl?: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }

    const params = useParams()
    const axiosInstance = useAxios()
    const navigate = useNavigate()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const genderState = ['Male', 'Female']
    const [selectedGender, setSelectedGender] = useState<string>(genderState[0])

    const formInputs = [
        {
            label: 'first_name',
        },
        {
            label: 'last_name',
        },
        {
            label: 'dob',
            type: 'date',
            name: 'date of birth',
        },
        {
            label: 'gender',
            type: 'select',
            selectProps: {
                state: genderState,
                selectedState: selectedGender,
                setSelectedState: setSelectedGender,
            },
        },
        {
            label: 'phone_number',
            type: 'number',
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ] satisfies FormInputs[]

     const {
         register,
         handleSubmit,
         formState: { errors: formErrors },
         reset,
     } = useForm<Inputs>()

     const [responseMessage, setResponseMessage] =
         useState<ResponseMessage | null>(null)

     const company_id = params.id?.replace(':', '')

    const [isWarning, setIsWarning] = useState(true)

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     handleOpen('success')
    // }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState: 'warning' | 'success') => {
        if (modalState === 'warning') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmDeactivation = () => {
        handleClose()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                        {isWarning ? (
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                        ) : (
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                        )}

                        {isWarning ? (
                            <p>
                                Are you sure you want to deactivate this
                                security company?
                            </p>
                        ) : (
                            <p>
                                You have successfully added a security Company
                            </p>
                        )}

                        <div className='flex w-full justify-center gap-8'>
                            {isWarning ? (
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    View Details
                                </button>
                            )}
                            {isWarning ? (
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={confirmDeactivation}
                                >
                                    Deactivate
                                </button>
                            ) : (
                                <button
                                    className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='flex justify-between items-center'>
                    <img
                        src='/icons/admins/detailsImg.svg'
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                    />
                    <button
                        className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleOpen('warning')}
                    >
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold'>
                            Deactivate
                        </span>
                    </button>
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
                            htmlFor='securityCompany'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Security Company *
                        </label>
                        <input
                            type='text'
                            value='Orca Security'
                            required
                            disabled={true}
                            id='securityCompany'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='email'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Email Address
                        </label>
                        <input
                            type='email'
                            required
                            disabled
                            value={`orcas@gmail.com`}
                            id='email'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>

                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='address'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Address
                        </label>
                        <input
                            type='text'
                            required
                            disabled
                            value={`04, Wright Avenue Lagos, Nigeria`}
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='noOfGuards'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            No of Security Guards
                        </label>
                        <input
                            type='text'
                            required
                            disabled
                            value={`10`}
                            id='noOfGuards'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='walletBalance'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Wallet Balance
                        </label>
                        <input
                            type='text'
                            required
                            disabled
                            value={`₦5,000`}
                            id='walletBalance'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='joinedDate'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Joined Date
                        </label>
                        <input
                            type='text'
                            required
                            disabled
                            value={`02-May-22`}
                            id='joinedDate'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='NoOfAssignedGuards'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            No of Assigned Security Guards
                        </label>
                        <input
                            type='text'
                            required
                            disabled
                            value={`10`}
                            id='NoOfAssignedGuards'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='noOfBankAccountsOpened'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            No of Bank Accounts Opened
                        </label>
                        <input
                            type='text'
                            required
                            disabled
                            value={`10`}
                            id='noOfBankAccountsOpened'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-500'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='status'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Status
                        </label>
                        <input
                            type='text'
                            required
                            disabled
                            value={`Active`}
                            id='status'
                            className='w-full bg-white text-[1.6rem] outline-none disabled:text-color-green-light'
                        />
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full'
                        style={{ justifySelf: 'start' }}
                        onClick={() => handleOpen('success')}
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
            </div>
        </>
    )
}

export default SecurityCompanyDetail
