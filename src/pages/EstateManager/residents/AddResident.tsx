import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { useMutation, useQueryClient } from 'react-query'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import useAxios from '../../../components/hooks/UseAxios'
import Spinner from '../../../components/ui/Spinner'
import { useNavigate } from 'react-router'
import ImageInput from '../../../components/ui/input/ImageInput'

const AddAdmin = () => {
    interface Inputs {
        email_address: string
        first_name: string
        last_name: string
        dob: string
        phone_number: string
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
    const axiosInstance = useAxios()
    const navigate = useNavigate()
    const genderState = ['Male', 'Female']

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedGender, setSelectedGender] = useState<string>(genderState[0])

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postAdmin = (data: Inputs) => {
        return axiosInstance({
            url: '/admin/create',
            method: 'post',
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(postAdmin, {
        onSuccess: () => {
            handleOpen()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries('admin')
        },
    }) as any

    const onSubmit = handleSubmit((data) => {
        const { first_name, last_name, dob, email_address, phone_number } = data

        if (!phone_number || phone_number.length <= 9) {
            return setError('phone_number', {
                type: 'manual',
                message: 'Must be 10 characters',
            })
        }

        clearErrors('phone_number')

        if (imageFile) {
            const size = imageFile.size / 1000

            const KBSize = size.toString().split('.')[0]

            if (KBSize.length > 3) {
                const MBSize = Number(KBSize) / 1000
                return (
                    MBSize > 2 &&
                    setResponseMessage({
                        className: 'text-red-600',
                        displayMessage: 'File size must less than 2MB',
                    })
                )
            }
        }

        setResponseMessage(null)

        const adminData = {
            name: `${first_name} ${last_name}`,
            gender: selectedGender,
            dob,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phone_number}`,
            image: imageFile,
        }

        mutate(adminData)
    })

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        navigate(-1)
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

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
            type: 'tel',
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <Spinner start={isLoading ? true : false} />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalSuccess.svg' alt='' />
                        <p>You have successfully added an Admin</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={handleClose}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>

            <div className='bg-white rounded-2xl grid p-8'>
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
                        columnGap: '10rem',
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
                                    clearErrors={clearErrors}
                                    name={name}
                                    setValue={setValue}
                                    isSelect={type === 'select'}
                                    select={selectProps}
                                />
                            )
                        })}

                        <ImageInput
                            handlePicture={handlePicture}
                            photoPreview={photoPreview}
                        />
                        <button className='btn justify-self-start btn-blue'>
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            {isLoading ? 'Loading...' : 'Add'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default AddAdmin
