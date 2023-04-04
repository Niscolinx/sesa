import React, { useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useAppDispatch } from '../../../store/app/hooks'
import { AxiosRequest } from '../../../utils/axios'
import ImageInput from '../../../components/UI/input/ImageInput'

const AddEstate = () => {
    interface Inputs {
        estate_name: string
        estate_location_state: string
        address: string
        estate_manager: string
        security_company: string
        estate_fee: number
        sesa_fee: number
        number_of_resident_user: number
        additional_resident_user: number
        
    }

    const dispatch = useAppDispatch()
    const [photoUrl, setPhotoUrl] = useState('')
    const [selectedState, setSelectedState] = useState<string | null>('')
    const estateLocationState = ['Abuja', 'Lagos']
    const [selectedEstateManager, setSelectedEstateManager] = useState<
        string | null
    >('')
    const estateManager = ['Manager 1', 'Manager 2', 'Manager 3']
    const [selectedSecurityCompany, setSelectedSecurityCompany] = useState<
        string | null
    >('')
    const securityCompany = ['Company 1', 'Company 2', 'Company 3']

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageUrl, setImageUrl] = useState<File | null>(null)
    const [iskyg, setIskyg] = useState(false)

    const toggleIskyg = () => setIskyg(!iskyg)

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageUrl(file)
    }

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postAdmin = (data: Inputs) => {
        return AxiosRequest({
            dispatch,
            url: '/admin/create',
            method: 'post',
            data,
        })
    }
    const {
        mutate,
        data: response_data,
        isLoading,
    } = useMutation(postAdmin) as any

    useEffect(() => {
        console.log({ response_data })
        if (response_data?.status === 200) {
            handleOpen()
        } else {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: response_data?.response?.data.message,
            })
        }

        // const timeoutId = setTimeout(() => {
        //     setResponseMessage(null)
        // }, 10000)
    }, [response_data])

    const onSubmit = handleSubmit((data) => {
        const {
            estate_name,
            estate_location_state,
            estate_manager,
            address,
            security_company,
        } = data

        // const adminData = {
        //     name: `${first_name} ${last_name}`,
        //     gender,
        //     dob,
        //     email: email_address,
        //     address: 'no 4 odeyim street',
        //     phone: `+234${phoneNumber}`,
        //     image: imageUrl?.name,
        // }

        mutate(data)
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

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }

    const first_section_inputs = [
        {
            label: 'estate_name',
        },

        {
            label: 'estate_location_state',
            name: 'state',
            type: 'select',
            selectProps: {
                state: estateLocationState,
                selectedState,
                setSelectedState,
            },
        },
        {
            label: 'address',
        },
        {
            label: 'estate_manager',
            type: 'select',
            selectProps: {
                state: estateManager,
                selectedState: selectedEstateManager,
                setSelectedState: setSelectedEstateManager,
            },
        },
        {
            label: 'security_company',
            type: 'select',
            selectProps: {
                state: securityCompany,
                selectedState: selectedSecurityCompany,
                setSelectedState: setSelectedSecurityCompany,
            },
        },
    ] satisfies Partial<FormInputs>[] & { label: string }[]

    const second_section_inputs = [
        {
            label: 'estate_fee',
            name: 'estate (%)',
            type: 'number',
        },
        {
            label: 'sesa_fee',
            name: 'SESA (%)',
            type: 'number',
        },
        {
            label: 'number_of_resident_user',
            type: 'number',
        },
        {
            label: 'additional_resident_user',
            type: 'number',
        },
    ] satisfies FormInputs[]

    const third_section_inputs = [
        {
            label: 'bank_name',
        },
        {
            label: 'account_name',
        },
        {
            label: 'account_number',
            type: 'number',
        },
       
    ] satisfies FormInputs[]

    return (
        <div className='bg-white rounded-lg p-8'>
            <form onSubmit={onSubmit} className='grid gap-20'>
                <div className='grid gap-10'>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        Estate Details
                    </p>
                    <section
                        className='grid max-w-[84rem] gap-16'
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        {first_section_inputs.map((input, idx) => {
                            const { label, type, name, selectProps } = input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    fullWidth={label === 'address'}
                                    type={type || 'text'}
                                    name={name}
                                    isSelect={type === 'select'}
                                    select={selectProps}
                                />
                            )
                        })}
                    </section>
                </div>
                <div className='border-t grid gap-10 pt-16'>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        Estate Convinience Fees
                    </p>
                    <section
                        className='grid max-w-[84rem] gap-16  '
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        {second_section_inputs.map((input, idx) => {
                            const { label, type, name } = input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    type={type || 'text'}
                                    name={name}
                                />
                            )
                        })}
                        <div className='grid items-center justify-between gap-4'>
                            <p className='font-Satoshi-Medium text-[1.4rem]'>
                                Sign Out Required
                            </p>
                            <div
                                onClick={toggleIskyg}
                                className='cursor-pointer'
                            >
                                {iskyg ? (
                                    <img
                                        src='/icons/admins/switchOn.svg'
                                        alt=''
                                    />
                                ) : (
                                    <img
                                        src='/icons/admins/switchOff.svg'
                                        alt=''
                                    />
                                )}
                            </div>
                        </div>
                        <ImageInput
                            handlePicture={handlePicture}
                            photoPreview={photoPreview}
                        />
                    </section>
                </div>
                <section className='addEstate__box'>
                    <p className='addEstate__heading'>Estate Account Details</p>
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='bankName'>Bank Name *</label>
                            <input type='text' required id='bankName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='accountName'>Account Name *</label>
                            <input type='text' required id='accountName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='accountNumber'>
                                Account Number *
                            </label>
                            <input type='number' id='accountNumber' required />
                        </div>
                    </div>
                </section>
                <button
                    className='btn addEstate__btn'
                    style={{ justifySelf: 'start' }}
                >
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    Add AddEstate
                </button>
            </form>
        </div>
    )
}

export default AddEstate
