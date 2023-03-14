import { useEffect, useState } from 'react'
import { GroupThreeImages } from '../../../../components/UI/GroupThreeImages'
import { useCreateElectionContext } from '../createElection'

const Last = () => {
    const {electionCategory, candidate_details} = useCreateElectionContext()
    const [candidateImgs, setCandidateImgs] = useState<string[]>([])

    const imgArr = [
        '/img/avatar1.png',
        '/img/avatar2.png',
        '/img/avatar3.png',
    ]

    useEffect(() => {

        const extractImgs = candidate_details.reduce((acc: string[], cur: string) => (
            acc.concat(cur.photoUrl)
        ), [])

    }, [candidate_details])

    return (
        <main className='bg-color-white rounded-lg grid gap-16'>
            <section className='capitalize'>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Election Title
                </p>
                <p>Peace Estate 2023 General Election</p>
            </section>

            <section>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Election Categories
                </p>
        {
            electionCategory && electionCategory.map((election, i) => {
                return (
                    <div className='grid gap-8 w-[60rem]'>
                        <div className='grid grid-cols-2 mt-[5rem] pb-5 border-b w-full'>
                            <p>{election}</p>
                            <div className='flex items-center gap-16'>
                                {
                                    candidate_details.map((detail, i) => (
                                        <GroupThreeImages images={detail.photoUrl} />

                                    ))
                                }
                                <button className='text-color-blue'>
                                    View Candidates
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
                
            </section>
        </main>
    )
}

export default Last
