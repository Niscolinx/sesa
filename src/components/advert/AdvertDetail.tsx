import { CopyToClipboard } from 'react-copy-to-clipboard'
import {AiOutlineLink} from 'react-icons/ai'

const AdvertDetail = () => {
    return (
        <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg text-[1.6rem]'>
            <section className='grid gap-8'>
                <h2
                    style={{
                        fontFamily: 'Satoshi-medium',
                    }}
                    className='text-[2rem]'
                >
                    Advert Preview
                </h2>
                <img
                    src='/img/advertHero.png'
                    alt=''
                    className='h-[40rem] w-[120rem] object-cover rounded-lg flex self-stretch'
                />
                <div className='pt-20'>
                    <h2
                        style={{
                            fontFamily: 'Satoshi-medium',
                        }}
                        className='text-[2rem]'
                    >
                        Advert Overview
                    </h2>

                    <div className='flex justify-between mt-10'>
                        <div className='flex gap-4 items-center'>
                            <img
                                src='/img/video.svg'
                                alt=''
                                className='object-cover w-[4rem] h-[4rem] rounded-full'
                            />
                            <div>
                                <p
                                    style={{
                                        fontFamily: 'Satoshi-light',
                                    }}
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
                                    style={{
                                        fontFamily: 'Satoshi-light',
                                    }}
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
                                    style={{
                                        fontFamily: 'Satoshi-light',
                                    }}
                                >
                                    End Date
                                </p>
                                <p>12 Aug, 2022</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <CopyToClipboard text={user.referralLink}>
                            <button className='bg-orange-300 rounded-lg py-2 px-3 font-semibold justify-self-center place-self-end'>
                                Copy Link
                            </button>
                        </CopyToClipboard>{' '}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdvertDetail
