import React from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'

const AddAdmin = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className='addAdmin'>
            <p className='addAdmin__heading'>Personal Information</p>
            <form onSubmit={handleSubmit} className='addAdmin__formBox'>
                <section className='addAdmin__form'>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='firstName'>First Name *</label>
                        <input type='text' id='firstName' />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='lastName'>Last Name *</label>
                        <input type='text' id='lastName' />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='date'>Date of Birth *</label>
                        <input type='date' id='date' />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='gender'>Gender *</label>
                        <select id='gender'>
                            <option hidden>&nbsp;</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <GrDown/>
                    </div>
                    <div className='addAdmin__form--phoneNumber'>
                        <label htmlFor='phoneNumber'>Phone Number *</label>

                        <div className='phoneNumber__box'>
                            <select>
                                <option value='234'>
                                    +234
                                </option>
                            </select>
                            <input
                                type='text'
                                id='phoneNumber'
                                placeholder='Phone Number'
                            />
                        </div>
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='email'>Email Address *</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                </section>
                <section>
                    Drag estate manager picture here or click to upload
                </section>

                <button className='btn admins__btn'>
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    Add Admin
                </button>
            </form>
        </div>
    )
}

export default AddAdmin
