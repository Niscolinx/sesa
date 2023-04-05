import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderedEstates from './RenderedEstates'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../store/app/hooks'
import { AxiosRequest } from '../../../utils/axios'

type EstateDetails = {
    estateName: string
    securityCompany: string
    status: string

    estateBalance: number
    NoOfResidents: number
    signOutRequired: boolean

    estateManager: string
    NoOfHouseholds: number
}

type Estate = {
    id: string
    img: string

    details: EstateDetails
}

function Estates() {
    type Actions = 'view details' | 'deactivate'

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [fetchedEstates, setFetchedEstates] = useState<Estate[]>(ESTATEDATA)
    const [sortBy, setSortBy] = useState<string | null>(null)

    const handleAddEstate = () => {
        navigate('/superAdmin/estates/add')
    }

    const fetchEstates = () => {
        return AxiosRequest({
            dispatch,
            // url: '/admin/get/all',
            url: '/users',
        })
    }

    const {
        isLoading: get_estates_loading,
        data: get_estates_response,
        isError: get_estates_isError,
        error: get_estates_error,
        // isFetching: get_estates_fetching,
    } = useQuery('estates', fetchEstates) as any

    useEffect(() => {
        if (get_estates_response?.status === 200) {
            // setFetchedEstates(get_estates_response.data)
            console.log(get_estates_response.data, 'fetchedData')
        }
    }, [get_estates_response])

    const actions = ['view details', 'deactivate'] satisfies Actions[]

    const [toggleDropDown, setToggleDropDown] = useState<{
        isDropDownOpen: boolean
        index: number | null
    }>({
        isDropDownOpen: false,
        index: null,
    })

    const dropDownHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: e.target.checked,
                index,
            }
        })
    }

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: Estate[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const perPage = 6
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetchedEstates?.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: Estate[][] = []
        for (let i = 0; i < fetchedEstates?.length; i += item) {
            slicedPages.push(fetchedEstates?.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedEstates?.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: Estate[][] = []
        for (
            let i = 0;
            i < fetchedEstates?.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedEstates?.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
            }
        })
    }, [fetchedEstates])

    const handleNext = () => {
        if (paginate.currentPage === paginate.totalPage) return
        setPaginate((prev) => {
            return {
                ...prev,
                index: prev.index + 1,
                currentPage: prev.currentPage + 1,
            }
        })
    }

    const handlePrev = () => {
        if (paginate.currentPage === 1) return
        setPaginate((prev) => {
            return {
                ...prev,
                index: prev.index - 1,
                currentPage: prev.currentPage - 1,
            }
        })
    }

    const { currentPage, slicedPages, itemsPerPage } = paginate

    const jumpToPage = (e: React.MouseEvent, index: number) => {
        setPaginate((prev) => {
            return {
                ...prev,
                index,
                currentPage: index + 1,
            }
        })
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleSelectedAction = (item: Actions, id: string) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'view details') {
            navigate(`/superAdmin/estates/detail/:${id}`)
        }

        if (item === 'deactivate') {
            openDialog()
        }
    }

    const deactivateHandler = () => {
        closeDialog()

        toast('Admin deactivated successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }
    console.log({
        get_estates_loading,
        get_estates_isError,
        get_estates_error,
        get_estates_response,
    })

    if (get_estates_loading) {
        return <p>Loading...</p>
    }

    if (get_estates_isError) {
        return <p>{get_estates_error.message}</p>
    }

    const estatesLoaded =
        get_estates_response.status === 200 &&
        get_estates_response.data.length > 0

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {estatesLoaded ? (
                    <section>
                        <RenderedEstates />
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Estate yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={handleAddEstate}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Estate
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Estates
