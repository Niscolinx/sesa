import axios, { AxiosError, AxiosResponse } from 'axios'
import {  getToken } from './token'

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
export const AxiosRequest = ({ ...options }: Partial<RequestOptions>) => {
    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => {
        return Promise.reject(error)
    }

    return instance(options).then(onSuccess).catch(onError)
}
