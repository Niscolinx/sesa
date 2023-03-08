import React, { useRef } from 'react'

function ViewHouseHold() {
   const dialogRef = useRef<HTMLDialogElement | null>(null)

   const handleClose = () => {
       dialogRef.current?.close()
   }

   const handleOpen = () => {
       dialogRef.current?.showModal()
   }
    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img
                            src='/icons/admins/modalWarning.svg'
                            alt=''
                            className='animate__animated animate__pulse'
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>
                            Are you sure you want to deactivate this Household ?
                        </p>
                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
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
                            onClick={handleOpen}
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
            </div>
        </>
    )
}

export default ViewHouseHold
