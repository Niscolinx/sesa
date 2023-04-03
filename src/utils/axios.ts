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
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    function (error) {
        console.log({error})
        return Promise.reject(error)
    }
)
export const AxiosRequest = ({ ...options }: Partial<RequestOptions>) => {
    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => error

    return instance(options).then(onSuccess).catch(onError)
}
