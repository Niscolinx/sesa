import { ChangeEvent } from 'react'
import { useCreateElectionContext } from '../createElection'

function Third() {
    const { electionCategory, setElectionCategory } = useCreateElectionContext()

    const add_another_category = () => {
        setElectionCategory((prev) => [...prev, ''])
    }

    const handle_category_change = (
        e: ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        setElectionCategory((prev) => {
            const updatedArr = [...prev]
            updatedArr[idx] = e.target.value

            return updatedArr
        })
    }

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
                            className='text-[1.4rem] font-medium'
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
                </div>
            </form>
        </div>
    )
}

export default Third
