
import OverviewChart from '../../components/SuperAdmin/charts/OverviewChart'

import  { OverviewWallet } from '../../components/SuperAdmin/overview/OverviewWallets'
import OverviewCard from '../../components/EstateManager/OverviewCard'


export const overviewChart_data = [
    { name: 'Resident Wallet', value: 10 },
    { name: 'Security Company Wallet', value: 10 },
    { name: 'Estate Wallet', value: 45 },
    { name: 'Commission Wallet', value: 17 },
]

export const overviewChart_colors = ['#EA0B90', '#23C375', '#098DFF', '#404243']

const Overview = () => {


  


    return (
        <div className='overview'>
            <div className='overview__container'>
                <section className='overview__left'>
                    <OverviewCard iconUrl={''} title={''} number={0} bgColor={''} textColor={''} />
                </section>
                <section className='overview__right'>
                    <OverviewWallet
                        amount={200_333_500.89}
                        title='Estate Wallet'
                        isWalletScreen
                    />

                    <div className='overviewChart'>
                        <p className='overviewChart__heading'>Today's Inflow</p>
                        <div className='overviewChart__box'>
                            <OverviewChart />

                            <div className='overviewChart__label'>
                                <p className='overviewChart__label--percentage'>
                                    45
                                    <span>%</span>
                                </p>
                                <p className='overviewChart__label--title'>
                                    Estate Wallet
                                </p>
                            </div>
                        </div>
                        <ul className='overviewChart__list'>
                            {React.Children.toArray(
                                overviewChart_data.map((item, index) => {
                                    return (
                                        <li className='overviewChart__list--item'>
                                            <span
                                                style={{
                                                    background:
                                                        overviewChart_colors[
                                                            index
                                                        ],
                                                }}
                                            >
                                                &nbsp;
                                            </span>
                                            <p>{item.name}</p>
                                        </li>
                                    )
                                })
                            )}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Overview
