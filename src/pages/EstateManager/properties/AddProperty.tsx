import React from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import ValidateKY from '../../../components/ui/dialog/ValidateKY'
import useFetchData from '../../../components/hooks/UseFetchData'

function AddProperty() {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }
    ;[
        {
            key: 'block_number',
            value: '200',
            description: '',
            type: 'text',
            enabled: true,
        },
        {
            key: 'property_type',
            value: '8',
            description: '',
            type: 'text',
            enabled: true,
        },
        {
            key: 'property_category',
            value: 'business',
            description: 'residential or business',
            type: 'text',
            enabled: true,
        },
        {
            key: 'name',
            value: 'French Primary School',
            description: '',
            type: 'text',
            enabled: true,
        },
        {
            key: 'description',
            value: 'French Primary School is a business ',
            description: '',
            type: 'text',
            enabled: true,
        },
        {
            key: 'area_or_street',
            value: 'lagos Island street',
            description: '',
            type: 'text',
            enabled: true,
        },
        {
            key: 'image',
            description: '',
            type: 'file',
            enabled: true,
            value: [],
        },
    ]

    const { isLoading, data: category_data } = useFetchData({
        url: '/platformsettings/propertytype/getall',
        name: 'estate-admin_permissions',
    })

    const genderState = ['Male', 'Female']

    const [selectedCategory, setSelectedCategory] = React.useState<
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
        title: 'admin',
        url: '/manager/estate-admin/create',
        // props: {
        //     permission: selectedPermissions,
        //     is_kyr_approved: 0,
        //     validation_option: 'phone_number',
        // },
    })

    if (isLoading) {
        return <Spinner start={true} />
    }

    const property_category = category_data.map(
        (category: Record<string, string>) => category.property_type
    )

    const formInputs = [
        {
            name: 'estate_name',
            label: 'name',
        },
        {
            name: 'property (block No. & Flat No.)',
            label: 'block_number',
            type: 'number',
        },
        {
            label: 'area_or_street',
        },

        {
            label: 'property_category',
            type: 'select',
            selectProps: {
                state: property_category,
                selectedState: selectedCategory,
                setSelectedState: setSelectedCategory,
            },
        },
        {
            label: 'property_type',
            type: 'select',
            selectProps: {
                state: property_category,
                selectedState: selectedCategory,
                setSelectedState: setSelectedCategory,
            },
        },

        {
            name: 'name',
            
        },
        {
            name: 'address description',
            label: 'description',
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

export default AddProperty
