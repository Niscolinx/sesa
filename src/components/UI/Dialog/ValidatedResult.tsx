import React, { useEffect, useRef } from 'react'
import { IoMdClose } from 'react-icons/io'

interface Props {
    open: boolean
}

function ValidatedResult({ open }: Props) {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if(open){
            openValidatedDialog()
        
        }
    }, [open])

    const closeValidatedDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openValidatedDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    return (
        <dialog className='dialog' ref={dialogRef}>
            <section className='grid place-content-center w-full h-[100vh]'>
                <div className='bg-white rounded-2xl grid items-baseline w-[90rem] min-h-[30rem] p-10 text-[1.6rem] relative gap-20'>
                    <IoMdClose
                        className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                        onClick={() => closeValidatedDialog()}
                    />

                    <div className='relative h-[14rem] bg-blue-600 w-full mt-10 rounded-lg'>
                        <img
                            src='/img/me.jpeg'
                            alt=''
                            className='w-[10rem] h-[10rem] border rounded-full border-green-600 object-cover absolute bottom-[-6rem] left-10 object-top'
                        />
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
                                <p className='py-4'>
                                    Phone Number | (+234) 813238432
                                </p>
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
                    <button
                        className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem] justify-self-center'
                        onClick={() => closeValidatedDialog()}
                    >
                        Ok
                    </button>
                </div>
            </section>
        </dialog>
    )
}

export default ValidatedResult
