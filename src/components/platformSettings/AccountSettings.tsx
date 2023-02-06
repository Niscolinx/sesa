import React, { useContext, useEffect, useRef, useState } from 'react'
import { getPhotoUrl } from '../../utils/getPhotoUrl'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'

const AccountSettings = () => {
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
                <figure className='grid text-center justify-start'>
                    <input
                        type='file'
                        name='photoUpload'
                        id='photoUpload'
                        accept='image/*'
                        className='hidden'
                        onClick={handlePhotoPreview}
                    />
                    <img
                        src={photoUrl ? photoUrl : '/img/me.jpeg'}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                    />
                    <label
                        htmlFor='photoUpload'
                        className='cursor-pointer text-color-blue-1 text-[1.6rem] text-center'
                    >
                        Edit
                    </label>
                </figure>

                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] text-[1.6rem] mt-[5rem] gap-10'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <div>
                        <label className='font-bold'>Current Password</label>
                        <div className='relative flex items-center'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className='border pr-12 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                name='password'
                            />
                            <span className='absolute right-2'>
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
                        <label className='font-bold'>New Password</label>
                        <div className='relative flex items-center'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className='border pr-12 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                name='password'
                            />
                            <span className='absolute right-2'>
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
                        <label className='font-bold'>Re-Enter New Password</label>
                        <div className='relative flex items-center'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className='border pr-12 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                name='password'
                            />
                            <span className='absolute right-2'>
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

export default AccountSettings
