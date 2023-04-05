import React from 'react'
import { useAppDispatch } from '../../store/app/hooks'
import { axiosInstance } from '../../utils/axios'
import { getToken } from '../../utils/token'
import { setAuth } from '../../store/features/auth'

function useAxios({ ...props }) {
    const dispatch = useAppDispatch()

    axiosInstance.interceptors.request.use(function (config) {
        const token = getToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            dispatch(setAuth(false))
        }
        return config
    })

    return (
        <>
            <p>hello</p>
        </>
    )
}

export default useAxios
