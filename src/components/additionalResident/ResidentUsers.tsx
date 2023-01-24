import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import ResidentUserHistory, { IResidentUserHistory, RESIDENT_HISTORY } from './ResidentUserHistory'
'react-icons/hi'

import ResidentUsersList, { RESIDENT_LISTS, IResidentUsersList } from './ResidentUsersList'





function ResidentUsers() {
    const [fetchedResidentUsers, setFetchedResidentUsers] = useState<
         IResidentUsersList[] | null
    >(null)
    const [fetchedResidentUserHistory, setFetchedResidentUserHistory] = useState<
        IResidentUserHistory[] | null
    >(null)

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedResidentUsers(RESIDENT_LISTS)
                setFetchedResidentUserHistory(RESIDENT_HISTORY)
            }, 1000)
        }
        fetchData()
    }, [])


    const handlePathSwitch = (pageNum: number) => {
        switch (pageNum) {
            case 1:
                return (
                    <ResidentUsersList
                        fetchedResidentUsers={fetchedResidentUsers ?? []}
                    />
                )
            case 2:
                return (
                    <ResidentUserHistory
                        fetchedResidentUserHistory={fetchedResidentUserHistory ?? []}
                    />
                )
            default:
                return (
                    <ResidentUsersList
                        fetchedResidentUsers={fetchedResidentUsers ?? []}
                    />
                )
        }
    }

    return (
        <div>
            <div className='estateDetail__radioBox'>
                <input
                    defaultChecked
                    type='radio'
                    name='report'
                    id='additionalResidentUsr'
                    className='hidden'
                    onChange={() => setCurrentPage(1)}
                />
                <label htmlFor='additionalResidentUsr'>
                    Additional Resident User
                </label>

                <input
                    type='radio'
                    name='report'
                    id='ResidentUserHistory'
                    className='hidden'
                    onChange={() => setCurrentPage(2)}
                />
                <label htmlFor='ResidentUserHistory'>
                    Resident User History
                </label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {fetchedResidentUsers &&
                    fetchedResidentUsers.length > 0 ? (
                        handlePathSwitch(currentPage)
                    ) : (
                        <section className='relative w-[70vw] h-[60vh] mx-auto grid'>
                            <div className='absolute w-full h-full grid place-content-center'>
                                <CgSpinnerTwo className='animate-spin text-color-green-light text-5xl' />
                            </div>
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}

export default ResidentUsers
