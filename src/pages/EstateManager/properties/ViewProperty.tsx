import { useEffect, useState } from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import useFetchData from '../../../components/hooks/UseFetchData'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router'

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

    const navigate = useNavigate()

    const { isLoading: propertyType_loading, data: property_type } = useFetchData({
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
        photoPreview,
        register,
        reset,
        setValue,
    } = useAddPageMutation({
        title: 'add_property',
        url: '/property/create',
        props: {
            property_type: selectedType,
            property_category: selectedCategory,
        },
    })
  if (!id) {
      toast('Resident not Found', {
          type: 'error',
          className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
      })

      navigate(-1)
  }

  const { isLoading, data } = useFetchData({
      url: `/manager/resident/getbyid/${id}`,
      name: `view_resident_${id}`,
  })

  useEffect(() => {
      if (data) {
          const { name, email, phone, dob, gender } = data
          const first_name = name.split(' ')[0]
          const last_name = name.split(' ')[1]

          const phone_number = parseInt(phone.slice(4))
        

          reset({
              first_name,
              last_name,
              dob,
              email,
              phone: phone_number,
          })
      }
  }, [data])

  if (isLoading) {
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
