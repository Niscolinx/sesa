import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from 'react-query'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import ImageInput from '../../../components/UI/input/ImageInput'
import useAxios from '../../../components/hooks/useAxios'
import useFetchData from '../../../utils/useFetchData'

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
        selectProps?: SelectProps
    }

    const axiosInstance = useAxios()

    const estates = ['Estate1', 'Estate2', 'Estate3']

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedEstates, setSelectedEstates] = useState<string[]>([])

    const { data: estate_manager_data, isLoading: estate_manager_loading } =
        useFetchData({
            url: '/estate/getall',
            name: 'estate_manager',
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

         let isError = false
         if (selectedEstateManager.length < 1) {
             isError = true

             setSelectFormErrors((prev) => {
                 return {
                     ...prev,
                     'estate manager': 'Field cannot be empty',
                 }
             })
         }

           if (isError) {
               return
           }

            const estate_manager: string[] = estate_manager_data.data
                .filter(({ estate_name }: any) =>
                    selectedEstateManager.includes(estate_name)
                )
                .map(({ id }: any) => ({ id }))[0]

        const updatedData = {
            ...data,
            estate_id: 4,
            image: imageFile,
        }

        mutate(updatedData)
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
     if (
         
         estate_manager_loading
     ) {
         return <p className='p-8'>Loading...</p>
     }

const slicedEstateManagers: string[] = estate_manager_data.data.map(
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
                state: slicedEstateManagers,
                isSearchable: true,
                selectedState: selectedEstateManager,
                setSelectedState: setSelectedEstateManager,
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
        },
    ] satisfies FormInputs[]

    return (
        <>
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
