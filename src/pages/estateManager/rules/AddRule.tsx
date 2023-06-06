import React, { useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { toast, ToastContainer } from 'react-toastify'

const AddRule = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        toast('Rule added successfully', {
            type: 'success',
        })
    }

    return (
        <>
            <ToastContainer />
            <section className='p-8 bg-white gap-16 rounded-lg'>
                <form className='grid p-8 gap-16 max-w-[70rem]'>
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
                            htmlFor='rules_and_regulations'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Estate rules and regulations
                        </label>
                        <textarea
                            rows={7}
                            required
                            id='rules_and_regulations'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <button className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-start justify-self-start'>
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Rule
                    </button>
                </form>
            </section>
        </>
    )
}

export default AddRule
