import { SetStateAction, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { MultipleSelect } from '../../../../components/SuperAdmin/UI/Select'

function Third() {
    const [voteDisplay, setVoteDisplay] = useState<string[]>([])
    const [allowPhysicalVoting, setAllowPhysicalVoting] = useState(false)

    return (
        <div>
            <form className='grid gap-16 items-start content-start capitalize'>
                <div
                    className='grid gap-16 '
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 40rem)',
                    }}
                >
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='thirdName'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Voting End Date
                        </label>
                        <input
                            type='date'
                            required
                            id='thirdName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='thirdName'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Voting Start Time
                        </label>
                        <input
                            type='time'
                            required
                            id='thirdName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='thirdName'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Voting Start End
                        </label>
                        <input
                            type='time'
                            required
                            id='thirdName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='thirdName'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Voting Start Date
                        </label>
                        <input
                            type='date'
                            required
                            id='thirdName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                        <MultipleSelect
                            selectFrom={[
                                'Vote count only',
                                'Percentage of vote count',
                                'Total number of votes',
                            ]}
                            selected={voteDisplay}
                            setSelected={setVoteDisplay}
                            label={'Votes Display'}
                        />
                   
                    <div className='flex items-center gap-4 self-end'>
                        <p className=' font-Satoshi-Medium flex items-center gap-2 text-[#043FA7]'>
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
