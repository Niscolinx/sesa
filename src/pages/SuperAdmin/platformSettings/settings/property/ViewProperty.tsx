import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../../utils/useFetchData'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import useAxios from '../../../../../components/hooks/useAxios'
import Input from '../../../../../components/UI/input/Input'
import { useParams } from 'react-router'

export interface IPropertyType {
    id: string
    propertyType: string
    description: string
}

const ViewProperty = () => {
    const params = useParams()

    const property_id = params.id?.replace(':', '')

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

    const get_request = () => {
        return axiosInstance({
            url: `/platformsettings/propertytype/getbyid/${property_id}`,
        })
    }

    const postRequest = (inputs: Inputs) => {
        return axiosInstance({
            url: `/platformsettings/propertytype/update/${property_id}`,
            method: 'put',
            data: inputs,
        })
    }

    const postDelete = () => {
        return axiosInstance({
            url: '/change/status',
            method: 'post',
            data: { id: property_id },
        })
    }

    const {isLoading, data, error} = useQuery('property', get_request, {
        onSuccess: ({data}) => {
            console.log({data})
               const { property_type, description } = data

               reset({
                   property_type,
                   description,
               })
        }
    }) as any

    const { mutate: post_mutation, isLoading: post_loading } = useMutation(
        postRequest,
        {
            onSuccess: () => {
                toast(`Property Updated successfully`, {
                    type: 'success',
                    className:
                        'bg-green-100 text-green-600 text-[1.4rem] capitalize',
                })

                reset()
            },
            onError: (err: any) => {
                setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err?.response.data.message,
                })
            },
        }
    ) as any

    const { mutate: delete_mutation, isLoading: delete_loading } = useMutation(
        postDelete,
        {
            onSuccess: () => {
                toast(`Property deleted successfully`, {
                    type: 'success',
                    className:
                        'bg-green-100 text-green-600 text-[1.4rem] capitalize',
                })

                reset()
                closeDialog()
            },
            onError: (err: any) => {
                setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err?.response.data.message,
                })
            },
        }
    ) as any

    const onSubmit = handleSubmit((data) => {
        setResponseMessage(null)

        const adminData = {
            ...data,
        }

        console.log({adminData})
        post_mutation(adminData)
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
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 relative'>
                        <img
                            src='/icons/admins/modalDeactivate.svg'
                            alt=''
                            className='animate__animated animate__pulse '
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>Are you sure you want to delete this Property?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                onClick={() => delete_mutation()}
                            >
                                {delete_loading ? 'Loading...' : 'delete'}
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid text-[1.6rem] border rounded-lg bg-white'>
                <div className=' p-10  rounded-lg '>
                    <div className='flex w-full border-b items-center pb-5 justify-between'>
                        <h2 className='heading2'>{data?.data.property_type}</h2>

                        <button
                            className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={openDialog}
                        >
                            <img src='/icons/admins/delete.svg' alt='' />
                            <span className='text-red-600 text-[1.4rem] font-semibold capitalize'>
                                delete
                            </span>
                        </button>
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
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>{' '}
                            {post_loading ? 'Loading...' : 'Save'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default ViewProperty
