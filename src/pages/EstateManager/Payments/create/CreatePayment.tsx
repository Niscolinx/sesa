import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import HouseholdFilter from './filter/HouseholdFilter'
import FlexiblePaymentType from './paymentType/flexible/FlexiblePaymentType'

export type PaymentType = 'fixed' | 'flexible'
export type PaymentPlan = 'full' | 'installment'
type Step = 'initial' | 'list'

const CreatePayment = () => {
    const [step, setStep] = useState<Step>('initial')

    const [paymentType, setPaymentType] = useState<PaymentType | string | null>(
        null
    )

    const handleNext = () => {
        if (paymentType && (paymentType as PaymentType) === 'flexible') {
            setStep('list')
        }
    }

    const renderPaymentType = new Map([
        ['fixed', <HouseholdFilter />],
    ]) satisfies Map<PaymentType, JSX.Element>

    const displayStep = new Map([
        [
            'initial',
            <FlexiblePaymentType
                props={{
                    handleNext,
                    paymentType,
                    setPaymentType,
                }}
            />,
        ],
        ['list', <HouseholdFilter />],
    ]) satisfies Map<Step, JSX.Element>

    return (
        <>
            <ToastContainer />

            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                {displayStep.get(step)}
            </div>
        </>
    )
}

export default CreatePayment
