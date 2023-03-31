import axios, { AxiosError, AxiosResponse } from 'axios'

const client = axios.create({ baseURL: 'https://sesadigital.com/api' })

export const AxiosRequest = ({ ...options }) => {
    client.defaults.headers.common.Authorization = 'Bearer token'

    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => error

    return client(options).then(onSuccess).catch(onError)
}
