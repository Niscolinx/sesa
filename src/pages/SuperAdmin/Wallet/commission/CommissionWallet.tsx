import { useState } from 'react'
import Table from '../../../../components/UI/table/Table'
import CommissionDialog from './CommissionDialog'

const CommissionWallet = () => {
    type Path = 'balance' | 'history'

    const paths: Path[] = ['balance', 'history']

    const [currentPath, setcurrentPath] = useState<Path>('balance')

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
        ['history', <TransactionHistory />],
        ['balance', <ResidentBalance />],
    ]) satisfies Map<Path, JSX.Element>

    return (

            <div className='grid mt-12 pb-10 rounded-lg  items-baseline gap-10'>
            
                <CommissionDialog />
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

export default CommissionWallet
