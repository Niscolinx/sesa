import React, { Dispatch, SetStateAction, useState } from 'react'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'
import { PaymentPlan, PaymentType } from '../CreatePayment'

interface PaymentForm {
    props: {
        handleNext: () => void
        paymentType: PaymentType | string | null
        setPaymentType: Dispatch<SetStateAction<PaymentType | string | null>>
    }
}

type RenderForm = 'flexible' | 'fixed'

function PaymentForm({ props }: PaymentForm) {
    const { handleNext, paymentType, setPaymentType } = props

    const [paymentPlan, setPaymentPlan] = useState<string | null | PaymentPlan>(
        null
    )
    const [trackPayment, setTrackPayment] = useState<string | null>(null)
    const [amount, setAmount] = useState(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const renderForm = new Map([
        ['flexible', <></>],
        ['fixed', <></>],
    ]) satisfies Map<RenderForm, JSX.Element>

    return (
        <form
            onSubmit={handleSubmit}
            className='grid max-w-[84rem] gap-16 mt-12'
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
        </form>
    )
}

export default PaymentForm
