import { FC, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface Input {
    label: string
    type?: string
    required?: boolean
    register: any
    formErrors: any
    options?: any
}

const Input: FC<Input> = ({
    label,
    type = 'text',
    required,
    register,
    formErrors,
    options,
}) => {
    // const [inputType, setInputType] = useState(type)

    const validationOptions = {
        required: true,
        minLength: 3,
        pattern:
            type === 'email'
                ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                : '',
        ...options,
    }

    // const formType = new Map([
    //     [
    //         'text',
    //         {
    //             required: true,
    //         },
    //     ],
    // ])

  

    return (
        <div className='w-full grid gap-4 self-baseline'>
            <label htmlFor={label} className='font-semibold capitalize'>
                {label === 'dob' ? 'Date of birth' : label.replace('_', ' ')}
            </label>
            <input
                id={label}
                type={type}
                {...register(label, validationOptions)}
                className={`border border-color-grey p-4 rounded-lg w-full ${
                    formErrors[label] && 'border-red-500 '
                }`}
                min={
                    type === 'date' && label.indexOf('dob') !== 0
                        ? new Date().toISOString().split('T')[0]
                        : null
                }
            />
            {formErrors[label] && (
                <p className='text-[1.2rem] text-red-500'>
                    {formErrors[label].type === 'required' ? (
                        <span>Field cannot be empty</span>
                    ) : (
                        <span>
                            Invalid {label === 'dob' ? 'Date of birth' : label}
                        </span>
                    )}
                </p>
            )}
        </div>
    )
}

export default Input
