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
                <div className='border grid mt-5 border-black'>
                    <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                        <p
                            className='border-r py-4 pl-4 text-gray-700 border-r-black'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            Estate
                        </p>
                        <p className='py-4'>Sandfill</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewHouseHold
