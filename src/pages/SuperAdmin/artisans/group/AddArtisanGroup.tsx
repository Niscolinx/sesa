import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { toast, ToastContainer } from 'react-toastify'
import { MultipleSelect } from '../../../../components/SuperAdmin/UI/Select'
import useFetchData from '../../../../utils/useFetchData'
import Input, { SelectProps } from '../../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import useAxios from '../../../../components/hooks/useAxios'
import { useMutation } from 'react-query'

type DialogType = 'validate' | 'add-Artisan'

const AddArtisanGroup = () => {
    interface Inputs {
        name: string
    }

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        value?: string
        required?: boolean
        selectProps?: SelectProps
    }
    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const [selectedArtisans, setSelectedArtisans] = useState<string[]>([])
    const [selectedEstates, setSelectedEstates] = useState<string[]>([])
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const axiosInstance = useAxios()

    const postRequest = (data: Inputs) => {
        return axiosInstance({
            url: '/admin/group',
            method: 'post',
            data,
        })
    }
    const { mutate, isLoading } = useMutation(postRequest, {
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },

        onSuccess: () => {
            reset()
            setSelectedArtisans([])
            setSelectedEstates([])
            toast(`Artisan Group successfully`, {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
        },
    }) as any

    const { data: estates_data, isLoading: estates_loading } = useFetchData({
        url: '/estate/getall',
        name: 'estates',
    })
    const { data: artisans_data, isLoading: artisans_loading } = useFetchData({
        url: '/admin/artisan/getAll',
        name: 'Artisans',
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const onSubmit = handleSubmit((data) => {
        let isError = false
        if (selectedArtisans.length < 1) {
            isError = true
            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    'Artisan Categories': 'Field cannot be empty',
                }
            })
        }
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
            console.log({ isError }, 'error')
            return
        }

       

        setSelectFormErrors(null)
        //handleClose()

        // openValidateDialog()

        const slicedEstates: string[] = estates_data.data.map(
            ({ estate_name, id }: any) => ({
                estate_name,
                id,
            })
        )

        const slicedArtisans: string[] = artisans_data.map(
            ({ firstname, id }: any) => ({ firstname, id })
        )

       
        const artisan = slicedArtisans
            .filter(({ firstname }: any) =>
                selectedArtisans.includes(firstname)
            )
            .map(({ id }: any) => ({id}))

        const estate = slicedEstates
            .filter(({ estate_name }: any) =>
                selectedEstates.includes(estate_name)
            )
            .map(({ id }: any) => ({id}))

        const updatedData = {
            ...data,
            artisan,
            estate,
        }


        mutate(updatedData)
    })

    if (estates_loading || artisans_loading) {
        return <p>Loading...</p>
    }

    const slicedEstates: string[] = estates_data.data.map(
        ({ estate_name }: any) => estate_name
    )

    const slicedArtisans: string[] = artisans_data.map(
        ({ firstname }: any) => firstname
    )

    const formInputs = [
        {
            label: 'name',
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
        {
            label: 'Artisans',
            type: 'select',
            selectProps: {
                isMulti: true,
                state: slicedArtisans,
                selectedState: selectedArtisans,
                setSelectedState: setSelectedArtisans,
            },
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />

            <div className='p-8 bg-white rounded-lg '>
                <div className='grid gap-8 border-b py-10 self-start'>
                    <h2
                        className='text-[2rem] '
                        style={{
                            fontFamily: 'Satoshi-medium',
                        }}
                    >
                        Add Artisan Group
                    </h2>
                </div>

                {responseMessage?.displayMessage && (
                    <p className='text-center my-5'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    onSubmit={onSubmit}
                    className='grid gap-16 max-w-[40rem]  mt-10'
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, selectProps } = input

                            return (
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
                            )
                        })}

                        <button className='btn justify-self-start btn-blue'>
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            {isLoading ? 'Loading...' : 'Add Group'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default AddArtisanGroup
