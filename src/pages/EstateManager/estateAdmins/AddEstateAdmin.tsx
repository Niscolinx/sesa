import React from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import ValidateKY from '../../../components/ui/dialog/ValidateKY'
import useFetchData from '../../../components/hooks/UseFetchData'

function AddAdmin() {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }

    const { isLoading, data: permissionState } = useFetchData({
        url: '/manager/estate-admin/permission',
        name: 'estate-admin_permissions',
    })

    const genderState = ['Male', 'Female']

    const [selectedPermissions, setSelectedPermissions] = React.useState<
        string[]
    >([])

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
        url: '/manager/estate-admin/create',
        props: {
            permission: selectedPermissions,
            is_kyr_approved: 0,
            validation_option: 'phone_number'
        },
    })

    if (isLoading) {
        return <Spinner start={true} />
    }

    const formInputs = [
        {
            label: 'first_name',
        },
        {
            label: 'last_name',
        },
        {
            label: 'dob',
            type: 'date',
            name: 'date of birth',
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
            label: 'permissions',
            type: 'select',
            selectProps: {
                state: permissionState,
                isMulti: true,
                textarea: true,
                selectedState: selectedPermissions,
                setSelectedState: setSelectedPermissions,
            },
        },
        {
            label: 'phone_number',
            type: 'tel',
        },
        {
            name: 'Email Address',
            label: 'email',
            type: 'email',
        },
    ] satisfies FormInputs[]

    return (
        <div className='bg-white rounded-2xl grid p-8'>
            <Spinner start={postLoading ? true : false} />
            <AddedSuccess
                open={openDialog}
                title={'estate admin'}
                close={setOpenDialog}
            />

            <form
                onSubmit={onSubmit}
                className='grid max-w-[84rem] gap-16 mt-12 '
                style={{
                    gridTemplateColumns:
                        ' repeat(auto-fit, minmax(35rem, 1fr))',
                    columnGap: '10rem',
                }}
            >
                <>
                    {formInputs.map((input, idx) => {
                        const { label, type, name, selectProps } = input
                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                register={register}
                                formErrors={formErrors}
                                type={type}
                                clearErrors={clearErrors}
                                name={name}
                                setValue={setValue}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}
                    <div className='grid items-center'>
                        <ValidateKY title={'Know your Estate Admin'} />
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

export default AddAdmin
