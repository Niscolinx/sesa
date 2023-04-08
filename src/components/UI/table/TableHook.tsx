import { Dispatch, createContext, useState } from 'react'
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
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

 const CreateTableContext = createContext<ICreateTableContext | null>(null)

function TableHook<T>() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string | null>(null)
    const [fetchedId, setFetchedId] = useState('')
    const [fetchedState, setFetchedState] = useState<T[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return <CreateTableContext provider={{

    }}>
        <p>hello</p>
    </CreateTableContext>
}

export default TableHook
