import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AiOutlineLink } from 'react-icons/ai'
import { GrUp, GrDown } from 'react-icons/gr'
import { HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi'
import { LineChart } from 'recharts'
import { Trend } from '../../pages/dashboard/Wallet/EstateWallet'
import ClickRateChart from '../charts/ClickRateChart'
import WalletBarChart from '../charts/WalletBarChart'

const link = 'https://sesadigital.com/thelink_copyhere'
const AdvertDetail = () => {

        const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

    const [toggleTrendMenu, setToggleTrendMenu] = useState(false)


    const trendMenuToggler = () => setToggleTrendMenu(!toggleTrendMenu)

     const [selectedTrend, setSelectedTrend] = useState<Trend>('This Week')


     const handleSelectedTrend = (item: Trend) => {
         setSelectedTrend(item)
         setToggleTrendMenu(false)
     }

    return (
        <div className='grid p-8 bg-white h-[85vh] items-baseline overflow-y-scroll rounded-lg text-[1.6rem] gap-10'>
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
                                <p className='font-Satoshi-Light'>Start Date</p>
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
                                <p className='font-Satoshi-Light'>End Date</p>
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
                        <button className=' text-color-blue-1'>
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
                <div className='border-l border-l-color-grey'>
                    <div className='flex justify-between'>
                        <p className='text-[1.6rem] font-bold p-8'>
                            Wallet Trend
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
        </div>
    )
}

export default AdvertDetail
