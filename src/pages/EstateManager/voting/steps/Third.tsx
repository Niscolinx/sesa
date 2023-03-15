import { useState } from 'react'
import { MultipleSelect } from '../../../../components/SuperAdmin/UI/Select'
import { useForm } from 'react-hook-form'
import { ElectionDates, useCreateElectionContext } from '../createElection'



function Third() {
    const { setElectionDates, setAllowPhysicalVoting, setVotesDisplay, votesDisplay, allowPhysicalVoting} = useCreateElectionContext()
  
    const {
        register,
        handleSubmit,
        watch,
    } = useForm<ElectionDates>()

    watch(values => {
        setElectionDates({...values})
    })
    const onSubmit = handleSubmit((data) => {
        console.log({ data })
    })
    return (
        <div>
            <form
                className='grid gap-16 items-start content-start capitalize'
                onSubmit={onSubmit}
            >
                <div
                    className='grid gap-16 '
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 40rem)',
                    }}
                >
                    <div className='grid gap-4 relative'>
                        <label className='text-[1.4rem] font-Satoshi-Medium'>
                            Voting Start Date
                        </label>
                        <input
                            type='date'
                            min={new Date().toISOString().split('T')[0]}
                            {...register('votingStartDate')}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label className='text-[1.4rem] font-Satoshi-Medium'>
                            Voting End Date
                        </label>
                        <input
                            type='date'
                            min={new Date().toISOString().split('T')[0]}
                            {...register('votingEndDate')}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label className='text-[1.4rem] font-Satoshi-Medium'>
                            Voting Start Time
                        </label>
                        <input
                            type='time'
                            {...register('votingStartTime')}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label className='text-[1.4rem] font-Satoshi-Medium'>
                            Voting End Time
                        </label>
                        <input
                            type='time'
                            {...register('votingEndTime')}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <MultipleSelect
                        selectFrom={[
                            'Vote count only',
                            'Percentage of vote count',
                            'Total number of votes',
                        ]}
                        selected={votesDisplay}
                        setSelected={setVotesDisplay}
                        label={'Votes Display'}
                    />

                    <div className='flex items-center gap-4 self-end'>
                        <p className=' font-Satoshi-Medium flex items-center gap-2'>
                            Allow Physical Voting{' '}
                        </p>
                        <div
                            onClick={() =>
                                setAllowPhysicalVoting(!allowPhysicalVoting)
                            }
                            className='cursor-pointer'
                        >
                            {allowPhysicalVoting ? (
                                <img src='/icons/admins/switchOn.svg' alt='' />
                            ) : (
                                <img src='/icons/admins/switchOff.svg' alt='' />
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Third
