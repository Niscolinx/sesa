import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'

const NotificationSettings = () => {
    const [isWarning, setIsWarning] = useState(true)

    const [photoUrl, setPhotoUrl] = useState('')

    const [eyeIcon, setEyeIcon] = useState(false)
    const toggleEyeIcon = () => setEyeIcon(!eyeIcon)

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        toast('Password Updated successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />
            <div className=' p-8 bg-white h-[80vh] overflow-y-scroll rounded-lg'>
                   

                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] text-[1.6rem] mt-[5rem] gap-10'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <div>
                        <label className='font-medium'>Current Password</label>
                        <div className='relative flex items-center'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className='border pr-12 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                name='password'
                            />
                            <span className='absolute right-2 cursor-pointer'>
                                {eyeIcon ? (
                                    <AiOutlineEyeInvisible
                                        onClick={toggleEyeIcon}
                                    />
                                ) : (
                                    <AiOutlineEye onClick={toggleEyeIcon} />
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className='font-medium'>New Password</label>
                        <div className='relative flex items-center'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className='border pr-12 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                name='password'
                            />
                            <span className='absolute right-2 cursor-pointer'>
                                {eyeIcon ? (
                                    <AiOutlineEyeInvisible
                                        onClick={toggleEyeIcon}
                                    />
                                ) : (
                                    <AiOutlineEye onClick={toggleEyeIcon} />
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className='font-medium'>
                            Re-Enter New Password
                        </label>
                        <div className='relative flex items-center'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className='border pr-12 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                name='password'
                            />
                            <span className='absolute right-2 cursor-pointer'>
                                {eyeIcon ? (
                                    <AiOutlineEyeInvisible
                                        onClick={toggleEyeIcon}
                                    />
                                ) : (
                                    <AiOutlineEye onClick={toggleEyeIcon} />
                                )}
                            </span>
                        </div>
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[10rem]'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>{' '}
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default NotificationSettings
