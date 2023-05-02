import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useTableContext } from './Table'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { IoMdClose } from 'react-icons/io'

function TableDialog() {
    const {
        axiosInstance,
        deactivateProp,
        fetchedId,
        title,
        isDialogOpen,
        setIsDialogOpen,
        isCategory,
        delete_item_url,
    } = useTableContext()

    const [artisanCategory, setArtisanCategory] = useState('')

    const postRequest = () => {
        const { url, tag = 'id' } = deactivateProp ?? {}

        if (isCategory && isDialogOpen?.type === 'create') {
            return axiosInstance({
                url: '/admin/category',
                method: 'post',
                data: { name: artisanCategory },
            })
        }

        if (isDialogOpen?.type === 'delete') {
            console.log({ fetchedId })
            return axiosInstance({
                url: `${delete_item_url}${fetchedId}`,
                method: 'delete',
                data: { id: fetchedId },
            })
        }
        return axiosInstance({
            url,
            method: 'get',
            data: { [tag]: fetchedId },
        })
    }

    const queryClient = useQueryClient()
    const messageTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2')
    const type = isDialogOpen?.type

    const { mutate, isLoading } = useMutation(postRequest, {
        onMutate: async () => {
            await queryClient.cancelQueries(title)

            const previousData: any = await queryClient.getQueryData(title)

            if (previousData.data) {
                let index_to_replace = 0
                let updatedData = previousData.data.data
                    .filter((data: any, idx: number) => {
                        if (data.id === fetchedId) {
                            index_to_replace = idx
                            return data
                        }
                    })
                    .map((gotten_data: any) => {
                        let status = 1

                        if (gotten_data.status) {
                            status = 0
                        }

                        console.log({ status })
                        return {
                            ...gotten_data,
                            status,
                        }
                    })

                const cloneOld: any[] = previousData.data.data

                cloneOld.splice(index_to_replace, 1, ...updatedData)


                queryClient.setQueryData(title, (oldData: any) => {
                    console.log({ oldData })
                    const relevantData = oldData.data.data
                    return {
                        ...relevantData,
                        data: [...cloneOld],
                    }
                })
            }

            closeDialog()
        },

        onSuccess: () => {
            toast(`${messageTitle} ${type + 'd'} Successfully`, {
                type: 'success',
                className:
                    'bg-green-100 text-green-600 text-[1.4rem] capitalize',
            })
        },

        onError: (_error, _option, context) => {
            console.log({ context })

            toast(`Failed to ${type} ${messageTitle} `, {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries(title)
        },
    })

    useEffect(() => {
        if (isDialogOpen?.isOpen) {
            return openDialog()
        }
    }, [isDialogOpen?.isOpen])

    const onSubmitCategory = (e: FormEvent) => {
        e.preventDefault()

        mutate()
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        setIsDialogOpen({
            isOpen: false,
        })
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 relative'>
                    {isCategory && isDialogOpen?.type === 'create' ? (
                        <>
                            <IoMdClose
                                className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                                onClick={() => closeDialog()}
                            />
                            <form
                                className='grid gap-12'
                                onSubmit={onSubmitCategory}
                            >
                                <h3
                                    className='text-[2rem] font-Satoshi-Medium border-b '
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    Create Artisan Category
                                </h3>

                                <div className='w-full grid gap-4'>
                                    <label
                                        htmlFor='artisanCategory'
                                        className='text-[1.4rem] font-semibold'
                                    >
                                        Name
                                    </label>

                                    <input
                                        type='text'
                                        value={artisanCategory}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => setArtisanCategory(e.target.value)}
                                        required
                                        id='artisanCategory'
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                    />
                                </div>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    {isLoading ? 'Loading...' : 'Create'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            {isDialogOpen?.type === 'delete' ? (
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />
                            ) : isDialogOpen?.type === 'deactivate' ? (
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />
                            ) : (
                                <img
                                    src='/icons/admins/modalSuccess.svg'
                                    alt=''
                                    className='animate__animated animate__pulse '
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />
                            )}

                            <p>
                                Are you sure you want to {isDialogOpen?.type}{' '}
                                this{' '}
                                <span className='capitalize'>
                                    {title.split(/(?=[A-Z])/).join(' ')}?
                                </span>
                            </p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`${
                                        isDialogOpen?.type === 'activate'
                                            ? 'bg-green-700'
                                            : 'bg-red-500'
                                    } py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize`}
                                    onClick={() => mutate()}
                                >
                                    {isLoading
                                        ? 'Loading...'
                                        : `${isDialogOpen?.type}`}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </dialog>
    )
}

export default TableDialog
