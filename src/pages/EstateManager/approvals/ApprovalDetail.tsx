import { useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { Approval } from './paths/EventRequest'
import { SlClose } from 'react-icons/sl'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { MdOutlinePending } from 'react-icons/md'

const ApprovalDetail = () => {
    type DialogType = 'decline' | 'approve'

    const location = useLocation()

    const approval: Approval = location.state || {}

    const [dialogType, setDialogType] = useState<DialogType>('decline')
    const [declineMessageContent, setDeclineMessageContent] = useState('')

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

    const handleDeclineMessage = () => {
        handleClose()
    }

    console.log({approval})
    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid  justify-items-center w-[64rem] gap-8 py-10'>
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
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Decline Confirmation
                                </p>

                                <div className='grid'>
                                    <label className=' font-Satoshi-Medium'>
                                        Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        className=' rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4  w-[40rem]'
                                        value={declineMessageContent}
                                        onChange={(e) =>
                                            setDeclineMessageContent(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                        className='text-[1.4rem]'
                                    >
                                        Minimum of 80 characters
                                    </p>

                                    <div className='flex justify-between gap-8 mt-10'>
                                        <button
                                            className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-full'
                                            onClick={() => handleClose()}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-full'
                                            onClick={() =>
                                                handleDeclineMessage()
                                            }
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </dialog>
            <main className='grid bg-white rounded-lg p-8 gap-8'>
                {approval.status === 'declined' && (
                    <section className='py-10 flex justify-end'>
                        <div className='flex gap-8 justify-between items-center'>
                            <button
                                className='bg-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() => handleOpen('decline')}
                            >
                                <span className='text-white text-[1.4rem] font-semibold'>
                                    Deline
                                </span>
                            </button>
                            <button
                                className='bg-color-blue px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() => handleOpen('approve')}
                            >
                                <span className='text-white text-[1.4rem] font-semibold'>
                                    Approve
                                </span>
                            </button>
                        </div>
                    </section>
                )}

                {approval.title.toLowerCase().includes('digital') ? (
                    <>
                        <section>
                            <div
                                className=' gap-16 mt-12 grid p-8 bg-white rounded-lg max-w-[80rem]'
                                style={{
                                    gridTemplateColumns:
                                        ' repeat(auto-fit, minmax(30rem, 1fr))',
                                }}
                            >
                                <p className='text-[2rem] font-Satosh-Medium flex items-center gap-8'>
                                    Event Request Details{' '}
                                    {approval.status === 'declined' ? (
                                        <span className='text-red-600 flex items-center gap-2'>
                                            {' '}
                                            <SlClose /> {approval.status}
                                        </span>
                                    ) : approval.status === 'approved' ? (
                                        <span className='text-green-600 flex items-center gap-2'>
                                            <AiOutlineCheckCircle />
                                            {approval.status}
                                        </span>
                                    ) : (
                                        <span className='text-orange-400 flex items-center gap-2'>
                                            <MdOutlinePending />
                                            {approval.status}
                                        </span>
                                    )}
                                </p>

                                <div className='grid gap-2 justify-items-start capitalize'>
                                    <p className='text-gray-500'>request ID</p>
                                    <p>{approval.request?.request_ID}</p>
                                    {/* <p>
                                        {key.includes('amount') ? (
                                            <p className='flex items-center gap-1'>
                                                {' '}
                                                <img
                                                    src='/icons/Naira.svg'
                                                    alt=''
                                                />
                                                <span>{value}</span>
                                            </p>
                                        ) : (
                                            value
                                        )}
                                    </p> */}
                                </div>
                                <div className='grid gap-2 justify-items-start capitalize'>
                                    <p className='text-gray-500'>request ID</p>
                                    <p>{approval.request?.request_ID}</p>
                                    </div>
                            </div>
                            <div></div>
                        </section>
                    </>
                ) : (
                    <>
                        {' '}
                        <section>
                            <p className='text-[2rem] font-Satosh-Medium'>
                                Requester's Details
                            </p>
                            <div
                                className=' gap-16 mt-12 grid p-8 bg-white rounded-lg '
                                style={{
                                    gridTemplateColumns:
                                        ' repeat(auto-fit, minmax(15rem, 1fr))',
                                }}
                            >
                                {Object.entries(approval.requester).map(
                                    ([key, value], i) => (
                                        <div
                                            key={i}
                                            className='grid gap-2 justify-items-start capitalize'
                                        >
                                            <p className='text-gray-500'>
                                                {key.replace('_', ' ')}
                                            </p>
                                            <p>{value}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                        <section className='py-10 border-t'>
                            <p className='text-[2rem] font-Satosh-Medium flex items-center gap-8'>
                                Event Request Details{' '}
                                {approval.status === 'declined' ? (
                                    <span className='text-red-600 flex items-center gap-2'>
                                        {' '}
                                        <SlClose /> {approval.status}
                                    </span>
                                ) : approval.status === 'approved' ? (
                                    <span className='text-green-600 flex items-center gap-2'>
                                        <AiOutlineCheckCircle />
                                        {approval.status}
                                    </span>
                                ) : (
                                    <span className='text-orange-400 flex items-center gap-2'>
                                        <MdOutlinePending />
                                        {approval.status}
                                    </span>
                                )}
                            </p>
                            <div className='flex gap-16 mt-12 p-8 bg-white rounded-lg '>
                                <div>
                                    <img
                                        src={approval.event.imgUrl}
                                        alt=''
                                        className='w-[30rem] h-full object-cover'
                                    />
                                </div>
                                <div
                                    className='grid gap-16 w-full'
                                    style={{
                                        gridTemplateColumns:
                                            ' repeat(auto-fit, minmax(15rem, 1fr))',
                                    }}
                                >
                                    {Object.entries(approval.event)
                                        .filter(([key]) => key !== 'imgUrl')
                                        .map(([key, value], i) => (
                                            <div
                                                key={i}
                                                className='grid items-start justify-items-start capitalize self-start gap-2'
                                            >
                                                <p className='text-gray-500'>
                                                    {key.replaceAll('_', ' ')}
                                                </p>
                                                <p>{value}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {approval.status === 'declined' && declineMessageContent && (
                    <div className='mt-10'>
                        <p className='font-Satoshi-Medium'>
                            Reason for decline
                        </p>
                        {declineMessageContent}
                    </div>
                )}
            </main>
        </>
    )
}

export default ApprovalDetail
