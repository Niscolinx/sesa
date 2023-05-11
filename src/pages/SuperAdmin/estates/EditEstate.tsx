import React, { useRef, useState } from 'react'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import useAxios from '../../../components/hooks/useAxios'
import useFetchData from '../../../utils/useFetchData'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import Activate_Deactivate from '../../../components/UI/Dialog/Activate_Deactivate'

const EditEstate = () => {
    interface Inputs {
        status: number
        state_name: string
        security_company_id: null
        estate_name: string
        estate_location_state: string
        address: string
        image: string
        estate_manager: string
        security_company: string
        estate_percentage: number
        sesadigital_percentage: number
        number_of_resident_user: number
        no_of_resident_user: number
        bank_name: string
        account_name: string
        account_number: number
    }

    type FormInputs = {
        label: keyof Inputs
        type: string
        name?: string
        required?: boolean
        selectProps?: SelectProps
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const { data: estate_manager_data, isLoading: estate_manager_loading } =
        useFetchData({
            url: '/estate/getall',
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
    const params = useParams()
    const dialogRef = useRef<HTMLDialogElement | null>(null)

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

    const estate_id = params.id?.replace(':', '')

    const toggleIsSignOutRequired = () =>
        setIsSignOutRequired(!isSignOutRequired)

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const postRequest = (data: Inputs) => {
        return axiosInstance({
            url: `/estate/create`,
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
    const deleteRequest = () => {
        return axiosInstance({
            url: `/estate/delete/${estate_id}`,
            method: 'delete',
        })
    }
    const getRequest = () => {
        return axiosInstance({
            url: `/estate/view/getbyid/${estate_id}`,
        })
    }

    const { isLoading: get_loading } = useQuery(
        `view_estate_${estate_id}`,
        getRequest,
        {

            onSuccess: (res) => {
                const fetched_data: Inputs = res.data

                const {
                    estate_name,
                    estate_location_state,
                    address,
                    estate_manager,
                    security_company,
                    estate_percentage,
                    sesadigital_percentage,
                    number_of_resident_user,
                    no_of_resident_user,
                    bank_name,
                    account_name,
                    account_number,
                    image,
                } = fetched_data

                reset({
                    ...fetched_data
                })

                setPhotoPreview(image)
                // setSelectedGender(fetched_data.gender)
            },
        }
    )

    const { mutate: delete_mutation, isLoading: delete_loading } = useMutation(
        deleteRequest,
        {
            onSuccess: ({ response }: any) => {
                toast('Admin Deactivated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },
            onError: (err: any) => {
                setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err?.response?.data.message,
                })
            },
        }
    )
    const { mutate, isLoading } = useMutation(postRequest, {
        onSuccess: ({ response }: any) => {
            toast('Estate deleted successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response?.data.message,
            })
        },
    })

   
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

        const state: string[] = states_data
            .filter(({ name }: any) => selectedState.includes(name))
            .map(({ id }: any) => ({
                id,
            }))[0]

        const security_company: string[] = security_company_data
            .filter(({ name }: any) => selectedSecurityCompany.includes(name))
            .map(({ id }: any) => ({ id }))[0]

        const estate_manager: string[] = estate_manager_data.data
            .filter(({ estate_name }: any) =>
                selectedEstateManager.includes(estate_name)
            )
            .map(({ id }: any) => ({ id }))[0]

        const updated_data: any = {
            ...data,
            state,
            estate_manager,
            security_company,
            image: imageFile,
        }

        mutate(updated_data)
    })

    if (
        get_loading ||
        states_data_loading ||
        security_company_loading ||
        estate_manager_loading
    ) {
        return <p className='p-8'>Loading...</p>
    }

    const slicedStates: string[] = states_data.map(({ name }: any) => name)
    const slicedEstateManagers: string[] = estate_manager_data.data.map(
        ({ estate_name }: any) => estate_name
    )
    const slicedSecurityCompanies: string[] = security_company_data.map(
        ({ name }: any) => name
    )

    const first_section_inputs = [
        {
            label: 'estate_name',
        },

        {
            label: 'state_name',
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
            type: 'number',
        },
        {
            label: 'number_of_resident_user',
            type: 'number',
        },
        {
            label: 'no_of_resident_user',
            type: 'number',
        },
    ] satisfies Partial<FormInputs>[]

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
    ] satisfies Partial<FormInputs>[]

    return (
        <div className='bg-white rounded-lg p-8'>
            <div className='flex justify-between items-center mb-20'>
                <label
                    htmlFor='photoUpload'
                    className='grid gap-4 cursor-pointer justify-items-center'
                >
                    <img
                        src={photoPreview}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                    />
                    <span className='text-color-blue-1 text-[1.4rem]'>
                        Edit
                    </span>
                </label>
                <input
                    type='file'
                    name='photoUpload'
                    id='photoUpload'
                    accept='image/*'
                    className='hidden'
                    onChange={handlePicture}
                />
                <Activate_Deactivate
                    id={estate_id}
                    url={'/admin/deactivate_activate'}
                    status={get_response.data.status}
                    title={'admin'}
                    queryCache={`view_estate_${estate_id}`}
                />{' '}
            </div>

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
                            const { label, type, selectProps } = input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    fullWidth={label === 'address'}
                                    selectFormErrors={selectFormErrors}
                                    type={type}
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
                        <img
                            src='/icons/admins/saveDisk.svg'
                            alt=''
                            className='w-[1.7rem] h-[1.7rem]'
                        />
                    </span>{' '}
                    {isLoading ? 'Loading...' : 'Save'}
                </button>
            </form>
        </div>
    )
}

export default EditEstate
