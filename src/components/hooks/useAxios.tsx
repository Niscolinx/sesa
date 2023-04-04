import React from 'react'
import { useAppDispatch } from '../../store/app/hooks'
import { AxiosRequest } from '../../utils/axios'

function useAxios() {
    const dispatch = useAppDispatch()
    const fetchAdmins = async () => {
        return AxiosRequest({
            dispatch,
            url: '/admin/get/all',
        })
    }

    return <div>useAxios</div>
}

export default useAxios
