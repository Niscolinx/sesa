import React, { useEffect, useRef } from 'react'

interface Props {
    start: boolean
}

function Spinner({ start = false }: Props) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    useEffect(() => {
        if (start) {
            handleOpen()
        } else {
            handleClose()
        }

        return () => {
            handleClose()
        }
    }, [start])

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className=' justify-center items-center bg-white rounded-2xl shadow-md grid place-content-center justify-items-center w-[44rem] h-[20rem] gap-8'>
                    <div className='animate-spin rounded-full h-24 w-24 border-r-2 border-t-1  border-r-color-primary transition-all duration-500 border-t-gray-300'></div>
                </div>
            </section>
        </dialog>
    )
}

export default Spinner
