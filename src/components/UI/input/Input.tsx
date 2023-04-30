import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { MultipleSelect, Select } from '../../SuperAdmin/UI/Select'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {
    UseFormRegister,
    UseFormSetError,
    UseFormSetValue,
} from 'react-hook-form'
// import PhoneInput from 'react-phone-input-2'

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
    register?: UseFormRegister<any>
    formErrors: any
    disabled?: boolean
    value?: any
    tag?: string
    options: any
    id?: number
    setError?: UseFormSetError<any>
    setValue?: UseFormSetValue<any>
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
    setValue,
    setError,
    isSelect,
    pre,
    fullWidth,
    disabled,
    tag,
    id,
    select,
    selectFormErrors,
    required = true,
    formErrors,
    value,
    minLength = 3,
}) => {
    const form_pattern = new Map([
        [
            'email',
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        [
            'phone_number',
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
    ])

    const validationOptions = {
        required,
        minLength,
        min: 0,
        pattern: form_pattern.get(type),
    }

    const [eyeIcon, setEyeIcon] = useState(false)
    const toggleEyeIcon = () => setEyeIcon(!eyeIcon)
    const [phone, setPhone] = useState('')

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '')
        if (setValue && setError) {
            if (value.length <= 1 && value === '0') {
                console.log('dont accept')
                return setPhone('')
            }


            if (value.length < 11) {
                setValue('phone_number', value)
                setPhone(value)
            }
        }
    }

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
                            id={id}
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
                            id={id}
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
                                    value={value}
                                    {...(register &&
                                        register(label, validationOptions))}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
                                />
                            ) : label.toLowerCase().includes('phone') ? (
                                <div className='relative flex items-center'>
                                    <input
                                        type='text'
                                        value={'+234'}
                                        className='w-[4.2rem]'
                                    />
                                    <input
                                        id={label}
                                        disabled={disabled}
                                        type={type}
                                        minLength={10}
                                        inputMode='numeric'
                                        maxLength={10}
                                        value={value || phone}
                                        onChange={handlePhoneChange}
                                        className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                            formErrors &&
                                            formErrors[label] &&
                                            'border-red-500 '
                                        }`}
                                    />
                                </div>
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
                                        type === 'date' &&
                                        label.indexOf('dob') !== 0
                                            ? new Date()
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
