import { useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../../utils/useFetchData'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import useAxios from '../../../../../components/hooks/useAxios'
import Input from '../../../../../components/UI/input/Input'

export interface IPropertyType {
    id: string
    propertyType: string
    description: string
}

const AddProperty = () => {
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
        pre?: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type Inputs = {
        kyr_validation: number
        sms_notification: number
    }

    const { data, isLoading, error } = useFetchData({
        url: '/platformsettings/generalsettings/get',
    })

    console.log({ data })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const axiosInstance = useAxios()
    const postSettings = (inputs: Inputs) => {
        return axiosInstance({
            url:
                data.length < 0
                    ? `/platformsettings/generalsettings/update/${data[0].id}`
                    : '/platformsettings/propertytype/create',
            method: data.length < 0 ? 'put' : 'post',
            data: inputs,
        })
    }
    const { mutate, isLoading: mutation_loading } = useMutation(postSettings, {
        onSuccess: () => {
            toast('Property Added successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })

            reset()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
    }) as any

    const onSubmit = handleSubmit((data) => {
        setResponseMessage(null)

        const adminData = {
            ...data,
        }

        mutate(adminData)
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    const formInputs = [
        {
            label: 'property_type',
        },
        {
            label: 'description',
            type: 'textarea',
            pre: ' Maximum of 30 Characters',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />

            <div className='grid text-[1.6rem] border rounded-lg bg-white'>
                <div className=' p-10  rounded-lg '>
                    <div className='flex w-full border-b items-center pb-5 justify-between'>
                        <h2 className='heading2'>Property Type</h2>

                        <button
                            className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={() => openDialog()}
                        >
                            <img src='/icons/admins/delete.svg' alt='' />
                            <span className='text-red-600 text-[1.4rem] font-semibold'>
                                Delete
                            </span>
                        </button>
                    </div>
                </div>

                <form
                    className='grid gap-8 mt-8 p-8 max-w-[60rem]'
                    onSubmit={onSubmit}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, pre } = input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    pre={pre}
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
                            {mutation_loading ? 'Loading...' : 'Add'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default AddProperty
