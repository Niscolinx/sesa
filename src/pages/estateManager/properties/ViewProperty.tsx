import { useEffect, useState } from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput, { ShowImage } from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import useFetchData from '../../../components/hooks/useFetchData'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'

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

    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isName, setIsName] = useState(true)

    const params = useParams()
    const navigate = useNavigate()
    const id = params.id?.replace(':', '')

    const { isLoading: propertyType_loading, data: property_type } =
        useFetchData({
            url: '/platformsettings/propertytype/getall',
            name: 'property_type',
        })

    useEffect(() => {
        selectedCategory.toLowerCase() === 'business'
            ? setIsName(false)
            : setIsName(true)
    }, [selectedCategory])

    const {
        clearErrors,
        formErrors,
        onSubmit,
        openDialog,
        setOpenDialog,
        postLoading,
        handlePicture,
        setPhotoPreview,
        photoPreview,
        register,
        reset,
        setValue,
    } = useAddPageMutation({
        title: `view_property_${id}`,
        url: `/property/update/${id}`,
        props: {
            property_type: selectedType,
            property_category: selectedCategory,
        },
    })
    if (!id) {
        toast('Property not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
        })

        navigate(-1)
    }

    const { isLoading, data } = useFetchData({
        url: `/property/getbyid/${id}`,
        name: `view_property_${id}`,
    })

    useEffect(() => {
        if (data) {
            const { property_category, image_url, property_type } = data

            setPhotoPreview(image_url)
            setSelectedCategory(property_category)
            setSelectedType(property_type)

            reset({
                ...data,
            })
        }
    }, [data])

    if (isLoading || propertyType_loading) {
        return <Spinner start={true} />
    }

    const property_types = property_type.map(
        (type: Record<string, string>) => type.property_type
    )

    const formInputs = [
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
            label: 'name',
            disabled: isName,
            placeholder: 'Only for business category',
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
            <ToastContainer />
            <AddedSuccess
                open={openDialog}
                title={'Property'}
                type={'updated'}
                close={setOpenDialog}
            />

            <div className='flex justify-between items-center mb-10'>
                <ShowImage
                    photoPreview={photoPreview}
                    handlePicture={handlePicture}
                />

                <Activate_Deactivate
                    id={id!}
                    url={'/property/deactivate_activate'}
                    status={data?.status}
                    title={'Property'}
                    queryCache={`view_property_${id}`}
                />
            </div>

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

                        if (label === 'name' && isName) {
                            return null
                        }

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
                                disabled={disabled}
                                name={name}
                                setValue={setValue}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}

                    <AddBtn
                        isLoading={postLoading}
                        title={'Save'}
                        is_addBtn={false}
                    />
                </>
            </form>
        </div>
    )
}

export default AddProperty
