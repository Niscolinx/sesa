import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { toast, ToastContainer } from 'react-toastify'
import { MultipleSelect } from '../../../../components/SuperAdmin/UI/Select'
import useFetchData from '../../../../utils/useFetchData'

type DialogType = 'validate' | 'add-Artisan'

const AddArtisanGroup = () => {
    const [groupName, setGroupName] = useState('')
    const [selectedArtisans, setSelectedArtisans] = useState<string[]>([])
    const [selectedEstates, setSelectedEstates] = useState<string[]>([])


    const { data: states_data, isLoading: states_loading } = useFetchData({})
    const { data: categories_data, isLoading: categories_loading } =
        useFetchData({
            url: '/admin/category/getAll',
            name: 'categories',
        })

        
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

         const slicedCategories: string[] = categories_data.data.map(
             ({ name, id }: any) => ({ name, id })
         )

         const category = slicedCategories.map(
             ({ name, id }: any) => selectedCategories.includes(name) && { id }
         )

         const state = slicedStates
             .filter(({ name }: any) => selectedRegions.includes(name))
             .map(({ id }: any) => id)[0]

         const updatedData = {
             ...data,
             category,
             state,
             validation_option: 'bvn',
             is_kyr_approved: false,
             gender: selectedGender,
             // image: imageFile,
             image: '',
         }

         console.log({ updatedData })
    }

    const addArtisanGroupHandler = () => {}

    const formInputs = [
        {
            name: 'First Name',
            label: 'firstname',
        },
        { name: 'Last Name', label: 'lastname' },
        {
            label: 'Gender',
            type: 'select',
            selectProps: {
                state: gender,
                selectedState: selectedGender,
                setSelectedState: setSelectedGender,
            },
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
                state: slicedStates,
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
