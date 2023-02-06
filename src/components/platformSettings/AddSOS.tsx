import React, { FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { getPhotoUrl } from '../../utils/getPhotoUrl'
import { MultipleSelect } from '../UI/Select'

const AddSOS = () => {
    const [selectedEstates, setSelectedEstates] = useState<string[]>([])

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

   const confirmAddedSOS = () => {
    console.log("hellow ")
   }

   

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='abaddddDDddsdfslute right-4 top-4 text-[2rem] curaddddDDddsdfsr-pointer'
                            onClick={() => handleClose()}
                        />

                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                            <img src='/icons/admins/modalSuccess.svg' alt='' />

                            <p>You have successfully added SOS</p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={confirmAddedSOS}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
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
                            htmlFor='SOSName'
                            className='text-[1.4rem] font-medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='SOSName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='phoneNumber'
                            className='text-[1.4rem] font-semibold'
                        >
                            Phone Number
                        </label>
                        <input
                            disabled
                            type='text'
                            required
                            id='phoneNumber'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={'09023238423'}
                        />
                    </div>

                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='phoneNumber'
                            className='text-[1.4rem] font-semibold'
                        >
                            Phone Number
                        </label>
                        <input
                            disabled
                            type='text'
                            required
                            id='phoneNumber'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={'09023238423'}
                        />
                    </div>

                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='phoneNumber'
                            className='text-[1.4rem] font-semibold'
                        >
                            Phone Number
                        </label>
                        <input
                            disabled
                            type='text'
                            required
                            id='phoneNumber'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={'09023238423'}
                        />
                    </div>

                    <MultipleSelect
                        label='Estates'
                        placeholder='Select Estates'
                        selected={selectedEstates}
                        selectFrom={['Estate 1', 'Estate 2', 'Estate 3']}
                        setSelected={setSelectedEstates}
                    />
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='startDate'
                            className='text-[1.4rem] font-semibold'
                        >
                            Start Date
                        </label>
                        <input
                            type='date'
                            required
                            id='startDate'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] curaddddDDddsdfsr-pointer'
                        />
                    </div>
                    <div className='w-full grid gap-4'>
                        <label
                            htmlFor='endDate'
                            className='text-[1.4rem] font-semibold'
                        >
                            End Date
                        </label>
                        <input
                            type='date'
                            required
                            id='endDate'
                            className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] curaddddDDddsdfsr-pointer'
                        />
                    </div>

                  

                 

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full'
                        style={{ justifySelf: 'start' }}
                        onClick={() => handleOpen()}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>{' '}
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddSOS
