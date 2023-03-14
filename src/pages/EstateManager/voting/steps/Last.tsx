import { useEffect, useState } from 'react'
import { GroupThreeImages } from '../../../../components/UI/GroupThreeImages'
import { CandidateField, useCreateElectionContext } from '../createElection'

const Last = () => {
    type CandidateDetails = { [key: string]: string[] }
    const { electionCategory, candidate_details } = useCreateElectionContext()
    const [candidateData, setCandidateData] = useState<CandidateDetails[]>([])

    useEffect(() => {
        const tempCandidateData: { [key: string]: CandidateField[] } = {}
        candidate_details.forEach((detail) => {
            const category = detail.category as string

            if (electionCategory.includes(category)) {
                tempCandidateData[category]
                    ? (tempCandidateData[category] = [
                          ...tempCandidateData[category],
                          detail,
                      ])
                    : (tempCandidateData[category] = [detail])
            }
        })
        setCandidateData((prev) => ({ ...prev, ...tempCandidateData }))
    }, [candidate_details, electionCategory])

    console.log({ candidateData })

    // electionCategory.forEach((item, i) => {
    //     return candidate_details.forEach((detail) => {
    //         if (detail.category === item) {
    //             setCandidateData((prev) => {
    //                 return {
    //                     ...prev,
    //                     [item]: [...item, detail],
    //                 }
    //             })
    //         }
    //     })
    // })

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
