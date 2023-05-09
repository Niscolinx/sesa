import { useState } from 'react'
import Table from '../../../../components/UI/table/Table'
import CommissionDialog from './CommissionDialog'

const CommissionWallet = () => {
   

    return (
        <div className='grid mt-12 pb-10 rounded-lg  items-baseline gap-10'>
            <CommissionDialog />
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
        </div>
    )
}

export default CommissionWallet
