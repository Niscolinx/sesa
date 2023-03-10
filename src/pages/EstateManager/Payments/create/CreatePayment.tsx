import { useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
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
                    paymentType,
                    setPaymentType,
                }}
            />,
        ],
        ['list', <Filter />],
    ]) satisfies Map<Step, JSX.Element>

    return (
        <>
            <div className='grid p-8 bg-white items-baseline rounded-lg min-h-[80vh] relative'>
                {displayStep.get(step)}

                <div className='absolute right-0 bottom-0 m-16 flex items-center gap-16'>
                    <button className='text-color-blue disabled:opacity-50 disabled:cursor-not-allowed'>
                        <TfiArrowCircleLeft className='w-[4rem] h-[4rem]' />
                    </button>
                    <button className=' text-color-blue disabled:opacity-50 disabled:cursor-not-allowed'>
                        <TfiArrowCircleRight className='w-[4rem] h-[4rem]' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreatePayment
