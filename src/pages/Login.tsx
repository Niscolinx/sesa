import React, { FormEvent, useState } from 'react'

const Login = () => {
    interface Inputs {
        email: string
        password: string
    }
    const [inputs, setInputs] = useState<Inputs>({
        email: '',
        password: '',
    })

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
    }
    return (
        <div className='flex h-screen overflow-hidden'>
            <form
                onSubmit={handleLogin}
                className='basis-1/2 grid place-content-center gap-10'
            >
                <div>
                    <h1 className='text-[4.5rem] font-Satoshi-ExtraBold'>
                        Welcome back!
                    </h1>
                    <p>Kindly enter your details</p>
                </div>
                <div className='grid gap-8'>
                    <div className='w-full grid gap-4'>
                        <label htmlFor='email' className='font-semibold'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            required
                            value={inputs.email}
                            id='email'
                            className='border border-color-grey p-4 rounded-lg w-full outline-color-primary outline-[0.5px]'
                        />
                    </div>
                    <div className='w-full grid gap-4'>
                        <label htmlFor='password' className='font-semibold'>
                            Password
                        </label>
                        <input
                            type='password'
                            required
                            name='password'
                            id='password'
                            className='border border-color-grey p-4  rounded-lg w-full'
                        />
                    </div>
                </div>
                <button className='btn bg-[#0556E5] text-white rounded-lg py-4'>
                    Login
                </button>
            </form>
            <figure>
                <img src='/img/hero.png' alt='' />
            </figure>
        </div>
    )
}

export default Login
