import { useRef, FC } from 'react'
import { ModalContext } from '../Context/ModalContext'

interface Modal {
    children: React.ReactNode
}

const Modal:FC<Modal> = ({children}) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
   

    const handleClose = () => {
        if(dialogRef.current){
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if(dialogRef.current){
            dialogRef.current.showModal()
        }

    }

    const handleRouteChange = () => {
        handleClose()
    }

    return (
        <ModalContext.Provider
            value={{
                handleOpen,
                handleClose,
            }}
        >
            <div>
                <dialog className='dialog' ref={dialogRef}>
                    <section className='grid place-content-center w-full h-[100vh]'>
                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                            <p>You have successfully added an Estate</p>

                            <div className='flex w-full justify-center gap-8'>
                                <button className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'>
                                    View details
                                </button>
                                <button className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]' onClick={handleRouteChange}>
                                    Ok
                                </button>
                            </div>
                        </div>
                    </section>
                </dialog>

                    {children}
            </div>
        </ModalContext.Provider>
    )
}

export default Modal
