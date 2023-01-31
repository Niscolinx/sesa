import React, { useContext, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'

type State = 'Lagos' | 'Imo' | 'Abia' | 'FCT'

const AddEstateManager = () => {
    const state: Array<State> = ['Lagos', 'Imo', 'Abia', 'FCT']

    const [toggleStateMenu, setToggleStateMenu] = useState(false)
    const [selectedState, setSelectedState] = useState<State | null>(null)

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
        // handleOpen('renderedEstateManagers')
    }

    return (
        <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
            <div className='flex justify-end'>
                <button className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'>
                    <img src='/icons/admins/delete.svg' alt='' />
                    <span className='text-red-600 text-[1.4rem] font-semibold '>
                        Deactivate
                    </span>
                </button>
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
                        htmlFor='securityCompany'
                        className='text-[1.4rem] font-medium'
                    >
                        Security Company *
                    </label>
                    <input
                        type='text'
                        required
                        id='securityCompany'
                        className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                    />
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
                                    onClick={() => handleSelectedState(item)}
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
                >
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    Add Company
                </button>
            </form>
        </div>
    )
}

export default AddEstateManager
