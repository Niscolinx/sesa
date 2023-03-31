import { FC, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface Input {
    label: string
    type: string
    required?: boolean
    register: any
    formErrors: any
    validationOptions: any
}

const Input: FC<Input> = ({ label, type = 'text', required, register, formErrors, validationOptions }) => {
    // const [inputType, setInputType] = useState(type)

    

    // const formType = new Map([
    //     [
    //         'text',
    //         {
    //             required: true,
    //         },
    //     ],
    // ]) 

    return (
        <div className='w-full grid gap-4'>
            <label htmlFor={label} className='font-semibold capitalize'>
                {label}
            </label>
            <input
                type={type}
                {...register(label, validationOptions)}
                className={`border border-color-grey p-4 rounded-lg w-full ${
                    formErrors.label && 'border-red-500 '
                }`}
            />
            {formErrors.label && (
                <p className='text-[1.2rem] text-red-500'>
                    {formErrors.label.type === 'required' ? (
                        <span>Field cannot be empty</span>
                    ) : (
                        <span>Invalid label</span>
                    )}
                </p>
            )}
        </div>
    )
}

export default Input
