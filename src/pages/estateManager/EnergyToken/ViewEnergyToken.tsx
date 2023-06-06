const ViewEnergyToken = () => {
    return (
        <>
            <div className='grid p-8 bg-white  rounded-lg gap-[10rem]'>
                <div>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        Token Details
                    </p>
                    <div
                        className='grid max-w-[84rem] gap-16 mt-12 '
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Token Seriel Number
                            </label>
                            <input
                                type='text'
                                required
                                id='firstName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Token Code
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4'>
                            <label
                                htmlFor='amount'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Amount
                            </label>
                            <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                                <input
                                    type='text'
                                    required
                                    id='denomination'
                                    name='amount'
                                    defaultValue={6000}
                                    className='w-full border-none outline-none py-4 px-4 pl-5'
                                />
                                <img
                                    src='/icons/Naira.svg'
                                    alt=''
                                    className='absolute'
                                />
                            </div>
                        </div>

                        <div className='grid gap-4'>
                            <label
                                htmlFor='convenienceFee'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Convenience Fee
                            </label>
                            <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                                <input
                                    type='text'
                                    required
                                    id='convenienceFee'
                                    name='convenienceFee'
                                    defaultValue={5000}
                                    className='w-full border-none outline-none py-4 px-4 pl-5'
                                />
                                <img
                                    src='/icons/Naira.svg'
                                    alt=''
                                    className='absolute'
                                />
                            </div>
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='instruction'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Transaction Date
                            </label>
                            <input
                                type='instruction'
                                required
                                id='instruction'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='instruction'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Transaction Time
                            </label>
                            <input
                                type='instruction'
                                required
                                id='instruction'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewEnergyToken
