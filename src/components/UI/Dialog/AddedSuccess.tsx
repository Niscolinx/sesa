import { Dispatch, SetStateAction, useState } from 'react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import AddBankAccount from './AddBank'

interface Props {
    title: string
    open: boolean
    type?: string
    isBank?: boolean
    isNavigate?: boolean
    close: Dispatch<SetStateAction<boolean>>
}

function AddedSuccess({
    title,
    open = false,
    close,
    type = 'added',
    isBank,
    isNavigate = true,
}: Props) {
    type Path = 'added' | 'toBank'

    const navigate = useNavigate()
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const [path, setPath] = useState<Path>('added')

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
        if (type === 'added' && isNavigate) {
            navigate(-1)
        }
        close(false)
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const toRender = {
        added: (
            <>
                <img src='/icons/admins/modalSuccess.svg' alt='' />
                <p className='capitalize'>
                    {title} successfully {type}
                </p>

                {isBank ? (
                    <>
                        <p
                            className='font-Satoshi-Medium text-[1.8rem] max-w-[40rem] text-center'
                            style={{
                                fontFamily: 'Satoshi-Medium',
                            }}
                        >
                            Do you want to open a bank account for the{' '}
                            <span className='capitalize'>{title}</span> ?
                        </p>

                        <div className='flex w-full justify-center gap-8 mt-10'>
                            <button
                                className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[20rem] font-Satoshi-Medium'
                                onClick={() => handleClose()}
                            >
                                Skip, Later
                            </button>
                            <button className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[20rem]' onClick={() => setPath('toBank')}>
                                Open an Account
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='flex w-full justify-center gap-8'>
                        <button
                            className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                            onClick={handleClose}
                        >
                            Ok
                        </button>
                    </div>
                )}
            </>
        ),

        toBank: <AddBankAccount open={true} />,
    }

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] min-h-[30rem] gap-8 py-10'>
                    {toRender[path]}
                </div>
            </section>
        </dialog>
    )
}

export default AddedSuccess
