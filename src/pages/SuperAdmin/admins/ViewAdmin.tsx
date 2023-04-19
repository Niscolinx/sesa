import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import useAxios from '../../../components/hooks/useAxios'

const ViewAdmin = () => {
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

    const postDeactivateAdmin = (id: string) => {
        return axiosInstance({
            url: '/change/user/status',
            method: 'post',
            data: { user_id: id },
        })
    }
    const postUpdateAdmin = (data: any) => {
        return axiosInstance({
            url: '/admin/update',
            method: 'post',
            data,
        })
    }

    const getAdmin = (id: string) => {
        return axiosInstance({
            url: `/admin/get`,
            method: 'post',
            data: { id },
        })
    }

    const admin_id = params.id?.replace(':', '')

    if(!admin_id){
        console.log('not found')
         toast('Admin not Found', {
             type: 'error',
             className: 'bg-red-100 text-red-600 text-[1.4rem]',
         })
        
        return navigate(-1)
    }

    const {
        mutate: deactivate_admin_mutation,
        isLoading: deactivate_admin_loading,
    } = useMutation(postDeactivateAdmin, {
        onSuccess: (res) => {
            toast('Admin Deactivated successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
            closeDialog()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response?.data.message,
            })
        },
    })

    const {
        mutate: get_admin_mutation,
        data: get_admin_response,
        isLoading: get_admin_loading,
    } = useMutation(getAdmin, {
        onSuccess: (res) => {
            const { dob } = res.data
            const fetched_data = res.data.user

            const { name, email, phone, image } = fetched_data
            const first_name = name.split(' ')[0]
            const last_name = name.split(' ')[1]

            reset({
                first_name,
                last_name,
                dob,
                email_address: email,
                phone_number: parseInt(phone),
            })

            setPhotoPreview(image)
            setSelectedGender(fetched_data.gender)
        },

        onError: (err) => {},
    })

    const { mutate: post_admin_mutation, isLoading: post_admin_loading } =
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

    useEffect(() => {
        get_admin_mutation(admin_id)
    }, [])

    const onSubmit = handleSubmit((data) => {
        const { first_name, last_name, dob, email_address, phone_number } = data

        const adminData = {
            name: `${first_name} ${last_name}`,
            gender: selectedGender,
            dob,
            id: admin_id,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phone_number}`,
            image: imageFile,
        }

        post_admin_mutation(adminData)
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
        setImageFile(file)
    }

    if (get_admin_loading) {
        return <p>loading...</p>
    }

    console.log({
        get_admin_response,
    })

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
                                    deactivate_admin_mutation(admin_id!)
                                }
                            >
                                {deactivate_admin_loading
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
                            const { label, type, name, selectProps } = input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
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
                            {post_admin_loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default ViewAdmin
