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
        formatted_onboarding_date: string
        phone: string
        no_bank_account: number
        no_assigned_security_guards: number
        no_security_guards: number
        balance: number
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: keyof Inputs
        type?: string
        name?: string
    }
    const genderState = ['Male', 'Female']

    const params = useParams()
    const axiosInstance = useAxios()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isWarning, setIsWarning] = useState(true)
    const [isSignOutRequired, setIsSignOutRequired] = useState(false)

    const toggleIsSignOutRequired = () =>
        setIsSignOutRequired(!isSignOutRequired)
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const formInputs = [
        {
            name: 'Security Name',
            label: 'name',
        },
        {
            name: 'Email Address',
            label: 'email',
            type: 'email',
        },
        {
            label: 'address',
        },

        {
            name: 'phone Number',
            label: 'phone',
            type: 'number',
        },
        {
            name: 'no_of_security_guards',
            label: 'no_security_guards',
            type: 'number',
        },
        {
            name: 'wallet_balance',
            label: 'balance',
            type: 'number',
        },
        {
            name: 'Joined Date',
            label: 'formatted_onboarding_date',
            type: 'date',
        },
        {
            name: 'no_of_assigned_security_guards',
            label: 'no_assigned_security_guards',
            type: 'number',
        },
        {
            name: 'no_of_bank_accounts_opened',
            label: 'no_bank_account',
            type: 'number',
        },
    ] satisfies FormInputs[]

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
        watch,
    } = useForm<Inputs>()

    const company_id = params.id?.replace(':', '')

    if (!company_id) {
        toast('Company not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }

    const postDeactivate = () => {
        return axiosInstance({
            url: '/security-company/deactivate_activate',
            method: 'post',
            data: { id: company_id },
        })
    }
    const postRequest = (data: any) => {
        return axiosInstance({
            url: `/security-company/update/${company_id}`,
            method: 'post',
            data,
        })
    }

    const getRequest = () => {
        return axiosInstance({
            url: `/security-company/get/${company_id}`,
        })
    }

    const { mutate: deactivate_mutation, isLoading: deactivate_loading } =
        useMutation(postDeactivate, {
            onSuccess: (res) => {
                toast('Company Deactivated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },
            onError: (err: any) => {
                toast('Company Failed to ', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
                return setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err?.response?.data.message,
                })
            },

            onSettled: () => {
                return handleClose()
            },
        })

    const { data: get_response, isLoading: get_loading } = useQuery(
        [`get_company_${company_id}`],
        getRequest
    )

    useEffect(() => {
        if (get_response) {
            const { id, user_id, image, status, onboarding_date, ...other } =
                get_response.data

            console.log({ other })

            const formatDate = new Date(onboarding_date)
                .toISOString()
                .slice(0, 10)

            reset({
                ...other,
                onboarding_date: formatDate,
            })

            setPhotoPreview(image)
        }
    }, [get_response])

    const { mutate: post_mutation, isLoading: post_update_loading } =
        useMutation(postRequest, {
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

        post_mutation(adminData)
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

    const confirmDeactivation = () => {
        return deactivate_mutation()
    }

    if (get_loading) {
        return <p className='p-8'> Loading...</p>
    }

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                        <img src='/icons/admins/modalWarning.svg' alt='' />

                        <p>
                            Are you sure you want to deactivate this security
                            company?
                        </p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>

                            <button
                                className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                onClick={confirmDeactivation}
                            >
                                {deactivate_loading
                                    ? 'Loading...'
                                    : 'deactivate'}
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white min-h-[60vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='flex justify-between items-center my-10'>
                    <img
                        src={photoPreview || ''}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                    />

                    <div className='flex gap-8'>
                        {get_response?.data.status ? (
                            <button
                                className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() => handleOpen()}
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className='text-red-600 text-[1.4rem] font-semibold'>
                                    Deactivate
                                </span>
                            </button>
                        ) : (
                            <button
                                className='border border-green-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() => handleOpen()}
                            >
                                <span className='text-green-600 text-[1.4rem] font-semibold capitalize'>
                                    Activate
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form onSubmit={onSubmit} className='grid gap-20'>
                    <div className='grid gap-10'>
                        <section
                            className='grid max-w-[84rem] gap-16'
                            style={{
                                gridTemplateColumns:
                                    ' repeat(auto-fit, minmax(35rem, 1fr))',
                            }}
                        >
                            {formInputs.map((input, idx) => {
                                const { label, type, name } = input

                                return (
                                    <Input
                                        key={idx + label}
                                        id={idx}
                                        label={label}
                                        register={register}
                                        formErrors={formErrors}
                                        type={type}
                                        name={name}
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
