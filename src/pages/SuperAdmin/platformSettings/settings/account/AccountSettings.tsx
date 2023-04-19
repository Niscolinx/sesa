import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { useMutation } from 'react-query'
import { toast, ToastContainer } from 'react-toastify'
import useAxios from '../../../../../components/hooks/useAxios'
import Input from '../../../../../components/UI/input/Input'

const AccountSettings = () => {
    type FormInputs = {
        label: string
        name?: string
        type?: string
        pre?: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type Inputs = {
        current_password: string
        new_password: string
        confirm_password: string
    }

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const axiosInstance = useAxios()
    const postSettings = (inputs: Inputs) => {
        return axiosInstance({
            url: `/platformsettings/changepassword`,
            method: 'post',
            data: inputs,
        })
    }
    const { mutate, isLoading: mutation_loading } = useMutation(postSettings, {
        onSuccess: () => {
            toast('Changes saved successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
    }) as any

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    const onSubmit = handleSubmit((data) => {
        setResponseMessage(null)

        const { new_password, confirm_password } = data


        if (new_password !== confirm_password) {
            return setResponseMessage({
                className: 'text-red-600',
                displayMessage: 'passwords do not match',
            })
        }

        const updated_data = {
            ...data
        }

        mutate(updated_data)
    })

    const formInputs = [
        {
            label: 'current_password',
            name: 'Current Password',
            type: 'password',
        },
        {
            label: 'new_password',
            name: 'New Password',
            type: 'password',
        },
        {
            label: 'confirm_password',
            name: 'Re-Enter New Password',
            type: 'password',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />
            <div className=' p-8 bg-white h-[80vh] overflow-y-scroll rounded-lg'>
                <figure className='grid text-center justify-start'>
                    <input
                        type='file'
                        name='photoUpload'
                        id='photoUpload'
                        accept='image/*'
                        className='hidden'
                        onChange={handlePicture}
                    />
                    <img
                        src={photoPreview}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                    />
                    <label
                        htmlFor='photoUpload'
                        className='cursor-pointer text-color-blue-1 text-[1.6rem] text-center'
                    >
                        Edit
                    </label>
                </figure>

                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    onSubmit={onSubmit}
                    className='grid max-w-[84rem] text-[1.6rem] mt-[5rem] gap-10'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, name } = input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    name={name}
                                    register={register}
                                    formErrors={formErrors}
                                    type={type}
                                />
                            )
                        })}

                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[10rem]'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>{' '}
                            {mutation_loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default AccountSettings
