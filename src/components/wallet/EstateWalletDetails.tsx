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
                        value={'Gold'}
                    />
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
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='endDate'
                        className='text-[1.4rem] font-semibold'
                    >
                        End Date
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='endDate'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'12-May-22'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='estateUser'
                        className='text-[1.4rem] font-semibold'
                    >
                        Estate User
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='estateUser'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Ibare'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='transactionType'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Type
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='transactionType'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Purchase'}
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
                        htmlFor='status'
                        className='text-[1.4rem] font-semibold'
                    >
                        Status
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='status'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Status'}
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
