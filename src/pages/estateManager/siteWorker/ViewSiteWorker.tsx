import React, { useEffect, useState } from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import ValidateKY from '../../../components/ui/dialog/ValidateKY'
import useFetchData from '../../../components/hooks/useFetchData'
import { ToastContainer, toast } from 'react-toastify'
import SingleSelect from '../../../components/ui/select/SingleSelect'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'
import ValidatedResult from '../../../components/ui/dialog/ValidatedResult'
import { useParams, useNavigate } from 'react-router'

function ViewSiteWorker() {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        value?: string | number
        required?: boolean
        fullWidth?: boolean
        placeholder?: string
        selectProps?: SelectProps
    }

    const workdaysState = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
    ]

    const genderState = ['Male', 'Female']
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)
    const [selectedWorkdays, setSelectedWorkdays] = React.useState<string[]>([])
    const [selectedState, setSelectedState] = useState('')
    const [propertyCode, setPropertyCode] = useState('')
    const [propertyData, setPropertyData] = useState<any>(null)
    const [isPropertyLoaded, setIsPropertyLoaded] = useState(false)
    const [stateId, setStateId] = useState<number | null>(null)

    const { data: states_data, isLoading: states_loading } = useFetchData({})
    const [phone, setPhone] = useState(0)

    const params = useParams()
    const navigate = useNavigate()

    const id = params.id?.replace(':', '')

    const {
        isLoading: active_properties_loading,
        data: active_properties_data,
    } = useFetchData({
        url: '/property/getActiveProperty',
        name: 'get_active_property',
    })

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
        reset,
        register,
        setValue,
    } = useAddPageMutation({
        title: 'add_site_worker',
        url: '/site-worker/create',
        props: {
            work_days: selectedWorkdays,
            property_id: propertyData?.id,
            state: stateId,
            is_kyr_approved: 0,
            validation_option: 'phone_number',
        },
    })

    const { isLoading, data } = useFetchData({
        url: `/site-worker/getbyid/${id}`,
        name: `view_site_worker_${id}`,
    })

    useEffect(() => {
        if (data) {
            const { phone_number, gender, work_days, state_name, property } = data

            const phone = parseInt(phone_number.slice(4))
            const getState: string = states_data
                .filter(
                    ({ name }: any) =>
                        name.toLowerCase() === state_name.toLowerCase()
                )
                .map(({ name }: any) => name)[0]

            const transFormedDays = JSON.parse(work_days)

            if(property) {
                setIsPropertyLoaded(true)
                setPropertyCode(property)
            }

            setPhone(phone)
            setSelectedGender(gender)
            setSelectedWorkdays(transFormedDays)
            setSelectedState(getState)

            

            reset({
                ...data,
                phone,
            })
        }
    }, [data])

    if (!id) {
        toast('Site Worker not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
        })

        navigate(-1)
    }

    if (states_loading || active_properties_loading || isLoading) {
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

        const stateId = states_data.find(
            ({ name }: any) =>
                name.toLowerCase() === selectedState.toLowerCase()
        )

        setStateId(stateId.id)

        onSubmit()
    }

    const slicedStates: string[] = states_data.map(({ name }: any) => name)
    const property_code_state = active_properties_data.map(
        ({ property_code }: any) => property_code
    )

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
            label: 'phone_number',
            type: 'tel',
            value: phone,
            required: false,
        },

        {
            label: 'address',
            name: 'home_address',
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
            name: 'Email Address',
            label: 'email',
            type: 'email',
        },

        {
            label: 'work_days',
            type: 'select',
            selectProps: {
                state: workdaysState,
                isMulti: true,
                selectedState: selectedWorkdays,
                setSelectedState: setSelectedWorkdays,
            },
        },
        {
            label: 'clock_in',
            type: 'time',
            name: 'Clock-in Time',
        },
        {
            label: 'clock_out',
            type: 'time',
            name: 'Clock-out Time',
        },
        {
            label: 'access_period_start_date',
            type: 'date',
            name: 'work period (start date)',
        },
        {
            label: 'access_period_end_date',
            type: 'date',
            name: 'work period (end date)',
        },

        {
            label: 'message',
            name: 'security_guard_message',
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
            <div className='flex justify-between items-center mb-10'>
                <ValidatedResult
                    image={photoPreview}
                    handlePicture={handlePicture}
                />

                <Activate_Deactivate
                    id={id!}
                    url={'/manager/estate-admin/deactivate_activate'}
                    status={data?.status}
                    title={'Estate Staff'}
                    queryCache={`view_estate_staff_${id}`}
                />
            </div>
            <div>
                <div className='w-[35rem]'>
                    <SingleSelect
                        state={property_code_state}
                        label='Property Code*'
                        isSearchable
                        selectedState={propertyCode}
                        setSelectedState={setPropertyCode}
                    />
                </div>

                {isPropertyLoaded && (
                    <section className='w-full flex gap-16 relative mt-[5rem]'>
                        <div className=' relative w-[30rem]'>
                            
                            <img
                                src={propertyData.image_url ?? ''}
                                alt=''
                                className=' object-cover rounded-lg h-[30rem]'
                            />
                        </div>

                        <div className='flex '>
                            <div className='grid gap-8'>
                                <div>
                                    <p className='text-[1.4rem] text-[#043FA7]'>
                                        Property Code
                                    </p>
                                    <p className='font-[1.6rem] whitespace-nowrap'>
                                        {propertyData.property_code}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-[#043FA7]'>
                                        Property Type
                                    </p>
                                    <p>{propertyData.property_type}</p>
                                </div>
                                <div>
                                    <p className='text-[#043FA7]'>
                                        Property Address
                                    </p>
                                    <p className='max-w-[30rem]'>
                                        {propertyData.area_or_street}
                                    </p>{' '}
                                </div>
                            </div>
                            <div className='grid gap-8 auto-rows-max'>
                                <div>
                                    <p className='text-[1.4rem] text-[#043FA7]'>
                                        Property Category
                                    </p>
                                    <p className='font-[1.6rem] whitespace-nowrap'>
                                        {propertyData.property_category}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-[#043FA7]'>
                                        Property Name
                                    </p>
                                    <p>{propertyData.estate_name}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div
                    className='grid max-w-[84rem] gap-16 mt-12 '
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                        columnGap: '10rem',
                    }}
                >
                    {formInputs.map((input, idx) => {
                        const {
                            label,
                            type,
                            name,
                            required,
                            value,
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
                                required={required}
                                value={value}
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
                    <div className='grid items-center mb-10'>
                        <ValidateKY title={'Know your Estate Staff'} />
                    </div>
                </div>
                <AddBtn isLoading={postLoading} />
            </form>{' '}
        </div>
    )
}

export default ViewSiteWorker
