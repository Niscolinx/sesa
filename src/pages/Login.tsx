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
            <div></div>
            <div></div>

            </form>
            <img src='/img/hero.png' alt='' />
        </div>
    )
}

export default Login
