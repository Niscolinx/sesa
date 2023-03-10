import React, { Dispatch, SetStateAction, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'
import { PaymentPlan, PaymentType } from '../CreatePayment'

interface PaymentForm {
    props: {
        paymentType: PaymentType | string | null
        setPaymentType: Dispatch<SetStateAction<PaymentType | string | null>>
    }
}

function PaymentForm({ props }: PaymentForm) {
    const { paymentType, setPaymentType } = props

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

            <div className='grid justify-items-start gap-4 self-end'>
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
        <div>
            <p className='font-semibold text-[2rem] mb-10'>
                Add Payment ( Step 1 of 2)
            </p>
            {paymentType === 'fixed' && paymentPlan === 'installment' ? (
                <>
                    <p className='text-color-blue font-semibold'>
                        Installment 1
                    </p>
                    <div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-medium'
                            >
                                Installment Amount
                            </label>
                            <input
                                type='text'
                                required
                                id='firstName'
                                placeholder='placeholder'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                    </div>
                </>
            ) : (
                <form
                    onSubmit={handleSubmit}
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
                    <Select
                        label='Payment Type'
                        state={['fixed', 'flexible'] satisfies PaymentType[]}
                        selectedState={paymentType}
                        setSelectedState={setPaymentType}
                    />
                    {renderForm.get(paymentType as PaymentType)}
                </form>
            )}
        </div>
    )
}

export default PaymentForm
