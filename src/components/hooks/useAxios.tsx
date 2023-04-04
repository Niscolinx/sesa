import React from 'react'
import { useAppDispatch } from '../../store/app/hooks'
import { AxiosRequest } from '../../utils/axios'

function useAxios({...props}) {
    const dispatch = useAppDispatch()

    AxiosRequest({
        dispatch,
        ...props
    })

   return AxiosRequest
}

export default useAxios
