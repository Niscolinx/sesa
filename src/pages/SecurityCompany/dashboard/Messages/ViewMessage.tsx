import React, { useRef, useState } from 'react'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { toast, ToastContainer } from 'react-toastify'


type Actions = 'Deactivate' | 'Delete'

export type ValidateInputTypes =
    | 'Phone Number'
    | 'BVN Number'
    | 'NIN Number'
    | 'Drivers License'
    | 'International Passport'
    | 'Voters Card'

const ViewMessage = () => {
    const [selectedEstate1, setSelectedEstate1] = useState<string | null>(null)
    const [selectedEstate2, setSelectedEstate2] = useState<string | null>(null)
    const [selectedEstate3, setSelectedEstate3] = useState<string | null>(null)
    const [selectedEstate4, setSelectedEstate4] = useState<string | null>(null)
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const [isAccountCreated, setIsAccountCreated] = useState(true)
    const [isValidated, setIsValidated] = useState(false)

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const assignGuardRef = useRef<HTMLDialogElement | null>(null)
    const validatedDialogRef = useRef<HTMLDialogElement | null>(null)
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    const closeAssignGuardDialog = () => {
        if (assignGuardRef.current) {
            assignGuardRef.current.close()
        }
    }

    const openAssignGuardDialog = () => {
        if (assignGuardRef.current) {
            assignGuardRef.current.showModal()
        }
    }

    const closeValidatedDialog = () => {
        if (validatedDialogRef.current) {
            validatedDialogRef.current.close()
        }
    }
    const openValidatedDialog = () => {
        if (validatedDialogRef.current) {
            validatedDialogRef.current.showModal()
        }
    }

    const openDeleteOrDeactivateDialog = (dialogType: Actions) => {
        if (dialogType === 'Deactivate') {
            setDialogType('Deactivate')
        }
        if (dialogType === 'Delete') {
            setDialogType('Delete')
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleCloseDeleteOrDeactivateDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleReAssign = () => {
        closeAssignGuardDialog()

        toast(' Reassigned successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const handleDeleteSecurityGuard = () => {
        handleCloseDeleteOrDeactivateDialog()

        toast('Security Guard deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
    const handleDeactivateSecurityGuard = () => {
        handleCloseDeleteOrDeactivateDialog()

        toast('Security Guard deactivated successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
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
                                Are you sure you want to delete this Security
                                Guard
                            </p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() =>
                                        handleCloseDeleteOrDeactivateDialog()
                                    }
                                >
                                    Cancel
                                </button>
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={handleDeleteSecurityGuard}
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
                                className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() =>
                                    openDeleteOrDeactivateDialog('Delete')
                                }
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className='text-red-600 text-[1.4rem] font-semibold'>
                                    Delete Message
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
                        <div className='grid relative p-8 bg-white rounded-lg gap-2'>
                            <div className='flex items-center gap-2 absolute right-0 top-0 p-8'>
                                <p>Status:</p>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    {status === 'Sent' ? (
                                        <span className='text-green-600'>
                                            {status}
                                        </span>
                                    ) : (
                                        <span className='text-orange-500'>
                                            {status}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Date:</p>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    {date}
                                </p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Transmission Date:</p>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    {transmissionDate}
                                </p>
                            </div>
                            <div className='flex items-center gap-2 max-w-[40rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                <p>Recipients:</p>
                                <div
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                    className='flex gap-2'
                                >
                                    {recipients.map((recipient, i) => (
                                        <div
                                            className='flex gap-2 items-center  text-ellipsis whitespace-nowrap'
                                            key={i}
                                        >
                                            <p className=''>
                                                {recipient}
                                                {i !== recipients.length - 1 &&
                                                    ','}
                                            </p>
                                        </div>
                                    ))}
                                    <span className='text-color-blue '>
                                        {' '}
                                        + 20 others
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Transmission Channel:</p>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    {transmissionChannel}
                                </p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>Subject:</p>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    {subject}
                                </p>
                            </div>
                            <div className='flex items-center gap-2 my-5'>
                                <p className='overflow-hidden text-ellipsis whitespace-nowrap '>
                                    {description}
                                </p>
                            </div>

                            
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ViewMessage
