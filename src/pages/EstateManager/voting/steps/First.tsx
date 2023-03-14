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
                <div className='flex items-center gap-8 w-full'>
                    <div className='grid gap-4 relative w-[40rem]'>
                        <label
                            htmlFor='firstName'
                            className='text-[1.4rem] font-medium'
                        >
                            Election Category
                        </label>
                        <input
                            type='text'
                            required
                            id='firstName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <button>
                        <img src='/icons/add_Icon.svg' alt='' />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default First
