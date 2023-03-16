import { IoMdClose } from 'react-icons/io'



function ReportDetail() {
    
    return (
        <>
            <div className='bg-white p-16 rounded-lg min-h-[90vh] relative'>
                <div className='h-[10rem] w-full bg-[#E59191]'></div>
                <div className=' flex items-center gap-16 justify-end my-20'>
                    <button className='border text-color-blue-1 border-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'>
                        Print
                        <img src='/icons/print.svg' alt='' />
                    </button>
                    <button className='border text-color-blue-1 border-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'>
                        Download
                        <img src='/icons/file_download.svg' alt='' />
                    </button>
                </div>
                <div>
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
                        <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Property Code
                            </p>
                            <p className='py-4'>P09897</p>
                        </div>
                        <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Property Type
                            </p>
                            <p className='py-4'>3 Bedroom Self Con</p>
                        </div>
                        <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Property Class
                            </p>
                            <p className='py-4'>Residential</p>
                        </div>
                        <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Property Address
                            </p>
                            <p className='py-4'>Block 21 Flat 19 , Zone A</p>
                        </div>
                        <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Number of Occupants
                            </p>
                            <p className='py-4'>5</p>
                        </div>
                        <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Number of Access Card
                            </p>
                            <p className='py-4'>3</p>
                        </div>
                        <div className='grid grid-cols-2 border-b border-b-black gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Number of RFID
                            </p>
                            <p className='py-4'>5</p>
                        </div>
                        <div className='grid grid-cols-2  gap-4'>
                            <p
                                className='border-r py-4 pl-4 text-gray-700 border-r-black'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Number of Assigned Products
                            </p>
                            <p className='py-4'>5</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportDetail
