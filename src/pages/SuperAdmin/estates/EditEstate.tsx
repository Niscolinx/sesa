import React, { useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import ImageInput from '../../../components/UI/input/ImageInput'
import useAxios from '../../../components/hooks/useAxios'
import useFetchData from '../../../utils/useFetchData'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

const EditEstate = () => {
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
        bank_name: string
        account_name: string
        account_number: number
    }

    type FormInputs = {
        label: string
        type: string
        name: string
        required: boolean
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
            url: `/manager/get/${estate_id}`,
        })
    }

    const { isLoading: get_loading } = useQuery('view estate', getRequest, {
        refetchInterval: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,

        onSuccess: (res) => {
            const fetched_data = res.data

            const {
                estate_name,
                estate_location_state,
                address,
                estate_manager,
                security_company,
                estate_fee,
                sesa_fee,
                number_of_resident_user,
                additional_resident_user,
                bank_name,
                account_name,
                account_number,
                image,
            } = fetched_data

            reset({
                estate_name,
                estate_location_state,
                address,
                estate_manager,
                security_company,
                estate_fee,
                sesa_fee,
                number_of_resident_user,
                additional_resident_user,
                bank_name,
                account_name,
                account_number,
            })

            setPhotoPreview(image)
            // setSelectedGender(fetched_data.gender)
        },
    })

    const { mutate:delete_mutation, isLoading: delete_loading } = useMutation(deleteRequest, {
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
    })
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
            label: 'estate manager',
            type: 'select',
            selectProps: {
                state: slicedEstateManagers,
                isSearchable: true,
                selectedState: selectedEstateManager,
                setSelectedState: setSelectedEstateManager,
            },
        },
        {
            label: 'security company',
            type: 'select',
            selectProps: {
                state: slicedSecurityCompanies,
                isSearchable: true,
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
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img
                            src='/icons/admins/modalDeactivate.svg'
                            alt=''
                            className='animate__animated animate__pulse '
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />

                        <p>
                            Are you sure you want to delete this Estate?
                            
                        </p>
                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={() => delete_mutation()}
                            >
                                {delete_loading ? 'Loading...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
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

                <div className='flex gap-8'>
                    <button
                        className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={openDialog}
                    >
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold'>
                            Delete
                        </span>
                    </button>
                </div>
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
