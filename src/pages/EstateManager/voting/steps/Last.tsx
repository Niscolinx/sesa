


const Last = () => {
   

    return (
        <main className='bg-color-white rounded-lg'>
           
          <section className='capitalize'>
            <p className='text-[2rem] font-Satoshi-Medium'>Election Title</p>
            <p>Peace Estate 2023 General Election</p>
          </section>

          <section>
            <p className='text-[2rem] font-Satoshi-Medium'>Election Categories</p>

            <div className='grid gap-8 max-w-[60rem]'>
                <div className="grid grid-cols-2">
                    <p>President</p>
                    <div className="flex gap-16">
                    <div className="relative">
                        <img src="/img/avatar11.png" alt="" />
                    </div>
                    <button className='text-color-blue'>View Candidates</button>
                    </div>
                </div>
            </div>
          </section>
        </main>
    )
}

export default Last
