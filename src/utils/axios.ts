import { useAppSelector } from './../store/app/hooks';
import axios, { AxiosError, AxiosResponse } from 'axios'
import { selectAuth } from '../store/features/auth';

const client = axios.create({ baseURL: 'https://sesadigital.com/api' })

interface RequestOptions {
    method: string
    url: string
    data: any
    params: any
    headers: any
}

export const AxiosRequest = ({ ...options }: Partial<RequestOptions>) => {
    const {token} = useAppSelector(selectAuth)
    client.defaults.headers.common.Authorization = `Bearer ${token}`

    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => error

    return client(options).then(onSuccess).catch(onError)
}
