import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { Election } from './VotePhysically'

interface EachElection {
    props: {
        election: Election
        selectedCandidate: Record<'name' | 'imgUrl', string> | undefined
        setSelectedCandidate: Dispatch<
            SetStateAction<Record<'name' | 'imgUrl', string> | undefined>
        >
    }
}

const EachElection: FC<EachElection> = ({ props }) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    type DialogState = 'toConfirm' | 'confirmedVote'
    const [dialogState, setDialogState] = useState<DialogState>('toConfirm')

    const handleClose = () => {
        dialogRef.current?.close()
    }

    const handleOpen = () => {
        dialogRef.current?.showModal()
    }

    const handleVoteConfirmation = () => {
        setDialogState('confirmedVote')
    }
    const { election, selectedCandidate, setSelectedCandidate } = props

    const { category, content } = election
    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 p-16'>
                        {dialogState === 'toConfirm' ? (
                            <>
                                {' '}
                                <p className='font-Satoshi-Bold text-[1.8rem] uppercase'>
                                    CONFIRM YOUR VOTE
                                </p>
                                <p className='max-w-[40rem] text-center'>
                                    You are voting{' '}
                                    <span className='font-Satoshi-Medium capitalize'>
                                        {selectedCandidate?.name}
                                    </span>{' '}
                                    as{' '}
                                    <span className='font-Satoshi-Medium capitalize'>
                                        {category}
                                    </span>{' '}
                                    <span className='font-Satoshi-Medium capitalize'>
                                        of the Federal Republic of Nigeria.
                                    </span>
                                </p>
                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleVoteConfirmation}
                                    >
                                        Proceed
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src='/icons/admins/modalSuccess.svg'
                                    alt=''
                                    className='animate__animated animate__pulse'
                                    style={{
                                        animationIterationCount: 'infinite',
                                    }}
                                />

                                <p>
                                    You have successfully voted. Thank you for
                                    participating in the Peace estate general
                                    election
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Proceed to Dashboard
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid gap-8'>
                <p className='text-color-blue capitalize text-[2rem] font-Satoshi-Medium'>
                    {category}
                </p>
                <div className='grid gap-4 transition ease-linear duration-75'>
                    {content.map((item, i) => (
                        <div key={i}>
                            <input
                                type='radio'
                                name='election'
                                id={item.name + i}
                                checked={item.name === selectedCandidate?.name}
                                className='hidden'
                                onChange={() => setSelectedCandidate(item)}
                            />
                            <label
                                htmlFor={item.name + i}
                                className={`capitalize flex items-center gap-8 cursor-pointer p-8 transition ease-linear duration-75  ${
                                    item.name === selectedCandidate?.name &&
                                    'border-2 rounded-2xl border-color-blue-1 shadow'
                                }`}
                            >
                                <img
                                    src={item.imgUrl}
                                    alt=''
                                    className='w-[5rem] h-[5rem] rounded-full object-cover'
                                />
                                <p>{item.name}</p>
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                    onClick={() => handleOpen()}
                >
                    Vote
                </button>
            </div>
        </>
    )
}

export default EachElection
