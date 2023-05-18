import { useRef } from 'react'
import { useNavigate } from 'react-router'

interface Props {
    title: string
}

function AddedSuccess({ title }: Props) {
    const navigate = useNavigate()
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }
    const handleClose = () => {
        navigate(-1)
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                    <img src='/icons/admins/modalSuccess.svg' alt='' />
                    <p>You have successfully added an Admin</p>

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
