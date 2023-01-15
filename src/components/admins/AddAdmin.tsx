import React from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'

const AddAdmin = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className='addAdmin'>
            <p className='heading3'>Personal Information</p>
            <form onSubmit={handleSubmit} className='addAdmin__form'>
                <section className='addAdmin__formBox'>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='firstName'>First Name *</label>
                        <input
                            type='text'
                            id='firstName'
                            placeholder='First Name'
                        />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='lastName'>Last Name *</label>
                        <input
                            type='text'
                            id='lastName'
                            placeholder='Last Name'
                        />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='date'>Date of Birth *</label>
                        <input type='date' id='date' placeholder='DD/MM/YY' />
                    </div>
                    <div className='addAdmin__form--item'>
                        <select id='gender'>
                            <option hidden>&nbsp;</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='phoneNumber'>Phone Number *</label>
                        <select>
                            <option value='234'>
                                +234 <GrDown />
                            </option>
                        </select>
                        <input
                            type='text'
                            id='phoneNumber'
                            placeholder='Phone number'
                        />
                    </div>
                    <div className='addAdmin__form--item'>
                        <label htmlFor='email'>Email Address *</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Your email'
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
