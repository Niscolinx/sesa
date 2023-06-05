import axios, { AxiosError, AxiosResponse } from 'axios'
import { AppDispatch } from '../store/app/Store'
import { setAuth } from '../store/features/Auth'
import { getToken } from './Token'
import { useAppDispatch } from '../store/app/hooks'

//const instance = axios.create({ baseURL: 'http://localhost:4000' })

interface RequestOptions {
    method: string
    url: string
    data: any
    params: any
    headers: any
}

const AxiosRequest = ({
    dispatch,
    ...options
}: Partial<RequestOptions> & { dispatch: AppDispatch }) => {
    const onSuccess = (response: AxiosResponse) => response
    const onError = (error: AxiosError) => {
        return Promise.reject(error)
    }

    //return axiosInstance(options).then(onSuccess).catch(onError)
}

export default AxiosRequest
