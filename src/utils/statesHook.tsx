import { FC, useState } from "react"
import { useQuery } from "react-query"
import useAxios from "../components/hooks/useAxios"


interface FetchData {
    url: string
    params?: string
}

const useFetchData:FC<FetchData> = ({url, params}) => {
    const [queryParams, setQueryParams] = useState({params})

    const axiosInstance = useAxios()
    const fetchData = () => axiosInstance({
        url,
    })

    

    const { isLoading, data, error, refetch } = useQuery(
        ['data', queryParams],
       fetchData
    )

    const updateQueryParams = (newParams: string) => {
        setQueryParams({newParams})
    }

    return { isLoading, data, error, refetch, updateQueryParams }
}
