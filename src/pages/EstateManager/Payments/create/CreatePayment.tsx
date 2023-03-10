import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import HouseholdFilter from './filter/Household'
import FlexiblePaymentType from './paymentType/flexible/FlexiblePaymentType'

export type PaymentType = 'fixed' | 'flexible'
export type PaymentPlan = 'full' | 'installment'
type Step = 'initial' | 'list'

const CreatePayment = () => {
    const [paymentPlan, setPaymentPlan] = useState<string | null | PaymentPlan>(
        null
    )
    const [step, setStep] = useState('initial')
    const [trackPayment, setTrackPayment] = useState<string | null>(null)
    const [amount, setAmount] = useState(0)

    const [paymentType, setPaymentType] = useState<PaymentType | string | null>(
        null
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const renderPaymentType = new Map([
        ['fixed', <HouseholdFilter />],
    ]) satisfies Map<PaymentType, JSX.Element>

    const displayStep = new Map([
        ['initial', <HouseholdFilter />],
    ]) satisfies Map<Step, JSX.Element>

    const handleNext = () => {
        if (paymentType) {

                if(paymentType === '')
        
        }
    }

    return (
        <>
            <ToastContainer />

            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <FlexiblePaymentType
                    props={{
                        handleNext,
                        paymentType,
                        setPaymentType,
                    }}
                />
            </div>
        </>
    )
}

export default CreatePayment
