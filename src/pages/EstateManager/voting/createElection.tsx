import { SetStateAction } from 'jotai'
import { createContext, Dispatch, useContext, useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import First from './steps/First'

type Category = { value: string }[]

interface CreateElectionContext {
    electionCategory: Category
    setElectionCategory: Dispatch<SetStateAction<Category>>
}

 const CreateElectionContext =
    createContext<CreateElectionContext | null>(null)

export const useCreateElectionContext = () => {
    const context = useContext(CreateElectionContext)

    if (!context) {
        throw new Error(
            'useCreateElectionContext must be used within a CreateElectionProvider'
        )
    }

    return context
}
const CreateElection = () => {
    const [step, setStep] = useState(1)
    const [electionCategory, setElectionCategory] = useState<Category>([
        { value: '' },
    ])

    const displayStep = new Map([[1, <First />]]) satisfies Map<
        number,
        JSX.Element
    >

    return (
        <CreateElectionContext.Provider
            value={{
                electionCategory,
                setElectionCategory,
            }}
        >
            <div className=' p-8 bg-white rounded-lg min-h-[90vh] relative'>
                <p className='font-Satoshi-Medium text-[2rem] mb-10'>
                    Create New Poll ( Step {step} of 2)
                </p>
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
        </CreateElectionContext.Provider>
    )
}

export default CreateElection
