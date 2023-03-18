import { useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { Approval } from './paths/EventRequest'

const ApprovalDetail = () => {
    type DialogType = 'decline' | 'approve'

    const location = useLocation()

    const approval = location.state || {}

    const {
        id,
        requester: {
            date,
            title,
            residentName,
            propertyCode,
            status,
            phoneNumber,
            tenancyType,
            residentCode,
            propertyCategory,
            propertyType,
            time,
        },
        event: {
            eventCode,
            eventName,
            eventAddress,
            eventType,
            expectedNoOfGuests,
            startTime,
            endTime,
        },
    } = approval as Approval

    const [dialogType, setDialogType] = useState<DialogType>('decline')

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (type: DialogType) => {
        if (type === 'approve') {
            setDialogType('approve')
        } else {
            setDialogType('decline')
        }
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleDeleteMessage = () => {
        handleClose()

        // toast('Message deleted successfully', {
        //     type: 'success',
        //     className: 'bg-green-100 text-green-600 text-[1.4rem]',
        // })
    }

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        {dialogType === 'approve' ? (
                            <>
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to Approve?
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeleteMessage}
                                    >
                                        Approve
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to Approve?
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeleteMessage}
                                    >
                                        Approve
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </dialog>
            <main className='grid bg-white rounded-lg p-8'>
                <section className=' py-10'>
                    <div className='flex justify-end'>
                        <div className='flex gap-8 justify-between items-center'>
                            <button
                                className='bg-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() => handleOpen()}
                            >
                                <span className='text-white text-[1.4rem] font-semibold'>
                                    Deline
                                </span>
                            </button>
                            <button
                                className='bg-color-blue px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() => handleOpen()}
                            >
                                <span className='text-white text-[1.4rem] font-semibold'>
                                    Approve
                                </span>
                            </button>
                        </div>
                    </div>
                    <div
                        className=' gap-16 mt-12 grid p-8 bg-white rounded-lg '
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <></>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ApprovalDetail
