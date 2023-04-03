import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { AxiosRequest } from '../../../utils/axios'
import Input from '../../../components/UI/Input'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import { useParams } from 'react-router'
import { getToken } from '../../../utils/token'

const ViewAdmin = () => {
    interface Inputs {
        email_address: string
        first_name: string
        last_name: string
        dob: string
        gender: string
        phoneNumber: number
        photoUrl?: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const params = useParams()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageUrl, setImageUrl] = useState<File | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [formInputs, setFormInputs] = useState<FormInputs[]>([
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
            label: 'select',
        },
        {
            label: 'phone_number',
            type: 'number',
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ])

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postAdmin = (data: Inputs) => {
        return AxiosRequest({
            url: '/admin/create',
            method: 'post',
            data,
        })
    }

    const getAdmin = (id: string) => {
        return AxiosRequest({
            url: `/admin/get`,
            method: 'post',
            data: { id },
        })
    }

    const admin_id = params.Id?.replace(':', '')

    const {
        mutate: mutate_admin,
        data: admin_response,
        isLoading: admin_loading,
    } = useMutation(getAdmin) as any

    useEffect(() => {
        mutate_admin(admin_id)
    }, [])

    useEffect(() => {
        console.log({ admin_response })
        if (admin_response?.status === 200) {
            const { dob } = admin_response.data
            const fetched_data = admin_response.data.data.user

            console.log({ fetched_data })
            const { name, email, phone, image } = fetched_data
            const first_name = name.split(' ')[0]
            const last_name = name.split(' ')[1]

            console.log({ first_name, last_name })
            // const updatedInputs = formInputs.map((input) => {
            //     if (input.label === label) {
            //         return { ...input, value }
            //     }
            //     return input
            // })
            // setFormInputs(updatedInputs)

            setFormInputs((prev) => {
                return [...prev]
            })

            setSelectedGender(fetched_data.gender)
        }
    }, [admin_response])

    const {
        mutate,
        data: response_data,
        isLoading,
    } = useMutation(postAdmin) as any

    useEffect(() => {
        console.log({ response_data })
        if (response_data?.status === 200) {
            openDialog()
        } else {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: response_data?.response?.data.message,
            })
        }
    }, [response_data])

    const onSubmit = handleSubmit((data) => {
        const {
            first_name,
            last_name,
            gender,
            dob,
            email_address,
            phoneNumber,
        } = data

        const adminData = {
            name: `${first_name} ${last_name}`,
            gender,
            dob,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phoneNumber}`,
            image: imageUrl?.name,
        }

        mutate(adminData)
    })

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }
    type FormInputs = {
        label: string
        type?: string
        name?: string
        defaultValue?: string
    }

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageUrl(file)
    }

    if (admin_loading) {
        return <p>loading...</p>
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img
                            src='/icons/admins/modalWarning.svg'
                            alt=''
                            className='animate__animated animate__pulse '
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>Are you sure you want to deactivate this admin?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-500 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>

            <div className='bg-white rounded-2xl grid p-8'>
                <div className='flex justify-between items-center mb-20'>
                    <label
                        htmlFor='photoUpload'
                        className='grid gap-4 cursor-pointer justify-items-center'
                    >
                        <img
                            src={photoPreview ? photoPreview : '/img/me.jpeg'}
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
                        onChange={handlePicture}
                    />

                    <div className='flex gap-8'>
                        <button
                            className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={openDialog}
                        >
                            <img src='/icons/admins/delete.svg' alt='' />
                            <span className='text-red-600 text-[1.4rem] font-semibold'>
                                Deactivate
                            </span>
                        </button>
                    </div>
                </div>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Personal Information
                </p>
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    onSubmit={onSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12 '
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, name, defaultValue } = input
                            return idx === 3 && label === 'select' ? (
                                <Select
                                    key={idx + label}
                                    label='Gender'
                                    state={['Male', 'Female']}
                                    selectedState={selectedGender}
                                    setSelectedState={setSelectedGender}
                                />
                            ) : (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    defaultValue={defaultValue}
                                    formErrors={formErrors}
                                    type={type || 'text'}
                                    name={name || undefined}
                                />
                            )
                        })}

                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[5rem]'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>{' '}
                            {isLoading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default ViewAdmin
