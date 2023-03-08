import React from 'react'

function Payments() {
    return (
        <div className='mt-20'>
            <div className=' grid mt-5 '>
                <p className='font-Satoshi-Medium text-[2rem] mb-4'>
                    Product Information
                </p>
                <section className='w-[60rem] grid gap-4'>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start w-[20rem] whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light  '>
                                Product Code:
                            </p>
                            <p>R87231</p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[20rem]'>
                            <p className='text-gray-700 font-Satoshi-Light '>
                                Start Date:
                            </p>
                            <p>22 Feb 2023</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start w-[20rem] whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light  '>
                                Product Name:
                            </p>
                            <p>Car</p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[20rem]'>
                            <p className='text-gray-700 font-Satoshi-Light '>
                                End Date:
                            </p>
                            <p>22 Feb 2023</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start w-[20rem] whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light  '>
                                Amount Type:
                            </p>
                            <p>Installment</p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[20rem]'>
                            <p className='text-gray-700 font-Satoshi-Light '>
                                Track Payment:
                            </p>
                            <p>In progress</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start w-[20rem] whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light  '>
                                Payment Plan:
                            </p>
                            <p>Installment</p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[20rem]'>
                            <p className='text-gray-700 font-Satoshi-Light '>
                                Assigned Group
                            </p>
                            <p>Assigned</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start w-[20rem] whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light  '>
                                Amount (Total):
                            </p>
                            <p>239,092</p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[20rem]'>
                            <p className='text-gray-700 font-Satoshi-Light '>
                                Status
                            </p>
                            <p className='text-green-600'>Active</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 '>
                        <div className='grid grid-cols-2 items-center gap-4 justify-start w-[20rem] whitespace-nowrap'>
                            <p className='text-gray-700 font-Satoshi-Light  '>
                                Product Code:
                            </p>
                            <p>R87231</p>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-4 whitespace-nowrap w-[20rem]'>
                            <p className='text-gray-700 font-Satoshi-Light '>
                                Start Date:
                            </p>
                            <p>22 Feb 2023</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Payments
