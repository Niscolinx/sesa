import React, { useContext, useState } from 'react'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'

const AddEstateManager = () => {
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

                <div className='grid gap-4'>
                    <label htmlFor='phoneNumber' className='text-[1.4rem] font-medium'>Phone Number *</label>

                    <div className='flex text-[1.6rem] gap-8'>
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
