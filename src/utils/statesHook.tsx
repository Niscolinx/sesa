import { useState } from "react"
import { useQuery } from "react-query"
import useAxios from "../components/hooks/useAxios"

const useFetchData = (url) => {
    const [queryParams, setQueryParams] = useState({})

    const axiosInstance = useAxios()
    const fetchData = () => axiosInstance({
        url,
    })
    const { isLoading, data, error, refetch } = useQuery(
        ['data', queryParams],
        async () => {
            const res = await fetch(url, queryParams)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json()
        }
    )

    const updateQueryParams = (newParams) => {
        setQueryParams(newParams)
    }

    return { isLoading, data, error, refetch, updateQueryParams }
}
