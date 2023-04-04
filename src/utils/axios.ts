import axios, { AxiosError, AxiosResponse } from 'axios'
import { AppDispatch } from '../store/app/store'
import { setAuth } from '../store/features/auth'
import { getToken } from './token'

const instance = axios.create({ baseURL: 'https://sesadigital.com/api' })

interface RequestOptions {
    method: string
    url: string
    data: any
    params: any
    headers: any
}

instance.interceptors.request.use(function (config) {
    const token = getToken()

    console.log({ token })
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
export const AxiosRequest = ({
    dispatch,
    ...options
}: Partial<RequestOptions> & { dispatch: AppDispatch }) => {
    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => {
        dispatch(setAuth(false))
        return Promise.reject(error)
    }

    return instance(options).then(onSuccess).catch(onError)
}
