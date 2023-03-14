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
                       
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Last
