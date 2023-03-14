import { useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'



type Step = 'first' | 'second' | 'third'

const CreateElection = () => {
    const [step, setStep] = useState<Step>('first')

    const [paymentType, setPaymentType] = useState<PaymentType | string | null>(
        'flexible'
    )

    const displayStep = new Map([
        [
            'initial',
            <PaymentForm
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
            <div className='grid p-8 bg-white items-baseline rounded-lg min-h-[90vh] relative'>
                {displayStep.get(step)}

                <div className='absolute right-0 bottom-0 m-16 flex items-center gap-16'>
                    <button
                        className='text-color-blue disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={step === 'initial'}
                        onClick={() => setStep('initial')}
                    >
                        <TfiArrowCircleLeft className='w-[4rem] h-[4rem]' />
                    </button>
                    <button
                        className=' text-color-blue disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={step === 'list'}
                        onClick={() => setStep('list')}
                    >
                        <TfiArrowCircleRight className='w-[4rem] h-[4rem]' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateElection
