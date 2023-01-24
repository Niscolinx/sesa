import React, { useContext, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'

const AddResidentUserPackage = () => {
    const ModalContextData = useContext(ModalContext)
    const { handleOpen } = ModalContextData

    return (
        <div className=' p-8 bg-white h-[80vh] rounded-lg overflow-y-scroll'>
            <section
                className='grid max-w-[65vw] gap-16'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
                }}
            >
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='packageName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Name of Package
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='packageName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Gold'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='frequency'
                        className='text-[1.4rem] font-semibold'
                    >
                        Frequency
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='frequency'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Monthly'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='packageName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Amount
                    </label>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            disabled
                            type='text'
                            required
                            id='amount'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                    </div>
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='userName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Name of User (Buyer)
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='userName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Wale Ogunleye'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='startDate'
                        className='text-[1.4rem] font-semibold'
                    >
                        Start Date
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='startDate'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'12-May-22'}
                    />
                </div>
            </section>
        </div>
    )
}

export default AddResidentUserPackage
