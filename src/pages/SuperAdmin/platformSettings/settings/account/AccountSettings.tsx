import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'

const AccountSettings = () => {
    type FormInputs = {
        label: string
        type?: string
        pre?: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type Inputs = {
        property_type: string
        description: string
    }


    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)

    const [eyeIcon, setEyeIcon] = useState(false)
    const toggleEyeIcon = () => setEyeIcon(!eyeIcon)

   const handlePicture = (e: React.ChangeEvent) => {
       const target = e.target as HTMLInputElement
       const file: File = (target.files as FileList)[0]

       const preview = URL.createObjectURL(file)
       setPhotoPreview(preview)
       setImageFile(file)
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
                        onChange={handlePicture}
                    />
                    <img
                        src={photoPreview}
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
                        <label className='font-Satoshi-Medium'>
                            Current Password
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
                    <div>
                        <label className='font-Satoshi-Medium'>
                            New Password
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
                    <div>
                        <label className='font-Satoshi-Medium'>
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

export default AccountSettings
