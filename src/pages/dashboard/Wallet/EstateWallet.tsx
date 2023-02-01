import WalletBarChart from '../../../components/charts/WalletBarChart'
import { OverviewWallet } from '../../../components/overview/OverviewWallets'

const EstateWallet = () => {
    return (
        <div>
            <h1 className='heading2'>Estate Wallet</h1>
            <div className='bg-white grid mt-12 pb-10 rounded-lg h-[80vh] p-8 items-baseline'>
                <div className='flex justify-between items-center content-start'>
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

                    <div className=' border-l border-l-color-grey'>
                        <p className='text-[1.6rem]'>Wallet Trend</p>
                        <WalletBarChart />
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi, cumque adipisci veniam ipsum voluptatibus provident quas necessitatibus dicta asperiores quos, ea, quod commodi! Molestias dolorem ipsam veritatis at molestiae.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vitae a sapiente aut temporibus sint aspernatur quas laborum voluptatibus blanditiis recusandae, natus dicta, impedit repudiandae totam? Sapiente tempore necessitatibus sit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur excepturi quidem aliquid 
                </div>
            </div>
        </div>
    )
}

export default EstateWallet
