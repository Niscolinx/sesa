import React, { Dispatch, SetStateAction, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'
import { PaymentPlan, PaymentType } from '../CreatePayment'

interface PaymentForm {
    props: {
        handleNext: () => void
        paymentType: PaymentType | string | null
        setPaymentType: Dispatch<SetStateAction<PaymentType | string | null>>
    }
}

function PaymentForm({ props }: PaymentForm) {
    const { handleNext, paymentType, setPaymentType } = props

    const [isTrackPayment, setIsTrackPayment] = useState(false)
    const [paymentPlan, setPaymentPlan] = useState<string | null | PaymentPlan>(
        null
    )
    const [trackPayment, setTrackPayment] = useState<string | null>(null)
    const [amount, setAmount] = useState(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const flexible = (
        <>
            <div className='grid gap-4'>
                <label htmlFor='amount' className='text-[1.4rem] font-medium'>
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
                label='Track Payment'
                state={['Yes', 'No']}
                selectedState={trackPayment}
                setSelectedState={setTrackPayment}
            />

            <Select
                label='Payment Plan'
                state={['full', 'installment'] satisfies PaymentPlan[]}
                selectedState={paymentPlan}
                setSelectedState={setPaymentPlan}
            />

            <button
                className='btn text-white bg-color-blue-1 py-4 px-16 rounded-lg w-[15rem] col-span-full mt-10 disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={() => handleNext()}
                disabled={!paymentType}
            >
                Next
            </button>
        </>
    )

    const fixed = (
        <>
            <div className='grid gap-4'>
                <label htmlFor='amount' className='text-[1.4rem] font-medium'>
                    Start Date
                </label>
                <input
                    type='date'
                    required
                    id='startDate'
                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                />
            </div>
            <div className='grid gap-4'>
                <label htmlFor='amount' className='text-[1.4rem] font-medium'>
                    End Date
                </label>
                <input
                    type='date'
                    required
                    id='startDate'
                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                />
            </div>

            <div className='grid gap-4'>
                <label htmlFor='amount' className='text-[1.4rem] font-medium'>
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
                label='Payment Plan'
                state={['full', 'installment'] satisfies PaymentPlan[]}
                selectedState={paymentPlan}
                setSelectedState={setPaymentPlan}
            />

            <div className='grid gap-4'>
                <label htmlFor='deadline' className='text-[1.4rem] font-medium'>
                    Deadline
                </label>
                <input
                    type='date'
                    required
                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                />
            </div>

            <div className='grid justify-items-start gap-4 content-center  self-end'>
                <p className=' font-medium flex items-center gap-2 text-[#043FA7]'>
                    Track Payment{' '}
                    <span className='text-[#043FA7]'>
                        <BsQuestionCircle />
                    </span>
                </p>
                <div
                    onClick={() => setIsTrackPayment(!isTrackPayment)}
                    className='cursor-pointer'
                >
                    {isTrackPayment ? (
                        <img src='/icons/admins/switchOn.svg' alt='' />
                    ) : (
                        <img src='/icons/admins/switchOff.svg' alt='' />
                    )}
                </div>
            </div>
        </>
    )

    const renderForm = new Map([
        ['flexible', flexible],
        ['fixed', fixed],
    ]) satisfies Map<PaymentType, JSX.Element>

    return (
        <form
            onSubmit={handleSubmit}
            className='grid max-w-[84rem] gap-16 mt-12 items-start content-start'
            style={{
                gridTemplateColumns: ' repeat(auto-fit, minmax(35rem, 1fr))',
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
            <Select
                label='Payment Type'
                state={['fixed', 'flexible'] satisfies PaymentType[]}
                selectedState={paymentType}
                setSelectedState={setPaymentType}
            />
            {renderForm.get(paymentType as PaymentType)}
        </form>
    )
}

export default PaymentForm
