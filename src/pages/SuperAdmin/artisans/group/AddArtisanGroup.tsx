import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { toast, ToastContainer } from 'react-toastify'
import { MultipleSelect } from '../../../../components/SuperAdmin/UI/Select'
import useFetchData from '../../../../utils/useFetchData'
import { SelectProps } from '../../../../components/UI/input/Input'
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

    const [groupName, setGroupName] = useState('')
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
            url: '/admin/artisan',
            method: 'post',
            data,

            headers: { 'Content-Type': 'multipart/form-data' },
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
        url: '/admin/category/getAll',
        name: 'categories',
    })

    const {
        register,
        handleSubmit,
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

        const slicedStates: string[] = estates_data.map(
            ({ name, id }: any) => ({
                name,
                id,
            })
        )

        const slicedCategories: string[] = artisans_data.data.map(
            ({ name, id }: any) => ({ name, id })
        )

        const category = slicedCategories.map(
            ({ name, id }: any) => selectedArtisans.includes(name) && { id }
        )

        const state = slicedStates
            .filter(({ name }: any) => selectedEstates.includes(name))
            .map(({ id }: any) => id)[0]

        const updatedData = {
            ...data,
            category,
            state,
        }

        console.log({ updatedData })

        mutate(updatedData)
    })

    const addArtisanGroupHandler = () => {}

    if (estates_loading || artisans_loading) {
        return <p>Loading...</p>
    }

    const slicedStates: string[] = estates_data.map(({ name }: any) => name)

    const slicedCategories: string[] = artisans_data.data.map(
        ({ name }: any) => name
    )

    const formInputs = [
        {
            name: 'First Name',
            label: 'firstname',
        },

        {
            label: 'phone_number',
            type: 'number',
        },
        {
            label: 'email_address',
            type: 'email',
        },
        {
            label: 'address_line_1',
        },
        {
            label: 'address_line_2',
        },
        {
            label: 'State',
            type: 'select',
            selectProps: {
                state: sliced,
                isSearchable: true,
                selectedState: selectedRegions,
                setSelectedState: setSelectedRegions,
            },
        },
        {
            label: 'Artisan Categories',
            type: 'select',
            selectProps: {
                isMulti: true,
                state: slicedCategories,
                selectedState: selectedCategories,
                setSelectedState: setSelectedCategories,
            },
        },
        {
            label: 'business_name',
            required: false,
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
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-16 max-w-[40rem] h-[60vh] mt-10'
                >
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='groupName'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            value={groupName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setGroupName(e.target.value)
                            }
                            id='groupName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <MultipleSelect
                        selectFrom={['Artisan 1', 'Artisan 2', 'Artisan 3']}
                        label='Artisans'
                        placeholder='Select Artisans'
                        selected={selectedArtisans}
                        setSelected={setSelectedArtisans}
                    />
                    <MultipleSelect
                        selectFrom={[
                            'Estate 1',
                            'Estate 2',
                            'Estate 3',
                            'Estate 4',
                            'Estate 5',
                            'Estate 6',
                            'Estate 7',
                        ]}
                        label='Estates'
                        placeholder='Select Estate'
                        selected={selectedEstates}
                        setSelected={setSelectedEstates}
                    />

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-auto mr-auto'
                        onClick={addArtisanGroupHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Artisan Group
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddArtisanGroup
