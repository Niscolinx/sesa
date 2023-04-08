import React, { useRef } from 'react'
import { useTableContext } from './Table'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

function TableDialog() {
    const { axiosInstance, deactivate_url, fetchedId, setIsDialogOpen, title } =
        useTableContext()

    const postDeactivate = () => {
        return axiosInstance({
            url: deactivate_url,
            method: 'post',
            data: { user_id: fetchedId },
        })
    }

    const { mutate: deactivate_mutation, isLoading: deactivate_loading } =
        useMutation(postDeactivate, {
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

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                    <img
                        src='/icons/admins/modalWarning.svg'
                        alt=''
                        className='animate__animated animate__pulse '
                        style={{
                            animationIterationCount: 'infinite',
                        }}
                    />
                    <p>
                        Are you sure you want to deactivate this {title.split(/[A-Z]/).join(' ')}?
                    </p>

                    <div className='flex w-full justify-center gap-8'>
                        <button
                            className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                            onClick={closeDialog}
                        >
                            Cancel
                        </button>
                        <button
                            className='bg-red-500 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                            onClick={() => deactivate_mutation()}
                        >
                            {deactivate_loading ? 'Loading...' : 'deactivate'}
                        </button>
                    </div>
                </div>
            </section>
        </dialog>
    )
}

export default TableDialog
