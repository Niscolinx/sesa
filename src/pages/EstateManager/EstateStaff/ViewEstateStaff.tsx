import React, { useEffect, useState } from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import ValidateKY from '../../../components/ui/dialog/ValidateKY'
import useFetchData from '../../../components/hooks/UseFetchData'
import { ToastContainer, toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'
import ValidatedResult from '../../../components/ui/dialog/ValidatedResult'
import AddBank from '../../../components/ui/dialog/AddBank'

function ViewEstateStaff() {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        fullWidth?: boolean
        required?: boolean
        value?: string | number
        placeholder?: string
        selectProps?: SelectProps
    }

    type Workdays = { name: string; disabled: boolean; id: number }

       const workdaysState = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun']


    const genderState = ['Male', 'Female']
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)
    const [selectedWorkdays, setSelectedWorkdays] = React.useState<string[]>([])
    const [selectedState, setSelectedState] = useState<string[]>([])
    const [openBank, setOpenBank] = useState(false)

    const { data: states_data, isLoading: states_loading } = useFetchData({})

    const [phone, setPhone] = useState(0)

    const params = useParams()
    const navigate = useNavigate()

    const id = params.id?.replace(':', '')

    if (!id) {
        toast('Estate Staff not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
        })

        navigate(-1)
    }

    


    const {
        clearErrors,
        formErrors,
        onSubmit,
        reset,
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
            work_days: selectedWorkdays,
            state: selectedState,
            is_kyr_approved: 0,
            validation_option: 'phone_number',
        },
    })


    const { isLoading, data } = useFetchData({
        url: `/estate-staff/getbyid/${id}`,
        name: `view_estate_staff_${id}`,
    })

   

    useEffect(() => {
        if (data) {
            const {  phone_number, gender, work_days } = data

            const phone = parseInt(phone_number.slice(4))
            setPhone(phone)
            setSelectedGender(gender)
            setSelectedWorkdays(work_days)


            reset({
                ...data,
                phone,
            })
        }
    }, [data])

    if (states_loading || isLoading) {
        
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

    const closeBankModal = () => {
        setOpenBank(false)
    
    }

    const slicedStates: string[] = states_data.map(({ name }: any) => name)

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
             required: false,
             value: phone,
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
                type={'updated'}
                close={setOpenDialog}
            />
            <AddBank open={openBank} close={closeBankModal}/>
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
                            value,
                            required,
                            placeholder,
                        } = input
                        return (
                            <>
                                {idx === formInputs.length - 1 && (
                                    <div className='grid items-center'>
                                        <ValidateKY
                                            title={'Know your Estate Staff'}
                                        />
                                    </div>
                                )}
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
                                    value={value}
                                    required={required}
                                    name={name}
                                    setValue={setValue}
                                    isSelect={type === 'select'}
                                    select={selectProps}
                                />
                            </>
                        )
                    })}

                    <AddBtn
                        isLoading={postLoading}
                        title={'Save'}
                        is_addBtn={false}
                    />
                </>
            </form>

            <div className='mt-20'>
                <p className='text-[2rem] font-Satoshi-Medium mb-5'>
                    Account Information
                </p>
                <p>
                    No account information created.{' '}
                    <span className='text-[#0556E5] font-Satoshi-Medium cursor-pointer' onClick={() => setOpenBank(true)}>
                        Create a bank account
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ViewEstateStaff
