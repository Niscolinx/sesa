import { FC, useState } from "react"

interface Input {
    label: string
    type: string
}

const Input:FC<Input> = ({}) => {
    const [type, setType] = useState('text')
 
    const formType = new Map([
        [1, <First />],
        [2, <Second />],
        [3, <Third />],
        [4, <Fourth />],
        [5, <Last />],
    ]) satisfies Map<number, JSX.Element>

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
