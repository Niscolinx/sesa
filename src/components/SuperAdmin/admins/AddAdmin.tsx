import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { useMutation } from 'react-query'
import { ModalContext } from '../../../Context/ModalContext'
import { AxiosRequest } from '../../../utils/axios'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import { isAuthenticated } from '../../../utils/token'
import Input from '../../UI/Input'

const AddAdmin = () => {
    interface Inputs {
        email: string
        first_name: string
        last_name: string
        dob: string
        gender: string
        phoneNumber: number
        photoUrl?: string
    }

    const ModalContextData = useContext(ModalContext)
    // const { handleOpen } = ModalContextData

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageUrl, setImageUrl] = useState<File | null>(null)

    // const handlePhotoPreview = async () => {
    //     const getUrl = await getPhotoUrl(`#photoUpload`)
    //     //setPhotoPreview(getUrl)
    // }

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        console.log({ file })

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageUrl(file)
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()

    //     handleOpen('renderedAdmins')
    // }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    // watch((values) => {
    //     console.log({ values })
    // })

    const postLogin = (data: Inputs) => {
        const token = isAuthenticated() || ''

        return AxiosRequest({
            token,
            url: '/admin/create',
            method: 'post',
            data,
        })
    }
    const {
        mutate,
        data: response_data,
        isLoading,
    } = useMutation(postLogin) as any

    useEffect(() => {
        console.log({ response_data })
        if (response_data?.status === 200) {
            handleOpen()
        } else {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: response_data?.response?.data.message,
            })
        }

        // const timeoutId = setTimeout(() => {
        //     setResponseMessage(null)
        // }, 10000)
    }, [response_data])

    const onSubmit = handleSubmit((data) => {
        const { first_name, last_name, gender, dob, email, phoneNumber } = data

        const adminData = {
            name: `${first_name} ${last_name}`,
            gender,
            dob,
            email,
            address: 'no 4 odeyim street',
            phone: `+234${phoneNumber}`,
            image: imageUrl?.name,
        }

        mutate(adminData)
    })

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalSuccess.svg' alt='' />
                        <p>You have successfully added an Admin</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={handleClose}
                            >
                                View details
                            </button>
                            <button
                                className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={handleClose}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>

            <div className='addAdmin'>
                <p className='addAdmin__heading'>Personal Information</p>
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form onSubmit={onSubmit} className='addAdmin__formBox'>
                    <section className='addAdmin__form'>
                        <div className='addAdmin__form--item'>
                            <Input
                                label={'first_name'}
                                register={register}
                                formErrors={formErrors}
                            />
                        </div>
                        <div className='addAdmin__form--item'>
                            <Input
                                label={'last_name'}
                                register={register}
                                formErrors={formErrors}
                            />
                        </div>
                        <div className='addAdmin__form--item'>
                            <Input
                                type={'date'}
                                label={'dob'}
                                name={'Date of Birth'}
                                register={register}
                                formErrors={formErrors}
                            />
                        </div>
                        <div className='addAdmin__form--item'>
                            <label htmlFor='gender'>Gender *</label>
                            <div className='item__select border border-color-grey rounded-lg w-full'>
                                <select
                                    id='gender'
                                    {...register('gender', { required: true })}
                                >
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>
                        <div className='addAdmin__form--phoneNumber'>
                            <label htmlFor='phoneNumber'>Phone Number *</label>

                            <div className='phoneNumber__box'>
                                <select>
                                    <option value='234'>+234</option>
                                </select>
                                <input
                                    required
                                    {...register('phoneNumber', {
                                        required: true,
                                        //minLength: 8,
                                        // maxLength: 10,
                                    })}
                                    type='number'
                                    inputMode='numeric'
                                    id='phoneNumber'
                                />
                            </div>
                        </div>
                        <div className='addAdmin__form--item'>
                            <Input
                                type={'email'}
                                label={'email'}
                                name={'email address'}
                                register={register}
                                formErrors={formErrors}
                            />
                        </div>
                        <div className='addAdmin__form--file'>
                            <label htmlFor='photoUpload'>
                                <img
                                    src='/icons/admins/photo_library.svg'
                                    alt=''
                                />
                                <p>
                                    Drag estate manager picture here or{' '}
                                    <span>click</span> to upload
                                </p>
                            </label>
                            <input
                                type='file'
                                name='photoUpload'
                                id='photoUpload'
                                accept='image/*'
                                className='hidden'
                                onChange={handlePicture}
                                //onClick={handlePhotoPreview}
                            />

                            {photoPreview && (
                                <div className='file__uploadImgBox'>
                                    <img
                                        src={photoPreview}
                                        alt='photoPreview'
                                        className='object-contain'
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            className='btn admins__btn'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            {isLoading ? 'Loading...' : 'Add'}
                        </button>
                    </section>
                </form>
            </div>
        </>
    )
}

export default AddAdmin
