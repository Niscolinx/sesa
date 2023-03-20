import React, { useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import StarRating from '../../../components/SuperAdmin/UI/StarRating'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'

const AddRule = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <>
            <ToastContainer />

            <form className='grid p-8 bg-white gap-16 rounded-lg'>
                <div className='grid gap-4 relative '>
                    <label
                        htmlFor='ruleTitle'
                        className='text-[1.4rem] font-Satoshi-Medium'
                    >
                        Rule title
                    </label>
                    <input
                        type='text'
                        required
                        id='ruleTitle'
                        className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                    />
                </div>
                <div className='grid gap-4 relative '>
                    <label
                        htmlFor='DateOfBirth'
                        className='text-[1.4rem] font-Satoshi-Medium'
                    >
                        Artisan Category
                    </label>
                    <input
                        type='text'
                        required
                        id='DateOfBirth'
                        className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                    />
                </div>
    
            </form>
        </>
    )
}

export default AddRule
