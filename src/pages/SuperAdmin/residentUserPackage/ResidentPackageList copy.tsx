import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import useAxios from '../../../components/hooks/useAxios'
import Table from '../../../components/UI/table/Table'

export interface ResidentPackageList {
    id: string

    package_name: string
    frequency: string
    price: number
    status: string
}

interface ResponseData {
    fetched: []
}

const ResidentPackageList: FC<ResponseData> = ({ fetched }) => {
    type Actions = 'view details' | 'activate' | 'deactivate' | 'delete'

    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [sortBy, setSortBy] = useState<string | null>(null)
    const [packageId, setPackageId] = useState('')

    const postDeactivate = () => {
        return axiosInstance({
            url: '/admin/resident/user/package/changestatus',
            method: 'post',
            data: { id: packageId },
        })
    }

    const {
        mutate: deactivate_package_mutation,
        isLoading: deactivate_package_loading,
    } = useMutation(postDeactivate, {
        onSuccess: () => {
            closeDialog()

            toast('Package deactivated successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
        },
    }) as any

    const actions = [
        'view details',
        'activate',
        'deactivate',
        'delete',
    ] satisfies Actions[]

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
        slicedPages: ResidentPackageList[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const perPage = 6
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetched?.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: ResidentPackageList[][] = []
        for (let i = 0; i < fetched?.length; i += item) {
            slicedPages.push(fetched?.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetched?.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: ResidentPackageList[][] = []
        for (let i = 0; i < fetched?.length; i += paginate.itemsPerPage) {
            slicedPages.push(fetched?.slice(i, i + paginate.itemsPerPage))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(fetched?.length / perPage),
            }
        })
    }, [])

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
            navigate(`/superAdmin/resident-user-package/view/:${id}`)
        }

        if (item === 'deactivate') {
            setPackageId(id)
            openDialog()
        }
    }

    const handlePathSwitch = () => {
        navigate('/superAdmin/resident-user-package/add')
    }

    return (
        <div>
             <div className='rounded-lg mt-[3rem] h-[80vh]'>
                <Table
                    fetch_url={'/manager/get/all'}
                    title={'estateManager'}
                    view_page_url={'/superAdmin/estateManagers/view/'}
                    add_page_url={'/superAdmin/estateManagers/add'}
                    is_add_btn={true}
                    data_to_display={[
                        'name',
                        'gender',
                        'phone',
                        'created_at',
                        'image',
                        'status',
                    ]}
                    deactivate_url={'change/user/status'}
                />
            </div>
        </d>
    )
}

export default ResidentPackageList
