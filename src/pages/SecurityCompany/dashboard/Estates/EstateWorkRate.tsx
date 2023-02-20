import OverviewChart, { EstateChart } from '../../../../components/SuperAdmin/charts/OverviewChart'
import WalletBarChart from '../../../../components/SuperAdmin/charts/WalletBarChart'

const EstateWorkRate = () => {
    return (
        <div>
            <h1 className='heading2'>Estate Work Rate</h1>
            <div className='mt-8 grid gap-8 bg-white p-8 rounded-lg'>
                <WalletBarChart />

                <div className='overviewChart__box'>
                    <EstateChart/>

                    <div className='overviewChart__label'>
                        <p className='text-[3.4rem] font-bold relative'>
                            45
                            <span>%</span>
                        </p>
                        <p className='text-[1rem] max-w-[9.8rem]'>
                            Resident Wallet
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EstateWorkRate
