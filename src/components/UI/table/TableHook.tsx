import { Dispatch, createContext, useContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import useAxios from '../../hooks/useAxios'
import { AxiosInstance } from 'axios'
import { SetStateAction } from 'jotai'

type Select = string | null

interface ICreateTableContext {
    navigate: NavigateFunction
    axiosInstance: AxiosInstance
    sortBy: Select
    setSortBy: Dispatch<SetStateAction<Select>>
    fetchedId: string
    setFetchedId: Dispatch<SetStateAction<string>>
    isDialogOpen: boolean
    fetchedState: any[]
    setFetchedState: Dispatch<SetStateAction<any[]>>
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

const CreateTableContext = createContext<ICreateTableContext | null>(null)

export const useTableContext = () => {
    const context = useContext(CreateTableContext)

    if (!context) {
        throw new Error('Table Context must be used within the Table Container')
    }

    return context
}

function TableHook<T>() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string | null>(null)
    const [fetchedId, setFetchedId] = useState('')
    const [fetchedState, setFetchedState] = useState<T[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <CreateTableContext.Provider
            value={{
                axiosInstance,
                navigate,
                sortBy,
                setSortBy,
                fetchedId,
                setFetchedId,
                fetchedState,
                setFetchedState,
                isDialogOpen,
                setIsDialogOpen,
            }}
        ></CreateTableContext.Provider>
    )
}

export default TableHook
