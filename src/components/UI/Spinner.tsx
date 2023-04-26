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
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                    <div className=' flex justify-center items-center'>
                        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
                    </div>
                </div>
            </section>
        </dialog>
    )
}

export default Spinner
