import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'

const NotificationSettings = () => {
    const [isInAppOn, setISInAppOn] = useState(true)
    const [isSmsOn, setIsSmsOn] = useState(false)

    const toggleIsInAppOn = () => setISInAppOn(!isInAppOn)
    const toggleIsSmsOn = () => setIsSmsOn(!isSmsOn)

    return (
        <>
            <ToastContainer />
            <div className=' p-8 bg-white h-[80vh] overflow-y-scroll rounded-lg'>
                <section className='mb-20 grid gap-2'>
                    <p
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Notification Settings
                    </p>
                    <p>
                        Select method of notifying security guards when
                        assigning or reassigning occurs
                    </p>
                </section>

                <section>
                    <div className='grid gap-10 w-[60rem]'>
                        <div className='grid grid-cols-2 items-center gap-16 '>
                            <p>In-App</p>
                            <div onClick={toggleIsInAppOn}>
                                {isInAppOn ? (
                                    <img
                                        src='/icons/admins/switchOn.svg'
                                        alt=''
                                    />
                                ) : (
                                    <img
                                        src='/icons/admins/switchOff.svg'
                                        alt=''
                                    />
                                )}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 items-center gap-16'>
                            <p>SMS</p>
                            <div onClick={toggleIsSmsOn}>
                                {isSmsOn ? (
                                    <img
                                        src='/icons/admins/switchOn.svg'
                                        alt=''
                                    />
                                ) : (
                                    <img
                                        src='/icons/admins/switchOff.svg'
                                        alt=''
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <p className='text-color-blue-1 mt-10'>
                        NB: A charge of N3 would be incured for this process
                    </p>
                </section>
            </div>
        </>
    )
}

export default NotificationSettings
