import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import React from 'react'
import { useQuery } from 'react-query'
import useAxios from '../../../components/hooks/useAxios'
import { Select } from '../../../components/SuperAdmin/UI/Select'

type Roles =
    | 'admin'
    | 'estate Manager'
    | 'security Company'
    | 'security Guard'
    | 'resident'

interface RolesAndPerm {
    id: number
    name: string
    imgUrl: string
    role: {
        name: string
        permissions: string[]
    }[]
}

function Permissions() {
    // const axiosInstance = useAxios()
    // const dialogRef = useRef<HTMLDialogElement | null>(null)
    // const [permissions, setPermissions] = useState<{
    //     [key: string]: string[]
    // } | null>(null)

    // const [sortBy, setSortBy] = useState<string>('')
    // const [roleId, setRoleId] = useState<number | null>(null)
    // const [fetchedRolesAndPerm, setFetchedRolesAndPerm] = useState<
    //     RolesAndPerm[]
    // >([])

    // // const [roles, setRoles] = useState<Roles[]>([
    // //     'admin',
    // //     'estate Manager',
    // //     'security Company',
    // //     'security Guard',
    // //     'resident',
    // // ])

    // const [selectedRole, setSelectedRole] = useState<{
    //     [key: string]: Roles
    // }>(null as any)
    // const [toggleDropDown, setToggleDropDown] = useState<{
    //     isDropDownOpen: boolean
    //     index: number | null
    // }>({
    //     isDropDownOpen: false,
    //     index: null,
    // })

    // const fetchAllRoles = () => {
    //     return axiosInstance({
    //         url: '/role/get/all',
    //     })
    // }
    // const fetchRolesAndPerm = () => {
    //     return axiosInstance({
    //         url: '/get/all/users',
    //     })
    // }

    // const {
    //     isLoading: get_rolesAndPerm_loading,
    //     data: get_rolesAndPerm_response,
    //     isError: get_rolesAndPerm_isError,
    //     error: get_rolesAndPerm_error,
    // } = useQuery('get_rolesAndPerm', fetchRolesAndPerm) as any

    // const { data: get_roles_response } = useQuery(
    //     'get_allRoles',
    //     fetchAllRoles,
    //     {
    //         staleTime: 100000,
    //     }
    // ) as any

    // // const fetchedRolesAndPerm = get_rolesAndPerm_response?.data

    // useEffect(() => {
    //     if (get_rolesAndPerm_response?.data) {
    //         setFetchedRolesAndPerm(get_rolesAndPerm_response.data)
    //         let permissions = {}

    //         const roles = get_rolesAndPerm_response.data.reduce(
    //             (
    //                 acc: {},
    //                 curr: {
    //                     id: string
    //                     roles: { name: string; permissions: string[] }[]
    //                 }
    //             ) => {
    //                 const currRoleObj = { [curr.id]: curr.roles[0].name }
    //                 const currPermissionsObj = {
    //                     [curr.id]: curr.roles[0].permissions,
    //                 }

    //                 permissions = {
    //                     ...permissions,
    //                     ...currPermissionsObj,
    //                 }

    //                 return {
    //                     ...acc,
    //                     ...currRoleObj,
    //                 }
    //             },
    //             {}
    //         )

    //         setPermissions(permissions)
    //         setSelectedRole(roles)
    //     }
    // }, [get_rolesAndPerm_response])

    // const openDialog = () => {
    //     dialogRef.current?.showModal()
    // }

    // const closeDialog = () => {
    //     setRoleId(null)
    //     dialogRef.current?.close()
    // }

    // const openPermissions = (id: number) => {
    //     setRoleId(id)
    //     openDialog()
    // }

    // const dropDownHandler = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     index: number
    // ) => {
    //     setToggleDropDown((prev) => {
    //         return {
    //             isDropDownOpen: e.target.checked,
    //             index: index,
    //         }
    //     })
    // }

    // const selectRole = (e: React.MouseEvent, item: string, index: number) => {
    //     setSelectedRole((prev) => {
    //         return {
    //             ...prev,
    //             [index]: item,
    //         }
    //     })
    // }

    // interface Paginate {
    //     index: number
    //     currentPage: number
    //     itemsPerPage: number
    //     totalPage: number
    //     slicedPages: RolesAndPerm[][] | null
    // }

    // const itemsPerPageArr = [2, 4, 6, 8]

    // const perPage = 6
    // const [paginate, setPaginate] = useState<Paginate>({
    //     index: 0,
    //     currentPage: 1,
    //     itemsPerPage: perPage,

    //     totalPage: Math.ceil(get_roles_response?.data.length / perPage),
    //     slicedPages: null,
    // })

    // const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    //     const item = parseInt(e.target.value)

    //     const slicedPages: RolesAndPerm[][] = []
    //     for (let i = 0; i < fetchedRolesAndPerm?.length; i += item) {
    //         slicedPages.push(fetchedRolesAndPerm?.slice(i, i + item))
    //     }

    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             itemsPerPage: item,
    //             index: 0,
    //             currentPage: 1,
    //             slicedPages,
    //             totalPage: Math.ceil(fetchedRolesAndPerm?.length / item),
    //         }
    //     })
    // }

    // useEffect(() => {
    //     const slicedPages: RolesAndPerm[][] = []
    //     for (
    //         let i = 0;
    //         i < fetchedRolesAndPerm?.length;
    //         i += paginate.itemsPerPage
    //     ) {
    //         slicedPages.push(
    //             fetchedRolesAndPerm?.slice(i, i + paginate.itemsPerPage)
    //         )
    //     }

    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             slicedPages,
    //             totalPage: Math.ceil(fetchedRolesAndPerm?.length / perPage),
    //         }
    //     })
    // }, [fetchedRolesAndPerm])

    // const handleNext = () => {
    //     console.log(paginate.currentPage, '===', paginate.totalPage)
    //     if (paginate.currentPage === paginate.totalPage) return
    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             index: prev.index + 1,
    //             currentPage: prev.currentPage + 1,
    //         }
    //     })
    // }

    // const handlePrev = () => {
    //     if (paginate.currentPage === 1) return
    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             index: prev.index - 1,
    //             currentPage: prev.currentPage - 1,
    //         }
    //     })
    // }

    // const { currentPage, slicedPages, itemsPerPage } = paginate

    // const jumpToPage = (e: React.MouseEvent, index: number) => {
    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             index,
    //             currentPage: index + 1,
    //         }
    //     })
    // }

    // console.log({
    //     get_rolesAndPerm_loading,
    //     get_rolesAndPerm_isError,
    //     get_rolesAndPerm_error,
    //     get_rolesAndPerm_response,
    // })

    // if (get_rolesAndPerm_loading) {
    //     return <p>Loading...</p>
    // }

    // if (get_rolesAndPerm_isError) {
    //     return <p>{get_rolesAndPerm_error.message}</p>
    // }

    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <dialog ref={dialogRef} className='dialog'>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid  w-[64rem] h-[60rem] gap-8 py-8 px-10 items-center relative'>
                        <IoMdClose
                            className='absolute right-0 top-0 m-4 text-[2rem] cursor-pointer'
                            onClick={() => closeDialog()}
                        />
                        <div className='border-b'>
                            <p className='text-[1.6rem] font-semibold'>
                                Permissions List
                            </p>
                        </div>
                        <div className='my-10 grid gap-4 h-full'>
                            {permissions &&
                            roleId &&
                            Object.values(permissions)[`${roleId}`].length >
                                0 ? (
                                React.Children.toArray(
                                    Object.values(permissions)[`${roleId}`].map(
                                        (value, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className='flex items-center gap-4 '
                                                >
                                                    <input
                                                        type='checkbox'
                                                        className='cursor-pointer'
                                                    />
                                                    <p className='text-[1.6rem]'>
                                                        Permission {i + 1}
                                                    </p>
                                                </div>
                                            )
                                        }
                                    )
                                )
                            ) : (
                                <p>No permission</p>
                            )}
                        </div>
                        <button
                            className='bg-color-blue-1 px-12 py-4 text-white text-[1.4rem] flex items-center justify-self-start rounded-lg gap-4 self-center'
                            onClick={closeDialog}
                        >
                            <img src='/icons/admins/saveDisk.svg' alt='' />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </section>
            </dialog>
           
        </div>
    )
}

export default Permissions
