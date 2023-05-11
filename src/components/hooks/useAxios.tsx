import { useEffect } from 'react'
import { useAppDispatch } from '../../store/app/hooks'
import { getToken } from '../../utils/token'
import { setAuth } from '../../store/features/auth'
import axios from 'axios'

function useAxios() {
    const dispatch = useAppDispatch()
    const axiosInstance = axios.create({
        baseURL: 'https://sesa-digital.herokuapp.com/api',
        // baseURL: 'https://sesadigital.com/api'

    })

    useEffect(() => {
       axiosInstance.interceptors.request.use(
            (config) => {
                const token = getToken()
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                    config.headers['Content-Type'] = 'multipart/form-data'
                } else {
                    dispatch(setAuth(false))
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        axiosInstance.interceptors.response.use(
            (response) => response.data,
            (error) => Promise.reject(error)
        )

      
    }, [dispatch, axiosInstance])

    return axiosInstance
}

export default useAxios
