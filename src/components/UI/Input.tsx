import { FC, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface Input {
    label: string
    type: string
    required?: boolean
    register: any
}

const Input: FC<Input> = ({ label, type = 'text', required }) => {
    const [inputType, setInputType] = useState(type)

    

    const formType = new Map([
        [
            'text',
            {
                required: true,
            },
        ],
    ]) 

    return (
        <div className='w-full grid gap-4'>
            <label htmlFor={label} className='font-semibold capitalize'>
                {label}
            </label>
            <input
                type='email'
                {...register('email', {
                    required: true,
                    // pattern: /^\S+@\S+$/i,
                    pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className={`border border-color-grey p-4 rounded-lg w-full ${
                    formErrors.email && 'border-red-500 '
                }`}
            />
            {formErrors.email && (
                <p className='text-[1.2rem] text-red-500'>
                    {formErrors.email.type === 'required' ? (
                        <span>Field cannot be empty</span>
                    ) : (
                        <span>Invalid email</span>
                    )}
                </p>
            )}
        </div>
    )
}

export default Input
