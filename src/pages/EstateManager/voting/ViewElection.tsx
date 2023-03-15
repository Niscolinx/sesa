import { useRef } from 'react'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ElectionInfo } from './Voting'
import { EstateChart as Chart } from '../../../components/SuperAdmin/charts/OverviewChart'

const ViewElection = () => {
    const location = useLocation()
    const property_data = [
        { name: 'online', value: 40 },
        { name: 'physical', value: 60 },
    ]

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
            progressPercent: Math.floor(Math.random() * 60 + 20),
            totalVotes: no_of_eligible_voters,
            votedNum: Math.floor(Math.random() * 1400 + 400),
        })
    )

    console.log(ELECTION_CATEGORY_DATA)

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

            <main className='my-[5rem] grid gap-16 bg-white p-16 rounded-lg'>
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

                    <button className='btn rounded-2xl bg-[#FF9500] text-white font-Satoshi-Medium'>
                        Vote Physically
                    </button>
                </section>
                <section className='grid gap-16'>
                    {ELECTION_CATEGORY_DATA.map((item, i) => (
                        <div className='flex items-center gap-8' key={i}>
                            <img
                                src={`/img/avatar${i + 1}.png`}
                                alt=''
                                className='w-[6rem] h-[6rem] rounded-full object-cover'
                            />
                            <div className='grid gap-4 items-center  w-full'>
                                <div className='flex justify-between'>
                                    <p>{item.name}</p>
                                    <p>{item.progressPercent}%</p>
                                </div>
                                <div className='progressBarBlue overflow-hidden'>
                                    <progress
                                        className='progressBarBlue__item'
                                        max={100}
                                        value={item.progressPercent}
                                    />
                                </div>

                                <div className='flex items-center justify-between font-Satoshi-Light'>
                                    <p>
                                        <span className='font-Satoshi-Medium'>
                                            {item.votedNum}{' '}
                                        </span>
                                        votes of{' '}
                                        <span className='font-Satoshi-Medium'>
                                            {item.totalVotes}
                                        </span>{' '}
                                        total Votes
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                <section className='flex items-center gap-16'>
                    <div className='overviewChart__box'>
                        <Chart
                            color1='#3DEABA'
                            color2='#F0D02B'
                            outerRadius={90}
                            data={property_data}
                        />

                        <div className='overviewChart__label'>
                            <p className='text-[1.2rem] max-w-[9.8rem]'>
                                Total Votes
                            </p>
                            <p className='text-[3rem] font-Satoshi-Medium relative text-[#FF0000]'>
                                {no_of_eligible_voters}
                            </p>
                        </div>
                    </div>
                    <div className='grid gap-4'>
                        <div className='flex justify-between items-center gap-4 w-[20rem]'>
                            <div className='flex items-center gap-2'>
                                <span className='w-[1rem] h-[1rem] rounded-full bg-[#3DEABA]'>
                                    &nbsp;
                                </span>
                                <p>Online</p>
                            </div>
                            <p>20,000</p>
                        </div>
                        <div className='flex justify-between items-center gap-4 w-[20rem]'>
                            <div className='flex items-center gap-2'>
                                <span className='w-[1rem] h-[1rem] rounded-full bg-[#F0D02B]'>
                                    &nbsp;
                                </span>
                                <p>Physical</p>
                            </div>
                            <p>50,000</p>
                        </div>
                    </div>
                </section>{' '}
            </main>
        </>
    )
}

export default ViewElection
