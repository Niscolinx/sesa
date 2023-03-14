import { ChangeEvent, useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { useCreateElectionContext } from '../createElection'

function Second() {
    const { electionCategory, setElectionCategory } = useCreateElectionContext()
    const [candidate, setCandidate] = useState<string | null>(null)

    const add_another_category = () => {
        setElectionCategory((prev) => [...prev, { value: '' }])
    }

    const handle_category_change = (
        e: ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        setElectionCategory((prev) => {
            const updatedArr = [...prev]
            updatedArr[idx] = {
                value: e.target.value,
            }

            return updatedArr
        })
    }

    return (
        <div>
            <form className='grid  gap-16 items-start content-start capitalize'>
                <div className='grid gap-4 relative w-[40rem]'>
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

                {electionCategory.map((item, idx) => (
                    <div className='grid gap-4 relative' key={idx}>
                        <label
                            htmlFor='category'
                            className='text-[1.4rem] font-medium'
                        >
                            Election Category
                        </label>
                        <div className='flex items-center gap-8 w-full'>
                            <input
                                type='text'
                                required
                                id='category'
                                placeholder='placeholder'
                                value={item.value}
                                onChange={(e) => handle_category_change(e, idx)}
                                className=' rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 w-[40rem]'
                            />
                            {idx + 1 === electionCategory.length && (
                                <button onClick={() => add_another_category()}>
                                    <img src='/icons/add_Icon.svg' alt='' />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default Second
