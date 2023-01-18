import React, { useContext, useState, useRef, useLayoutEffect } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { getPhotoUrl } from '../../utils/getPhotoUrl'
import { EstatePageContext } from '../../Context/EstatePageContext'

const AddEstate = () => {
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
            <form onSubmit={handleSubmit} className='addEstate__formBox'>
                <section className='addEstate__box'>
                    <p className='addEstate__heading'>Estate Details</p>
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate Name *</label>
                            <input type='text' required id='firstName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>State *</label>
                            <div className='item__select'>
                                <select id='state'>
                                    <option hidden>&nbsp;</option>
                                    <option value='lagos'>Lagos</option>
                                    <option value='FCT'>FCT</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>
                        <div className='addEstate__form--item col-span-full'>
                            <label htmlFor='address'>Address *</label>
                            <input type='text' id='address' required />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='estateManager'>
                                Estate Manager *
                            </label>
                            <div className='item__select'>
                                <select id='estateManager'>
                                    <option hidden>&nbsp;</option>
                                    <option value='manager'>Manager1</option>
                                    <option value='manager2'>Manager2</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>

                        <div className='addEstate__form--item'>
                            <label htmlFor='securityCompaany'>
                                Security Company *
                            </label>
                            <div className='item__select'>
                                <select id='securityCompaany'>
                                    <option hidden>&nbsp;</option>
                                    <option value='company'>Company1</option>
                                    <option value='company2'>Company2</option>
                                </select>
                                <GrDown />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='addEstate__box'>
                    <p className='addEstate__heading'>
                        Estate Convenience Fees
                    </p>
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='firstName'>Estate(%)</label>
                            <input type='text' required id='estatePercentage' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='lastName'>SESA(%)</label>
                            <input type='text' required id='sesaPercentage' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='date'>
                                Number of Resident User
                            </label>
                            <input
                                type='number'
                                id='residentUsersNo'
                                required
                            />
                        </div>

                        <div className='addEstate__form--item'>
                            <label htmlFor='additionalResidentUser'>
                                Additional Resident User
                            </label>
                            <input
                                required
                                type='text'
                                id='additionalResidentUser'
                            />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='signOutRequired'>
                                Sign Out Required
                            </label>
                            <div
                                className='item__select'
                                style={{
                                    width: '10rem',
                                }}
                            >
                                <select id='signOutRequired'>
                                    <option value='yes'>Yes</option>
                                    <option value='no'>No</option>
                                </select>
                                <GrDown />
                            </div>
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
                    </div>
                </section>
                <section className='addEstate__box'>
                    <p className='addEstate__heading'>Estate Account Details</p>
                    <div className='addEstate__form'>
                        <div className='addEstate__form--item'>
                            <label htmlFor='bankName'>Bank Name *</label>
                            <input type='text' required id='bankName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='accountName'>Account Name *</label>
                            <input type='text' required id='accountName' />
                        </div>
                        <div className='addEstate__form--item'>
                            <label htmlFor='accountNumber'>
                                Account Number *
                            </label>
                            <input type='number' id='accountNumber' required />
                        </div>
                    </div>
                </section>
                    <button
                        className='btn addEstate__btn'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add AddEstate
                    </button>
            </form>
        </div>
    )
}

export default AddEstate
