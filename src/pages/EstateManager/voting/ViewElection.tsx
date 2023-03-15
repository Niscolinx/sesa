import { useRef } from 'react'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ElectionInfo } from './Voting'

const ViewElection = () => {
    const location = useLocation()

    const electionData = location.state || {}

    const {
        id,
        category,
        electionTitle,
        startDate,
        endDate,
        no_of_eligible_voters,
    } = electionData as ElectionInfo

    interface ElectionCategory {
        id: string
        img: string
        name: string
        progressPercent: number
        totalVotes: number
        votedNum: number
    }

    const ELECTION_CATEGORY_DATA: ElectionCategory[] = Array.from(
        { length: 3 },
        (_, i) => ({
            id: `${i + 1}`,
            img: '/img/avatar11.png',
            name: 'Abayomi Rodima',
            progressPercent: Math.floor(Math.random() * 70 + 40),
            totalVotes: no_of_eligible_voters,
            votedNum: Math.floor(Math.random() * 1400 + 400),
        })
    )

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleDeleteElection = () => {
        handleClose()

        toast('Election deleted successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <>
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                            <p className='text-[1.6rem]'>
                                Are you sure you want to delete this voting
                                program
                            </p>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={handleDeleteElection}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    </div>
                </section>
            </dialog>

            <main className='my-[5rem] grid gap-16 bg-white p-8 rounded-lg'>
                <section className='flex justify-between'>
                    <p className='font-Satoshi-Medium'>Poll Summary</p>
                    <button
                        className=' bg-red-600 px-16 py-4 flex items-center  rounded-lg gap-4 text-white'
                        onClick={() => handleOpen()}
                    >
                        <img src='/img/delete.svg' alt='' />
                        <span className=' text-[1.4rem] font-semibold'>
                            Delete
                        </span>
                    </button>
                </section>
                <section className='grid gap-2 '>
                    <p className='text-[2rem] font-Satoshi-Medium mb-5'>
                        Election Information
                    </p>
                    <section className='grid gap-4 capitalize max-w-[40rem]'>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light'>
                                Title:
                            </p>
                            <p className='font-Satoshi-Medium'>
                                {electionTitle}
                            </p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light'>
                                No. of Eligible Voters:
                            </p>
                            <p className='font-Satoshi-Medium'>
                                {no_of_eligible_voters}
                            </p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light'>
                                Voting Start Date:
                            </p>
                            <p className='font-Satoshi-Medium'>
                                {startDate.toLocaleDateString(undefined, {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light'>
                                Voting End Date:
                            </p>
                            <p className='font-Satoshi-Medium'>
                                {endDate.toLocaleDateString(undefined, {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </section>
                </section>
                <section className='py-14 border-t flex justify-between'>
                    <p className='flex items-center gap-4'>
                        <span>Election Category</span> <AiOutlineDoubleRight />{' '}
                        <span className='font-Satoshi-Medium'>{category}</span>
                    </p>

                    <button className='btn bg-[#FF9500] text-white font-Satoshi-Medium'>Vote Physically</button>
                </section>

                <section className='grid bg-white p-8 rounded-2xl '>
                    {/* <div className='flex items-center gap-2 justify-between mb-10'>
                        <p className='font-Satoshi-Medium'>Installment Info</p>{' '}
                        <div className='relative flex gap-4'>
                            <button
                                className='btn text-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                onClick={() => openElectionDialog()}
                            >
                                View Households
                            </button>
                        </div>
                    </div> */}

                    {/* <div className='grid gap-4 items-center '>
                        <div className='progressBar overflow-hidden '>
                            <progress
                                className='progressBar__item'
                                max={100}
                                value={progressPercent}
                            />

                            <p
                                className={`absolute left-0 text-color-tertiary text-white flex justify-end font-Satoshi-Medium pr-10`}
                                style={{
                                    width: `${progressPercent}%`,
                                }}
                            >
                                <span>{progressPercent}%</span>
                            </p>
                        </div>

                        <div className='flex items-center justify-between font-Satoshi-Light'>
                            <p>
                                {paidResidents} of {totalResidents} resident
                                paid
                            </p>
                            <p>₦{expectedAmount}</p>
                        </div>
                    </div> */}
                </section>
            </main>
        </>
    )
}

export default ViewElection
