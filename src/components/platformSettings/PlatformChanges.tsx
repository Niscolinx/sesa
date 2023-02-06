import React, { FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'

type DialogType = 'validate' | 'add-Artisan'

const PlatformChanges = () => {
 

  


    return (
        <>

           
          
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='grid gap-8 max-w-[40rem]'>
                    <p className='text-[2rem] font-bold'>
                        KYA <span className='text-gray-500'>(Optional)</span>
                    </p>
                    <div className='flex justify-between text-[1.6rem]'>
                        <p
                            className='text-[#098DFF] cursor-pointer'
                            onClick={() => handleOpen('validate')}
                        >
                            Click her to validate this person
                        </p>
                        <p
                            className='text-[#043FA7] flex items-center gap-2'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            What is KYA <BsQuestionCircle />
                        </p>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='firstName'
                            className='text-[1.4rem] font-medium'
                        >
                            First Name *
                        </label>
                        <input
                            type='text'
                            required
                            id='firstName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='lastName'
                            className='text-[1.4rem] font-medium'
                        >
                            Last Name *
                        </label>
                        <input
                            type='text'
                            required
                            id='lastName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <Select
                        label='Gender'
                        state={['Male', 'Female']}
                        selectedState={selectedGender}
                        setSelectedState={setSelectedGender}
                    />
                    <div className='grid gap-4'>
                        <label
                            htmlFor='phoneNumber'
                            className='text-[1.4rem] font-medium'
                        >
                            Phone Number *
                        </label>

                        <div className='flex text-[1.6rem] gap-4   h-[5rem]'>
                            <select className='w-[30%] rounded-lg border border-color-grey py-4.8 px-4 outline-none cursor-pointer text-color-dark relative h-full'>
                                <option value='234'>+234</option>
                            </select>
                            <input
                                required
                                type='number'
                                inputMode='numeric'
                                id='phoneNumber'
                                placeholder='Phone Number'
                                className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                            />
                        </div>
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='email'
                            className='text-[1.4rem] font-medium'
                        >
                            Email Address *
                        </label>
                        <input
                            type='email'
                            required
                            id='email'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='address1'
                            className='text-[1.4rem] font-medium'
                        >
                            Address Line 1*
                        </label>
                        <input
                            type='text'
                            required
                            id='address1'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='address2'
                            className='text-[1.4rem] font-medium'
                        >
                            Address Line 2*
                        </label>
                        <input
                            type='text'
                            required
                            id='address2'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <Select
                        label='State'
                        state={['Lagos', 'Imo', 'Abia', 'FCT']}
                        placeholder='Select State'
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                    />
                    <Select
                        label='Artisan Category'
                        state={[
                            'Plumber',
                            'Electrician',
                            'Carpenter',
                            'Painter',
                        ]}
                        selectedState={selectedArtisan}
                        setSelectedState={setSelectedArtisan}
                    />
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='businessName'
                            className='text-[1.4rem] font-medium'
                        >
                            Business Name
                        </label>
                        <input
                            type='text'
                            placeholder='Optional'
                            id='businessName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
                        <label
                            htmlFor='photoUpload'
                            className='flex justify-center gap-4 items-center cursor-pointer'
                        >
                            <img src='/icons/admins/photo_library.svg' alt='' />
                            <p
                                className='text-color-dark-1'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Drag estate manager picture here or{' '}
                                <span className='text-color-blue font-bold'>
                                    click
                                </span>{' '}
                                to upload
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
                            <div className='flex justify-center justify-self-center'>
                                <img
                                    src={photoUrl}
                                    alt='photoPreview'
                                    className='object-cover w-[11rem] h-[11rem] rounded-full'
                                />
                            </div>
                        )}
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                        style={{ justifySelf: 'start' }}
                        onClick={platformChangesHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Artisan
                    </button>
                </form>
            </div>
        </>
    )
}

export default PlatformChanges
