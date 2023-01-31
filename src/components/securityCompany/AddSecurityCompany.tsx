import React, { useContext, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'

type State = 'Lagos' | 'Imo' | 'Abia' | 'FCT'

const AddEstateManager = () => {

     const state:Array<State> = [
         'Lagos',
         'Imo',
         'Abia',
         'FCT',
     ]

    
     const [toggleStateMenu, setToggleStateMenu] = useState(false)
     const [selectedState, setSelectedState] =
         useState<State>('Lagos')

   
     const stateMenuToggler = () =>
         setToggleStateMenu(!toggleStateMenu)

     const handleSelectedState = (item: State) => {
         setSelectedState(item)
         setToggleStateMenu(false)
     }

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
        handleOpen('renderedEstateManagers')
    }

    return (
        <div className='grid p-8 bg-white h-[80vh] items-baseline'>
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
                <div className='relative self-end grid gap-4'>
                    <p className='text-[1.4rem] font-semibold'>State</p>
                    <p
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                        onClick={stateMenuToggler}
                    >
                        {selectedState}
                    </p>

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
                

                <div className='addEstateManager__form--file'>
                    <label htmlFor='photoUpload'>
                        <img
                            src='/icons/estateManagers/photo_library.svg'
                            alt=''
                        />
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
            </form>
        </div>
    )
}

export default AddEstateManager
