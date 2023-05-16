import { useEffect } from 'react'
import { useAppDispatch } from '../../store/app/Hooks'
import { getToken } from '../../utils/Token'
import { setAuth } from '../../store/features/Auth'
import axios from 'axios'

interface Props {
    is_form_data?: boolean
}
function UseAxios({ is_form_data }: Props = { is_form_data: true }) {
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
                    if (is_form_data) {
                        config.headers['Content-Type'] =
                            'application/json, multipart/form-data'
                    }
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

export default UseAxios
