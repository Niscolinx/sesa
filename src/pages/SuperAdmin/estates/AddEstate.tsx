import React, { useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import ImageInput from '../../../components/UI/input/ImageInput'
import useAxios from '../../../components/hooks/useAxios'
import useFetchData from '../../../utils/useFetchData'

const AddEstate = () => {
    interface Inputs {
        estate_name: string
        state: string
        address: string
        estate_manager: string
        security_company: string
        estate_percentage: number
        sesadigital_percentage: number
        no_of_resident_user: number
        additional_resident_user: number
        bank_name: string
        account_name: string
        account_number: number
    }

    type FormInputs = {
        label: keyof Inputs
        type: string
        name?: string
        required?: boolean
        disabled?: boolean
        minLength?: number
        maxLength?: number
        selectProps?: SelectProps
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const { data: estate_manager_data, isLoading: estate_manager_loading } =
        useFetchData({
            url: '/manager/fetchDropdownEstateManager',
            name: 'estate_manager',
        })
    const { data: security_company_data, isLoading: security_company_loading } =
        useFetchData({
            url: '/security-company/get/all',
            name: 'security_company',
        })
    const { data: states_data, isLoading: states_data_loading } = useFetchData(
        {}
    )

    const axiosInstance = useAxios()

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const estateFeeRef = useRef<number | null>()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [selectedState, setSelectedState] = useState<string>('')
    const [selectedEstateManager, setSelectedEstateManager] = useState<
        string[]
    >([])
    const [selectedSecurityCompany, setSelectedSecurityCompany] = useState<
        string[]
    >([])

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isSignOutRequired, setIsSignOutRequired] = useState(false)
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const toggleIsSignOutRequired = () =>
        setIsSignOutRequired(!isSignOutRequired)

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    const watchedField = watch('estate_percentage')


    useEffect(() => {
        if (watchedField >= 0 && watchedField <= 100) {
            estateFeeRef.current = watchedField
            setValue('estate_percentage', Number(watchedField))
            setValue('sesadigital_percentage', 100 - watchedField)
        } else {
            if (estateFeeRef.current) {
                setValue('estate_percentage', estateFeeRef.current)
            }
        }
    }, [watchedField])

   

    const postRequest = (data: Inputs) => {
        return axiosInstance({
            url: '/estate/create',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    const { mutate, isLoading } = useMutation(postRequest, {
        onSuccess: ({ response }: any) => {
            openDialog()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response?.data.message,
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
        setSelectFormErrors(null)

        let isError = false
        if (selectedSecurityCompany.length < 1) {
            isError = true
            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    'security company': 'Field cannot be empty',
                }
            })
        }

        if (selectedEstateManager.length < 1) {
            isError = true

            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    'estate manager': 'Field cannot be empty',
                }
            })
        }
        if (selectedState.length < 1) {
            isError = true

            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    state: 'Field cannot be empty',
                }
            })
        }



        if (isError) {
            return
        }

      

        const state_id: string[] = states_data
            .filter(({ name }: any) => selectedState.includes(name))
            .map(({ id }: any) => (
                id
            ))[0]

        const security_company_id: string[] = security_company_data
            .filter(({ name }: any) => selectedSecurityCompany.includes(name))
            .map(({ id }: any) => ( id ))[0]

        const estate_manager_id: string[] = estate_manager_data
            .filter(({ name}: any) =>
                selectedEstateManager.includes(name)
            )
            .map(({ id }: any) => ( id ))[0]


            console.log({data})

        const updated_data: any = {
            ...data,
            state_id,
            estate_manager_id,
            security_company_id,
            image: imageFile,
        }

        console.log({updated_data})
        //mutate(updated_data)
    })

    if (
        states_data_loading ||
        security_company_loading ||
        estate_manager_loading
    ) {
        return <p className='p-8'>Loading...</p>
    }

    const slicedStates: string[] = states_data.map(({ name }: any) => name)
    const slicedEstateManagers: string[] = estate_manager_data.map(
        ({ name}: any) => name
    )
    const slicedSecurityCompanies: string[] = security_company_data.map(
        ({ name }: any) => name
    )

    const first_section_inputs = [
        {
            label: 'estate_name',
        },

        {
            label: 'state',
            type: 'select',
            selectProps: {
                state: slicedStates,
                isSearchable: true,
                selectedState: selectedState,
                setSelectedState: setSelectedState,
            },
        },
        {
            label: 'address',
        },
        {
            label: 'estate_manager',
            type: 'select',
            selectProps: {
                state: slicedEstateManagers,
                isSearchable: true,
                selectedState: selectedEstateManager,
                setSelectedState: setSelectedEstateManager,
            },
        },
        {
            label: 'security_company',
            type: 'select',
            selectProps: {
                state: slicedSecurityCompanies,
                isSearchable: true,
                selectedState: selectedSecurityCompany,
                setSelectedState: setSelectedSecurityCompany,
            },
        },
    ] satisfies Partial<FormInputs>[]

    const second_section_inputs = [
        {
            label: 'estate_percentage',
            name: 'estate (%)',
            type: 'number',
        },
        {
            label: 'sesadigital_percentage',
            name: 'SESA (%)',
            disabled: true,
            type: 'number',
        },
        {
            label: 'no_of_resident_user',
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
            minLength: 9,
            maxLength: 10
        },
    ] satisfies Partial<FormInputs>[]

    return (
        <div className='bg-white rounded-lg p-8'>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalSuccess.svg' alt='' />
                        <p>You have successfully added an Estate</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                View details
                            </button>
                            <button
                                className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            {responseMessage?.displayMessage && (
                <p className='text-center my-5'>
                    <span className={responseMessage?.className}>
                        {responseMessage?.displayMessage}
                    </span>
                </p>
            )}
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
                            const { label, type, selectProps, minLength, maxLength } = input

                            return (
                                <Input
                                    key={idx + label}
                                    id={idx}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    fullWidth={label === 'address'}
                                    selectFormErrors={selectFormErrors}
                                    type={type}
                                    minLength={minLength}
                                    maxLength={maxLength}
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
                            const { label, type, name, disabled } = input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    disabled={disabled}
                                    formErrors={formErrors}
                                    type={type}
                                    minLength={0}
                                    name={name}
                                />
                            )
                        })}
                        <div className='grid items-center justify-between gap-4'>
                            <p className='font-Satoshi-Medium text-[1.4rem]'>
                                Sign Out Required
                            </p>
                            <div
                                onClick={toggleIsSignOutRequired}
                                className='cursor-pointer'
                            >
                                {isSignOutRequired ? (
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
                <div className='border-t grid gap-10 pt-16'>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        Estate Account Details
                    </p>
                    <section
                        className='grid max-w-[84rem] gap-16  '
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        {third_section_inputs.map((input, idx) => {
                            const { label, type } = input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    type={type}
                                />
                            )
                        })}
                    </section>
                </div>
                <button
                    className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-self-start'
                    // onClick={addArtisanHandler}
                >
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    {isLoading ? 'Loading...' : 'Add Estate'}
                </button>
            </form>
        </div>
    )
}

export default AddEstate
