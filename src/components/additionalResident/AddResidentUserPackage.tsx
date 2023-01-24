import React, { useContext, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'

const AddResidentUserPackage = () => {
    const ModalContextData = useContext(ModalContext)
    const { handleOpen } = ModalContextData

  

    return (
      
        <div className='grid p-8 bg-white h-[80vh]'>
                <section className=''>
                    <div className=''>
                        <label htmlFor='firstName'>First Name *</label>
                        <input type='text' required id='firstName' />
                    </div>
                    <div className=''>
                        <label htmlFor='lastName'>Last Name *</label>
                        <input type='text' required id='lastName' />
                    </div>
                    <div className=''>
                        <label htmlFor='date'>Date of Birth *</label>
                        <input type='date' id='date' required />
                    </div>
                    
                    <div className=''>
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
                    
                    
                    
                </section>
        </div>
    )
}

export default AddResidentUserPackage
