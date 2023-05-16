import { useState } from 'react'
import { useQuery } from 'react-query'
import useAxios from '../components/hooks/UseAxios'

interface FetchData {
    url?: string
    name?: string
    params?: string
    nested?: boolean
}

const useFetchData = ({
    url = '/states/get',
    params,
    name = 'states',
    nested = true,
}: FetchData) => {
    const [queryParams, setQueryParams] = useState(params)

    const axiosInstance = useAxios()
    const fetchData = () =>
        axiosInstance({
            url,
        }).then((res) => (nested ? res.data : res))

    const { isLoading, error, data, refetch, isFetching, isError, isFetched } =
        useQuery<any, Error>([name, queryParams], fetchData, {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        })

    const updateQueryParams = (newParams?: string) => {
        setQueryParams(newParams)
    }

    return {
        isLoading,
        data,
        error,
        refetch,
        isFetched,
        isError,
        isFetching,
        updateQueryParams,
    }
}

export default useFetchData
