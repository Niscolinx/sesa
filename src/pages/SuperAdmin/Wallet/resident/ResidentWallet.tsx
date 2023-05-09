import { useState } from 'react'

import WalletBarChart from '../../../../components/SuperAdmin/charts/WalletBarChart'
import { OverviewWallet } from '../../../../components/SuperAdmin/overview/OverviewWallets'

import Table from '../../../../components/UI/table/Table'
import useFetchData from '../../../../utils/useFetchData'

const ResidentWallet = () => {
    // const trend: Array<Trend> = ['This Week', 'This Month', 'This Year']

    // const [selectedTrend, setSelectedTrend] = useState<string>(trend[0])

    type Path = 'resident-balance' | 'transaction-history'

    const paths: Path[] = ['resident-balance', 'transaction-history']

    const [currentPath, setcurrentPath] = useState<Path>('resident-balance')

    const ResidentBalance = () => {
        return (
            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                <Table
                    is_dropdown={false}
                    fetch_url={'/admin/get/wallet/balance/resident'}
                    title={'balance'}
                    THeader={['resident name', 'amount']}
                    data_to_display={['name', 'balance']}
                />
            </div>
        )
    }
    const TransactionHistory = () => {
        return (
            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                <Table
                    fetch_url={'/admin/get/wallet/transaction/resident'}
                    view_page_url={'/superAdmin/wallet/resident/'}
                    title={'history'}
                    isStrictAction
                    actions={['view details']}
                    THeader={[
                        'resident name',
                        'amount',
                        'balance',
                        'transaction_ID',
                        'type',
                        'date',
                        'actions',
                    ]}
                    data_to_display={[
                        'name',
                        'amount',
                        'balance',
                        'tran_id',
                        'type',
                        'created_at',
                    ]}
                />
            </div>
        )
    }

    const handlePathSwitch = new Map([
        ['transaction-history', <TransactionHistory />],
        ['resident-balance', <ResidentBalance />],
    ]) satisfies Map<Path, JSX.Element>

    const { data: graph_data, isLoading: graph_loading } = useFetchData({
        url: '/admin/get/wallet/resident',
        name: 'resident_wallet_graph',
    })

    if (graph_loading) {
        return <p className='p-8'>Loading</p>
    }


    const transFormFetchedGraphData = (data: Record<string, number>) => {
        interface ChartData {
            name: string
            pv: number
        }

        const chartData: ChartData[] = []

        for (let [key, value] of Object.entries(data)) {
            chartData.push({
                name: key.slice(0, 3),
                pv: value,
            })
        }

        return chartData
    }

    const chartData = transFormFetchedGraphData(graph_data.graph)

    return (
        <div>
            <div className='grid mt-12 pb-10 rounded-lg  items-baseline gap-10'>
                <div className='flex justify-between items-center content-start bg-white p-8 rounded-lg'>
                    <OverviewWallet
                        amount={graph_data.resident_sum}
                        title='Resident Wallet'
                        isWalletScreen
                    />
                    <section>
                        <div className='flex gap-4 justify-between items-center mb-5'>
                            <p className='font-Satoshi-Medium'>Wallet Trend</p>
                            {/* <div className='w-[13rem]'>
                                <Select
                                    state={trend}
                                    selectedState={selectedTrend}
                                    setSelectedState={setSelectedTrend}
                                />
                            </div> */}
                        </div>
                        <WalletBarChart chartData={chartData} />
                    </section>
                </div>
                <div className='grid gap-10'>
                    <div className='estateDetail__radioBox'>
                        {paths.map((path) => (
                            <>
                                <input
                                    type='radio'
                                    name='resident'
                                    id={path}
                                    className='hidden'
                                    onChange={() => setcurrentPath(path)}
                                    checked={path === currentPath}
                                />
                                <label htmlFor={path} className='capitalize'>
                                    {path.replace('-', ' ')}
                                </label>
                            </>
                        ))}
                    </div>
                    <div className='mt-8 grid gap-8'>
                        <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                            {handlePathSwitch.get(currentPath)}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidentWallet
