import OverviewChart, {
    EstateChart,
} from '../../../../components/SuperAdmin/charts/OverviewChart'
import WalletBarChart from '../../../../components/SuperAdmin/charts/WalletBarChart'

const EstateWorkRate = () => {
    return (
        <div>
            <h1 className='heading2'>Estate Work Rate</h1>
            <div className='mt-8 grid gap-8 bg-white p-8 rounded-lg'>
                <WalletBarChart />
                <div>
                    <section className='overviewChart__box'>
                        <EstateChart />

                        <div className='overviewChart__label'>
                            <p className='text-[3rem] font-bold relative'>
                                50,000
                            </p>
                            <p className='text-[1.2rem] max-w-[9.8rem]'>
                                Total Check-Out
                            </p>
                        </div>
                    </section>
                    <div>
                        <section>
                            <div>
                                <span className='bg-[#08d231] rounded-full w-[1rem] h-[1rem] flex'>
                                    {' '}
                                </span>{' '}
                                <p>Security Guard</p>
                            </div>
                            <p>20,000</p>
                        </section>
                        <section>
                            <div>
                                <span className='bg-[#f7e541] rounded-full w-[1rem] h-[1rem] flex'>
                                    {' '}
                                </span>{' '}
                                <p>SESA</p>
                            </div>
                            <p>30,000</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EstateWorkRate
