import React, { useState } from 'react'

interface DialogWithdrawalStepsProps {
    handleWithdrawal: (event: React.FormEvent<HTMLFormElement>) => void
    handleClose: () => void
}

export default function DialogWithdrawalSteps({
    handleWithdrawal,
    handleClose,
}: DialogWithdrawalStepsProps) {
    type Steps = 'first' | 'second' | 'third'

    const [step, setStep] = useState<Steps>('first')
    const [amount, setAmount] = useState('')

    const handleProceed = () => {
        setStep('third')
    }

    const first = (
        <form className='grid gap-12' onSubmit={handleWithdrawal}>
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

            <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                Withdraw
            </button>
        </form>
    )
    const second = (
        <>
            <img src='/icons/admins/modalDeactivate.svg' alt='' />
            <p className='text-[1.6rem]'>
                Are you sure you want to deactivate this Artisan
            </p>

            <div className='flex w-full justify-center gap-8'>
                <button
                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                    onClick={() => handleClose()}
                >
                    Cancel
                </button>
                <button
                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                    onClick={handleProceed}
                >
                    Deactivate
                </button>
            </div>
        </>
    )
    const third = (
        <>
            <img src='/icons/admins/modalDeactivate.svg' alt='' />
            <p className='text-[1.6rem]'>
                Are you sure you want to deactivate this Artisan
            </p>

            <div className='flex w-full justify-center gap-8'>
                <button
                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                    onClick={() => handleClose()}
                >
                    Cancel
                </button>
                
            </div>
        </>
    )

    const DisplaySteps = new Map<Steps, JSX.Element>([
        ['first', first],
        ['second', second],
    ])
    return <>{DisplaySteps.get(step)}</>
}
