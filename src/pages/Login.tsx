import React, { FormEvent } from 'react'

const Login = () => {
    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
    }
    return (
        <div className='flex h-screen overflow-hidden'>
            <form onSubmit={handleLogin} className='basis-1/2 grid place-content-center'>
                <div>
                    <h1 className='text-[4.5rem] font-Satoshi-ExtraBold'>Welcome back!</h1>
                    <p>Kindly enter your details</p>
                </div>
                <div>
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='email'
                            className='text-[1.4rem] font-semibold'
                        >
                            Email
                        </label>
                        <input
                            type='email'
                            required
                            id='email'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full'
                        />
                    </div>
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='password'
                            className='text-[1.4rem] font-semibold'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            required
                            id='password'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full'
                        />
                    </div>
                </div>
                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                    Login
                </button>
            </form>
            <img src='/img/hero.png' alt='' />
        </div>
    )
}

export default Login
