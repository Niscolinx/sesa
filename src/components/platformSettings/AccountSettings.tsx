import React, { useContext, useEffect, useRef, useState } from 'react'
import { getPhotoUrl } from '../../utils/getPhotoUrl'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

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
        handleOpen('success')
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState: 'warning' | 'success') => {
        if (modalState === 'warning') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmDeactivation = () => {
        handleClose()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                        {isWarning ? (
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                        ) : (
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                        )}

                        {isWarning ? (
                            <p>
                                Are you sure you want to deactivate this
                                security company?
                            </p>
                        ) : (
                            <p>
                                You have successfully added a security Company
                            </p>
                        )}

                        <div className='flex w-full justify-center gap-8'>
                            {isWarning ? (
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    View Details
                                </button>
                            )}
                            {isWarning ? (
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={confirmDeactivation}
                                >
                                    Deactivate
                                </button>
                            ) : (
                                <button
                                    className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </dialog>
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
                        className='cursor-pointer text-color-blue-1 text-[1.2rem] text-center'
                    >
                        Edit
                    </label>
                </figure>

                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] text-[1.6rem] mt-10'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <div className='form__input relative'>
                        <label className='input__label'>Current Password</label>
                        <div className='relative'>
                            <input
                                type={eyeIcon ? 'text' : 'password'}
                                className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                                name='password'
                            />
                            <span className='form__eyeIcon'>
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
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full'
                        style={{ justifySelf: 'start' }}
                        onClick={() => handleOpen('success')}
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
