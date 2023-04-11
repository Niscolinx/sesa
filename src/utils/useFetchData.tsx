import { useState } from 'react'
import { useQuery } from 'react-query'
import useAxios from '../components/hooks/useAxios'

interface FetchData {
    url?: string
    name?: string
    params?: string
}

const useFetchData = ({
    url = '/states/get',
    params,
    name = 'states',
}: FetchData) => {
    const [queryParams, setQueryParams] = useState(params)

    const axiosInstance = useAxios()
    const fetchData = () =>
        axiosInstance({
            url,
        }).then(({ data }) => data)

    const { isLoading, error, data, refetch } = useQuery(
        [name, queryParams],
        fetchData,
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    )

    const updateQueryParams = (newParams?: string) => {
        setQueryParams(newParams)
    }

    return { isLoading, data, error, refetch, updateQueryParams }
}

export default useFetchData
