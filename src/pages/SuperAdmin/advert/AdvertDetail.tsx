import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AiOutlineLink } from 'react-icons/ai'
import { HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router'
import ClickRateChart from '../../../components/superAdmin/charts/ClickRateChart'
import { Select } from '../../../components/ui/Select'
import useFetchData from '../../../utils/UseFetchData'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'

const AdvertDetail = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [selectedWeek, setSelectedWeek] = useState('Weekly')

    const advert_id = params.id?.replace(':', '')

    const { data, isLoading } = useFetchData({
        url: `/advert/getbyid/${advert_id}`,
        name: `advert_${advert_id}`,
    })

    const goToClicks = () => {
        navigate(`/superAdmin/advert/clicks/${advert_id}`)
    }

    const goToViews = () => {
        navigate(`/superAdmin/advert/views/${advert_id}`)
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

    return (
        <>
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
                                onClick={goToClicks}
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
                                onClick={goToViews}
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
                    <Activate_Deactivate
                        id={advert_id!}
                        url={'/advert/deactivate_activate'}
                        status={status}
                        title={'advert'}
                        queryCache={`advert_${advert_id}`}
                    />
                </section>
            </div>
        </>
    )
}

export default AdvertDetail
