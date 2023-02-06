import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { IoMdAdd } from 'react-icons/io'
import { toast } from 'react-toastify'

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

        toast('Artisan deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
  

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                       
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to delete this Property
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
            <div className='grid text-[1.6rem] border rounded-lg'>
                <div className=' p-10 bg-white rounded-lg '>
                    <div className='flex w-full border-b items-center pb-5'>
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

                <div className='grid bg-white'>
                    <div className='grid justify-between text-color-dark-1 bg-color-grey p-8 grid-cols-2 gap-8 text-[1.6rem]'>
                        <p>Property Type</p>
                        <p>Description</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        
                    </div>
                </div>
               
            </div>
        </>
    )
}

export default PropertyType
