const AdvertDetail = () => {
    return (
        <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
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
                <div className="pt-10">
                    <h2
                        style={{
                            fontFamily: 'Satoshi-medium',
                        }}
                        className='text-[2rem]'
                    >
                        Advert Overview
                    </h2>


                    <div className="flex justify-between">

                    <div className="flex gap-4">
                        <img src="/icons/video.svg" alt="" className="object-cover w-[4rem] h-[4rem] rounded-full"/>
                        <div>
                            <p style={{
                                fontFamily: 'Satoshi-light',
                            }}>Advert Name</p>
                            <p>Pepsi Advert</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdvertDetail
