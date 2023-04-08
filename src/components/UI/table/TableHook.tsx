import  { createContext, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'
import useAxios from '../../hooks/useAxios'


interface CreateTableHook {
    navigate: NavigateFunction
}

const CreateTableHook = createContext(null)

function TableHook<T>() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string | null>(null)
    const [estateManagerId, setEstateManagerId] = useState('')
    const [fetchedEstateManagers, setFetchedEstateManagers] = useState<
        T[]
    >([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    

  return (
    <div>TableHook</div>
  )
}

export default TableHook