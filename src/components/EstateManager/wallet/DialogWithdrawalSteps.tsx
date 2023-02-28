import React, { FormEvent, useState } from 'react'

interface DialogWithdrawalStepsProps {
    handleClose: () => void
}

export default function DialogWithdrawalSteps({
    handleClose,
}: DialogWithdrawalStepsProps) {
    type Steps = 'first' | 'second' | 'third'

    const [step, setStep] = useState<Steps>('first')
    const [amount, setAmount] = useState('')

    const handleProceed = () => {
        setStep('third')
    }

    const handleWithdrawal = () => {
        setStep('first')
        handleClose()
    }

    const first = (
        <div className='grid gap-12' onSubmit={() => setStep('second')}>
            <div className='w-full grid gap-4'>
                <label htmlFor='amount' className='text-[1.4rem] font-semibold'>
                    Amount
                </label>
                <div className='relative flex items-center'>
                    <img
                        src='/icons/Naira.svg'
                        alt=''
                        className='absolute left-3'
                    />
                    <input
                        type='number'
                        required
                        id='amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                    />
                </div>
            </div>
            <div className='w-full grid gap-4'>
                <label
                    htmlFor='description'
                    className='text-[1.4rem] font-semibold'
                >
                    Description
                </label>

                <input
                    type='text'
                    required
                    id='description'
                    className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                />
            </div>

            <button
                className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'
                onClick={() => setStep('second')}
            >
                Withdraw
            </button>
        </div>
    )
    const second = (
        <div className='grid justify-items-center max-w-[40rem] mx-auto gap-8 text-center'>
            <img src='/icons/admins/modalDeactivate.svg' alt='' />
            <p className='text-[1.6rem]'>
                Are you sure you want to withdraw{' '}
                <span className='font-SatoshiMedium'>N{amount}</span> from the estate
                wallet{' '}
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
                    onClick={handleProceed}
                >
                    Proceed
                </button>
            </div>
        </div>
    )
    const third = (
        <div className='grid justify-items-center max-w-[40rem] mx-auto gap-8'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />
            <p className='text-[1.6rem] text-center'>
                Your request has been sent to SESA admin. The registered estate
                bank account will be credited within 1 working day{' '}
            </p>

            <div className='flex w-full justify-center gap-8'>
                <button
                    className='btn bg-[#0556E5] text-white border-none rounded-lg w-[15rem]'
                    onClick={() => handleWithdrawal}
                >
                    Continue
                </button>
            </div>
        </div>
    )

    const DisplaySteps = new Map<Steps, JSX.Element>([
        ['first', first],
        ['second', second],
        ['third', third],
    ])
    return <>{DisplaySteps.get(step)}</>
}
