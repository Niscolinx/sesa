import React, { useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { PaymentType } from '../../Payments/create/CreatePayment'

function First() {
    const [installmentField, setInstallmentField] = useState<
        InstallmentField[]
    >([
        {
            amount: '',
            startDate: '',
            endDate: '',
        },
    ])

    const addAnotherInstallmentHandler = () => {
        setInstallmentField((prev) => [
            ...prev,
            { amount: '', startDate: '', endDate: '' },
        ])
    }
    return (
        <div>
            <p className='font-Satoshi-Medium text-[2rem] mb-10'>
                Add Payment ( Step 1 of 2)
            </p>

            <form
                className='grid max-w-[84rem] gap-16 items-start content-start capitalize'
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
                        Payment Name
                    </label>
                    <input
                        type='text'
                        required
                        id='firstName'
                        placeholder='placeholder'
                        className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                    />
                </div>
               
            </form>
        </div>
    )
}

export default First
