import React, { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate()
    interface Inputs {
        email: string
        password: string
    }

    const handleLogin = (e: FormEvent) => {
        e.preventDefault()
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    watch((values) => {
        console.log({ values })
    })

    const onSubmit = handleSubmit((data) => {
        console.log({ data })

        let { email, password } = data

        email = email.toLowerCase().trim()

        if (email.includes('superadmin')) {
            navigate('/superAdmin')
        }

        if (email === 'securitycompany@sesa.com') {
            navigate('/securityCompany')
        }

        if (email === 'estatemanager@sesa.com') {
            navigate('/estateManager')
        }
    })

    return (
        <div className='flex h-screen overflow-hidden'>
            <form
                onSubmit={onSubmit}
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
                            {...register('email', {
                                required: true,
                                // pattern: /^\S+@\S+$/i,
                                pattern:
                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                            className={`border border-color-grey p-4 rounded-lg w-full`}
                        />
                    </div>
                    <div className='w-full grid gap-4'>
                        <label htmlFor='password' className='font-semibold'>
                            Password
                        </label>
                        <input
                            type='password'
                            {...register('password', {
                                required: true,
                                minLength: 5,
                            })}
                            className={`border border-color-grey p-4 rounded-lg w-full`}
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
