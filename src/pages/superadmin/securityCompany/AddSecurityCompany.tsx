import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from 'react-query'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import useAxios from '../../../components/hooks/useAxios'
import useFetchData from '../../../components/hooks/useFetchData'
import { useNavigate } from 'react-router'
import Spinner from '../../../components/ui/Spinner'

const AddSecurityCompany = () => {
    interface Inputs {
        email: string
        name: string
        address: string
        phone_number?: number
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
    const { data: states_data, isLoading: states_loading } = useFetchData({})

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedRegion, setSelectedRegion] = useState<string[]>([])

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
        clearErrors,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postRequest = (data: Inputs) => {
        return axiosInstance({
            url: '/security-company/create',
            method: 'post',
            data,

            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
    const { mutate, isLoading } = useMutation(postRequest, {
        onSuccess: () => {
            handleOpen()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
    }) as any

    const onSubmit = handleSubmit((data) => {
        const updatedData = {
            ...data,
            phone: data.phone_number,
            image: imageFile,
        }

        delete updatedData.phone_number

        mutate(updatedData)
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
    if (states_loading) {
        return <p>Loading...</p>
    }

    const slicedStates: string[] = states_data.map(({ name }: any) => name)

    const formInputs = [
        {
            label: 'name',
            name: 'Security Company',
        },
        {
            name: 'email Address',
            label: 'email',
            type: 'email',
        },
        {
            label: 'phone_number',
            type: 'number',
        },
        {
            label: 'address',
        },
        {
            label: 'state',
            type: 'select',
            selectProps: {
                state: slicedStates,
                selectedState: selectedRegion,
                setSelectedState: setSelectedRegion,
            },
        },
    ] satisfies FormInputs[]

    return (
        <>
            <Spinner start={isLoading ? true : false} />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalSuccess.svg' alt='' />
                        <p>You have successfully added a security company</p>

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
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    onSubmit={onSubmit}
                    id='formFile'
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
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                    type={type}
                                    name={name}
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

export default AddSecurityCompany
