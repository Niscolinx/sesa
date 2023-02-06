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
                    className='h-[40rem] object-cover rounded-lg flex self-stretch'
                />
                <div>
                    <h2
                        style={{
                            fontFamily: 'Satoshi-medium',
                        }}
                        className='text-[2rem]'
                    >
                        Advert Preview
                    </h2>
                </div>
            </section>
        </div>
    )
}

export default AdvertDetail
