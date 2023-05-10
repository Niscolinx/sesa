import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import useAxios from '../../../components/hooks/useAxios'

const ViewEstateManager = () => {
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
        value?:string | number
        selectProps?: SelectProps
    }

    const params = useParams()
    const axiosInstance = useAxios()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageUrl, setImageUrl] = useState<File | null>(null)
    const genderState = ['Male', 'Female']
    const [selectedGender, setSelectedGender] = useState<string>(genderState[0])
    const [phone, setPhone] = useState(0)

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
            value: phone,
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ] satisfies FormInputs[]

    const {
        register,
        clearErrors,
        setValue,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const estateManager_id = params.id?.replace(':', '')

    const postDeactivate = (id: string) => {
        return axiosInstance({
            url: '/admin/deactivate_activate',
            method: 'post',
            data: { id },
        })
    }
    const postUpdate = (data: Inputs) => {
        return axiosInstance({
            url: `/admin/update/${estateManager_id}`,
            method: 'post',
            data,
        })
    }

    const getRequest = () => {
        return axiosInstance({
            url: `/manager/get/${estateManager_id}`,
        })
    }

    const { mutate: deactivate_mutation, isLoading: deactivate_loading } =
        useMutation(postDeactivate, {
            onSuccess: (data) => {
                toast('Manager Deactivated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })

                closeDialog()
            },
            onError: (err: any) => {
                setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err.response.data.message,
                })
            },
        }) as any

    const { isLoading: get_loading, data: get_data } = useQuery(
        'estate_manager' + estateManager_id,
        getRequest
    )

    useEffect(() => {
        if (get_data) {
            const fetched_data = get_data.data

            const { name, email, phone, image, dob } = fetched_data
            const first_name = name.split(' ')[0]
            const last_name = name.split(' ')[1]

             const phone_number = parseInt(phone.slice(3, -1))
            setPhone(phone_number)
            reset({
                first_name,
                last_name,
                dob,
                email_address: email,
                phone_number: parseInt(phone),
            })


            setPhotoPreview(image)
            setSelectedGender(fetched_data.gender)
        }
    }, [get_data])

    const { mutate: post_mutation, isLoading: post_loading } = useMutation(
        postUpdate,
        {
            onSuccess: (data) => {
                toast('Manager Updated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },
            onError: (err: any) => {
                setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err.response.data.message,
                })
            },
        }
    ) as any

    const onSubmit = handleSubmit((data) => {
        const { first_name, last_name, dob, email_address, phone_number } = data

        const updatedData = {
            name: `${first_name} ${last_name}`,
            gender: selectedGender,
            dob,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phone_number}`,
            image: imageUrl,
        }

        post_mutation(updatedData)
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

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageUrl(file)
    }

    if (get_loading) {
        return <p>loading...</p>
    }

    return (
        <>
            <ToastContainer />
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
                                className='bg-red-500 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                onClick={() =>
                                    deactivate_mutation(estateManager_id)
                                }
                            >
                                {deactivate_loading
                                    ? 'Loading...'
                                    : 'deactivate'}
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
                            src={photoPreview}
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
                        {get_data?.data.status ? (
                            <button
                                className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={openDialog}
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className='text-red-600 text-[1.4rem] font-semibold capitalize'>
                                    deactivate
                                </span>
                            </button>
                        ) : (
                            <button
                                className='border border-green-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={openDialog}
                            >
                                <span className='text-green-600 text-[1.4rem] font-semibold capitalize'>
                                    Activate
                                </span>
                            </button>
                        )}
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
                            const { label, type, name, selectProps, value } = input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    value={value}
                                    formErrors={formErrors}
                                    clearErrors={clearErrors}
                                    setValue={setValue}
                                    type={type}
                                    name={name}
                                    isSelect={type === 'select'}
                                    select={selectProps}
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
                            {post_loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default ViewEstateManager
