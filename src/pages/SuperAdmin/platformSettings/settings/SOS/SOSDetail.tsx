import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'
import useFetchData from '../../../../../utils/useFetchData'
import useAxios from '../../../../../components/hooks/useAxios'
import Input, { SelectProps } from '../../../../../components/UI/input/Input'
import Spinner from '../../../../../components/UI/Spinner'
import { useParams } from 'react-router'

const SOSDetail = () => {
    type FormInputs = {
        label: string
        type?: string
        name?: string
        required?: boolean
        selectProps?: SelectProps
    }

    type Inputs = {
        name: string
        email: string
        address: string
    }

    const { data: estates_data, isLoading: estates_loading } = useFetchData({
        url: '/estate/fetchDropdownEstate',
        name: 'view_estates',
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const [selectedEstates, setSelectedEstates] = useState<string[]>([])
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)
    const [phoneError, setPhoneError] = useState<{
        [key: string]: string
    } | null>(null)

    const phone_ref = useRef<HTMLInputElement[]>([])

    const [phone_numbs, set_phone_numbs] = useState<string[]>([''])

    const axiosInstance = useAxios()
    const params = useParams()

    const sos_id = params.id?.replace(':', '')

    if (!sos_id) {
        toast('SOS not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }
    const postRequest = (inputs: Inputs) => {
        return axiosInstance({
            url: `/platformsettings/sos/create`,
            method: 'post',
            data: inputs,
        })
    }
    const { mutate, isLoading } = useMutation(postRequest, {
        onSuccess: () => {
            reset()
            setSelectedEstates([])
            toast(`SOS Updated`, {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
        },
        onError: (err: any) => {
            toast(`${err?.response.data.message}`, {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem]',
            })
        },
    })

    const onSubmit = handleSubmit((data) => {
        let isError = false
        setSelectFormErrors(null)
        setPhoneError(null)

        if (selectedEstates.length < 1) {
            isError = true

            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    Gender: 'Field cannot be empty',
                }
            })
        }

        const each_num = phone_ref.current.reduce((prev: string[], curr) => {
            return [...prev, curr.value]
        }, [])

        each_num.forEach((num, idx) => {
            if (num === '') {
                isError = true
                toast(`Phone Number cannot be empty`, {
                    type: 'error',
                    className: 'bg-red-100 text-red-600 text-[1.4rem]',
                })

                setPhoneError((prev) => {
                    return {
                        ...prev,
                        [`phone${idx + 1}`]: 'Field cannot be empty',
                    }
                })

                return
            } else if (num.length < 10) {
                isError = true
                toast(`Phone Number is invalid`, {
                    type: 'error',
                    className: 'bg-red-100 text-red-600 text-[1.4rem]',
                })

                setPhoneError((prev) => {
                    return {
                        ...prev,
                        [`phone${idx + 1}`]: 'Phone Number is invalid',
                    }
                })

                return
            }
        })

        if (isError) {
            return
        }

        const slicedEstates: string[] = estates_data.map(
            ({ estate_name, id }: any) => ({
                estate_name,
                id,
            })
        )

        const estate = slicedEstates
            .filter(({ estate_name }: any) =>
                selectedEstates.includes(estate_name)
            )
            .map(({ id }: any) => ({ id }))

        const updated_data = {
            ...data,
            estate,
            phone_number: each_num,
        }

        console.log({ updated_data })

        mutate(updated_data)
    })

    if (estates_loading) {
        return <p>Loading...</p>
    }

    const slicedEstates: string[] = estates_data.map(
        ({ estate_name }: any) => estate_name
    )

    const formInputs = [
        {
            label: 'name',
        },

        {
            label: 'email',
            type: 'email',
        },

        {
            label: 'address',
        },

        {
            label: 'Estates',
            type: 'select',
            selectProps: {
                state: slicedEstates,
                isMulti: true,
                selectedState: selectedEstates,
                setSelectedState: setSelectedEstates,
            },
        },
    ] satisfies FormInputs[]

    const addPhone = () => {
        set_phone_numbs((prev) => [...prev, ''])
    }

    return (
        <>
            <ToastContainer />
            <Spinner start={isLoading} />

            <div className='grid p-8 bg-white min-h-[60vh] items-baseline overflow-y-scroll rounded-lg'>
                <form
                    onSubmit={onSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, selectProps } = input

                            return (
                                <>
                                    <Input
                                        key={idx + label}
                                        label={label}
                                        register={register}
                                        formErrors={formErrors}
                                        selectFormErrors={selectFormErrors}
                                        type={type}
                                        isSelect={type === 'select'}
                                        select={selectProps}
                                    />
                                </>
                            )
                        })}
                        {phone_numbs.map((_, idx) => {
                            return (
                                <AddPhoneNumber
                                    idx={idx}
                                    phoneError={phoneError}
                                    ref={(ref: HTMLInputElement) =>
                                        (phone_ref.current[idx] = ref)
                                    }
                                />
                            )
                        })}

                        <button
                            type='button'
                            onClick={addPhone}
                            className='flex mb-[2rem] w-max items-center gap-4 col-span-full'
                        >
                            <img src='/icons/add_Icon.svg' alt='' />
                            <span className='text-[1.4rem]'>Add Phone</span>
                        </button>

                        <button className='btn justify-self-start btn-blue col-span-full'>
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            {isLoading ? 'Loading...' : 'Save'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default SOSDetail
