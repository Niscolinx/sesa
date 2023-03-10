import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Select } from '../../../../components/SuperAdmin/UI/Select'

export type PaymentPlan = 'fixed' | 'flexible'
export type PaymentType = 'full' | 'installment'

const CreatePayment = () => {
    const [paymentPlan, setPaymentPlan] = useState<string | null | PaymentPlan>(
        null
    )
    const [trackPayment, setTrackPayment] = useState<string | null>(null)
    const [amount, setAmount] = useState(0)

    const [paymentType, setPaymentType] = useState<PaymentType | string | null>(
        'full'
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const renderPaymentType = new Map([['full', <></>]]) satisfies Map<
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
                        label='Track Payment'
                        state={['Yes', 'No']}
                        selectedState={trackPayment}
                        setSelectedState={setTrackPayment}
                    />

                    <div>
                        <label
                            htmlFor='amount'
                            className='text-[1.4rem] font-medium'
                        >
                            Amount
                        </label>
                        <input
                            type='number'
                            required
                            id='amount'
                            value={amount <= 0 ? '' : amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <Select
                        label='Payment Type'
                        state={['full', 'installment'] satisfies PaymentType[]}
                        selectedState={paymentType}
                        setSelectedState={setPaymentType}
                    />
                    <Select
                        label='Payment Plan'
                        state={['fixed', 'flexible'] satisfies PaymentPlan[]}
                        selectedState={paymentPlan}
                        setSelectedState={setPaymentPlan}
                    />

                    <button className='btn text-white bg-color-blue-1 py-4 px-16 rounded-lg w-[15rem] col-span-full mt-10'>
                        Next
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreatePayment
