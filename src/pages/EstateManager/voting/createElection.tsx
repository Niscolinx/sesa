import { useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'

const CreateElection = () => {
    const [step, setStep] = useState(1)

    const displayStep = new Map([[1, <></>]]) satisfies Map<number, JSX.Element>

    return (
        <>
            <div className='grid p-8 bg-white items-baseline rounded-lg min-h-[90vh] relative'>
                {displayStep.get(step)}

                <div className='absolute right-0 bottom-0 m-16 flex items-center gap-16'>
                    <button
                        className='text-color-blue disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={step === 1}
                        onClick={() => setStep((prev) => prev + 1)}
                    >
                        <TfiArrowCircleLeft className='w-[4rem] h-[4rem]' />
                    </button>
                    <button
                        className=' text-color-blue disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={step === 3}
                        onClick={() => setStep((prev) => prev - 1)}
                    >
                        <TfiArrowCircleRight className='w-[4rem] h-[4rem]' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreateElection
