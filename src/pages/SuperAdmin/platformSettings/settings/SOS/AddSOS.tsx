import {
    ChangeEvent,
    FormEvent,
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useFetchData from '../../../../../utils/useFetchData'
import useAxios from '../../../../../components/hooks/useAxios'
import Input, { SelectProps } from '../../../../../components/UI/input/Input'

interface AddPhoneNumber {
    idx: number
}

const AddPhoneNumber = forwardRef<HTMLInputElement, AddPhoneNumber>(
    ({ idx }, ref) => {
        // useImperativeHandle(ref, () => (phoneNumber))

        return (
            <div className={`w-full grid gap-4 self-baseline`}>
                <label
                    htmlFor={`phone`}
                    className='text-[1.4rem] font-semibold capitalize'
                >
                    phone Number {idx + 1}
                </label>

                <input
                    type='number'
                    name='number'
                    id={`phone`}
                    ref={ref}
                    className={` relative flex items-center border border-color-grey rounded-lg w-full  disabled:opacity-50 disabled:cursor-not-allowed p-4`}
                />
            </div>
        )
    }
)
const AddSOS = () => {
    type FormInputs = {
        label: string
        type?: string
        name?: string
        required?: boolean
        selectProps?: SelectProps
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type Inputs = {
        name: string
        email: string
        address: string
    }

    const { data: estates_data, isLoading: estates_loading } = useFetchData({
        url: '/estate/getall',
        name: 'estates',
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
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const [phone_numbs, set_phone_numbs] = useState<string[]>([''])

    const axiosInstance = useAxios()

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
            toast(`Artisan Group successfully`, {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })

            openDialog()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
    })

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
    const onSubmit = handleSubmit((data) => {
        let isError = false
        setSelectFormErrors(null)

        if (selectedEstates.length < 1) {
            isError = true

            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    Gender: 'Field cannot be empty',
                }
            })
        }

        if (isError) {
            return
        }
        setResponseMessage(null)

        const slicedEstates: string[] = estates_data.data.map(
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
        }

        mutate(updated_data)
    })

    if (estates_loading) {
        return <p>Loading...</p>
    }

    const slicedEstates: string[] = estates_data?.data.map(
        ({ estate_name }: any) => estate_name
    )

    console.log({ slicedEstates })

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

    const submit = (e: FormEvent) => {
        e.preventDefault()
        console.log(phone_numbs)
    }

    const addPhone = () => {
        console.log('phones')
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => closeDialog()}
                        />

                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                            <img src='/icons/admins/modalSuccess.svg' alt='' />

                            <p>You have successfully added SOS</p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={closeDialog}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}

                <form
                    onSubmit={submit}
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
                                    {/* {label === 'Estates' && (
                                        <p className='text-[2rem] font-Satoshi-Medium py-8 -mb-10'>
                                            Add Estates
                                        </p>
                                    )} */}
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
                        {phone_numbs.map((num: string, idx) => {
                            return <AddPhoneNumber value={num} idx={idx} />
                        })}

                        <button onClick={addPhone}>Add phone number</button>

                        <button className='btn justify-self-start btn-blue col-span-full'>
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            {isLoading ? 'Loading...' : 'Add SOS'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default AddSOS
