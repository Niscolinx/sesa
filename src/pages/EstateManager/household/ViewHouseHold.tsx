import React from 'react'

function ViewHouseHold() {
    return (
        <div className='bg-white p-16 rounded-lg min-h-[90vh] relative'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-8 items-center'>
                    <img
                        src={'/img/avatar11.png'}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                    />
                </div>

                <div className='flex gap-8'>
                    <button className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'>
                        <span className='text-red-600 text-[1.4rem] font-Satoshi-Medium'>
                            Deactivate
                        </span>
                    </button>
                </div>
            </div>
            <div className='mt-20'>
                <h2>Validation Result</h2>

                <div className='border grid mt-5'>
                    <div className='grid grid-cols-2 border-b gap-4'>
                        <p
                            className='border-r py-4 pl-4 text-gray-700'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            Validation Option
                        </p>
                        <p className='py-4'>Phone Number | (+234) 813238432</p>
                    </div>
                    <div className='grid grid-cols-2 border-b gap-4'>
                        <p
                            className='border-r py-4 pl-4 text-gray-700'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            Full Name
                        </p>
                        <p className='py-4'>Michael Okonkwo</p>
                    </div>
                    <div className='grid grid-cols-2 border-b gap-4'>
                        <p
                            className='border-r py-4 pl-4 text-gray-700'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            Date of Birth
                        </p>
                        <p className='py-4'>15 May, 1998</p>
                    </div>
                    <div className='grid grid-cols-2 border-b gap-4'>
                        <p
                            className='border-r py-4 pl-4 text-gray-700'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            Phone Number
                        </p>
                        <p className='py-4'> (+234) 813238432</p>
                    </div>
                    <div className='grid grid-cols-2  gap-4'>
                        <p
                            className='border-r py-4 pl-4 text-gray-700'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            Gender
                        </p>
                        <p className='py-4'>Male</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewHouseHold
