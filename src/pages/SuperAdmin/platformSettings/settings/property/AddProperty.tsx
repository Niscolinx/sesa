import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../../utils/useFetchData'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import useAxios from '../../../../../components/hooks/useAxios'
import Input from '../../../../../components/UI/input/Input'
import { useLocation, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import Spinner from '../../../../../components/UI/Spinner'

export interface IPropertyType {
    id: string
    propertyType: string
    description: string
}

const AddProperty = () => {
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
        property_type: string
        description: string
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const axiosInstance = useAxios()

    const postRequest = (inputs: Inputs) => {
        return axiosInstance({
            url: '/platformsettings/propertytype/create',
            method: 'post',
            data: inputs,
        })
    }

    const { mutate, isLoading: mutation_loading } = useMutation(postRequest, {
        onSuccess: () => {
            toast(`Property added successfully`, {
                type: 'success',
                className:
                    'bg-green-100 text-green-600 text-[1.4rem] capitalize',
            })

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
            <Spinner start={mutation_loading}/>
            <div className='grid text-[1.6rem] border rounded-lg bg-white'>
                <div className=' p-10  rounded-lg '>
                    <div className='flex w-full border-b items-center pb-5 justify-between'>
                        <h2 className='heading2'>Property Type</h2>
                    </div>
                </div>
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
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
                                <IoMdAdd/>
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
