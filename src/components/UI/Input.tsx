import { FC, useState } from 'react'

interface Input {
    label: string
    type: string
}

const Input: FC<Input> = ({}) => {
    const [type, setType] = useState('text')

    type ValidationOptions = {
        required: boolean
        pattern: string
        minLength: number
        maxLength: number
    }

    const formType = new Map([
        [
            'text',
            {
                required: true,
            },
        ],
    ]) satisfies Map<string, Partial<ValidationOptions>>

    return (
        <div className='w-full grid gap-4'>
            <label htmlFor='email' className='font-semibold'>
                Email
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
