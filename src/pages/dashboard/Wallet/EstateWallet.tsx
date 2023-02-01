
import WalletBarChart from '../../../components/charts/WalletBarChart'
import { OverviewWallet } from '../../../components/overview/OverviewWallets'


const EstateWallet = () => {
    return (
        <div>
            <h1 className='heading2'>Estate Wallet</h1>
            <div className='bg-white grid mt-12 py-10 gap-8 rounded-lg h-[80vh] p-8'>
                <div className=''>
                    <OverviewWallet
                        amount={1_032_422}
                        title={'Estate Wallet'}
                        isWalletScreen
                        bgImgUri='/icons/overview/card/bgE.svg'
                        lefIconUri='/icons/overview/card/leftE.svg'
                        bgColor='bg-[#97346F]'
                    />
                </div>

                <WalletBarChart/>
            </div>
        </div>
    )
}

export default EstateWallet
