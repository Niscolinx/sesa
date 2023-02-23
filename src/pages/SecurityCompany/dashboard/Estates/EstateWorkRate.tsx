import { EstateChart } from '../../../../components/SuperAdmin/charts/OverviewChart'
import { EstateBarChart } from '../../../../components/SuperAdmin/charts/WalletBarChart'

const EstateWorkRate = () => {
    return (
        <div>
            <main className='grid gap-10'>
                <div className='mt-8 flex gap-8 justify-between'>
                    <div className='bg-white p-8 rounded-lg grid justify-center'>
                        <section className='flex items-center mb-20'>
                            <p className='text-[1.8rem] whitespace-nowrap'>
                                Check-In
                            </p>
                            <div className='flex justify-center gap-20 w-full '>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#08d231] w-[1rem] h-[1rem] flex'>
                                        {' '}
                                    </span>{' '}
                                    <p>Security Guard</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#f7e541] w-[1rem] h-[1rem] flex'>
                                        {' '}
                                    </span>{' '}
                                    <p>System</p>
                                </div>
                            </div>
                        </section>
                        <EstateBarChart color1='#08D231' color2='#f7e541' />
                    </div>
                    <div className='bg-white p-8 rounded-lg'>
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
                            <section className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#08d231] rounded-full w-[1rem] h-[1rem] flex'>
                                        {' '}
                                    </span>{' '}
                                    <p>Security Guard</p>
                                </div>
                                <p>20,000</p>
                            </section>
                            <section className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
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
                <div className='mt-8 flex gap-8 justify-between'>
                    <div className='bg-white p-8 rounded-lg grid justify-center'>
                        <section className='flex items-center mb-20'>
                            <p className='text-[1.8rem] whitespace-nowrap'>
                                Check-Out
                            </p>
                            <div className='flex justify-center gap-20 w-full '>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#08d231] w-[1rem] h-[1rem] flex'>
                                        {' '}
                                    </span>{' '}
                                    <p>Security Guard</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#f7e541] w-[1rem] h-[1rem] flex'>
                                        {' '}
                                    </span>{' '}
                                    <p>System</p>
                                </div>
                            </div>
                        </section>
                        <EstateBarChart color1='#3d08d2' color2='#F74183' />
                    </div>
                    <div className='bg-white p-8 rounded-lg'>
                        <section className='overviewChart__box'>
                            <EstateChart color1='#3d08d2' color2='#F74183' />

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
                            <section className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#3d08d2] rounded-full w-[1rem] h-[1rem] flex'>
                                        {' '}
                                    </span>{' '}
                                    <p>Security Guard</p>
                                </div>
                                <p>20,000</p>
                            </section>
                            <section className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className='bg-[#F74183] rounded-full w-[1rem] h-[1rem] flex'>
                                        {' '}
                                    </span>{' '}
                                    <p>SESA</p>
                                </div>
                                <p>30,000</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EstateWorkRate
