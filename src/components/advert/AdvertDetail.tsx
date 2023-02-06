import { CopyToClipboard } from 'react-copy-to-clipboard'
import { AiOutlineLink } from 'react-icons/ai'

const link = 'https://sesadigital.com/thelink_copyhere'
const AdvertDetail = () => {
    return (
        <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg text-[1.6rem] gap-10'>
            <section className='grid gap-8'>
                <h2
                   
                    className='text-[2rem] font-Satoshi-Medium'
                >
                    Advert Preview
                </h2>
                <img
                    src='/img/advertHero.png'
                    alt=''
                    className='h-[40rem] w-[120rem] object-cover rounded-lg flex self-stretch'
                />
                <div className='pt-20 grid gap-10'>
                    <h2
                       
                        className='text-[2rem] font-Satoshi-Medium'
                    >
                        Advert Overview
                    </h2>

                    <div className='flex justify-between'>
                        <div className='flex gap-4 items-center'>
                            <img
                                src='/img/video.svg'
                                alt=''
                                className='object-cover w-[4rem] h-[4rem] rounded-full'
                            />
                            <div>
                                <p
                                   className='font-Satoshi-Light'
                                >
                                    Advert Name
                                </p>
                                <p>Pepsi Advert</p>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <img
                                src='/img/startDate.svg'
                                alt=''
                                className='object-cover w-[4rem] h-[4rem] rounded-full'
                            />
                            <div>
                                <p
                                   className='font-Satoshi-Light'
                                >
                                    Start Date
                                </p>
                                <p>12 May, 2022</p>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <img
                                src='/img/endDate.svg'
                                alt=''
                                className='object-cover w-[4rem] h-[4rem] rounded-full'
                            />
                            <div>
                                <p
                                   className='font-Satoshi-Light'
                                >
                                    End Date
                                </p>
                                <p>12 Aug, 2022</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-100 text-gray-400 rounded-lg px-5 flex items-center py-2 gap-4'>
                        <AiOutlineLink className='text-[1.8rem]' />
                        <p className='border-l border-l-gray-300 pl-4'>
                            {link}
                        </p>
                        <CopyToClipboard text={link}>
                            <button className='btn text-white bg-color-blue-1 w-[10rem] rounded-lg ml-auto'>
                                Copy
                            </button>
                        </CopyToClipboard>{' '}
                    </div>
                </div>
            </section>

            <section className='grid gap-8'>
                <h2
                   
                    className='text-[2rem] font-Satoshi-Medium' 
                >
                    Advert Numbers
                </h2>
                <div className='grid grid-cols-2'>
                    <div className='grid gap-4'>
                        <p>Advert Clicks</p>
                        <div>
                            <p className='text-[3rem]'>164</p>
                            <p className=' font-Satoshi-Light text-green-600'>
                                5% increase from yesterday
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdvertDetail
