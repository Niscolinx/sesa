import React, { useContext, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'

const AddEstateManager = () => {
const ModalContextData = useContext(ModalContext)
const { handleOpen } = ModalContextData

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
            const { handleOpen } = ModalContextData

    }



    return (
        <div className='addEstateManager'>
            <p className='addEstateManager__heading'>Personal Information</p>
            <form onSubmit={handleSubmit} className='addEstateManager__formBox'>
                <section className='addEstateManager__form'>
                    <div className='addEstateManager__form--item'>
                        <label htmlFor='firstName'>First Name *</label>
                        <input type='text' required id='firstName' />
                    </div>
                    <div className='addEstateManager__form--item'>
                        <label htmlFor='lastName'>Last Name *</label>
                        <input type='text' required id='lastName' />
                    </div>
                    <div className='addEstateManager__form--item'>
                        <label htmlFor='date'>Date of Birth *</label>
                        <input type='date' id='date' required />
                    </div>
                    <div className='addEstateManager__form--item'>
                        <label htmlFor='gender'>Gender *</label>
                        <div className='item__select'>
                            <select id='gender'>
                                <option hidden>&nbsp;</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                            <GrDown />
                        </div>
                    </div>
                    <div className='addEstateManager__form--phoneNumber'>
                        <label htmlFor='phoneNumber'>Phone Number *</label>

                        <div className='phoneNumber__box'>
                            <select>
                                <option value='234'>+234</option>
                            </select>
                            <input
                                required
                                type='number'
                                inputMode='numeric'
                                id='phoneNumber'
                                placeholder='Phone Number'
                            />
                        </div>
                    </div>
                    <div className='addEstateManager__form--item'>
                        <label htmlFor='email'>Email Address *</label>
                        <input
                            required
                            type='email'
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div className='addEstateManager__form--file'>
                        <label htmlFor='photoUpload'>
                            <img src='/icons/estateManagers/photo_library.svg' alt='' />
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
                            onClick={handlePhotoPreview}
                        />

                        {photoUrl && (
                            <div className='file__uploadImgBox'>
                                <img
                                    src={photoUrl}
                                    alt='photoPreview'
                                    className='object-contain'
                                />
                            </div>
                        )}
                    </div>
                    <button
                        className='btn estateManagers__btn'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add EstateManager
                    </button>
                </section>
            </form>
        </div>
    )
}

export default AddEstateManager
