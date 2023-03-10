import { useRef, useState } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import { useLocation } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import WalletBarChart from '../../../components/SuperAdmin/charts/WalletBarChart'

const ViewPayment = () => {
    const location = useLocation()

    const paymentData = location.state || {}

    const {
        id,
        paymentAmount,
        paymentCode,
        paymentName,
        paymentPlan,
        paymentType,
        totalResidents,
        trackPayment,
        paidResidents,
        progressPercent,
        startDate,
        endDate,
        status,
        amountToPay,
        createDate,
        expectedAmount,
    } =  paymentData

type Trend = 'This Week' | 'This Month' | 'This Year'

const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

const [toggleMenu, setToggleMenu] = useState(false)
const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')
const [isWithdrawal, setIsWithdrawal] = useState(true)

const menuToggler = () => setToggleMenu(!toggleMenu)

const handleSelectedTrend = (item: Trend) => {
    setSelectedTrend(item)
    setToggleMenu(false)
}
   

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

    const handleDeletePayment = () => {
        handleClose()

        toast('Payment deleted successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const paymentListDialogRef = useRef<HTMLDialogElement | null>(null)

    const closeRecipientListDialog = () => {
        if (paymentListDialogRef.current) {
            paymentListDialogRef.current.close()
        }
    }

    const openRecipientListDialog = () => {
        if (paymentListDialogRef.current) {
            paymentListDialogRef.current.showModal()
        }
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
                                Are you sure you want to delete this Payment
                                Plan
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
                                    onClick={handleDeletePayment}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    </div>
                </section>
            </dialog>
            <main className='my-[5rem] grid gap-8'>
                <section className='flex justify-between'>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        {paymentName}
                    </p>
                    <div className='flex gap-8'>
                        <button
                            className='border border-color-blue-1 text-color-blue-1 px-16 py-4 flex items-center  rounded-lg gap-4 '
                            onClick={() => handleOpen()}
                        >
                            <span className=' text-[1.4rem] font-semibold'>
                                Edit Payment
                            </span>
                        </button>
                        <button
                            className=' bg-red-600 px-16 py-4 flex items-center  rounded-lg gap-4 text-white'
                            onClick={() => handleOpen()}
                        >
                            <img src='/img/delete.svg' alt='' />
                            <span className=' text-[1.4rem] font-semibold'>
                                Delete payment
                            </span>
                        </button>
                    </div>
                </section>
                <section className='grid relative p-16 bg-white rounded-lg gap-2 '>
                    <section className='grid gap-4 capitalize'>
                        <div className='flex justify-between gap-4 '>
                            <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                <p className='text-gray-700 font-Satoshi-Light'>
                                    Payment Code:
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {paymentCode}
                                </p>
                            </div>
                            <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                <p className='text-gray-700 font-Satoshi-Light '>
                                    Start Date:
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {startDate}
                                </p>
                            </div>
                        </div>
                        <div className='flex justify-between gap-4 '>
                            <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                <p className='text-gray-700 font-Satoshi-Light  '>
                                    Payment Name:
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {paymentName}
                                </p>
                            </div>
                            <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                <p className='text-gray-700 font-Satoshi-Light '>
                                    End Date:
                                </p>
                                <p className='font-Satoshi-Medium'>{endDate}</p>
                            </div>
                        </div>
                        <div className='flex justify-between gap-4 '>
                            <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                <p className='text-gray-700 font-Satoshi-Light  '>
                                    Payment Type
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {paymentType}
                                </p>
                            </div>
                            <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                <p className='text-gray-700 font-Satoshi-Light '>
                                    Track Payment:
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {trackPayment}
                                </p>
                            </div>
                        </div>
                        <div className='flex justify-between gap-4 '>
                            <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                <p className='text-gray-700 font-Satoshi-Light  '>
                                    Payment Plan:
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {paymentPlan}
                                </p>
                            </div>
                            <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                <p className='text-gray-700 font-Satoshi-Light '>
                                    Status
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {status === 'active' ? (
                                        <span className='text-green-600'>
                                            {status}
                                        </span>
                                    ) : (
                                        <span className='text-red-600'>
                                            {status}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className='flex justify-between gap-4 '>
                            <div className='grid grid-cols-2 items-center gap-4 justify-start w-[25rem] whitespace-nowrap'>
                                <p className='text-gray-700 font-Satoshi-Light  '>
                                    Payment Amount:
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    ₦{paymentAmount}
                                </p>
                            </div>
                            <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[25rem]'>
                                <p className='text-gray-700 font-Satoshi-Light '>
                                    Create Date:
                                </p>
                                <p className='font-Satoshi-Medium'>
                                    {createDate}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className='mt-[5rem] grid '>
                        <p className='flex items-center gap-2'>
                            <span className='font-Satoshi-Medium'>
                                Payment Status:{' '}
                            </span>{' '}
                        </p>

                        <div className='grid gap-4 items-center '>
                            <p className='justify-self-end'>₦{amountToPay}</p>
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
                        </div>
                    </section>
                </section>
                <section className='border-l border-l-color-grey bg-white rounded-lg p-8 grid gap-10'>
                    <div className='flex justify-between'>
                        <p className='text-[1.6rem] font-bold p-8'>
                            Payment Trend
                        </p>

                        <div className='relative grid gap-4'>
                            <div className='relative flex items-center w-[12rem]'>
                                <button
                                    className='btn border border-color-blue-1 text-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                                    style={{ justifySelf: 'start' }}
                                    onClick={() => openRecipientListDialog()}
                                >
                                    Add Recipients
                                </button>
                                <p
                                    className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                    onClick={menuToggler}
                                >
                                    {selectedTrend}
                                </p>
                                {toggleMenu ? (
                                    <GrUp className='absolute right-4' />
                                ) : (
                                    <GrDown className='absolute right-4' />
                                )}
                            </div>

                            {toggleMenu && (
                                <div className='absolute top-[8rem]  left-0 border border-color-primary-light  bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                    {trend.map((item, index) => (
                                        <p
                                            className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                            key={index}
                                            onClick={() =>
                                                handleSelectedTrend(item)
                                            }
                                        >
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className=' flex justify-center'>
                        <WalletBarChart width={1000} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default ViewPayment
