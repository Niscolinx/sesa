import { SetStateAction } from 'jotai'
import { Dispatch, FC, useRef, useState } from 'react'
import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import EachElection from './EachElection'

const categories = ['presidential', 'senatorial', 'gubernatorial']

export type CandidateDetail = Record<'name' | 'imgUrl', string>
export interface Election {
    id: string
    category: string
    content: CandidateDetail[]
}

const ELECTIONS: Election[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    content: [
        {
            name: 'Musa Chinedu',
            imgUrl: '/img/avatar11.png',
        },
        {
            name: 'Larry Chinedu',
            imgUrl: '/img/avatar2.png',
        },
        {
            name: 'Yap Chinedu',
            imgUrl: '/img/avatar3.png',
        },
    ],
}))

const VotePhysically = () => {
    const [step, setStep] = useState(1)
    const [selectedCandidate, setSelectedCandidate] = useState<{
        [id: string]: CandidateDetail | undefined
    }>(null as any)

    const displayStep = new Map(
        ELECTIONS.map((election, i) => [
            i + 1,
            <EachElection
                props={{ election, selectedCandidate, setSelectedCandidate }}
            />,
        ])
    ) satisfies Map<number, JSX.Element>

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        dialogRef.current?.close()
    }

    const handleOpen = () => {
        dialogRef.current?.showModal()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img
                            src='/icons/admins/modalSuccess.svg'
                            alt=''
                            className='animate__animated animate__pulse'
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>You have successfully created an Election</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                View details
                            </button>
                            <button
                                className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
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
                    {step === displayStep.size ? (
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg ml-auto'
                            onClick={() => handleOpen()}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Create Poll
                        </button>
                    ) : (
                        <button
                            className='btn flex items-center border gap-4 border-color-blue-1 justify-self-end text-color-blue-1 font-Satoshi-Medium justify-center rounded-2xl w-[15rem] ml-auto disabled:opacity-50 disabled:cursor-not-allowed'
                            disabled={step === displayStep.size}
                            onClick={() => setStep((prev) => prev + 1)}
                        >
                            <span>Next</span>
                            <HiOutlineArrowNarrowRight />
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default VotePhysically
