import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { IoMdAdd } from 'react-icons/io'
import { toast, ToastContainer } from 'react-toastify'

export interface IPropertyType {
    id: string
    propertyType: string
    description: string
}

const PropertyType = () => {
    const navigate = useNavigate()

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

    const handleDeleteProperty = () => {
        handleClose()

        toast('Property Deleted successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalWarning.svg' alt='' />
                        <p className='text-[1.6rem]'>
                            Are you sure you want to delete this Property Type
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
                                onClick={handleDeleteProperty}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid text-[1.6rem] border rounded-lg bg-white'>
                <div className=' p-10  rounded-lg '>
                    <div className='flex w-full border-b items-center pb-5 justify-between'>
                        <h2 className='heading2'>Property Type</h2>

                        <button
                            className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={() => handleOpen()}
                        >
                            <img src='/icons/admins/delete.svg' alt='' />
                            <span className='text-red-600 text-[1.4rem] font-semibold'>
                                Delete
                            </span>
                        </button>
                    </div>
                </div>

                <form
                    className='grid gap-8 mt-8 p-8 max-w-[60rem]'
                    onSubmit={handleSubmit}
                >
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='propertyType'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Property Type
                        </label>
                        <input
                            type='text'
                            required
                            id='propertyType'
                            className='w-[40rem] rounded-lg border border-color-grey text-[1.6rem] outline-color-blue-1 py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='description'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Description
                        </label>
                        <textarea
                            required
                            rows={4}
                            id='description'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-color-blue-1 py-4 px-4'
                        />
                        <p className=' text-[1.2rem] text-gray-400'>
                            Maximum of 30 Characters
                        </p>
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[10rem]'
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
                    </button>
                </form>
            </div>
        </>
    )
}

export default PropertyType
