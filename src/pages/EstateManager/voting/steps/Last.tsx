import { useEffect, useState } from 'react'
import { GroupThreeImages } from '../../../../components/UI/GroupThreeImages'
import { CandidateField, useCreateElectionContext } from '../createElection'

const Last = () => {
    type CandidateDetails = { [key: string]: CandidateField[] }
    const { electionCategory, candidate_details } = useCreateElectionContext()
    const [candidateData, setCandidateData] = useState<CandidateDetails>({})
    const [candidateImgs, setCandidateImgs] = useState<{
        [key: string]: string[]
    }>({})

    useEffect(() => {
        const tempCandidateData: CandidateDetails = {}
        const tempCandidateImg: { [key: string]: string[] } = {}
        candidate_details.forEach((detail) => {
            const category = detail.category as string

            if (electionCategory.includes(category)) {
                tempCandidateData[category]
                    ? (tempCandidateData[category] = [
                          ...tempCandidateData[category],
                          detail,
                      ])
                    : (tempCandidateData[category] = [detail])

                tempCandidateImg[category]
                    ? (tempCandidateImg[category] = [
                          ...tempCandidateImg[category],
                          detail.photoUrl,
                      ])
                    : (tempCandidateImg[category] = [detail.photoUrl])
            }
        })
        setCandidateData((prev) => ({ ...prev, ...tempCandidateData }))
        setCandidateImgs((prev) => ({ ...prev, ...tempCandidateImg }))
    }, [candidate_details, electionCategory])

    console.log({ candidateData, candidateImgs }, typeof candidateData)

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
                {Object.values(candidateImgs).length > 0 &&
                    Object.entries(candidateImgs).map(([key, value], i) => {

                        return (
                            <div className='grid gap-8 w-[60rem]' key={i}>
                                <div className='grid grid-cols-2 mt-[5rem] pb-5 border-b w-full'>
                                    <p>{key}</p>
                                    <div className='flex items-center gap-16'>
                                        <GroupThreeImages
                                            images={value}
                                        />

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
