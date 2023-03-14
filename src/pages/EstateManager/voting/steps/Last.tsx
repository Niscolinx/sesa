const Last = () => {
    return (
        <main className='bg-color-white rounded-lg grid gap-16'>
            <section className='capitalize'>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Election Title
                </p>
                <p>Peace Estate 2023 General Election</p>
            </section>

            <section>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Election Categories
                </p>

                <div className='grid gap-8 max-w-[60rem]'>
                    <div className='grid grid-cols-2 mt-[5rem] pb-5 border-b'>
                        <p>President</p>
                        <div className='flex gap-16 '>
                            <div className='relative w-[10rem] flex items-center justify-between'>
                                <img
                                    src='/img/avatar1.png'
                                    alt=''
                                    className='w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-0 z-10'
                                />
                                <img
                                    src='/img/avatar2.png'
                                    alt=''
                                    className='w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-[20%] z-20'
                                />
                                <img
                                    src='/img/avatar3.png'
                                    alt=''
                                    className='w-[3rem] h-[3rem] object-cover rounded-full border border-color-white absolute left-[40%] z-30'
                                />
                            </div>
                            <button className='text-color-blue'>
                                View Candidates
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Last
