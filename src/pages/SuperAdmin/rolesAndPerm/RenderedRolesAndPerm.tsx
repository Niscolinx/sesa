import { useEffect, useRef, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
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
    id: string
    name: string
    role: string
}

const ROLES_AND_PERM: RolesAndPerm[] = [
    {
        id: '1',
        name: 'Jacintha Sage',
        role: 'admin',
    },
    {
        id: '2',
        name: 'Jacintha Sage',
        role: 'estate Manager',
    },
    {
        id: '3',
        name: 'Jacintha Sage',
        role: 'security Company',
    },
    {
        id: '4',
        name: 'Jacintha Sage',
        role: 'security Company',
    },
    {
        id: '5',
        name: 'Jacintha Sage',
        role: 'Admin',
    },
]

function RenderedRolesAndPerm() {
    const axiosInstance = useAxios()
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const [permissions, setPermissions] = useState(new Array(10).fill(''))
    const [sortBy, setSortBy] = useState<string | null>(null)
    const [roles, setRoles] = useState<Roles[]>([
        'admin',
        'estate Manager',
        'security Company',
        'security Guard',
        'resident',
    ])
    const [selectedRole, setSelectedRole] = useState<{
        [key: string]: Roles
    }>(null as any)
    const [toggleDropDown, setToggleDropDown] = useState<{
        isDropDownOpen: boolean
        index: number | null
    }>({
        isDropDownOpen: false,
        index: null,
    })

    const [fetchedUsers, setFetchedUsers] = useState<RolesAndPerm[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ROLES_AND_PERM)
            }, 200)
        }
        fetchData()
    }, [])

    const fetchRolesAndPerm = () => {
        return axiosInstance({
            // url: '/admin/get/all',
            url: '/role/get/all',
        })
    }

    const {
        isLoading: get_rolesAndPerm_loading,
        data: get_rolesAndPerm_response,
        isError: get_rolesAndPerm_isError,
        error: get_rolesAndPerm_error,
        // isFetching: get_rolesAndPerm_fetching,
    } = useQuery('rolesAndPerm', fetchRolesAndPerm) as any

    const dropDownHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        console.log('clicked')
        setToggleDropDown((prev) => {
            return {
                isDropDownOpen: e.target.checked,
                index: index,
            }
        })
    }

    const selectRole = (e: React.MouseEvent, item: string, index: number) => {
        console.log('select role')
        setSelectedRole((prev) => {
            return {
                ...prev,
                [index]: item,
            }
        })
    }

    const showModal = () => {
        dialogRef.current?.showModal()
    }

    const hideModal = () => {
        dialogRef.current?.close()
    }

    console.log({
        get_rolesAndPerm_loading,
        get_rolesAndPerm_isError,
        get_rolesAndPerm_error,
        get_rolesAndPerm_response,
    })

    if (get_rolesAndPerm_loading) {
        return <p>Loading...</p>
    }

    if (get_rolesAndPerm_isError) {
        return <p>{get_rolesAndPerm_error.message}</p>
    }

    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <dialog ref={dialogRef} className='dialog'>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid  w-[64rem] h-[60rem] gap-8 py-8 px-10 items-center'>
                        <div className='border-b'>
                            <p className='text-[1.6rem] font-semibold'>
                                Permissions List
                            </p>
                        </div>
                        <div className='my-10 grid gap-4 h-full'>
                            {React.Children.toArray(
                                permissions.map((value, i) => {
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
                                })
                            )}
                        </div>
                        <button
                            className='bg-color-blue-1 px-12 py-4 text-white text-[1.4rem] flex items-center justify-self-start rounded-lg gap-4 self-center'
                            onClick={hideModal}
                        >
                            <img src='/icons/admins/saveDisk.svg' alt='' />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </section>
            </dialog>
            <div className='rounded-lg mt-[3rem] grid text-[1.6rem] '>
                <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
                    <p className=' font-Satoshi-Medium'>
                        Roles List <span>(10)</span>
                    </p>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/admins/search.svg'
                            alt=''
                            className='absolute left-4 text-[4rem]'
                        />
                        <input
                            type='text'
                            placeholder='Search Parameters'
                            className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                        />
                    </div>
                    <div className='w-[10rem] grid self-baseline '>
                        <Select
                            state={['A-Z', 'Date']}
                            selectedState={sortBy}
                            placeholder={'A-Z'}
                            setSelectedState={setSortBy}
                        />
                    </div>
                </div>
                <div className='renderedRolesAndPerm__table'>
                    <thead className='renderedRolesAndPerm__table--head'>
                        <tr>
                            <th>
                                <input type='checkbox' />
                                <p>Name</p>
                            </th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='renderedRolesAndPerm__table--body'>
                        {fetchedUsers && fetchedUsers.length > 0 ? (
                            React.Children.toArray(
                                fetchedUsers.map((value, i) => {
                                    const { isDropDownOpen, index } =
                                        toggleDropDown
                                    return (
                                        <tr key={i} className='relative'>
                                            <td>
                                                <input type='checkbox' />
                                                <img
                                                    src='/img/me.jpeg'
                                                    alt=''
                                                />
                                                <span>{value.name}</span>
                                            </td>
                                            <td>
                                                <label
                                                    className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                    htmlFor={i.toString()}
                                                    onClick={() =>
                                                        setToggleDropDown(
                                                            (prev) => {
                                                                return {
                                                                    isDropDownOpen:
                                                                        !prev.isDropDownOpen,
                                                                    index: i,
                                                                }
                                                            }
                                                        )
                                                    }
                                                >
                                                    {selectedRole &&
                                                    selectedRole[i] ? (
                                                        selectedRole[i]
                                                    ) : (
                                                        <span className='text-color-primary'>
                                                            Select Role
                                                        </span>
                                                    )}
                                                    {isDropDownOpen &&
                                                    index === i ? (
                                                        <GrUp className='w-[1rem] h-[1rem]' />
                                                    ) : (
                                                        <GrDown className='w-[1rem] h-[1rem]' />
                                                    )}
                                                </label>
                                                <input
                                                    type='radio'
                                                    name='dropdown'
                                                    className='hidden'
                                                    id={i.toString()}
                                                    onChange={(e) =>
                                                        dropDownHandler(e, i)
                                                    }
                                                />

                                                {isDropDownOpen &&
                                                    index === i && (
                                                        <div className='absolute top-[5rem] translate-x-[6rem] border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                                            {roles.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <p
                                                                        className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                                        key={
                                                                            index +
                                                                            i
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            selectRole(
                                                                                e,
                                                                                item,
                                                                                i
                                                                            )
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </p>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                            </td>

                                            <td>
                                                <button
                                                    className='text-[#098DFF]'
                                                    onClick={showModal}
                                                >
                                                    Edit Permissions
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        ) : (
                            <tr>
                                <td className='relative'>
                                    <div className='absolute w-full grid place-content-center'>
                                        <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </div>
                <footer className='renderedRolesAndPerm__footer'>
                    <div className='flex gap-8 items-center'>
                        <p>View</p>
                        <div className='flex items-center border px-4 rounded-lg'>
                            <input
                                type='text'
                                className='w-8 outline-none border-none cursor-pointer'
                                value={6}
                            />
                            <GrDown className='text-[1.3rem]' />
                        </div>
                        <p className='text'>List per page</p>
                    </div>
                    <ul className='flex items-center gap-5 ml-10'>
                        <HiOutlineChevronLeft />
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            1
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            2
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            3
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            4
                        </li>
                        <HiOutlineChevronRight />
                    </ul>
                </footer>
            </div>
        </div>
    )
}

export default RenderedRolesAndPerm
