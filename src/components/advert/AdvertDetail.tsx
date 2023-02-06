import { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AiOutlineLink } from 'react-icons/ai'
import { GrUp, GrDown } from 'react-icons/gr'
import { HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { Trend } from '../../pages/dashboard/Wallet/EstateWallet'
import ClickRateChart from '../charts/ClickRateChart'

const link = 'https://sesadigital.com/thelink_copyhere'
type Actions = 'Deactivate' | 'Delete'
const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

const AdvertDetail = () => {
    const navigate = useNavigate()

    const [toggleTrendMenu, setToggleTrendMenu] = useState(false)
    const trendMenuToggler = () => setToggleTrendMenu(!toggleTrendMenu)
    const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')
    const handleSelectedTrend = (item: Trend) => {
        setSelectedTrend(item)
        setToggleTrendMenu(false)
    }

    const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (dialogType: Actions) => {
        if (dialogType === 'Deactivate') {
            setDialogType('Deactivate')
        }
        if (dialogType === 'Delete') {
            setDialogType('Delete')
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleSelectedAction = (item: Actions) => {
        if (item === 'Deactivate') {
            handleOpen('Deactivate')
        }

        if (item === 'Delete') {
            handleOpen('Delete')
        }
    }

    const handleDeleteAdvert = () => {
        handleClose()

        toast('Advert deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
    const handleDeactivateAdvert = () => {
        handleClose()

        toast('Advert deactivated successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }

    const showClickRateIncrease = () => {

        navigate('/dashboard/advert/clickrate/increase')
    }

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        {dialogType === 'Deactivate' ? (
                            <>
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to deactivate this
                                    Advert
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
                                        onClick={handleDeactivateAdvert}
                                    >
                                        Deactivate
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to delete this Advert
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
                                        onClick={handleDeleteAdvert}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[85vh] items-baseline overflow-y-scroll rounded-lg text-[1.6rem] gap-[10rem]'>
                <section className='grid gap-8'>
                    <h2 className='text-[2rem] font-Satoshi-Medium'>
                        Advert Preview
                    </h2>
                    <img
                        src='/img/advertHero.png'
                        alt=''
                        className='h-[40rem] w-[120rem] object-cover rounded-lg flex self-stretch'
                    />
                    <div className='pt-20 grid gap-10'>
                        <h2 className='text-[2rem] font-Satoshi-Medium'>
                            Advert Overview
                        </h2>

                        <div className='flex justify-between'>
                            <div className='flex gap-4 items-center'>
                                <img
                                    src='/img/video.svg'
                                    alt=''
                                    className='object-cover w-[4rem] h-[4rem] rounded-full'
                                />
                                <div>
                                    <p className='font-Satoshi-Light'>
                                        Advert Name
                                    </p>
                                    <p>Pepsi Advert</p>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <img
                                    src='/img/startDate.svg'
                                    alt=''
                                    className='object-cover w-[4rem] h-[4rem] rounded-full'
                                />
                                <div>
                                    <p className='font-Satoshi-Light'>
                                        Start Date
                                    </p>
                                    <p>12 May, 2022</p>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <img
                                    src='/img/endDate.svg'
                                    alt=''
                                    className='object-cover w-[4rem] h-[4rem] rounded-full'
                                />
                                <div>
                                    <p className='font-Satoshi-Light'>
                                        End Date
                                    </p>
                                    <p>12 Aug, 2022</p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-gray-100 text-gray-400 rounded-lg px-5 flex items-center py-2 gap-4'>
                            <AiOutlineLink className='text-[1.8rem]' />
                            <p className='border-l border-l-gray-300 pl-4'>
                                {link}
                            </p>
                            <CopyToClipboard text={link}>
                                <button className='btn text-white bg-color-blue-1 w-[10rem] rounded-lg ml-auto'>
                                    Copy
                                </button>
                            </CopyToClipboard>{' '}
                        </div>
                    </div>
                </section>

                <section className='grid gap-8'>
                    <h2 className='text-[2rem] font-Satoshi-Medium'>
                        Advert Numbers
                    </h2>
                    <div
                        className='grid'
                        style={{
                            gridTemplateColumns: '2fr 1fr 2fr',
                        }}
                    >
                        <div className='grid justify-items-start'>
                            <p>Advert Clicks</p>
                            <div className='flex gap-4'>
                                <p className='text-[3rem]'>164</p>
                                <p className=' font-Satoshi-Light text-green-500 flex items-center'>
                                    <HiArrowSmUp />
                                    <span>5% increase from yesterday</span>
                                </p>
                            </div>
                            <button
                                className=' text-color-blue-1'
                                onClick={showClickRateIncrease}
                            >
                                View Details
                            </button>
                        </div>
                        <div className='h-full w-[1px] bg-gray-300'>&nbsp;</div>
                        <div className='grid justify-items-start'>
                            <p>Advert Views</p>
                            <div className='flex gap-4'>
                                <p className='text-[3rem]'>164</p>
                                <p className=' font-Satoshi-Light text-red-500 flex items-center'>
                                    <HiArrowSmDown />
                                    <span>5% increase from yesterday</span>
                                </p>
                            </div>
                            <button className=' text-color-blue-1'>
                                View Details
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <p className='text-[1.6rem] font-bold p-8'>
                                Click Rate
                            </p>

                            <div className='relative grid gap-4'>
                                <div className='relative flex items-center w-[12rem]'>
                                    <p
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                        onClick={trendMenuToggler}
                                    >
                                        {selectedTrend}
                                    </p>
                                    {toggleTrendMenu ? (
                                        <GrUp className='absolute right-4' />
                                    ) : (
                                        <GrDown className='absolute right-4' />
                                    )}
                                </div>

                                {toggleTrendMenu && (
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
                        <ClickRateChart />
                    </div>
                </section>
                <section className='flex gap-8'>
                    <button
                        className='border border-color-blue-1 text-color-blue-1 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleSelectedAction('Deactivate')}
                    >
                        <span className=' text-[1.4rem] font-semibold'>
                            Deactivate
                        </span>
                    </button>
                    <button
                        className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleSelectedAction('Delete')}
                    >
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold'>
                            Delete
                        </span>
                    </button>
                </section>
            </div>
        </>
    )
}

export default AdvertDetail
