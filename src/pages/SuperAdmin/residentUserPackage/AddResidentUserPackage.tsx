import { useEffect, useRef, useState } from 'react'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from 'react-query'
import useAxios from '../../../components/hooks/useAxios'

type Frequency = 'monthly' | 'weekly' | 'quarterly' | 'yearly'

const AddResidentUserPackage = () => {
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
        selectProps?: SelectProps
    }

    const axiosInstance = useAxios()

    const frequencyState = [
        'monthly',
        'weekly',
        'quarterly',
        'yearly',
    ] satisfies Frequency[]

    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
        frequencyState[0]
    )
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const postAdmin = (data: Inputs) => {
        return axiosInstance({
            url: '/admin/create',
            method: 'post',
            data,
        })
    }
    const {
        mutate,
        data: response_data,
        isLoading,
        isError,
        error: response_error,
    } = useMutation(postAdmin) as any

    useEffect(() => {
        if (!isError && response_data?.success) {
            handleOpen()
        } else {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: response_error?.response.data.message,
            })
        }
    }, [response_data, response_error])

    const onSubmit = handleSubmit((data) => {
        const adminData = {
            data,
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
                <div className='grid gap-16'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(40rem, 1fr))',
                    }}
                >
                    {formInputs.map((input, idx) => {
                        const { label, type, selectProps } = input
                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                register={register}
                                formErrors={formErrors}
                                type={type}
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
                    {isLoading ? 'Loading...' : 'Add'}
                </button>
            </form>
        </div>
    )
}

export default AddResidentUserPackage
