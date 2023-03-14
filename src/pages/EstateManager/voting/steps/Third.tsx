import { SetStateAction, useState } from 'react'
import { MultipleSelect } from '../../../../components/SuperAdmin/UI/Select'

function Third() {
    const [voteDisplay, setVoteDisplay] = useState<string[]>([])

    return (
        <div>
            <form className='grid gap-16 items-start content-start capitalize'>
                <div
                    className='grid gap-16 '
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 35rem)',
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
                </div>
            </form>
        </div>
    )
}

export default Third
