import { ChangeEvent, FC, useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'
import MultipleSelect from '../select/MultipleSelect'
import SingleSelect from '../select/SingleSelect'
import CompoundSelect from '../select/CompoundSelect'

export interface SelectProps {
    isMulti?: boolean
    isCompound?: boolean
    textarea?: boolean
    state: string[] | Object[]
    absolute?: boolean
    isSearchable?: boolean
    placeholder?: string
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
    tag?: string
    options: any
    id?: number
    placeholder?: string
    setValue?: UseFormSetValue<any>
    value?: any
    required?: boolean
    clearErrors?: UseFormClearErrors<any>
    pre?: string
    ref?: string
    minLength?: number
    maxLength?: number
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
    isSelect,
    ref,
    pre,
    placeholder,
    fullWidth,
    disabled,
    clearErrors,
    tag,
    id,
    value,
    select,
    selectFormErrors,
    required = true,
    formErrors,
    minLength = 3,
    maxLength,
}) => {
    const form_pattern = new Map([
        [
            'email',
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
    ])

    const validationOptions = {
        required,
        minLength,
        maxLength,
        min: 0,
        valueAsNumber: type === 'number',
        pattern: form_pattern.get(type),
    }

    const [eyeIcon, setEyeIcon] = useState(false)
    const toggleEyeIcon = () => setEyeIcon(!eyeIcon)
    const [phone, setPhone] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        if (label.includes('phone') && value) {
            setPhone(value)
        }
    }, [label, value])

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '')
        if (setValue && clearErrors) {
            clearErrors(label)

            if (value.length <= 1 && value === '0') {
                return setPhone('')
            }

            if (value.length < 11) {
                setValue(label, value)
                setPhone(value)
            }
        }
    }

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '')

        if (setValue && clearErrors) {
            clearErrors(label)

            if (value.length <= 1 && value === '0') {
                return setPrice('')
            }

            const transFormValue = (value: string) => {
                const parsedValue = parseFloat(value)
                if (!isNaN(parsedValue) && isFinite(parsedValue)) {
                    const transformedValue = parsedValue.toLocaleString()

                    return transformedValue
                }

                return ''
            }

            setValue(label, parseInt(value))

            setPrice(transFormValue(value))
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
                            textarea={select.textarea}
                            selectFrom={select.state}
                            id={id}
                            absolute={select.absolute}
                            setSelected={
                                select.setSelectedState as React.Dispatch<
                                    React.SetStateAction<string[]>
                                >
                            }
                        />
                    ) : select.isCompound &&
                      Array.isArray(select.selectedState) ? (
                        <CompoundSelect
                            state={select.state}
                            placeholder={select.placeholder}
                            selectedState={select.selectedState}
                            isSearchable={true}
                            setSelectedState={select.setSelectedState}
                        />
                    ) : (
                        <SingleSelect
                            label={name ?? label.replaceAll('_', ' ')}
                            isSearchable={select.isSearchable}
                            state={Array.isArray(select.state) && typeof select.state[0] === 'string' && select.state}
                            id={id}
                            absolute={select.absolute}
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
                        {name?.replaceAll('_', ' ') ??
                            label.replaceAll('_', ' ')}
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
                            {tag === 'money' && (
                                <img
                                    src='/icons/Naira.svg'
                                    alt=''
                                    className='mr-1'
                                />
                            )}

                            {type === 'textarea' ? (
                                <textarea
                                    id={label}
                                    rows={4}
                                    placeholder={placeholder}
                                    maxLength={30}
                                    disabled={disabled}
                                    {...(register &&
                                        register(label, validationOptions))}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
                                />
                            ) : label.toLowerCase().includes('phone') ? (
                                <div className='relative flex items-center w-full'>
                                    <input
                                        type='text'
                                        value={'+234'}
                                        className='w-[4.2rem]'
                                    />
                                    <input
                                        id={label}
                                        disabled={disabled}
                                        type={type}
                                        ref={ref}
                                        placeholder='908742323'
                                        inputMode='numeric'
                                        maxLength={10}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                            formErrors &&
                                            formErrors[label] &&
                                            'border-red-500 '
                                        }`}
                                    />
                                </div>
                            ) : tag === 'money' ? (
                                <input
                                    id={label}
                                    disabled={disabled}
                                    type={'text'}
                                    value={value || price}
                                    onChange={handlePriceChange}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
                                />
                            ) : type === 'date' ? (
                                <input
                                    id={label}
                                    disabled={disabled}
                                    type={type}
                                    {...(register &&
                                        register(label, validationOptions))}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
                                    // min={
                                    //     type === 'date' &&
                                    //     label.indexOf('dob') !== 0
                                    //         ? new Date()
                                    //               .toISOString()
                                    //               .split('T')[0]
                                    //         : 0
                                    // }
                                />
                            ) : type === 'time' ? (
                                <input
                                    id={label}
                                    disabled={disabled}
                                    type={type}
                                    {...(register &&
                                        register(label, validationOptions))}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
                                />
                            ) : type === 'number' ? (
                                <input
                                    id={label}
                                    disabled={disabled}
                                    type={'number'}
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
                                    placeholder={placeholder}
                                    type={type}
                                    {...(register &&
                                        register(label, validationOptions))}
                                    className={` w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 ${
                                        formErrors &&
                                        formErrors[label] &&
                                        'border-red-500 '
                                    }`}
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
                        <span>Invalid {label.replaceAll('_', ' ')}</span>
                    )}
                </p>
            )}
        </div>
    )
}

export default Input
