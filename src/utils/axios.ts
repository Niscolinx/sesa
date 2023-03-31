import axios, { AxiosError, AxiosResponse } from 'axios'

const client = axios.create({ baseURL: 'https://sesadigital.com/api' })

interface RequestOptions {
    method: string
    url: string
    data: any
    params: any
    headers: any
}

export const AxiosRequest = ({
    token,
    ...options
}: Partial<RequestOptions> & { token: string }) => {
    if (token) {
        client.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => error

    return client(options)
        .then(onSuccess)
        .catch(onError)
}
