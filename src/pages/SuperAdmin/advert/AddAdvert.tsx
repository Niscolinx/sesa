import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from 'react-query'
import Input, { SelectProps } from '../../../components/ui/Input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import useAxios from '../../../components/hooks/UseAxios'
import useFetchData from '../../../utils/UseFetchData'
import Spinner from '../../../components/ui/Spinner'
import { useNavigate } from 'react-router-dom'

const AddAdvert = () => {
    interface Inputs {
        url: string
        advert_name: string
        start_date: string
        end_date: string
    }
    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        required?: boolean
        selectProps?: SelectProps
    }

    const axiosInstance = useAxios()
    const navigate = useNavigate()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedEstates, setSelectedEstates] = useState<string[]>([])
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)

    const { data: estates_data, isLoading: estates_loading } = useFetchData({
        url: '/estate/fetchDropdownEstate',
        name: 'active_estates',
    })

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
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postRequest = (data: Inputs) => {
        return axiosInstance({
            url: '/advert/create',
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
        setSelectFormErrors(null)
        setResponseMessage(null)

        let isError = false
        if (selectedEstates.length < 1) {
            isError = true

            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    estates: 'Field cannot be empty',
                }
            })
        }

        if (isError) {
            return
        }

        const estate_id: string[] = estates_data
            .filter(({ estate_name }: any) =>
                selectedEstates.includes(estate_name)
            )
            .map(({ id }: any) => id)

        const updatedData = {
            ...data,
            estate_id,
            image: imageFile,
        }

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
    if (estates_loading) {
        return <p className='p-8'>Loading...</p>
    }

    const slicedEstates: string[] = estates_data.map(
        ({ estate_name }: any) => estate_name
    )

    const formInputs = [
        {
            label: 'advert_name',
        },
        {
            label: 'estates',
            type: 'select',
            selectProps: {
                isMulti: true,
                state: slicedEstates,
                isSearchable: true,
                selectedState: selectedEstates,
                setSelectedState: setSelectedEstates,
            },
        },
        {
            label: 'start_date',
            type: 'date',
        },
        {
            label: 'end_date',
            type: 'date',
        },
        {
            label: 'url',
            name: 'URL',
            required: false,
        },
    ] satisfies FormInputs[]

    return (
        <>
            <Spinner start={isLoading ? true : false} />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalSuccess.svg' alt='' />
                        <p>You have successfully added an Advert</p>

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
                            const { label, type, name, selectProps, required } =
                                input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    required={required}
                                    selectFormErrors={selectFormErrors}
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

export default AddAdvert
