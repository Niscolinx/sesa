import React, { useContext, useState } from 'react'

import { ModalContext } from '../../Context/ModalContext'

const EstateWalletDetails = () => {
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
                        htmlFor='estateName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Estate Name
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='estateName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Gold Estate'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='withdrawalTime'
                        className='text-[1.4rem] font-semibold'
                    >
                        Withdrawal Time
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='withdrawalTime'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'3:00pm'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='status'
                        className='text-[1.4rem] font-semibold'
                    >
                        Withdrawal Date
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='status'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'2-1-2023'}
                    />
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
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
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                    </div>
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Status
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Active'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Description
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Description'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Balance
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
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                    </div>
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Status
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Active'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Naration
                    </label>
                  
                        <input
                            disabled
                            type='text'
                            required
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                </div>
            </section>
            <section className='grid text-[1.4rem] w-full py-10 gap-8 border-t mt-20'>
                <h4 className='text-[1.6rem] font-semibold'>
                    Beneficiary Details
                </h4>
                <div
                    className='items-center w-full grid'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(20rem, 1fr))',
                    }}
                >
                    <div className=' grid items-center gap-2'>
                        <p className='font-semibold'>Resident User</p>
                        <div className='flex items-center gap-6'>
                            <img
                                src='/img/me.jpeg'
                                alt=''
                                className='w-[3rem] h-[3rem] object-cover object-top rounded-full'
                            />
                            <p className='font-semibold'>Jacintha Sage</p>
                        </div>
                    </div>
                    <div className='grid items-center gap-2'>
                        <p className='font-semibold'>Email</p>
                        <p className='text-gray-500'>jacintha@gmail.com</p>
                    </div>
                    <div className='grid items-center gap-2'>
                        <p className='font-semibold'>Phone Number</p>
                        <p className='text-gray-500'>09072847232</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EstateWalletDetails
