import { useEffect, useState } from 'react'
import { GroupThreeImages } from '../../../../components/UI/GroupThreeImages'
import { CandidateField, useCreateElectionContext } from '../createElection'

const Last = () => {
    type CandidateDetails = { [key: string]: string[] }
    const { electionCategory, candidate_details } = useCreateElectionContext()
    const [candidateData, setCandidateData] = useState<CandidateDetails[]>([])

    useEffect(() => {
        //  electionCategory.forEach((item) => {

        //     const imgs = candidate_details
        //         .reduce((acc: string[], cur) => acc.concat(cur.photoUrl), [])
        //         .filter((candidateData) => candidateData.category === item)

        //     setCandidateImgs(extractedImgs)
        //     return imgs
        // })

        const candidates: any = []

        electionCategory.forEach((item, i) => {
            candidate_details.forEach((detail) => {
                if (detail.category === item) {
                    setCandidateData((prev) => {
                        return {
                            ...prev,
                            [item]: [...item, detail],
                        }
                    })
                }
            })
        })

        console.log(candidates)
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
                {electionCategory &&
                    electionCategory.map((election, i) => {
                        return (
                            <div className='grid gap-8 w-[60rem]' key={i}>
                                <div className='grid grid-cols-2 mt-[5rem] pb-5 border-b w-full'>
                                    <p>{election}</p>
                                    <div className='flex items-center gap-16'>
                                        {/* <GroupThreeImages
                                            images={candidateImgs}
                                        /> */}

                                        <button className='text-color-blue'>
                                            View Candidates
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </section>
        </main>
    )
}

export default Last
