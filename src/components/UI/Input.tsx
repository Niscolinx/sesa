import { FC, useEffect, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Select } from '../SuperAdmin/UI/Select'

export interface SelectProps {
    state: string[]
    selectedState: string | null
    setSelectedState: React.Dispatch<React.SetStateAction<string | null>>
}
interface Input {
    label: string
    name?: string
    type?: string
    register: any
    formErrors: any
    options?: any
    isSelect?: boolean
    select?: SelectProps
}

const Input: FC<Input> = ({
    label,
    name,
    type = 'text',
    register,
    isSelect,
    select,
    formErrors,
    options,
}) => {
    const validationOptions = {
        required: true,
        minLength: 3,
        pattern:
            type === 'email'
                ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                : '',
        ...options,
    }

    return (
        <div className='w-full grid gap-4 self-baseline'>
            {isSelect && select ? (
                <Select
                    label={label}
                    state={select.state}
                    selectedState={select.selectedState}
                    setSelectedState={select.setSelectedState}
                />
            ) : (
                <>
                    <label htmlFor={label} className='font-semibold capitalize'>
                        {name ?? label.replace('_', ' ')}
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
                </>
            )}

            {formErrors[label] && (
                <p className='text-[1.2rem] text-red-500'>
                    {formErrors[label].type === 'required' ? (
                        <span>Field cannot be empty</span>
                    ) : (
                        <span>Invalid {label}</span>
                    )}
                </p>
            )}
        </div>
    )
}

export default Input
