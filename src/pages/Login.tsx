import React, { FormEvent } from 'react'

const Login = () => {
    const handleLogin = (e:FormEvent) => {
        e.preventDefault()
    }
    return (
        <div className='flex'>
            <form onSubmit={handleLogin}></form>
            <img src='/img/hero.png' alt='' />
        </div>
    )
}

export default Login
