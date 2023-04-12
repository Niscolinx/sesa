import { Dispatch, createContext, useContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import useAxios from '../../hooks/useAxios'
import { AxiosInstance } from 'axios'
import { SetStateAction } from 'jotai'
import TableDialog from './TableDialog'
import TableData from './TableData'


export type Actions = 'view details' | 'deactivate' | 'activate' | 'delete'

interface Table {
    fetch_url: string
    title: string
    view_page_url: string
    add_page_url?: string
    is_add_btn: boolean
    isCategory?: boolean
    deactivateProp: { url: string; tag?: string }
    data_to_display: string[]
    nested?: boolean
    is_dropdown?: boolean
    THeader: string[]
    actions?: Actions[]
}

interface ICreateTableContext extends Table {
    navigate: NavigateFunction
    axiosInstance: AxiosInstance
    sortBy: string
    setSortBy: Dispatch<SetStateAction<string>>
    fetchedId: number
    setFetchedId: Dispatch<SetStateAction<number>>
    isDialogOpen?: boolean
    fetchedData: any[]
    actions: Actions[]
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



const Table = ({
    fetch_url,
    title,
    is_dropdown = true,
    isCategory,
    view_page_url,
    add_page_url,
    data_to_display,
    is_add_btn,
    nested = false,
    deactivateProp,
    THeader,
    actions = [] ,
}: Table) => {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string>('')
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
                nested,
                THeader,
                isCategory,
                is_dropdown,
                data_to_display,
            }}
        >
            <TableDialog />
            <TableData />
        </CreateTableContext.Provider>
    )
}

export default Table
