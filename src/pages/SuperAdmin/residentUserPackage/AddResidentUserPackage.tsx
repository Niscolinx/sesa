import { useState } from 'react'
import { SelectProps } from '../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'

type Frequency = 'monthly' | 'weekly' | 'quarterly' | 'yearly'

const AddResidentUserPackage = () => {
    interface Inputs {
       name_of_package: string
       frequency: string
       amount: number
       details: string
       discount: number
    }

     type ResponseMessage = {
         className: string
         displayMessage: string
     }

     type FormInputs = {
         label?: string
         type?: string
         name?: string
         selectProps?: SelectProps
     }


    const frequencyState = [
        'monthly',
        'weekly',
        'quarterly',
        'yearly',
    ] satisfies Frequency[]

    const [togglePackageMenu, setTogglePackageMenu] = useState(false)

    const [toggleFrequencyMenu, setToggleFrequencyMenu] = useState(false)
    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
        frequencyState[0]
    )
     const [responseMessage, setResponseMessage] =
         useState<ResponseMessage | null>(null)


    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

   

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
                state: frequencyState,
                selectedState: selectedFrequency,
                setSelectedState: setSelectedFrequency,
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
    ] satisfies FormInputs[]

    return (
        <div className=' p-8 bg-white h-[70vh] rounded-lg overflow-y-scroll'>
            <section
                className='grid max-w-[65vw] gap-16'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
                }}
            >
                
            </section>
        </div>
    )
}

export default AddResidentUserPackage
