import axios, { AxiosError, AxiosResponse } from 'axios'
import { getToken } from './token'

const instance = axios.create({ baseURL: 'https://sesadigital.com/api' })

interface RequestOptions {
    method: string
    url: string
    data: any
    params: any
    headers: any
}

instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = getToken()
        if (token) {
            instance.defaults.headers.common.Authorization = `Bearer ${token}`
        }
        
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)
export const AxiosRequest = ({ ...options }: Partial<RequestOptions>) => {

    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => error

    return instance(options).then(onSuccess).catch(onError)
}
