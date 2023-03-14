import { ChangeEvent, useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { useCreateElectionContext } from '../createElection'

function Second() {
    const { electionCategory } = useCreateElectionContext()
    const [candidate, setCandidate] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>(null)

    return (
        <div>
            <div className='grid  gap-16 items-start content-start capitalize'>
                <div className='grid gap-4 relative w-[35rem]'>
                    <Select
                        state={[
                            'ALIBA DESMOND (RES CODE: 2345CDGK1)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK2)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK3)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK4)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK5)',
                        ]}
                        label='Election Candidates (Select Resident Code)'
                        isSearchable
                        selectedState={candidate}
                        setSelectedState={setCandidate}
                    />
                </div>

                <div
                    className='grid gap-16 '
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 35rem)',
                    }}
                >
                    <div className='grid gap-4 select-none pointer-events-none opacity-50 '>
                        <label
                            htmlFor='firstName'
                            className='text-[1.4rem] font-medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='firstName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 select-none pointer-events-none opacity-50'>
                        <label
                            htmlFor='firstName'
                            className='text-[1.4rem] font-medium'
                        >
                            Gender
                        </label>
                        <input
                            type='text'
                            required
                            id='firstName'
                            placeholder='placeholder'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <Select
                        state={electionCategory}
                        label='Election Category'
                        selectedState={category}
                        setSelectedState={setCategory}
                    />
                </div>
            </div>
        </div>
    )
}

export default Second
