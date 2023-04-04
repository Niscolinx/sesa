import React, { useContext, useEffect, useRef, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import { ModalContext } from '../../../Context/ModalContext'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import Input, { SelectProps } from '../../../components/UI/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useAppDispatch } from '../../../store/app/hooks'
import { AxiosRequest } from '../../../utils/axios'

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
    const estateLocationState = [
        'Abuja',
        'Lagos',
    ]
    const [selectedEstateManager, setSelectedEstateManager] = useState<string | null>('')
    const estateManager = [
        'Manager 1',
        'Manager 2',
        'Manager 3',
    ]
    const [selectedSecurityCompany, setSelectedSecurityCompany] = useState<string | null>('')
    const securityCompany = [
        'Company 1',
        'Company 2',
        'Company 3',
    ]

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
        type: string
        name: string
        selectProps: SelectProps
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
                setSelectedState: setSelectedEstateManager
            },
        },
        {
            label: 'security_company',
            type: 'select',
            selectProps: {
                state: securityCompany,
                selectedState: selectedSecurityCompany,
                setSelectedState: setSelectedSecurityCompany
            },
        },
    ] satisfies Partial<FormInputs>[] & {label: string}[]


    const second_section_inputs = [
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

    return (
        <div className='bg-white rounded-lg p-8'>
            <form onSubmit={onSubmit} className='grid gap-4'>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Estate Details
                </p>
                <section
                    className='grid max-w-[84rem] gap-16 mt-12 '
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
                                name={name || undefined}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}
                </section>

                <section className='addEstate__box'>
                    <p className='addEstate__heading'>
                        Estate Convenience Fees
                    </p>
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate(%)</label>
                            <input type='text' required id='estatePercentage' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>SESA(%)</label>
                            <input type='text' required id='sesaPercentage' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='date'>
                                Number of Resident User
                            </label>
                            <input
                                type='number'
                                id='residentUsersNo'
                                required
                            />
                        </div>

                        <div className='addEstate__form--item'>
                            <label htmlFor='additionalResidentUser'>
                                Additional Resident User
                            </label>
                            <input
                                required
                                type='text'
                                id='additionalResidentUser'
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-[2rem] font-Satoshi-Medium flex items-center gap-2'>
                               
                               
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
                        <div className='addEstate__form--file'>
                            <label htmlFor='photoUpload'>
                                <img
                                    src='/icons/addEstates/photo_library.svg'
                                    alt=''
                                />
                                <p>
                                    Drag addEstate manager picture here or{' '}
                                    <span>click</span> to upload
                                </p>
                            </label>
                            <input
                                type='file'
                                name='photoUpload'
                                id='photoUpload'
                                accept='image/*'
                                className='hidden'
                                onChange={handlePicture}
                            />

                            {photoUrl && (
                                <div className='file__uploadImgBox'>
                                    <img
                                        src={photoUrl}
                                        alt='photoPreview'
                                        className='object-contain'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
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
