import React, { useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'

import { Select } from '../../../components/superAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import ValidatedResult from '../../../components/ui/dialog/ValidatedResult'
import { SetStateAction } from 'jotai'

type Actions = 'Deactivate' | 'Delete'

export type ValidateInputTypes =
    | 'Phone Number'
    | 'BVN Number'
    | 'NIN Number'
    | 'Drivers License'
    | 'International Passport'
    | 'Voters Card'

const ViewResident = () => {
    const [selectedGender, setSelectedGender] = useState<string>('')
    const [isValidated, setIsValidated] = useState(false)
    const [openValidatedDialog, setOpenValidatedDialog] = useState(false)

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

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const openDeleteOrDeactivateDialog = (dialogType: Actions) => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleCloseDeleteOrDeactivateDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleDeactivateResident = () => {
        handleCloseDeleteOrDeactivateDialog()

        toast('Resident deactivated successfully', {
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
                            <img
                                src='/icons/admins/modalDeactivate.svg'
                                alt=''
                            />
                            <p className='text-[1.6rem]'>
                                Are you sure you want to deactivate this
                                resident?
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
                                    onClick={handleDeactivateResident}
                                >
                                    Deactivate
                                </button>
                            </div>
                        </>
                    </div>
                </section>
            </dialog>
            <main className='bg-white grid gap-10 rounded-lg py-10'>
                <section className='grid p-8 bg-white items-baseline rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <ValidatedResult
                            image={''}
                            setImageFile={function (
                                value: SetStateAction<File | null>
                            ): void {
                                throw new Error('Function not implemented.')
                            }}
                        />

                        <div className='flex gap-8'>
                            <button
                                className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() =>
                                    openDeleteOrDeactivateDialog('Deactivate')
                                }
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className='text-red-600 text-[1.4rem] font-semibold'>
                                    Deactivate
                                </span>
                            </button>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className='grid max-w-[84rem] gap-16 mt-12'
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                First Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='firstName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Middle Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Last Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Date of Birth
                            </label>
                            <input
                                type='date'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4'>
                            <label
                                htmlFor='phoneNumber'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Phone Number *
                            </label>

                            <div className='flex text-[1.6rem] gap-4   h-[5rem]'>
                                <select className='w-[30%] rounded-lg border border-color-grey py-4.8 px-4 outline-none cursor-pointer text-color-dark relative h-full'>
                                    <option value='234'>+234</option>
                                </select>
                                <input
                                    required
                                    type='number'
                                    inputMode='numeric'
                                    id='phoneNumber'
                                    placeholder='Phone Number'
                                    className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                                />
                            </div>
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='email'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Email Address *
                            </label>
                            <input
                                type='email'
                                required
                                id='email'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <Select
                            label='Gender'
                            state={['Male', 'Female']}
                            selectedState={selectedGender}
                            setSelectedState={setSelectedGender}
                        />
                    </form>
                </section>
                {/* <button
                    className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full'
                    style={{ justifySelf: 'start' }}
                >
                    <span>
                        <img
                            src='/icons/admins/saveDisk.svg'
                            alt=''
                            className='w-[1.7rem] h-[1.7rem]'
                        />
                    </span>{' '}
                    Save Changes
                </button> */}
            </main>
        </>
    )
}

export default ViewResident
