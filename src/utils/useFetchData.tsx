import { useState } from 'react'
import { useQuery } from 'react-query'
import useAxios from '../components/hooks/useAxios'

interface FetchData {
    url: string
    name: string
    params: string
}

const useFetchData = ({ url = '/states/get', params, name = 'states' }: Partial<FetchData>) => {
    const [queryParams, setQueryParams] = useState(params)
    const [data, setData] = useState()

    const axiosInstance = useAxios()
    const fetchData = () =>
        axiosInstance({
            url,
        }).then(({data}) => data)

    const { isLoading, error, refetch } = useQuery(
        [name, queryParams],
        fetchData,
        {   
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            
            onSuccess: (data) => {
                setData(data)
            }
        }
    )

    const updateQueryParams = (newParams?: string) => {
        setQueryParams(newParams)
    }

    return { isLoading, data, error, refetch, updateQueryParams }
}

export default useFetchData
