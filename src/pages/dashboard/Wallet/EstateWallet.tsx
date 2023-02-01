import WalletBarChart from '../../../components/charts/WalletBarChart'
import { OverviewWallet } from '../../../components/overview/OverviewWallets'

const EstateWallet = () => {
    return (
        <div>
            <h1 className='heading2'>Estate Wallet</h1>
            <div className='bg-white grid mt-12 pb-10 rounded-lg h-[80vh] p-8 items-baseline'>
                <div className='flex justify-between items-center content-start bg-red-400'>
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

                    <div>
                        <WalletBarChart />
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit animi, cumque adipisci veniam ipsum voluptatibus provident quas necessitatibus dicta asperiores quos, ea, quod commodi! Molestias dolorem ipsam veritatis at molestiae.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vitae a sapiente aut temporibus sint aspernatur quas laborum voluptatibus blanditiis recusandae, natus dicta, impedit repudiandae totam? Sapiente tempore necessitatibus sit!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur excepturi quidem aliquid laborum soluta quis libero neque minus sunt at, iure voluptas expedita, harum quam molestiae fugit eos perspiciatis dolorum.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa molestiae odit incidunt nostrum illo eveniet maxime optio totam dolore, eius suscipit eaque sunt cupiditate, assumenda accusantium deserunt vero. Rerum, molestias!
                    Repellendus eum deserunt veritatis officiis repudiandae harum sint tempora enim quae voluptates laboriosam voluptatem rem odio, autem pariatur. Quisquam deserunt ad fugiat placeat illo laboriosam vero itaque autem natus eveniet.
                    Reiciendis, mollitia obcaecati suscipit minima placeat optio cupiditate exercitationem. Nemo libero perspiciatis reprehenderit nesciunt velit veniam beatae voluptatibus, vitae eius, tempora rerum laudantium inventore aliquid quas debitis! Animi, quo illum?
                    Consequuntur nobis quidem aspernatur, unde quaerat labore. Rem doloribus incidunt voluptatibus omnis pariatur, maiores, consequatur quasi cupiditate culpa repellendus reprehenderit repellat, laboriosam non aut expedita impedit esse nemo modi quo?
                </div>
            </div>
        </div>
    )
}

export default EstateWallet
