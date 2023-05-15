import { useEffect, useRef, useState } from 'react'
import Input, { SelectProps } from '../../../../Components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from 'react-query'
import useAxios from '../../../../Components/hooks/useAxios'

type Frequency = 'monthly' | 'weekly' | 'quarterly' | 'yearly'

const ViewPackage = () => {
    interface Inputs {
        package_name: string
        frequency: string
        amount: number
        details: string
        discount: number
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        minLength?: number
        selectProps?: SelectProps
    }

    const axiosInstance = useAxios()

    const frequencyState = [
        'monthly',
        'weekly',
        'quarterly',
        'yearly',
    ] satisfies Frequency[]

    const [selectedFrequency, setSelectedFrequency] =
        useState<string>('monthly')
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const postPackage = (data: Inputs) => {
        return axiosInstance({
            url: '/admin/resident/user/package/create',
            method: 'post',
            data,
        })
    }
    const { mutate, isLoading } = useMutation(postPackage, {
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
        const { amount, ...others } = data

        const adminData = {
            ...others,
            price: amount,
            frequency: selectedFrequency,
        }

        mutate(adminData)
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

    const formInputs = [
        {
            label: 'package_name',
        },

        {
            label: 'frequency',
            type: 'select',
            selectProps: {
                state: frequencyState,
                selectedState: selectedFrequency,
                setSelectedState: setSelectedFrequency,
            },
        },
        {
            label: 'amount',
            type: 'number',
        },
        {
            label: 'details',
        },
        {
            label: 'discount',
            type: 'number',
            minLength: 1,
        },
    ] satisfies FormInputs[]

    return (
        <div className=' p-8 bg-white h-[70vh] rounded-lg overflow-y-scroll'>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalSuccess.svg' alt='' />
                        <p>You have successfully added a Package</p>

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
            <form className='grid gap-16' onSubmit={onSubmit}>
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <div
                    className='grid gap-16'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(40rem, 1fr))',
                    }}
                >
                    {formInputs.map((input, idx) => {
                        const { label, type, selectProps, minLength } = input
                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                register={register}
                                formErrors={formErrors}
                                type={type}
                                minLength={minLength}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}
                </div>

                <button className='btn justify-self-start btn-blue'>
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    {isLoading ? 'Loading...' : 'Add Package'}
                </button>
            </form>
        </div>
    )
}

export default ViewPackage
