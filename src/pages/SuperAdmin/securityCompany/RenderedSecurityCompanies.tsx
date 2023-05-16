import React, { ChangeEvent, useRef } from 'react'
import { useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import {
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineDotsVertical,
} from 'react-icons/hi'
import { TbCurrencyNaira } from 'react-icons/tb'

import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/app/Hooks'
import useAxios from '../../../components/hooks/UseAxios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'

type SecurityCompany = {
    id: number
    image: string
    name: string
    address: string
    balance: string
    onboarding_date: string
    status: number
    security_guard_count: number
}

export type Actions = 'view details' | 'activate' | 'deactivate'

const actions: Actions[] = ['view details']

function RenderedSecurityCompanies() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()

    const [fetchedSecurityCompanies, setFetchedSecurityCompanies] = useState<
        SecurityCompany[]
    >([])

    const [securityCompanyId, setSecurityCompanyId] = useState('')
    const [companyStatus, setCompanyStatus] = useState('')

    const postDeactivateSecurityCompany = () => {
        return axiosInstance({
            url: '/security-company/deactivate_activate',
            method: 'post',
            data: { id: securityCompanyId },
        })
    }

    const fetchSecurityCompanies = () => {
        return axiosInstance({
            url: '/security-company/get/all',
        })
    }

    const queryClient = useQueryClient()
    // const messageTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2')

    const {
        mutate: deactivate_securityCompany_mutation,
        isLoading: deactivate_securityCompany_loading,
    } = useMutation(postDeactivateSecurityCompany, {
        onMutate: async () => {
            await queryClient.cancelQueries('securityCompanies')

            const previousData: any = await queryClient.getQueryData(
                'securityCompanies'
            )
            const prevData = structuredClone(previousData)

            console.log(prevData.data)
            if (prevData.data) {
                let index_to_replace = 0
                let updatedData = prevData.data
                    .filter((data: any, idx: number) => {
                        if (data.id === parseInt(securityCompanyId)) {
                            index_to_replace = idx
                            return data
                        }
                    })
                    .map((gotten_data: any) => {
                        let status = 1

                        if (gotten_data.status) {
                            status = 0
                        }

                        return {
                            ...gotten_data,
                            status,
                        }
                    })

                const cloneOld: any[] = prevData.data

                cloneOld.splice(index_to_replace, 1, ...updatedData)

                queryClient.setQueryData(
                    'securityCompanies',
                    (oldData: any) => {
                        console.log({ oldData })
                        const relevantData = oldData.data
                        return {
                            ...relevantData,
                            data: [...cloneOld],
                        }
                    }
                )
            }
            setTimeout(() => {
                closeDialog()
            }, 400)

            return {
                previousData,
            }
        },

        onSuccess: (data) => {
            if (data) {
                toast(`Company ${companyStatus + 'd'} Successfully`, {
                    type: 'success',
                    className:
                        'bg-green-50 text-green-600 text-[1.4rem] capitalize',
                })
            }
        },

        onError: (_err, _variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(
                    'securityCompanies',
                    context.previousData
                )
            }

            toast(`Failed to ${companyStatus} Security Company`, {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
            })
        },

        onSettled: () => {
            queryClient.invalidateQueries('securityCompanies')
        },
    })
    const {
        isLoading: get_securityCompanies_loading,
        isError: get_securityCompanies_isError,
        error: get_securityCompanies_error,
        data: get_securityCompanies_response,
    } = useQuery('securityCompanies', fetchSecurityCompanies, {}) as any

    useEffect(() => {
        if (get_securityCompanies_response) {
            setFetchedSecurityCompanies(get_securityCompanies_response.data)
        }
    }, [get_securityCompanies_response])

    interface Paginate {
        index: number
        currentPage: number
        itemsPerPage: number
        totalPage: number
        slicedPages: SecurityCompany[][] | null
    }

    const itemsPerPageArr = [2, 4, 6, 8]

    const perPage = 6
    const [paginate, setPaginate] = useState<Paginate>({
        index: 0,
        currentPage: 1,
        itemsPerPage: perPage,

        totalPage: Math.ceil(fetchedSecurityCompanies?.length / perPage),
        slicedPages: null,
    })

    const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = parseInt(e.target.value)

        const slicedPages: SecurityCompany[][] = []
        for (let i = 0; i < fetchedSecurityCompanies?.length; i += item) {
            slicedPages.push(fetchedSecurityCompanies?.slice(i, i + item))
        }

        setPaginate((prev) => {
            return {
                ...prev,
                itemsPerPage: item,
                index: 0,
                currentPage: 1,
                slicedPages,
                totalPage: Math.ceil(fetchedSecurityCompanies?.length / item),
            }
        })
    }

    useEffect(() => {
        const slicedPages: SecurityCompany[][] = []
        for (
            let i = 0;
            i < fetchedSecurityCompanies?.length;
            i += paginate.itemsPerPage
        ) {
            slicedPages.push(
                fetchedSecurityCompanies?.slice(i, i + paginate.itemsPerPage)
            )
        }

        setPaginate((prev) => {
            return {
                ...prev,
                slicedPages,
                totalPage: Math.ceil(
                    fetchedSecurityCompanies?.length / perPage
                ),
            }
        })
    }, [fetchedSecurityCompanies])

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

    const { slicedPages, itemsPerPage } = paginate

    const jumpToPage = (_e: React.MouseEvent, index: number) => {
        setPaginate((prev) => {
            return {
                ...prev,
                index,
                currentPage: index + 1,
            }
        })
    }

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

    const handlePathSwitch = () => {
        navigate('/superAdmin/security-company/add')
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

    const handleSelectedAction = (
        item: Actions,
        id: string,
        status: string
    ) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        if (item === 'view details') {
            console.log('view')
            navigate(`/superAdmin/security-company/view/:${id}`)
        }

        if (item === 'deactivate' || item === 'activate') {
            setSecurityCompanyId(id)
            setCompanyStatus(status)

            openDialog()
        }
    }

    if (get_securityCompanies_loading) {
        return <p>Loading...</p>
    }

    if (get_securityCompanies_isError) {
        return <p>{get_securityCompanies_error.message}</p>
    }

    const fetched = get_securityCompanies_response?.data

    return (
        <div className='w-full grid item rounded-lg'>
            {fetched.length > 0 ? (
                <>
                    <ToastContainer />
                    <div className='grid gap-10'>
                        <dialog className='dialog' ref={dialogRef}>
                            <section className='grid place-content-center w-full h-[100vh]'>
                                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                                    {companyStatus === 'deactivate' ? (
                                        <img
                                            src='/icons/admins/modalWarning.svg'
                                            alt=''
                                            className='animate__animated animate__pulse '
                                            style={{
                                                animationIterationCount:
                                                    'infinite',
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src='/icons/admins/modalSuccess.svg'
                                            alt=''
                                            className='animate__animated animate__pulse '
                                            style={{
                                                animationIterationCount:
                                                    'infinite',
                                            }}
                                        />
                                    )}

                                    <p>
                                        Are you sure you want to {companyStatus}{' '}
                                        this security company?
                                    </p>

                                    <div className='flex w-full justify-center gap-8'>
                                        <button
                                            className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                            onClick={() => closeDialog()}
                                        >
                                            Cancel
                                        </button>

                                        {companyStatus === 'deactivate' ? (
                                            <button
                                                className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                                onClick={() =>
                                                    deactivate_securityCompany_mutation()
                                                }
                                            >
                                                {deactivate_securityCompany_loading
                                                    ? 'Loading...'
                                                    : 'deactivate'}
                                            </button>
                                        ) : (
                                            <button
                                                className='bg-green-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                                onClick={() =>
                                                    deactivate_securityCompany_mutation()
                                                }
                                            >
                                                {deactivate_securityCompany_loading
                                                    ? 'Loading...'
                                                    : 'activate'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </dialog>
                        <div className='flex w-full justify-between items-center gap-12 p-8 bg-color-white rounded-lg'>
                            <p className='text-[1.6rem] font-Satoshi-Medium'>
                                SecurityCompany List{' '}
                                <span>({fetched.length})</span>
                            </p>
                            <div className='relative flex items-center'>
                                <img
                                    src='/icons/admins/search.svg'
                                    alt=''
                                    className='absolute left-4'
                                />
                                <input
                                    type='text'
                                    placeholder='Search Parameter'
                                    className='pl-16 w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'
                                />
                            </div>
                            {/* <div className='relative flex items-center'>
                                <select className='cursor-pointer w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'>
                                    <option hidden>Category</option>
                                    <option>date</option>
                                    <option>Alpha</option>
                                </select>
                                <GrDown className='absolute right-4 text-[1.3rem]' />
                            </div> */}
                            <button
                                className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8'
                                onClick={handlePathSwitch}
                            >
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                <p>Add Company</p>
                            </button>
                        </div>
                        <div className='w-full'>
                            <div className='grid gap-8 '>
                                {slicedPages &&
                                    slicedPages?.length > 0 &&
                                    React.Children.toArray(
                                        slicedPages[paginate.index].map(
                                            (
                                                {
                                                    id,
                                                    image,
                                                    address,
                                                    balance,
                                                    name,
                                                    onboarding_date,
                                                    security_guard_count,
                                                    status,
                                                },
                                                idx
                                            ) => {
                                                const {
                                                    isDropDownOpen,
                                                    index,
                                                } = toggleDropDown
                                                return (
                                                    <div
                                                        className='p-8 flex bg-white border border-color-grey rounded-lg '
                                                        style={{
                                                            justifyContent:
                                                                'repeat(4, minmax(min-content, 1fr))',
                                                        }}
                                                    >
                                                        <div className='w-full py-8 grid items-start gap-4 '>
                                                            <img
                                                                src={image}
                                                                alt=''
                                                                className='w-[21rem] h-[18rem] object-cover rounded-lg'
                                                            />
                                                        </div>
                                                        <div className='w-full py-8 grid items-start gap-4 '>
                                                            <div>
                                                                <p className='text-[1.4rem] text-[#043FA7]'>
                                                                    Name
                                                                </p>
                                                                <p className='font-[1.6rem] whitespace-nowrap'>
                                                                    {name}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className='text-[#043FA7]'>
                                                                    Address
                                                                </p>
                                                                <address className='not-italic max-w-[20rem]'>
                                                                    {address}
                                                                </address>
                                                            </div>
                                                        </div>
                                                        <div className='w-full py-8 grid items-start gap-4 '>
                                                            <div>
                                                                <p className='text-[#043FA7]'>
                                                                    Wallet
                                                                    Balance
                                                                </p>
                                                                <p className='flex items-center'>
                                                                    <TbCurrencyNaira className='text-[2rem]' />
                                                                    {balance}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p className='text-[#043FA7]'>
                                                                    Joined Date
                                                                </p>
                                                                <p>
                                                                    {new Date(
                                                                        onboarding_date
                                                                    )
                                                                        .toLocaleDateString()
                                                                        .replaceAll(
                                                                            '/',
                                                                            '-'
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='w-full py-8 grid items-start gap-4  content-start'>
                                                            <div>
                                                                <p className='text-[#043FA7]'>
                                                                    No of
                                                                    Security
                                                                    Guards
                                                                </p>
                                                                <p>
                                                                    {
                                                                        security_guard_count
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className=' mt-10'>
                                                                <p className='text-[#043FA7]'>
                                                                    Status
                                                                </p>
                                                                <p>
                                                                    {status ===
                                                                    1 ? (
                                                                        <span className=' text-color-green-light'>
                                                                            Active
                                                                        </span>
                                                                    ) : (
                                                                        <span className='text-red-500'>
                                                                            Deactivated
                                                                        </span>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className='relative'>
                                                            <label
                                                                className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                                                                htmlFor={id.toString()}
                                                                onClick={() =>
                                                                    setToggleDropDown(
                                                                        (
                                                                            prev
                                                                        ) => {
                                                                            return {
                                                                                isDropDownOpen:
                                                                                    !prev.isDropDownOpen,
                                                                                index: id,
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <button>
                                                                    <HiOutlineDotsVertical className='text-[2rem]' />
                                                                </button>
                                                            </label>
                                                            <input
                                                                type='radio'
                                                                name='dropdown'
                                                                className='hidden'
                                                                id={id.toString()}
                                                                onChange={(e) =>
                                                                    dropDownHandler(
                                                                        e,
                                                                        id
                                                                    )
                                                                }
                                                            />

                                                            {isDropDownOpen &&
                                                                index ===
                                                                    id && (
                                                                    <div className='absolute top-0 translate-x-[-10rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                                                        {[
                                                                            ...actions,
                                                                            status ===
                                                                            1
                                                                                ? 'deactivate'
                                                                                : 'activate',
                                                                        ].map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <p
                                                                                        className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                                                                        key={
                                                                                            index +
                                                                                            id
                                                                                        }
                                                                                        onClick={(
                                                                                            e
                                                                                        ) =>
                                                                                            handleSelectedAction(
                                                                                                item as Actions,
                                                                                                id.toString(),
                                                                                                item
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {item ===
                                                                                        'activate' ? (
                                                                                            <span className='text-green-600'>
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </span>
                                                                                        ) : item ===
                                                                                          'deactivate' ? (
                                                                                            <span className='text-red-600'>
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </span>
                                                                                        ) : (
                                                                                            item
                                                                                        )}
                                                                                    </p>
                                                                                )
                                                                            }
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    )}
                            </div>
                        </div>
                        <footer className='flex items-center p-4 mt-4 bg-color-white rounded-lg'>
                            <div className='flex gap-8 items-center'>
                                <p>View</p>
                                <select
                                    name=''
                                    id=''
                                    className='flex items-center border px-4 rounded-lg outline-none cursor-pointer'
                                    onChange={handleItemsPerPage}
                                >
                                    {itemsPerPageArr.map((item, index) => (
                                        <option
                                            value={item}
                                            key={index}
                                            selected={item === itemsPerPage}
                                            className='capitalize cursor-pointer bg-white'
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <p className='text'>List per page</p>
                            </div>
                            <ul className='flex items-center gap-5 ml-10'>
                                <HiOutlineChevronLeft
                                    onClick={handlePrev}
                                    className='cursor-pointer'
                                />

                                {fetchedSecurityCompanies?.map(
                                    (item: any, index: number) => {
                                        return (
                                            <li key={index}>
                                                {item.active ? (
                                                    <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                                        {index + 1}
                                                    </span>
                                                ) : (
                                                    <span
                                                        className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
                                                        onClick={(e) =>
                                                            jumpToPage(e, index)
                                                        }
                                                    >
                                                        {index + 1}
                                                    </span>
                                                )}
                                            </li>
                                        )
                                    }
                                )}

                                <HiOutlineChevronRight
                                    onClick={handleNext}
                                    className='cursor-pointer'
                                />
                            </ul>
                        </footer>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default RenderedSecurityCompanies
