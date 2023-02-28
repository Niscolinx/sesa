import React, { useContext } from 'react'
import { ModalContext } from '../../../Context/ModalContext'

const WalletDetails = () => {
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
                        htmlFor='commissionName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Type
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='commissionName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'02-May-2022'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='withdrawalTime'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Time
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
                        Transaction Type
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='status'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-green-500 disabled:cursor-not-allowed'
                        value={'Credit'}
                    />
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Category
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Source
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase'}
                    />
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Amount
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
                        Transaction ID
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={1004238232}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Amount
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
                        Narration
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase for 6000'}
                    />
                </div>
            </section>
        </div>
    )
}

export default WalletDetails
