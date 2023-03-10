import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'

export type PaymentType = 'fixed' | 'flexible'
export type PaymentPlan = 'full' | 'installment'

const CreatePayment = () => {
    const [paymentPlan, setPaymentPlan] = useState<string | null>(null)
    const [trackPayment, setTrackPayment] = useState('')
    const [amount, setAmount] = useState(0)

    const [paymentType, setPaymentType] = useState<PaymentType>('fixed')

   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const renderPaymentType = new Map([['fixed', <></>]]) satisfies Map<
        PaymentType,
        JSX.Element
    >

    return (
        <>
            <ToastContainer />

            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12'
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
                            Dues Name
                        </label>
                        <input
                            type='text'
                            required
                            id='firstName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <Select
                        label='Gender'
                        state={['Yes', 'No']}
                        selectedState={paymentPlan}
                        setSelectedState={setPaymentPlan}
                    />
                    <div>
                        <label
                            htmlFor='firstName'
                            className='text-[1.4rem] font-medium'
                        >
                            Dues Name
                        </label>
                        <input
                            type='text'
                            required
                            id='firstName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <Select
                        label='Gender'
                        state={['Male', 'Female']}
                        selectedState={paymentPlan}
                        setSelectedState={setPaymentPlan}
                    />

                    <button className='btn text-white bg-color-blue-1 py-4 px-16 rounded-lg w-[15rem]'>
                        Next
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreatePayment
