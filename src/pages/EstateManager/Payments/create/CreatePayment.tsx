import { useState } from 'react'
import Filter from './filter/Filter'
import FlexiblePaymentType from './paymentForm/PaymentForm'

export type PaymentType = 'fixed' | 'flexible'
export type PaymentPlan = 'full' | 'installment'
type Step = 'initial' | 'list'

const CreatePayment = () => {
    const [step, setStep] = useState<Step>('initial')

    const [paymentType, setPaymentType] = useState<PaymentType | string | null>(
        'flexible'
    )

    const handleNext = () => {
        if (paymentType && (paymentType as PaymentType) === 'flexible') {
            setStep('list')
        }
    }

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
        ['list', <Filter />],
    ]) satisfies Map<Step, JSX.Element>

    return (
        <>
            <div className='grid p-8 bg-white items-baseline rounded-lg min-h-[80vh]'>
                {displayStep.get(step)}
            </div>
        </>
    )
}

export default CreatePayment
