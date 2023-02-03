import React, { useContext, useEffect, useRef, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import {BsQuestionCircle} from 'react-icons/bs'

type State = 'Lagos' | 'Imo' | 'Abia' | 'FCT'
type Gender = 'Male' | 'Female'

const AddArtisan = () => {
    const state: Array<State> = ['Lagos', 'Imo', 'Abia', 'FCT']
    const gender: Array<Gender> = ['Male', 'Female']

    const [toggleStateMenu, setToggleStateMenu] = useState(false)
    const [selectedState, setSelectedState] = useState<State | null>(null)
    const [isWarning, setIsWarning] = useState(true)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)

    const handleSelectedState = (item: State) => {
        setSelectedState(item)
        setToggleStateMenu(false)
    }

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleOpen('success')
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState: 'warning' | 'success') => {
        if (modalState === 'warning') {
            setIsWarning(true)
        } else {
            setIsWarning(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmDeactivation = () => {
        handleClose()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                        {isWarning ? (
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                        ) : (
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                        )}

                        {isWarning ? (
                            <p>
                                Are you sure you want to deactivate this
                                security company?
                            </p>
                        ) : (
                            <p>
                                You have successfully added a security Company
                            </p>
                        )}

                        <div className='flex w-full justify-center gap-8'>
                            {isWarning ? (
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Cancel
                                </button>
                            ) : (
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    View Details
                                </button>
                            )}
                            {isWarning ? (
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={confirmDeactivation}
                                >
                                    Deactivate
                                </button>
                            ) : (
                                <button
                                    className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='grid gap-8 max-w-[40rem]'>
                    {/* <button
                        className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleOpen('warning')}
                    >
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold'>
                            Deactivate
                        </span>
                    </button> */}

                    <p className='text-[2rem] font-bold'>
                        KYA <span className='text-gray-500'>(Optional)</span>
                    </p>
                    <div className='flex justify-between text-[1.6rem]'>
                        <p className=' text-[#098DFF]'>
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
                    <div className='relative grid gap-4'>
                        <p className='text-[1.4rem] font-semibold'>Gender</p>
                        <div className='relative flex items-center'>
                            <p
                                className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                onClick={stateMenuToggler}
                            >
                                {selectedGender || (
                                    <span className='text-gray-500'>
                                        Select State
                                    </span>
                                )}
                            </p>
                            {toggleStateMenu ? (
                                <GrUp className='absolute right-4' />
                            ) : (
                                <GrDown className='absolute right-4' />
                            )}
                        </div>

                        {toggleStateMenu && (
                            <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                {gender.map((item, index) => (
                                    <p
                                        className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                        key={index}
                                        onClick={() =>
                                            handleSelectedGender(item)
                                        }
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        )}
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
                            htmlFor='address'
                            className='text-[1.4rem] font-medium'
                        >
                            Address *
                        </label>
                        <input
                            type='text'
                            required
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='relative grid gap-4'>
                        <p className='text-[1.4rem] font-semibold'>State</p>
                        <div className='relative flex items-center'>
                            <p
                                className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                                onClick={stateMenuToggler}
                            >
                                {selectedState ? (
                                    selectedState
                                ) : (
                                    <span className='text-gray-500'>
                                        Select State
                                    </span>
                                )}
                            </p>
                            {toggleStateMenu ? (
                                <GrUp className='absolute right-4' />
                            ) : (
                                <GrDown className='absolute right-4' />
                            )}
                        </div>

                        {toggleStateMenu && (
                            <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                                {state.map((item, index) => (
                                    <p
                                        className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                        key={index}
                                        onClick={() =>
                                            handleSelectedState(item)
                                        }
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        )}
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
                        onClick={() => handleOpen('success')}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Company
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddArtisan
