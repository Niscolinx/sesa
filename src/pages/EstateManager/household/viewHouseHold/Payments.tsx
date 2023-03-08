import React from 'react'

function Payments() {
    return (
        <div className='mt-20'>
            <div className=' grid mt-5 '>
                <p className='font-Satoshi-Medium text-[2rem] mb-4'>
                    Product Information
                </p>
                <section>
                    <div className='grid grid-cols-2 gap-4 w-[60rem]'>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start w-[20rem] whitespace-nowrap'>
                            <p className=' py-4  text-gray-700 font-Satoshi-Light  '>
                                Product Code:
                            </p>
                            <p className='py-4'>R87231</p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[20rem]'>
                            <p className=' py-4  text-gray-700 font-Satoshi-Light '>
                                Start Date:
                            </p>
                            <p className='py-4'>22 Feb 2023</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Payments
