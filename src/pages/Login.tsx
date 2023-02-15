import React, { FormEvent } from 'react'

const Login = () => {
    const handleLogin = (e:FormEvent) => {
        e.preventDefault()
    }
    return (
        <div className='flex'>
            <form onSubmit={handleLogin}>
                <div>
                    <h1>Welcome back!</h1>
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
                            value={'Credit'}
                        />
                    </div>
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='status'
                            className='text-[1.4rem] font-semibold'
                        >
                            Transaction Type
                        </label>
                        <input
                            disabled
                            type='text'
                            required
                            id='status'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full'
                            value={'Credit'}
                        />
                    </div>
                </div>
                <div></div>
            </form>
            <img src='/img/hero.png' alt='' />
        </div>
    )
}

export default Login
