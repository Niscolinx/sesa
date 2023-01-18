import React, { useContext, useState, useRef } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { getPhotoUrl } from '../../utils/getPhotoUrl'
import { EstatePageContext } from '../../Context/EstatePageContext'

const AddEstate = () => {
    const inputStateRef = useRef(null)
    const EstateContextData = useContext(EstatePageContext)
    const { setRouteToRender } = EstateContextData

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setRouteToRender('renderedEstates')
    }

    return (
        <div className='addEstate'>
            <section>
                <p className='addEstate__heading'>Estate Details</p>
                <form onSubmit={handleSubmit} className='addEstate__formBox'>
                    <section className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate Name *</label>
                            <input type='text' required id='firstName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>State *</label>
                            <div className='item__select'>
                                <select id='state' ref={inputStateRef}>
                                    <option hidden selected disabled>
                                        Placeholder
                                    </option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='date'>Date of Birth *</label>
                            <input type='date' id='date' required />
                        </div>
                        <div className='addEstate__form--item'>
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
                        <div className='addEstate__form--phoneNumber'>
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
                        <div className='addEstate__form--item'>
                            <label htmlFor='email'>Email Address *</label>
                            <input
                                required
                                type='email'
                                id='email'
                                placeholder='Your Email'
                            />
                        </div>
                        <div className='addEstate__form--file'>
                            <label htmlFor='photoUpload'>
                                <img
                                    src='/icons/addEstates/photo_library.svg'
                                    alt=''
                                />
                                <p>
                                    Drag addEstate manager picture here or{' '}
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
                            className='btn addEstates__btn'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add AddEstate
                        </button>
                    </section>
                </form>
            </section>
            <section>
                <p className='addEstate__heading'>Estate Details</p>
                <form onSubmit={handleSubmit} className='addEstate__formBox'>
                    <section className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate Name *</label>
                            <input type='text' required id='firstName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>Last Name *</label>
                            <input type='text' required id='lastName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='date'>Date of Birth *</label>
                            <input type='date' id='date' required />
                        </div>
                        <div className='addEstate__form--item'>
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
                        <div className='addEstate__form--phoneNumber'>
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
                        <div className='addEstate__form--item'>
                            <label htmlFor='email'>Email Address *</label>
                            <input
                                required
                                type='email'
                                id='email'
                                placeholder='Your Email'
                            />
                        </div>
                        <div className='addEstate__form--file'>
                            <label htmlFor='photoUpload'>
                                <img
                                    src='/icons/addEstates/photo_library.svg'
                                    alt=''
                                />
                                <p>
                                    Drag addEstate manager picture here or{' '}
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
                            className='btn addEstates__btn'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add AddEstate
                        </button>
                    </section>
                </form>
            </section>
            <section>
                <p className='addEstate__heading'>Estate Details</p>
                <form onSubmit={handleSubmit} className='addEstate__formBox'>
                    <section className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate Name *</label>
                            <input type='text' required id='firstName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>Last Name *</label>
                            <input type='text' required id='lastName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='date'>Date of Birth *</label>
                            <input type='date' id='date' required />
                        </div>
                        <div className='addEstate__form--item'>
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
                        <div className='addEstate__form--phoneNumber'>
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
                        <div className='addEstate__form--item'>
                            <label htmlFor='email'>Email Address *</label>
                            <input
                                required
                                type='email'
                                id='email'
                                placeholder='Your Email'
                            />
                        </div>
                        <div className='addEstate__form--file'>
                            <label htmlFor='photoUpload'>
                                <img
                                    src='/icons/addEstates/photo_library.svg'
                                    alt=''
                                />
                                <p>
                                    Drag addEstate manager picture here or{' '}
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
                            className='btn addEstates__btn'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add AddEstate
                        </button>
                    </section>
                </form>
            </section>
        </div>
    )
}

export default AddEstate
