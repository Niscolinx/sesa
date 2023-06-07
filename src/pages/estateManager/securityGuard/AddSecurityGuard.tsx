import React, { useEffect, useState } from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import ValidateKY from '../../../components/ui/dialog/ValidateKY'
import useFetchData from '../../../components/hooks/useFetchData'
import { ToastContainer } from 'react-toastify'

function AddSecurityGuard() {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        fullWidth?: boolean
        placeholder?: string
        selectProps?: SelectProps
    }

    const genderState = ['Male', 'Female']
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)

    const [selectedState, setSelectedState] = useState<string[]>([])

    const { data: states_data, isLoading: states_loading } = useFetchData({})

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
            permission: 'selectedWorkdays',
            state: selectedState,
            is_kyr_approved: 0,
            validation_option: 'phone_number',
        },
    })

    if (states_loading) {
        return <Spinner start={true} />
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        onSubmit()
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
            label: 'home_address',
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

export default AddSecurityGuard
