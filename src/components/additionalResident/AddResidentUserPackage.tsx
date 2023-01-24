import React, { useContext, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'

const AddResidentUserPackage = () => {
    const ModalContextData = useContext(ModalContext)
    const { handleOpen } = ModalContextData

    return (
        <div className=' p-8 bg-white h-[80vh] rounded-lg'>
            <div className='flex justify-end'>
                <button className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'>
                    <img src='/icons/admins/delete.svg' alt='' />
                    <span className='text-red-600 text-[1.4rem] font-semibold '>
                        Deactivate
                    </span>
                </button>
            </div>
            <section className='grid' style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
            }}>
                <div className='w-full'>
                    <label htmlFor='firstName'>First Name *</label>
                    <input type='text' required id='firstName' />
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
