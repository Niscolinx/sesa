import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import useAxios from '../../../components/hooks/UseAxios'
import { ToastContainer, toast } from 'react-toastify'
import { useMutation, useQuery } from 'react-query'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'
import Spinner from '../../../components/ui/Spinner'

const SecurityCompanyDetail = () => {
    interface Inputs {
        name: string
        email: string
        address: string
        formatted_onboarding_date: string
        phone_number: string
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
        disabled?: boolean
        tag?: 'money'
    }

    const params = useParams()
    const axiosInstance = useAxios()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
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
            label: 'phone_number',
            type: 'number',
        },
        {
            name: 'no_of_security_guards',
            label: 'no_security_guards',
            type: 'number',
            disabled: true,
        },
        {
            name: 'wallet_balance',
            label: 'balance',
            type: 'number',
            tag: 'money',
            disabled: true,
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
            disabled: true,
        },
        {
            name: 'no_of_bank_accounts_opened',
            label: 'no_bank_account',
            type: 'number',
            disabled: true,
        },
    ] satisfies FormInputs[]

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
        clearErrors,
        setValue,
    } = useForm<Inputs>()

    const company_id = params.id?.replace(':', '')

    if (!company_id) {
        toast('Company not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
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

    const { data: get_response, isLoading: get_loading } = useQuery(
        [`get_company_${company_id}`],
        getRequest
    )

    useEffect(() => {
        if (get_response) {
            const { id, user_id, image, status, onboarding_date, ...other } =
                get_response.data

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
                toast('Company Updated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },
            onError: (err: any) => {
                toast(`${err?.response?.data.message}`, {
                    type: 'error',
                    className: 'bg-red-100 text-red-600 text-[1.4rem]',
                })
            },
        })

    const onSubmit = handleSubmit((data) => {
        const updatedData = {
            ...data,
            phone: data.phone_number,
            image: imageFile,
        }

        post_mutation(updatedData)
    })

    if (get_loading || !get_response?.data) {
        return <p className='p-8'> Loading...</p>
    }

    return (
        <>
            <ToastContainer />
            <Spinner start={post_update_loading} />
            <div className='grid p-8 bg-white min-h-[60vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='flex justify-between items-center my-10'>
                    <img
                        src={photoPreview || '/default-avatar.jpg'}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                    />

                    <div className='flex gap-8'>
                        <Activate_Deactivate
                            id={company_id}
                            url={'/security-company/deactivate_activate'}
                            status={get_response.data.status}
                            title={'security company'}
                            queryCache={`get_company_${company_id}`}
                        />
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
                                const { label, type, name, tag, disabled } =
                                    input

                                return (
                                    <Input
                                        key={idx + label}
                                        id={idx}
                                        label={label}
                                        tag={tag}
                                        disabled={disabled}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        register={register}
                                        formErrors={formErrors}
                                        type={type}
                                        name={name}
                                    />
                                )
                            })}
                        </section>
                        {/* <div className='grid items-center justify-between gap-4'>
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
                        </div> */}
                    </div>

                    <button className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-self-start'>
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
