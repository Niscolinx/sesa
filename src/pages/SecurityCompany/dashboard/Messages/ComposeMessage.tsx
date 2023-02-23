import React, { useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import RecipientList from './RecipientList'


const ComposeMessage = () => {
    const [selectedChannelType, setSelectedChannelType] = useState<
        string | null
    >(null)
    const [transmissionChannel, setTransmissionChannel] = useState<
        string | null
    >(null)
    const [isWarning, setIsWarning] = useState(true)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleOpen('success')
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const recipient_List_DialogRef = useRef<HTMLDialogElement | null>(null)

    const closeRecipientListDialog = () => {
        if (recipient_List_DialogRef.current) {
            recipient_List_DialogRef.current.close()
        }
    }

    const openRecipientListDialog = () => {
        if (recipient_List_DialogRef.current) {
            recipient_List_DialogRef.current.showModal()
        }
    }

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState: 'warning' | 'success') => {
        if (modalState === 'warning') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmDeactivation = () => {
        handleClose()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                        {isWarning ? (
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                        ) : (
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                        )}
                        <p
                            style={{
                                fontFamily: 'Satoshi-Medium',
                            }}
                            className='text-[2rem]'
                        >
                            Confirm Send Message
                        </p>
                        <p>Are you sure you want to send this message?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>

                            <button
                                className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <dialog className='dialog' ref={recipient_List_DialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <RecipientList
                        closeRecipientListDialog={closeRecipientListDialog}
                    />
                </section>
            </dialog>
            <div className='grid p-8 bg-white items-baseline rounded-lg'>
                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <Select
                        state={[
                            'Channel 1',
                            'Channel 2',
                            'Channel 3',
                            'Channel 4',
                            'Channel 5',
                        ]}
                        label='Channel Type'
                        selectedState={selectedChannelType}
                        setSelectedState={setSelectedChannelType}
                    />

                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='email'
                            className='text-[1.4rem] font-medium'
                        >
                            Message Subject
                        </label>
                        <input
                            type='text'
                            required
                            id='email'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <div className='grid gap-4'>
                        <p className='text-[1.4rem] font-medium'>
                            Schedule Message
                        </p>
                        <div className='flex items-center gap-8'>
                            <input
                                type='date'
                                required
                                id='address'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                min={new Date().toISOString().split('T')[0]}
                            />

                            <input
                                type='time'
                                required
                                id='address'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                    </div>
                    <div>
                        <Select
                            state={[
                                'Channel 1',
                                'Channel 2',
                                'Channel 3',
                                'Channel 4',
                                'Channel 5',
                            ]}
                            label='Transmission Channel'
                            selectedState={transmissionChannel}
                            setSelectedState={setTransmissionChannel}
                        />
                        <p
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                            className='text-[1.4rem]'
                        >
                            NB: SMS charges apply
                        </p>
                    </div>
                    <div className='grid gap-4 relative'>
                        <p className='text-[1.4rem] font-medium'>Receipts</p>
                        <button
                            className='btn border border-color-blue-1 text-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            style={{ justifySelf: 'start' }}
                            onClick={() => openRecipientListDialog()}
                        >
                            Add Recipients
                        </button>
                    </div>
                    <div className='col-span-full'>
                        <label className=' font-medium'>Message</label>
                        <textarea
                            rows={5}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 '
                        />
                        <p
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                            className='text-[1.4rem]'
                        >
                            NB: SMS charges apply
                        </p>
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                        style={{ justifySelf: 'start' }}
                        onClick={() => handleOpen('success')}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Send Message
                    </button>
                </form>
            </div>
        </>
    )
}

export default ComposeMessage
