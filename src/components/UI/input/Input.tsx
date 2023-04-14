import { FC, SetStateAction, useEffect, useState } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { MultipleSelect, Select } from '../../SuperAdmin/UI/Select'
import useFetchData from '../../../utils/useFetchData'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export interface SelectProps {
    isMulti?: boolean
    state: string[]
    isSearchable?: boolean
    selectedState: string | string[]
    setSelectedState:
        | React.Dispatch<React.SetStateAction<string>>
        | React.Dispatch<React.SetStateAction<string[]>>
}
interface Input {
    name: string
    type: string
    register?: any
    formErrors: any
    disabled?: boolean
    value?: any
    tag?: string
    options: any
    required?: boolean
    pre?: string
    minLength?: number
    fullWidth: boolean
    isSelect: boolean
    selectFormErrors: Record<string, string> | null

    select: SelectProps
}

const Input: FC<Partial<Input> & { label: string }> = ({
    label,
    name,
    type = 'text',
    register,
    isSelect,
    pre,
    fullWidth,
    disabled,
    tag,
    select,
    selectFormErrors,
    required = true,
    formErrors,
    value,
    minLength = 3,
}) => {
    const validationOptions = {
        required,
        minLength,
        pattern:
            type === 'email'
                ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                : '',
    }

    const [eyeIcon, setEyeIcon] = useState(false)
    const toggleEyeIcon = () => setEyeIcon(!eyeIcon)

    return (
        <div
            className={`w-full grid gap-4 self-baseline ${
                fullWidth && 'col-span-full'
            }`}
        >
            {isSelect && select ? (
                <>
                    {select.isMulti && Array.isArray(select.selectedState) ? (
                        <MultipleSelect
                            label={name ?? label.replaceAll('_', ' ')}
                            selectFormErrors={selectFormErrors}
                            selected={select.selectedState}
                            selectFrom={select.state}
                            setSelected={
                                select.setSelectedState as React.Dispatch<
                                    React.SetStateAction<string[]>
                                >
                            }
                        />
                    ) : (
                        <Select
                            label={name ?? label.replaceAll('_', ' ')}
                            isSearchable={select.isSearchable}
                            state={select.state}
                            selectFormErrors={selectFormErrors}
                            selectedState={select.selectedState as string}
                            setSelectedState={
                                select.setSelectedState as React.Dispatch<
                                    React.SetStateAction<string>
                                >
                            }
                        />
                    )}
                </>
            ) : (
                <>
                    <label
                        htmlFor={label}
                        className='text-[1.4rem] font-semibold capitalize'
                    >
                        {name ?? label.replaceAll('_', ' ')}
                    </label>

                    {type === 'password' ? (
                        <div className='relative flex items-center'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className={`border pr-12 border-color-grey p-4 outline-none rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed ${
                                    formErrors &&
                                    formErrors[label] &&
                                    'border-red-500 '
                                }`}
                                name='password'
                                id={label}
                                disabled={disabled}
                                value={value}
                                {...(register &&
                                    register(label, validationOptions))}
                            />
                            <span className='absolute right-2 cursor-pointer'>
                                {eyeIcon ? (
                                    <AiOutlineEyeInvisible
                                        onClick={toggleEyeIcon}
                                    />
                                ) : (
                                    <AiOutlineEye onClick={toggleEyeIcon} />
                                )}
                            </span>
                        </div>
                    ) : (
                        <div
                            className={`relative flex items-center border border-color-grey pl-4 rounded-lg w-full `}
                        >
                            {label.toLowerCase() === 'amount' ||
                                (tag === 'amount' && (
                                    <img
                                        src='/icons/Naira.svg'
                                        alt=''
                                        className='mr-1'
                                    />
                                ))}

                            {type === 'textarea' ? (
                                <textarea
                                    id={label}
                                    rows={4}
                                    maxLength={30}
                                    disabled={disabled}
                                    type={type}
                                    value={value}
                                    {...(register &&
                                        register(label, validationOptions))}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
                                />
                            ) : (
                                <input
                                    id={label}
                                    disabled={disabled}
                                    type={type}
                                    value={value}
                                    {...(register &&
                                        register(label, validationOptions))}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
                                    min={
                                        type === 'date'
                                            ? label.indexOf('dob') !== 0 &&
                                              new Date()
                                                  .toISOString()
                                                  .split('T')[0]
                                            : 0
                                    }
                                />
                            )}
                        </div>
                    )}
                </>
            )}
            {!formErrors[label] && pre && (
                <p className=' text-[1.2rem] text-gray-400'>{pre}</p>
            )}
            {formErrors && formErrors[label] && (
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
