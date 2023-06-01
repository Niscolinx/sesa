import React, { useEffect, useState } from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import ValidateKY from '../../../components/ui/dialog/ValidateKY'
import useFetchData from '../../../components/hooks/UseFetchData'
import { ToastContainer } from 'react-toastify'
import SingleSelect from '../../../components/ui/select/SingleSelect'

function AddSiteWorker() {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        fullWidth?: boolean
        placeholder?: string
        selectProps?: SelectProps
    }

    type Workdays = { name: string; disabled: boolean; id: number }

    const workdaysState = [
        {
            name: 'weekdays - (Mon - Fri)',
            disabled: false,
            id: 1,
        },
        {
            name: 'weekends - (Sat - Sun)',
            disabled: false,
            id: 2,
        },
        {
            name: 'mon',
            disabled: false,
            id: 3,
        },
        {
            name: 'tue',
            disabled: false,
            id: 4,
        },
        {
            name: 'wed',
            disabled: false,
            id: 5,
        },
        {
            name: 'thur',
            disabled: false,
            id: 6,
        },
        {
            name: 'fri',
            disabled: false,
            id: 7,
        },
        {
            name: 'sat',
            disabled: false,
            id: 8,
        },
        {
            name: 'sun',
            disabled: false,
            id: 9,
        },
    ]

    const genderState = ['Male', 'Female']
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)
    const [selectedWorkdays, setSelectedWorkdays] = React.useState<string[]>([])
    const [selectedState, setSelectedState] = useState<string[]>([])
    const [workdays, setWorkdays] = useState<Workdays[]>(workdaysState)
    const [propertyCode, setPropertyCode] = useState('')

    const { data: states_data, isLoading: states_loading } = useFetchData({})
     const { isLoading: active_properties_loading, data: active_properties_data } = useFetchData({
         url: '/property/getActiveProperty',
         name: 'get_active_property',
     })


    useEffect(() => {
        const disabledDays = (
            arr: Workdays[],
            id: number[],
            type: 'disable' | 'enable'
        ) => {
            const copy = [...arr]

            copy.forEach((day) => {
                if (id.includes(day.id)) {
                    if (type == 'disable') {
                        day.disabled = true
                    } else {
                        day.disabled = false
                    }
                }
            })

            return copy
        }

        const handleDisable = ({
            from = 0,
            to = workdays.length,
            type = 'disable',
        }: {
            from?: number
            to?: number
            type?: 'disable' | 'enable'
        }) => {
            const num = workdays.slice(from, to).map(({ id }) => {
                return id
            })

            const sliced_week_days = disabledDays(workdays, num, type)

            setWorkdays(sliced_week_days)
        }

        if (selectedWorkdays.includes('weekdays - (Mon - Fri)')) {
            handleDisable({
                from: 2,
            })
        } else if (selectedWorkdays.includes('weekends - (Sat - Sun)')) {
            handleDisable({
                from: 7,
            })
        } else if (selectedWorkdays.length > 0) {
            handleDisable({
                from: 0,
                to: 2,
            })
        } else {
            handleDisable({
                type: 'enable',
            })
        }
    }, [selectedWorkdays])

    const {
        clearErrors,
        formErrors,
        onSubmit,
        openDialog,
        setOpenDialog,
        selectedGender,
        setSelectedGender,
        postLoading,
        handlePicture,
        photoPreview,
        register,
        setValue,
    } = useAddPageMutation({
        title: 'add_estate_staff',
        url: '/manager/estate-admin/create',
        props: {
            permission: selectedWorkdays,
            work_days: selectedWorkdays,
            state: selectedState,
            is_kyr_approved: 0,
            validation_option: 'phone_number',
        },
    })

   

    if (states_loading || active_properties_loading) {
        return <Spinner start={true} />
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (selectedWorkdays.length < 1) {
            return setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    work_days: 'Field cannot be empty',
                }
            })
        }

        onSubmit()
    }

    const slicedStates: string[] = states_data.map(({ name }: any) => name)
    const property_code_state = active_properties_data.map(({property_code}: any) => property_code)



    const formInputs = [
        {
            label: 'firstname',
        },
        {
            label: 'lastname',
        },
        {
            label: 'middlename',
        },
        {
            name: 'Email Address',
            label: 'email',
            type: 'email',
        },
        {
            label: 'phone_number',
            type: 'tel',
        },
        {
            label: 'date_of_birth',
            type: 'date',
        },
        {
            label: 'gender',
            type: 'select',
            selectProps: {
                state: genderState,
                selectedState: selectedGender,
                setSelectedState: setSelectedGender,
            },
        },
        {
            label: 'gender',
            type: 'select',
            selectProps: {
                state: genderState,
                selectedState: selectedGender,
                setSelectedState: setSelectedGender,
            },
        },
        {
            label: 'work_days',
            type: 'select',
            selectProps: {
                state: workdays,
                isCompound: true,
                selectedState: selectedWorkdays,
                setSelectedState: setSelectedWorkdays,
            },
        },
        {
            label: 'State',
            type: 'select',
            selectProps: {
                state: slicedStates,
                isSearchable: true,
                selectedState: selectedState,
                setSelectedState: setSelectedState,
            },
        },

        {
            label: 'security_guard_message',
            type: 'textarea',
            fullWidth: true,
            placeholder:
                'The message will be displayed to the security guard when the site worker checks In/Out',
        },
    ] satisfies FormInputs[]

    return (
        <div className='bg-white rounded-2xl grid p-8'>
            <Spinner start={postLoading ? true : false} />
            <AddedSuccess
                open={openDialog}
                isBank
                title={'estate staff'}
                isNavigate={false}
                close={setOpenDialog}
            />
            <ToastContainer />

            <div>
                <div className='w-[40rem]'>
                    <SingleSelect
                        state={property_code_state}
                        label='Property Code*'
                        isSearchable
                        selectedState={propertyCode}
                        setSelectedState={setPropertyCode}
                    />
                </div>

                {propertyCode && (
                    <section className='w-full flex gap-16 relative mt-[5rem]'>
                        <div>
                            <img
                                src={'/img/img3.png'}
                                alt=''
                                className=' object-cover rounded-lg'
                            />
                        </div>

                        <div className='flex '>
                            <div className='grid gap-8'>
                                <div>
                                    <p className='text-[1.4rem] text-[#043FA7]'>
                                        Property Code
                                    </p>
                                    <p className='font-[1.6rem] whitespace-nowrap'>
                                        {propertyCode}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-[#043FA7]'>
                                        Property Type
                                    </p>
                                    <p>Duplex</p>
                                </div>
                                <div>
                                    <p className='text-[#043FA7]'>
                                        Property Address
                                    </p>
                                    <p className='max-w-[30rem]'>
                                        10, Address Street, Address Avenue,
                                        Lagos, Nigeria.
                                    </p>{' '}
                                </div>
                            </div>
                            <div className='grid gap-8 auto-rows-max'>
                                <div>
                                    <p className='text-[1.4rem] text-[#043FA7]'>
                                        Property Category
                                    </p>
                                    <p className='font-[1.6rem] whitespace-nowrap'>
                                        Business
                                    </p>
                                </div>
                                <div>
                                    <p className='text-[#043FA7]'>
                                        Property Name
                                    </p>
                                    <p>Wale House</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <form
                onSubmit={handleSubmit}
                className='grid max-w-[84rem] gap-16 mt-12 '
                style={{
                    gridTemplateColumns:
                        ' repeat(auto-fit, minmax(35rem, 1fr))',
                    columnGap: '10rem',
                }}
            >
                <>
                    {formInputs.map((input, idx) => {
                        const {
                            label,
                            type,
                            name,
                            selectProps,
                            fullWidth,
                            placeholder,
                        } = input
                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                register={register}
                                formErrors={formErrors}
                                selectFormErrors={selectFormErrors}
                                type={type}
                                placeholder={placeholder}
                                fullWidth={fullWidth}
                                clearErrors={clearErrors}
                                name={name}
                                setValue={setValue}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}
                    <div className='grid items-center'>
                        <ValidateKY title={'Know your Estate Staff'} />
                    </div>
                    <ImageInput
                        handlePicture={handlePicture}
                        photoPreview={photoPreview}
                    />
                    <AddBtn isLoading={postLoading} />
                </>
            </form>
        </div>
    )
}

export default AddSiteWorker
