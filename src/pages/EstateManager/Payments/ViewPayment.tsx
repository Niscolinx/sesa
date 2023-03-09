import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Message } from '../Messages/RenderMessages'

const ViewPayment = () => {
    let location = useLocation()
    location.state

    console.log({ location })

    const {
        id,
        date,
        subject,
        description,
        status,
        transmissionChannel,
        transmissionDate,
        recipients,
    } = location.state as Message

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

    const handleDeleteMessage = () => {
        handleClose()

        toast('Message deleted successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <>
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                            <p className='text-[1.6rem]'>
                                Are you sure you want to delete this Payment Plan
                            </p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={handleDeleteMessage}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    </div>
                </section>
            </dialog>
            <main>
                <h2 className='heading'>Messages</h2>
                <section className=' py-10 mt-20'>
                    <div className='flex justify-end'>
                        <div className='flex gap-8'>
                            <button
                                className=' bg-red-600 px-16 py-4 flex items-center  rounded-lg gap-4 text-white'
                                onClick={() => handleOpen()}
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className=' text-[1.4rem] font-semibold'>
                                    Delete Message
                                </span>
                            </button>
                        </div>
                    </div>
                    <div
                        className=' gap-16 mt-12 grid p-8 bg-white rounded-lg '
                  
                    >
                        
                    </div>
                </section>
            </main>
        </>
    )
}

export default ViewPayment
