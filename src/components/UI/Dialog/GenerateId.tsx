import React, { useEffect, useRef } from 'react'

interface Props {
    title: string
    open: boolean
    type?: string
    close: React.Dispatch<React.SetStateAction<boolean>>
}

function GenerateId({ title, open = false, close }: Props) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if (open) {
            handleOpen()
        }
    }, [open])

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }
    const handleClose = () => {
        close(false)
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] min-h-[30rem] gap-8 p-10'>
                    <img src='/img/new_Id.svg' alt='' />
                    <button
                        className='btn text-white bg-color-blue-1 py-4 px-16 rounded-lg w-[15rem]'
                        onClick={handleClose}
                    >
                        Print
                    </button>
                </div>
            </section>
        </dialog>
    )
}

export default GenerateId
