import { useState } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import WalletBarChart from '../../../components/charts/WalletBarChart'
import { OverviewWallet } from '../../../components/overview/OverviewWallets'

type Trend = 'This Week' | 'This Month' | 'This Year' 

const EtrendWallet = () => {
    const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

    const [toggleTrendMenu, setToggleTrendMenu] = useState(false)
    const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null)

    const trendMenuToggler = () => setToggleTrendMenu(!toggleTrendMenu)

    const handleSelectedTrend = (item: Trend) => {
        setSelectedTrend(item)
        setToggleTrendMenu(false)
    }
    return (
        <div>
            <h1 className='heading2'>Etrend Wallet</h1>
            <div className='bg-white grid mt-12 pb-10 rounded-lg h-[80vh] p-8 items-baseline'>
                <div className='flex justify-between items-center content-start'>
                    <div className=''>
                        <OverviewWallet
                            amount={1_032_422}
                            title={'Etrend Wallet'}
                            isWalletScreen
                            bgImgUri='/icons/overview/card/bgE.svg'
                            lefIconUri='/icons/overview/card/leftE.svg'
                            bgColor='bg-[#97346F]'
                        />
                    </div>

                    <div className=' border-l border-l-color-grey'>
                        <div className='flex justify-between'>
                            <p className='text-[1.6rem] font-bold p-8'>
                                Wallet Trend
                            </p>

                            <div className='relative grid gap-4'>
                                
                                <div className='relative flex items-center'>
                                    <p
                                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                        onClick={trendMenuToggler}
                                    >
                                        {selectedTrend ? (
                                            selectedTrend
                                        ) : (
                                            <span className='text-gray-500'>
                                               Trend
                                            </span>
                                        )}
                                    </p>
                                    {toggleTrendMenu ? (
                                        <GrUp className='absolute right-4' />
                                    ) : (
                                        <GrDown className='absolute right-4' />
                                    )}
                                </div>

                                {toggleTrendMenu && (
                                    <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[30rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
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
                        <WalletBarChart />
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit animi, cumque adipisci veniam ipsum
                    voluptatibus provident quas necessitatibus dicta asperiores
                    quos, ea, quod commodi! Molestias dolorem ipsam veritatis at
                    molestiae. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Cumque vitae a sapiente aut temporibus
                    sint aspernatur quas laborum voluptatibus blanditiis
                    recusandae, natus dicta, impedit repudiandae totam? Sapiente
                    tempore necessitatibus sit! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Consequatur excepturi quidem
                    aliquid
                </div>
            </div>
        </div>
    )
}

export default EtrendWallet
