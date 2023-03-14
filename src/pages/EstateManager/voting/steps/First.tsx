import React, { useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { PaymentType } from '../../Payments/create/CreatePayment'

function First() {
    const [electionCategory, setElectionCategory] = useState<[{ value: '' }]>([
        { value: '' },
    ])

    // const addAnotherInstallmentHandler = () => {
    //     setInstallmentField((prev) => [
    //         ...prev,
    //         { amount: '', startDate: '', endDate: '' },
    //     ])
    // }
    return (
        <div>
            <form className='grid max-w-[50rem] gap-16 items-start content-start capitalize'>
                <div className='grid gap-4 relative w-[40rem]'>
                    <label
                        htmlFor='firstName'
                        className='text-[1.4rem] font-medium'
                    >
                        Election Title
                    </label>
                    <input
                        type='text'
                        required
                        id='firstName'
                        placeholder='placeholder'
                        className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                    />
                </div>

                {electionCategory.map((item, idx) => (
                    <div className='grid gap-4 relative' key={idx}>
                        <label
                            htmlFor='category'
                            className='text-[1.4rem] font-medium'
                        >
                            Election Category
                        </label>
                        <div className='flex items-center gap-8 w-full'>
                            <input
                                type='text'
                                required
                                id='category'
                                placeholder='placeholder'
                                value={electionCategory[idx].value}
                                className=' rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 w-[40rem]'
                            />
                            {idx + 1 === electionCategory.length && (
                                <button>
                                    <img src='/icons/add_Icon.svg' alt='' />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default First
