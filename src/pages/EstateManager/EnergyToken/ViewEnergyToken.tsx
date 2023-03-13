import React, { useState } from 'react'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import StarRating from '../../../components/SuperAdmin/UI/StarRating'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'

const ViewEnergyToken = () => {
    return (
        <>
            <div className='grid p-8 bg-white  rounded-lg gap-[10rem]'>
                <div>
                    <div
                        className='grid max-w-[84rem] gap-16 mt-12 '
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-medium'
                            >
                                Token Seriel Number
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
                                className='text-[1.4rem] font-medium'
                            >
                                Token Code
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4'>
                            <label
                                htmlFor='amount'
                                className='text-[1.4rem] font-medium'
                            >
                                Denomination
                            </label>
                            <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                                <input
                                    type='text'
                                    required
                                    id='denomination'
                                
                                    name='amount'
                                    className='w-full border-none outline-none py-4 px-4 pl-5'
                                />
                                <img
                                    src='/icons/Naira.svg'
                                    alt=''
                                    className='absolute'
                                />
                            </div>
                        </div>
                       

                        <div className='grid gap-4'>
                            <label
                                htmlFor='convenienceFee'
                                className='text-[1.4rem] font-medium'
                            >
                                Convenience Fee
                            </label>
                            <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                                <input
                                    type='text'
                                    required
                                    id='convenienceFee'
                                
                                    name='convenienceFee'
                                    className='w-full border-none outline-none py-4 px-4 pl-5'
                                />
                                <img
                                    src='/icons/Naira.svg'
                                    alt=''
                                    className='absolute'
                                />
                            </div>
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='instruction'
                                className='text-[1.4rem] font-medium'
                            >
                                Instuction/Message *
                            </label>
                            <input
                                type='instruction'
                                required
                                id='instruction'
                                
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                       

                        <button className='btn  bg-color-blue-1 text-white flex gap-2 items-center  rounded-lg py-4 px-8 capitalize col-span-full mt-[5rem] justify-start w-max'>
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            <p>Create Token</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewEnergyToken
