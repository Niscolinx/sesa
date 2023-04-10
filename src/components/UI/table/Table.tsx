import { Dispatch, createContext, useContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import useAxios from '../../hooks/useAxios'
import { AxiosInstance } from 'axios'
import { SetStateAction } from 'jotai'
import TableDialog from './TableDialog'
import TableData from './TableData'

type Select = string | null

export type Actions = 'view details' | 'deactivate' | 'activate' | 'delete'

interface ICreateTableContext {
    navigate: NavigateFunction
    axiosInstance: AxiosInstance
    sortBy: Select
    setSortBy: Dispatch<SetStateAction<Select>>
    fetchedId: number
    setFetchedId: Dispatch<SetStateAction<number>>
    isDialogOpen: boolean
    fetchedData: any[]
    actions: Actions[]
    setFetchedData: Dispatch<SetStateAction<any[]>>
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
    deactivateProp: {url: string, tag?: string}
    fetch_url: string
    title: string
    view_page_url: string
    add_page_url: string
    is_add_btn: boolean
    data_to_display: string[]
}

const CreateTableContext = createContext<ICreateTableContext | null>(null)

export const useTableContext = () => {
    const context = useContext(CreateTableContext)

    if (!context) {
        throw new Error('Table Context must be used within the Table Container')
    }

    return context
}

interface Table {
    fetch_url: string
    title: string
    view_page_url: string
    add_page_url: string
    is_add_btn: boolean
    deactivateProp: {url: string, tag?: string}
    data_to_display: string[]
    actions?: Actions[]
}

const Table = ({
    fetch_url,
    title,
    view_page_url,
    add_page_url,
    data_to_display,
    is_add_btn,
    deactivateProp,
    actions = ['view details', 'deactivate'],
}: Table) => {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string | null>(null)
    const [fetchedId, setFetchedId] = useState<number>(null as any)
    const [fetchedData, setFetchedData] = useState<any[]>([])
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
                actions,
                setIsDialogOpen,
                deactivateProp,
                fetch_url,
                title,
                view_page_url,
                add_page_url,
                is_add_btn,
                data_to_display,
            }}
        >
            <TableDialog />
            <TableData />
        </CreateTableContext.Provider>
    )
}

export default Table
