import { SetStateAction } from 'jotai'
import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

function ValidatedResult() {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const [isValidated, setIsValidated] = useState(false)
    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)

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

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    return (
        <>
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
            <div className='flex gap-8 items-center'>
                <label
                    htmlFor='photoUpload'
                    className='grid gap-4 cursor-pointer justify-items-center'
                >
                    <img
                        src={photoPreview || '/default-avatar.jpg'}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                    />
                    <span className='text-color-blue-1 text-[1.4rem]'>
                        Edit
                    </span>
                </label>
                <input
                    type='file'
                    name='photoUpload'
                    id='photoUpload'
                    accept='image/*'
                    className='hidden'
                    onChange={handlePicture}
                />
                <div className='grid gap-2 justify-items-start'>
                    <p
                        style={{
                            fontFamily: 'Satoshi-Light',
                        }}
                    >
                        Guard Code :{' '}
                        <span
                            style={{
                                fontFamily: 'Satoshi-Medium',
                            }}
                        >
                            SG09897
                        </span>
                    </p>
                    <p className='flex items-center gap-4'>
                        <span className='flex items-center gap-2'>
                            KYR Status <BsQuestionCircle />:
                        </span>
                        {isValidated ? (
                            <span
                                className='text-green-600'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Validated
                            </span>
                        ) : (
                            <span
                                className='text-red-600'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Not Validated
                            </span>
                        )}
                    </p>
                    <button
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                        className='text-color-blue'
                        onClick={openValidatedDialog}
                    >
                        Click here to view results
                    </button>
                </div>
            </div>
        </>
    )
}

export default ValidatedResult
