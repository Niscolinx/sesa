import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { useState, useEffect, ChangeEvent, useRef, useCallback, FC } from 'react'
import { useMutation, useQuery } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import useAxios from '../../../components/hooks/useAxios'
import { useTableContext } from './TableHook'

interface EstateManager {
    id: string
    user: {
        name: string
        gender: string
        phone: string
        status: string
        created_at: string
        imgUrl?: string
    }
}

type Actions = 'view details' | 'deactivate' | 'activate' | 'delete'

interface Table {
    deactivate_url: string
    fetch_url: string
    title: string
}

const Table:FC<Table> = ({deactivate_url, title, fetch_url}) => {
    const {
        navigate,
        axiosInstance,
        sortBy,
        setSortBy,
        fetchedId,
        setFetchedId,
        fetchedData,
        setFetchedData,
        isDialogOpen,
        setIsDialogOpen
    } = useTableContext()

   

    const fetchData = () => {
        return axiosInstance({
            url: fetch_url
        })
    }
    const postDeactivate = () => {
        return axiosInstance({
            url: deactivate_url,
            method: 'post',
            data: { user_id: fetchedId },
        })
    }

    const {
        mutate: deactivate_mutation,
        isLoading: deactivate_loading,
    } = useMutation(postDeactivate, {
        onSuccess: (data) => {
            if ((data as any).success) {
                setIsDialogOpen(false)

                toast(`${title} deactivated successfully`, {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            } 
        },
    })

    const {
        isLoading: get_data_loading,
        isError: get_data_isError,
        error: get_data_error,
        data: get_data_response,
    } = useQuery('estateManagers', fetchData, {}) as any

    useEffect(() => {
        if (get_data_response) {
            setFetchedEstateManagers(get_data_response.data.data)
        }
    }, [get_data_response])

    // useEffect(() => {
    //     const slicedPages: EstateManager[][] = []
    //     for (
    //         let i = 0;
    //         i < fetchedEstateManagers?.length;
    //         i += paginate.itemsPerPage
    //     ) {
    //         slicedPages.push(
    //             fetchedEstateManagers?.slice(i, i + paginate.itemsPerPage)
    //         )
    //     }

    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             slicedPages,
    //         }
    //     })
    // }, [fetchedEstateManagers])

    // const actions = ['view details', 'deactivate'] satisfies Actions[]

    // const [toggleDropDown, setToggleDropDown] = useState<{
    //     isDropDownOpen: boolean
    //     index: number | null
    // }>({
    //     isDropDownOpen: false,
    //     index: null,
    // })

    // const dropDownHandler = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     index: number
    // ) => {
    //     setToggleDropDown(() => {
    //         return {
    //             isDropDownOpen: e.target.checked,
    //             index,
    //         }
    //     })
    // }

    // interface Paginate {
    //     index: number
    //     currentPage: number
    //     itemsPerPage: number
    //     totalPage: number
    //     slicedPages: EstateManager[][] | null
    // }

    // const itemsPerPageArr = [2, 4, 6, 8]

    // const perPage = 6
    // const [paginate, setPaginate] = useState<Paginate>({
    //     index: 0,
    //     currentPage: 1,
    //     itemsPerPage: perPage,
    //     totalPage: Math.ceil(fetchedEstateManagers?.length / perPage),
    //     slicedPages: null,
    // })

    // const handleItemsPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    //     const item = parseInt(e.target.value)

    //     const slicedPages: EstateManager[][] = []
    //     for (let i = 0; i < fetchedEstateManagers?.length; i += item) {
    //         slicedPages.push(fetchedEstateManagers?.slice(i, i + item))
    //     }

    //     setPaginate((prev) => {
    //         return {
    //             ...prev,
    //             itemsPerPage: item,
    //             index: 0,
    //             currentPage: 1,
    //             slicedPages,
    //             totalPage: Math.ceil(fetchedEstateManagers?.length / item),
    //         }
    //     })
    // }

    // const handleNext = () => {
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

    

    // const handleSelectedAction = (item: Actions, id: string) => {
    //     setToggleDropDown(() => {
    //         return {
    //             isDropDownOpen: false,
    //             index: null,
    //         }
    //     })

    //     if (item === 'view details') {
    //         navigate(`/superAdmin/estateManagers/view/:${id}`)
    //     }

    //     if (item === 'deactivate') {
    //         setEstateManagerId(id)
    //         setIsDialogOpen(true)
    //     }
    // }

    // if (get_estateManagers_loading) {
    //     return <p>Loading...</p>
    // }

    // if (get_estateManagers_isError) {
    //     return <p>{get_estateManagers_error.message}</p>
    // }

    // const handlePathSwitch = () => {
    //     navigate('/superAdmin/estateManagers/add')
    // }

    // const fetched = get_estateManagers_response?.data.data

    return (
        <></>
        // <div>
        //     <div className='rounded-lg mt-[3rem] h-[80vh]'>
        //         {fetched.length > 0 ? (
        //             <>
        //                 <ToastContainer />
                        
        //                 <div className='rounded-lg mt-[3rem] '>
        //                     <div className='grid text-[1.6rem]'>
        //                         <div className='flex w-full items-center gap-12 p-10 bg-white rounded-lg'>
        //                             <p className=' font-Satoshi-Medium'>
        //                                 EstateManager List{' '}
        //                                 <span>
        //                                     ({fetchData.length})
        //                                 </span>
        //                             </p>
        //                             <div className='relative flex items-center'>
        //                                 <img
        //                                     src='/icons/admins/search.svg'
        //                                     alt=''
        //                                     className='absolute left-4 text-[4rem]'
        //                                 />
        //                                 <input
        //                                     type='text'
        //                                     placeholder='Search Parameters'
        //                                     className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
        //                                 />
        //                             </div>
        //                             <div className='w-[10rem] grid self-baseline '>
        //                                 <Select
        //                                     state={['A-Z', 'Date']}
        //                                     selectedState={sortBy}
        //                                     placeholder={'A-Z'}
        //                                     setSelectedState={setSortBy}
        //                                 />
        //                             </div>
        //                             <button
        //                                 className='btn btn-blue ml-auto'
        //                                 onClick={handlePathSwitch}
        //                             >
        //                                 <span>
        //                                     <IoMdAdd />
        //                                 </span>{' '}
        //                                 <p>Add EstateManager</p>
        //                             </button>
        //                         </div>

        //                         <div className='grid bg-white'>
        //                             <div
        //                                 className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-6 items-center gap-8'
        //                                 style={{
        //                                     fontSize: '1.4rem',
        //                                 }}
        //                             >
        //                                 <p className='flex items-center gap-2'>
        //                                     <input
        //                                         type='checkbox'
        //                                         className='cursor-pointer'
        //                                     />
        //                                     <p> Name</p>
        //                                 </p>
        //                                 <p>Gender</p>
        //                                 <p>Phone Number</p>
        //                                 <p>joined Date</p>
        //                                 <p>Status</p>
        //                                 <p>Actions</p>
        //                             </div>

        //                             <div className='grid gap-8 mt-8 p-8'>
        //                                 {slicedPages &&
        //                                     slicedPages?.length > 0 &&
        //                                     React.Children.toArray(
        //                                         slicedPages[paginate.index].map(
        //                                             (
        //                                                 {
        //                                                     id,
        //                                                     user: {
        //                                                         phone,

        //                                                         gender,
        //                                                         name,
        //                                                         created_at,
        //                                                         status,
        //                                                         imgUrl,
        //                                                     },
        //                                                 },
        //                                                 i
        //                                             ) => {
        //                                                 const {
        //                                                     isDropDownOpen,
        //                                                     index,
        //                                                 } = toggleDropDown
        //                                                 return (
        //                                                     <div className='grid justify-between border-b grid-cols-6 items-center gap-8 text-[1.6rem] py-4 table__ellipsis'>
        //                                                         <div className='flex items-center gap-4  '>
        //                                                             <input
        //                                                                 type='checkbox'
        //                                                                 className='cursor-pointer'
        //                                                             />

        //                                                             <div className='flex items-center gap-2'>
        //                                                                 {imgUrl && (
        //                                                                     <img
        //                                                                         src={
        //                                                                             imgUrl
        //                                                                         }
        //                                                                         alt=''
        //                                                                         className='w-[3.5rem] h-[h-3.5rem] rounded-full object-cover'
        //                                                                     />
        //                                                                 )}

        //                                                                 <p className='min-w-[30rem] overflow-hidden text-ellipsis whitespace-nowrap'>
        //                                                                     {
        //                                                                         name
        //                                                                     }
        //                                                                 </p>
        //                                                             </div>
        //                                                         </div>
        //                                                         <p>{gender}</p>
        //                                                         <p>{phone}</p>
        //                                                         <p>
        //                                                             {new Date(
        //                                                                 created_at
        //                                                             )
        //                                                                 .toLocaleDateString()
        //                                                                 .replace(
        //                                                                     /\//g,
        //                                                                     '-'
        //                                                                 )}
        //                                                         </p>

        //                                                         <p>
        //                                                             {status ===
        //                                                             'Active' ? (
        //                                                                 <span className='text-green-600'>
        //                                                                     {
        //                                                                         status
        //                                                                     }
        //                                                                 </span>
        //                                                             ) : (
        //                                                                 <span className='text-red-500'>
        //                                                                     {
        //                                                                         status
        //                                                                     }
        //                                                                 </span>
        //                                                             )}
        //                                                         </p>
        //                                                         <div className='relative'>
        //                                                             <label
        //                                                                 className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
        //                                                                 htmlFor={i.toString()}
        //                                                                 onClick={() =>
        //                                                                     setToggleDropDown(
        //                                                                         (
        //                                                                             prev
        //                                                                         ) => {
        //                                                                             return {
        //                                                                                 isDropDownOpen:
        //                                                                                     !prev.isDropDownOpen,
        //                                                                                 index: i,
        //                                                                             }
        //                                                                         }
        //                                                                     )
        //                                                                 }
        //                                                             >
        //                                                                 <span className='text-color-primary'>
        //                                                                     <img
        //                                                                         src='/icons/admins/threeDots.svg'
        //                                                                         alt=''
        //                                                                     />
        //                                                                 </span>
        //                                                             </label>
        //                                                             <input
        //                                                                 type='radio'
        //                                                                 name='dropdown'
        //                                                                 className='hidden'
        //                                                                 id={i.toString()}
        //                                                                 onChange={(
        //                                                                     e
        //                                                                 ) =>
        //                                                                     dropDownHandler(
        //                                                                         e,
        //                                                                         i
        //                                                                     )
        //                                                                 }
        //                                                             />

        //                                                             {isDropDownOpen &&
        //                                                                 index ===
        //                                                                     i && (
        //                                                                     <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
        //                                                                         {actions.map(
        //                                                                             (
        //                                                                                 item,
        //                                                                                 index
        //                                                                             ) => (
        //                                                                                 <p
        //                                                                                     className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
        //                                                                                     key={
        //                                                                                         index +
        //                                                                                         i
        //                                                                                     }
        //                                                                                     onClick={() =>
        //                                                                                         handleSelectedAction(
        //                                                                                             item,
        //                                                                                             id
        //                                                                                         )
        //                                                                                     }
        //                                                                                 >
        //                                                                                     {item ===
        //                                                                                     'deactivate' ? (
        //                                                                                         <span className='text-red-600'>
        //                                                                                             {
        //                                                                                                 item
        //                                                                                             }
        //                                                                                         </span>
        //                                                                                     ) : (
        //                                                                                         <span>
        //                                                                                             {
        //                                                                                                 item
        //                                                                                             }
        //                                                                                         </span>
        //                                                                                     )}
        //                                                                                 </p>
        //                                                                             )
        //                                                                         )}
        //                                                                     </div>
        //                                                                 )}
        //                                                         </div>
        //                                                     </div>
        //                                                 )
        //                                             }
        //                                         )
        //                                     )}
        //                             </div>
        //                         </div>
        //                         <footer className='flex items-center p-4 mt-4 bg-color-white rounded-lg'>
        //                             <div className='flex gap-8 items-center'>
        //                                 <p>View</p>
        //                                 <select
        //                                     name=''
        //                                     id=''
        //                                     className='flex items-center border px-4 rounded-lg outline-none cursor-pointer'
        //                                     onChange={handleItemsPerPage}
        //                                 >
        //                                     {itemsPerPageArr.map(
        //                                         (item, index) => (
        //                                             <option
        //                                                 value={item}
        //                                                 key={index}
        //                                                 selected={
        //                                                     item ===
        //                                                     itemsPerPage
        //                                                 }
        //                                                 className='capitalize cursor-pointer bg-white'
        //                                             >
        //                                                 {item}
        //                                             </option>
        //                                         )
        //                                     )}
        //                                 </select>
        //                                 <p className='text'>List per page</p>
        //                             </div>
        //                             <ul className='flex items-center gap-5 ml-10'>
        //                                 <HiOutlineChevronLeft
        //                                     onClick={handlePrev}
        //                                     className='cursor-pointer'
        //                                 />

        //                                 {slicedPages?.map((item, index) => {
        //                                     return (
        //                                         <li key={index}>
        //                                             {index + 1 ===
        //                                             currentPage ? (
        //                                                 <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
        //                                                     {index + 1}
        //                                                 </span>
        //                                             ) : (
        //                                                 <span
        //                                                     className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
        //                                                     onClick={(e) =>
        //                                                         jumpToPage(
        //                                                             e,
        //                                                             index
        //                                                         )
        //                                                     }
        //                                                 >
        //                                                     {index + 1}
        //                                                 </span>
        //                                             )}
        //                                         </li>
        //                                     )
        //                                 })}

        //                                 <HiOutlineChevronRight
        //                                     onClick={handleNext}
        //                                     className='cursor-pointer'
        //                                 />
        //                             </ul>
        //                         </footer>
        //                     </div>
        //                 </div>
        //             </>
        //         ) : (
        //             <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
        //                 <img src='/icons/admins/errorSvg.svg' alt='' />
        //                 <p className='text'>
        //                     Ooops you have not added any EstateManager yet
        //                 </p>
        //                 <button
        //                     className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
        //                     onClick={handlePathSwitch}
        //                 >
        //                     <span>
        //                         <IoMdAdd />
        //                     </span>{' '}
        //                     Add EstateManager
        //                 </button>
        //             </section>
        //         )}
        //     </div>
        // </div>
    )
}

export default Table
