import { SetStateAction } from 'jotai'
import { createContext, Dispatch, useContext, useState } from 'react'
import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from 'react-icons/hi'
import First from './steps/First'
import Fourth from './steps/Fourth'
import Last from './steps/Last'
import Second from './steps/Second'
import Third from './steps/Third'

type Category = string[]

 interface CandidateField {
    candidate: string | null
    category: string | null
    name: string
    gender: string
    manifesto: string
    photoUrl: string
}

interface CreateElectionContext {
    electionCategory: Category
    setElectionCategory: Dispatch<SetStateAction<Category>>
    candidate_details: CandidateField[]
    setCandidate_details: Dispatch<SetStateAction<CandidateField[]>>
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
    const [step, setStep] = useState(5)
    const [electionCategory, setElectionCategory] = useState<Category>([''])
    const [candidate_details, setCandidate_details] = useState<CandidateField[]>([])

    const displayStep = new Map([
        [1, <First />],
        [2, <Second />],
        [3, <Third />],
        [4, <Fourth />],
        [5, <Last />],
    ]) satisfies Map<number, JSX.Element>

    return (
        <CreateElectionContext.Provider
            value={{
                electionCategory,
                setElectionCategory,
                candidate_details,
                setCandidate_details
            }}
        >
            <div className=' p-8 bg-white rounded-lg min-h-[90vh] relative'>
                <p className='font-Satoshi-Medium text-[2rem] mb-[5rem]'>
                    {step <= 3
                        ? 'Create New Poll'
                        : step === 4
                        ? 'Filter Selection'
                        : 'Poll Summary'}{' '}
                    ( Step {step} of {displayStep.size})
                </p>
                {displayStep.get(step)}

                <div className='mt-[10rem] flex items-center gap-16 justify-between'>
                    {step > 1 && (
                        <button
                            className='btn flex items-center border gap-4 border-color-blue-1 text-color-blue-1 font-Satoshi-Medium justify-center rounded-2xl w-[15rem] disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={step === 1}
                            onClick={() => setStep((prev) => prev - 1)}
                        >
                            <HiOutlineArrowNarrowLeft />
                            <span>Prev</span>
                        </button>
                    )}

                    <button
                        className='btn flex items-center border gap-4 border-color-blue-1 justify-self-end text-color-blue-1 font-Satoshi-Medium justify-center rounded-2xl w-[15rem] ml-auto disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={
                            step === displayStep.size || !electionCategory[0]
                        }
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
