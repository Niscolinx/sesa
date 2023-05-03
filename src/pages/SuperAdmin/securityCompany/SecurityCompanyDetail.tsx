import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import useAxios from '../../../components/hooks/useAxios'
import { ToastContainer, toast } from 'react-toastify'
import { useMutation, useQuery } from 'react-query'

const SecurityCompanyDetail = () => {
    interface Inputs {
        name: string
        email: string
        address: string
        onboarding_date: string
        phone: string
        no_of_bank_accounts_opened: number
        no_of_assigned_security_guards: number
        no_of_security_guards: number
        wallet_balance: number
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

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const genderState = ['Male', 'Female']
    const [isWarning, setIsWarning] = useState(true)
    const [isSignOutRequired, setIsSignOutRequired] = useState(false)

    const toggleIsSignOutRequired = () =>
        setIsSignOutRequired(!isSignOutRequired)
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

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

    const company_id = params.id?.replace(':', '')

    if (!company_id) {
        toast('Company not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }

    const postDeactivate = (id: string) => {
        return axiosInstance({
            url: '/admin/deactivate_activate',
            method: 'post',
            data: { id },
        })
    }
    const postUpdateAdmin = (data: any) => {
        return axiosInstance({
            url: `/security-company/update/${company_id}`,
            method: 'post',
            data,
        })
    }

    const getAdmin = () => {
        return axiosInstance({
            url: `/security-company/get/${company_id}`,
        })
    }

    const {
        mutate: deactivate_admin_mutation,
        isLoading: deactivate_admin_loading,
    } = useMutation(postDeactivate, {
        onSuccess: (res) => {
            toast('Admin Deactivated successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
            handleClose()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response?.data.message,
            })
        },
    })

    const { data: get_response, isLoading: get_admin_loading } = useQuery(
        [`get_admin_${company_id}`],
        getAdmin
    )

    useEffect(() => {
        if (get_response) {
            const { id, user_id, image, status, ...other} = get_response.data

            reset({
                ...other
            })

            setPhotoPreview(image)
        }
    }, [get_response])

    const { mutate: post_admin_mutation, isLoading: post_update_loading } =
        useMutation(postUpdateAdmin, {
            onSuccess: (res) => {
                toast('Admin Updated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },
            onError: (err: any) => {
                setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err?.response?.data.message,
                })
            },
        })

    const onSubmit = handleSubmit((data) => {
       

        const adminData = {
            ...data,
            image: imageFile,
        }

        post_admin_mutation(adminData)
    })
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

    if (get_admin_loading) {
        return <p className='p-8'> Loading...</p>
    }

    return (
        <>
            <ToastContainer />
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
                {/* <form
                    //onSubmit={handleSubmit}
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
                </form> */}

                <form onSubmit={onSubmit} className='grid gap-20'>
                    <div className='grid gap-10'>
                        <p className='text-[2rem] font-Satoshi-Medium'>
                            Estate Details
                        </p>
                        <section
                            className='grid max-w-[84rem] gap-16'
                            style={{
                                gridTemplateColumns:
                                    ' repeat(auto-fit, minmax(35rem, 1fr))',
                            }}
                        >
                            {formInputs.map((input, idx) => {
                                const { label, type, selectProps } = input

                                return (
                                    <Input
                                        key={idx + label}
                                        id={idx}
                                        label={label}
                                        register={register}
                                        formErrors={formErrors}
                                        fullWidth={label === 'address'}
                                        type={type}
                                        isSelect={type === 'select'}
                                        select={selectProps}
                                    />
                                )
                            })}
                        </section>
                        <div className='grid items-center justify-between gap-4'>
                            <p className='font-Satoshi-Medium text-[1.4rem]'>
                                Sign Out Required
                            </p>
                            <div
                                onClick={toggleIsSignOutRequired}
                                className='cursor-pointer'
                            >
                                {isSignOutRequired ? (
                                    <img
                                        src='/icons/admins/switchOn.svg'
                                        alt=''
                                    />
                                ) : (
                                    <img
                                        src='/icons/admins/switchOff.svg'
                                        alt=''
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-self-start'
                        // onClick={addArtisanHandler}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>
                        {post_update_loading ? 'Loading...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default SecurityCompanyDetail
