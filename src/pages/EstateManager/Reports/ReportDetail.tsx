import { IoMdClose } from 'react-icons/io'



function ReportDetail() {
    
    return (
        <
           
        >
           
            <dialog className='dialog' ref={dialogRef}>
                <section className='  h-[90vh] bg-white rounded-2xl p-16 overflow-x-hidden relative w-[80%] mx-auto'>
                    <IoMdClose
                        className='absolute right-0 top-0 text-[2rem] cursor-pointer m-8'
                        onClick={() => closeDialog()}
                    />
                    <p className='font-Satoshi-Medium text-[2rem] mb-10'>
                        HouseHold Details
                    </p>
                    <div
                        className='flex justify-between gap-8 py-8 bg-[#EDEDFC]'
                        style={{
                            boxShadow: `0 0 0 100vmax #EDEDFC`,
                            clipPath: `inset(0 -100vmax)`,
                        }}
                    >
                        <>
                            {path.map((item) => {
                                return (
                                    <Fragment key={item}>
                                        <input
                                            type='radio'
                                            name='household'
                                            id={item}
                                            checked={item === pathToSwitch}
                                            className='hidden'
                                            onChange={() =>
                                                setPathToSwitch(item)
                                            }
                                        />
                                        <label
                                            htmlFor={item}
                                            className={`capitalize cursor-pointer ${
                                                item === pathToSwitch
                                                    ? 'text-color-blue-1'
                                                    : ''
                                            }`}
                                        >
                                            {item}
                                        </label>
                                    </Fragment>
                                )
                            })}
                        </>
                    </div>
                    <section className='bg-color-white rounded-lg mt-[5rem] mb-[10rem] '>
                        {handlePathSwitch.get(pathToSwitch)}
                    </section>
                </section>
            </dialog>
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
                        <button
                            className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                            onClick={openDeactivateDialog}
                        >
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
                <button
                    className='border-none outline-none text-color-blue-1 mt-16'
                    onClick={handleOpen}
                >
                    Show more details
                </button>
            </div>
        </>
    )
}

export default ReportDetail
