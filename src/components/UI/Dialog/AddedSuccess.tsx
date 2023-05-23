import { Dispatch, SetStateAction } from 'react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

interface Props {
    title: string
    open: boolean
    type?: string
    close: Dispatch<SetStateAction<boolean>>
}

function AddedSuccess({ title, open = false, close, type = 'added' }: Props) {
    const navigate = useNavigate()
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
        if(type === 'added'){
            navigate(-1)
        }
        close(false)
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                    <img src='/icons/admins/modalSuccess.svg' alt='' />
                    <p className='capitalize'>{title} successfully {type}</p>

                    <div className='flex w-full justify-center gap-8'>
                        <button
                            className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                            onClick={handleClose}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </section>
        </dialog>
    )
}

export default AddedSuccess
