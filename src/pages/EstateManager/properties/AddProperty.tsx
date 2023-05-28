import React, { useEffect, useState } from 'react'
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
        placeholder?: string
        fullWidth?: boolean
        disabled?: boolean
        selectProps?: SelectProps
    }

    const categoryState = ['business', 'residential']

    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const [selectedType, setSelectedType] = useState<string[]>([])
    const [selectedEstate, setSelectedEstate] = useState('')

    const [isName, setIsName] = useState(true)

    const { isLoading, data: property_type } = useFetchData({
        url: '/platformsettings/propertytype/getall',
        name: 'property_type',
    })

    const { data: estates_data, isLoading: estates_loading } = useFetchData({
        url: '/estate/fetchDropdownEstate',
        name: 'active_estates',
    })

    useEffect(() => {
        selectedType.length > 0 ? setIsName(false) : setIsName(true)
    }, [selectedType])

    const {
        clearErrors,
        formErrors,
        onSubmit,
        openDialog,
        setOpenDialog,
        postLoading,
        handlePicture,
        photoPreview,
        register,
        setValue,
    } = useAddPageMutation({
        title: 'add_property',
        url: '/property/create',
        // props: {
        //     permission: selectedPermissions,
        //     is_kyr_approved: 0,
        //     validation_option: 'phone_number',
        // },
    })

    const getEstateName = () => {
        const estate_id: string[] = estates_data
            .filter(({ estate_name }: any) =>
                selectedEstate.includes(estate_name)
            )
            .map(({ id }: any) => id)
    }

    if (isLoading || estates_loading) {
        return <Spinner start={true} />
    }

    const property_types = property_type.map(
        (type: Record<string, string>) => type.property_type
    )

    const estate_names: string[] = estates_data.map(
        ({ estate_name }: any) => estate_name
    )

    const formInputs = [
        {
            label: 'estate_name',
            type: 'select',
            selectProps: {
                state: estate_names,
                isSearchable: true,
                selectedState: selectedEstate,
                setSelectedState: setSelectedEstate,
            },
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
                state: categoryState,
                selectedState: selectedCategory,
                setSelectedState: setSelectedCategory,
            },
        },
        {
            label: 'property_type',
            type: 'select',
            selectProps: {
                state: property_types,
                selectedState: selectedType,
                setSelectedState: setSelectedType,
            },
        },

        {
            label: 'name',
            disabled: isName,
        },
        {
            name: 'address description',
            label: 'description',
            type: 'textarea',
            fullWidth: true,
            placeholder:
                'This is the address that would be displayed on the print out handed to the visitor at check in',
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
                        const {
                            label,
                            type,
                            name,
                            selectProps,
                            disabled,
                            fullWidth,
                            placeholder,
                        } = input
                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                fullWidth={fullWidth}
                                register={register}
                                formErrors={formErrors}
                                type={type}
                                placeholder={placeholder}
                                clearErrors={clearErrors}
                                // disabled={disabled}
                                name={name}
                                setValue={setValue}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}

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
