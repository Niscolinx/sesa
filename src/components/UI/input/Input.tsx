import { FC, useEffect, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Select } from '../../SuperAdmin/UI/Select'

export interface SelectProps {
    state: string[]
    selectedState: string | null
    setSelectedState: React.Dispatch<React.SetStateAction<string | null>>
}
interface Input {
    name: string
    type: string
    register: any
    formErrors: any
    setValue: any
    options: any
    minLength?: number
    fullWidth: boolean
    isSelect: boolean
    select: SelectProps
}

const Input: FC<Partial<Input> & { label: string }> = ({
    label,
    name,
    type = 'text',
    register,
    isSelect,
    fullWidth,
    select,
    formErrors,
    setValue,
    minLength = 3,
}) => {
    const validationOptions = {
        required: true,
        minLength,
        pattern:
            type === 'email'
                ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                : '',
    }

    return (
        <div
            className={`w-full grid gap-4 self-baseline ${
                fullWidth && 'col-span-full'
            }`}
        >
            {isSelect && select ? (
                <Select
                    label={name ?? label.replaceAll('_', ' ')}
                    state={select.state}
                    selectedState={select.selectedState}
                    setSelectedState={select.setSelectedState}
                />
            ) : (
                <>
                    <label
                        htmlFor={label}
                        className='text-[1.4rem] font-semibold capitalize'
                    >
                        {name ?? label.replaceAll('_', ' ')}
                    </label>
                    <div className='relative flex items-center border border-color-grey p-4 rounded-lg w-full'>
                        {label.toLowerCase() === 'amount' && (
                            <img
                                src='/icons/Naira.svg'
                                alt=''
                                className='mr-1'
                            />
                        )}

                        <input
                            id={label}
                            type={type}
                            {...(label.toLowerCase() !== 'amount' &&
                                register(label, validationOptions))}
                            className={` w-full ${
                                formErrors[label] && 'border-red-500 '
                            }`}
                            min={
                                type === 'date' && label.indexOf('dob') !== 0
                                    ? new Date().toISOString().split('T')[0]
                                    : null
                            }
                        />
                    </div>
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
