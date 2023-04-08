import { Dispatch, createContext, useContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import useAxios from '../../hooks/useAxios'
import { AxiosInstance } from 'axios'
import { SetStateAction } from 'jotai'
import TableDialog from './TableDialog'
import Table from './Table'

type Select = string | null

interface ICreateTableContext {
    navigate: NavigateFunction
    axiosInstance: AxiosInstance
    sortBy: Select
    setSortBy: Dispatch<SetStateAction<Select>>
    fetchedId: number
    setFetchedId: Dispatch<SetStateAction<number>>
    isDialogOpen: boolean
    fetchedData: any[]
    setFetchedData: Dispatch<SetStateAction<any[]>>
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



export type Actions = 'view details' | 'deactivate' | 'activate' | 'delete'

function TableHook<T>() {

    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string | null>(null)
    const [fetchedId, setFetchedId] = useState<number>(null as any)
    const [actions, setActions] = useState<Actions[]>(['view details', 'deactivate'])
    const [fetchedData, setFetchedData] = useState<T[]>([])
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
                fetchedData,
                setFetchedData,
                isDialogOpen,
                setIsDialogOpen,
            }}
        >
            <TableDialog/>
            <Table/>
        </CreateTableContext.Provider>
    )
}

export default TableHook
