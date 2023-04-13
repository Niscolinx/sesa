import { FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../utils/useFetchData'
import Input from '../../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import useAxios from '../../../../components/hooks/useAxios'

const PlatformChanges = () => {
    type FormInputs = {
        label: string
        type: string
        name: string
        pre: string
        tag: 'amount'
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
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const axiosInstance = useAxios()
    const postSettings = (inputs: Inputs) => {
        return axiosInstance({
            url:
                data.length > 0
                    ? `/platformsettings/generalsettings/update/${data[0].id}`
                    : '/platformsettings/generalsettings/create',
            method: data.length > 0 ? 'put' : 'post',
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

    const onSubmit = handleSubmit((data) => {

        setResponseMessage(null)

        const adminData = {
            ...data,
            transferable_fee: 30,
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
            label: 'kyr_validation',
            name: 'kYR Validation',
            type: 'number',
            pre: 'Charges Per Validation',
            tag: 'amount',
        },
        {
            label: 'sms_notification',
            name: 'SMS Notification',
            type: 'number',
            pre: 'Charges Per sms notification',
            tag: 'amount',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />
            <div className='p-8 bg-white h-[80vh] rounded-lg'>
                <h2 className='heading2 border-b pb-10'>Platform Changes</h2>

                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    onSubmit={onSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12 items-center'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, name, pre, tag } = input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    pre={pre}
                                    tag={tag}
                                    register={register}
                                    formErrors={formErrors}
                                    type={type}
                                    minLength={0}
                                    name={name}
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

export default PlatformChanges
