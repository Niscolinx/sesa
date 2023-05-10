import { SetStateAction, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AiOutlineLink } from 'react-icons/ai'
import { GrUp, GrDown } from 'react-icons/gr'
import { HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import ClickRateChart from '../../../components/SuperAdmin/charts/ClickRateChart'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import useFetchData from '../../../utils/useFetchData'
import useAxios from '../../../components/hooks/useAxios'
import { useMutation, useQueryClient } from 'react-query'

// const link = 'https://sesadigital.com/thelink_copyhere'
type Actions = 'Deactivate' | 'Delete'

const AdvertDetail = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [selectedWeek, setSelectedWeek] = useState('Weekly')

    const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const axiosInstance = useAxios()

    const advert_id = params.id?.replace(':', '')

    const { data, isLoading } = useFetchData({
        url: `/advert/getbyid/${advert_id}`,
        name: `advert_${advert_id}`,
    })

    const postDeactivate = () => {
        return axiosInstance({
            url: '/advert/deactivate_activate',
            method: 'post',
            data: { id: advert_id },
        })
    }

    const queryClient = useQueryClient()
    const { mutate: deactivate_mutation, isLoading: deactivate_loading } =
        useMutation(postDeactivate, {
            onSuccess: (data) => {
                toast('Successful', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })

                handleClose()
            },
            onError: (err: any) => {
                toast(`Operation Failed `, {
                    type: 'error',
                    className:
                        'bg-red-100 text-red-600 text-[1.4rem] capitalize',
                })

                                handleClose()

            },

            onSettled: () => {

                queryClient.invalidateQueries(`advert_${advert_id}`)

            }


        }) as any

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

    const handleDeactivateAdvert = () => {
        handleClose()

        deactivate_mutation()


    }

    const showClickRateIncrease = () => {
        navigate('/superAdmin/advert/clickrate/increase')
    }

    const showClickRateDecrease = () => {
        navigate('/superAdmin/advert/clickrate/decrease')
    }

    if (isLoading) {
        return <p className='p-8'>Loading...</p>
    }

    const {
        image,
        advert_name,
        start_date,
        status,
        end_date,
        percentage_click_diff,
        total_view,
        total_click,
        url: link,
        percentage_view_diff,
    } = data

    console.log({data})

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <>
                            <img
                                src='/icons/admins/modalDeactivate.svg'
                                alt=''
                            />
                            <p className='text-[1.6rem]'>
                                Are you sure you want to deactivate this Advert
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
                        )
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[85vh] items-baseline overflow-y-scroll rounded-lg text-[1.6rem] gap-[10rem]'>
                <section className='grid gap-8'>
                    <h2 className='text-[2rem] font-Satoshi-Medium'>
                        Advert Preview
                    </h2>
                    <img
                        src={image || '/img/advertHero.png'}
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
                                    <p>{advert_name}</p>
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
                                    <p>{start_date}</p>
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
                                    <p>{end_date}</p>
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
                                <p className='text-[3rem]'>{total_click}</p>
                                <p className=' font-Satoshi-Light text-green-500 flex items-center'>
                                    <HiArrowSmUp />
                                    <span>
                                        {percentage_click_diff}% increase from
                                        yesterday
                                    </span>
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
                                <p className='text-[3rem]'>{total_view}</p>
                                <p className=' font-Satoshi-Light text-red-500 flex items-center'>
                                    <HiArrowSmDown />
                                    <span>
                                        {percentage_view_diff}% decrease from
                                        yesterday
                                    </span>
                                </p>
                            </div>
                            <button
                                className=' text-color-blue-1'
                                onClick={showClickRateDecrease}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between'>
                            <p className='text-[1.6rem] font-Satoshi-Medium p-8'>
                                Click Rate
                            </p>

                            <Select
                                state={['Weekly', 'Monthly', 'Yearly']}
                                selectedState={selectedWeek}
                                setSelectedState={setSelectedWeek}
                            />
                        </div>
                        <ClickRateChart />
                    </div>
                </section>
                <section className='flex gap-8'>
                    <button
                        className='border border-color-blue-1 text-color-blue-1 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleSelectedAction('Deactivate')}
                    >
                        <span className=' text-[1.4rem] font-semibold capitalize'>
                            {status ? 'deactivate' : 'activate'}
                        </span>
                    </button>
                    
                </section>
            </div>
        </>
    )
}

export default AdvertDetail
