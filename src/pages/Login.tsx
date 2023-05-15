import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../store/app/hooks'
import { setAuth, storeToken } from '../store/features/auth'
import AxiosRequest from '../utils/axios'
import useAxios from '../components/hooks/useAxios'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('')

    interface Inputs {
        email: string
        password: string
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    // watch((values) => {
    //     console.log({ values })
    // })

    const axiosInstance = useAxios()
    const postLogin = (data: Inputs) => {
        const user = {
            user: data.email,
            password: data.password,
        }

        return axiosInstance({
            url: '/login',
            method: 'post',
            data: user,
        })
    }
    const { mutate, isLoading } = useMutation(postLogin, {
        onSuccess: (res) => {
            setResponseMessage({
                className: 'text-green-600',
                displayMessage: 'Login Successful',
            })
            const token = res.data.token
            if (token) {
                dispatch(storeToken(token))
                dispatch(setAuth(true))
            }
            if (res.data.roles) {
                localStorage.setItem('role', JSON.stringify(res.data.roles))
            }
            if (res.data.roles.includes('super')) {
                navigate('/superAdmin')
            }
            if (res.data.roles.includes('estate')) {
                navigate('/estateManager')
            }
            if (res.data.roles.includes('company')) {
                navigate('/securityCompany')
            }
        },
        onError: (err: any) => {
            console.log({ err })
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response?.data.message,
            })
        },
    })

    const onSubmit = handleSubmit((data) => {
        let { email } = data

        email = email.toLowerCase().trim()
        return mutate(data)
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
                    {responseMessage?.displayMessage && (
                        <p className='text-center'>
                            <span className={responseMessage?.className}>
                                {responseMessage?.displayMessage}
                            </span>
                        </p>
                    )}
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
                            className={`border border-color-grey p-4 rounded-lg w-full  ${
                                formErrors.password && 'border-red-500 '
                            }`}
                        />
                        {formErrors.password && (
                            <p className='text-[1.2rem] text-red-500'>
                                {formErrors.password.type === 'required' ? (
                                    <span>Field cannot be empty</span>
                                ) : (
                                    <span>Minimum length is 5</span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
                <button className='btn bg-[#0556E5] text-white rounded-lg py-4'>
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </form>
            <figure>
                <img src='/img/hero.png' alt='' />
            </figure>
        </div>
    )
}

export default Login
