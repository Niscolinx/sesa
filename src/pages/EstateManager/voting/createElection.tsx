import { SetStateAction } from 'jotai'
import { createContext, Dispatch, useContext, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import First from './steps/First'
import Second from './steps/Second'

type Category = string[]

interface CreateElectionContext {
    electionCategory: Category
    setElectionCategory: Dispatch<SetStateAction<Category>>
}

const CreateElectionContext = createContext<CreateElectionContext | null>(null)

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
    const [electionCategory, setElectionCategory] = useState<Category>([''])

    const displayStep = new Map([
        [1, <First />],
        [2, <Second />],
    ]) satisfies Map<number, JSX.Element>

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

                <div className='m-[5rem] flex items-center gap-16 justify-between bg-red-600'>
                    {step > 1 && (
                        <button
                            className='btn flex items-center border gap-4 border-color-blue-1 text-color-blue-1 font-Satoshi-Medium justify-center rounded-2xl w-[15rem] disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={step === 1}
                            onClick={() => setStep((prev) => prev - 1)}
                        >
                            <span>Prev</span>
                            <HiOutlineArrowNarrowLeft />
                        </button>
                    )}

                    <button
                        className='btn flex items-center border gap-4 border-color-blue-1 justify-self-end text-color-blue-1 font-Satoshi-Medium justify-center rounded-2xl w-[15rem] ml-auto disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={step === 3 || !electionCategory[0]}
                        onClick={() => setStep((prev) => prev + 1)}
                    >
                        <span>Next</span>
                        <HiOutlineArrowNarrowRight />
                    </button>
                </div>
            </div>
        </CreateElectionContext.Provider>
    )
}

export default CreateElection
