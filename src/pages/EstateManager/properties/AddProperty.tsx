import React, { FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'
import { ToastContainer } from 'react-toastify'
import { ComplexSelect, Select } from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'

const AddProperty = () => {
    const [selectedPropertyType, setSelectedPropertyType] = useState<
        string | null
    >(null)

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        dialogRef.current?.close()
    }

    const handleOpen = () => {
        dialogRef.current?.showModal()
    }

    const addPropertyHandler = () => {
        handleOpen()
    }

   

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img
                            src='/icons/admins/modalSuccess.svg'
                            alt=''
                            className='animate__animated animate__pulse'
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>You have successfully added an Property</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]' onClick={() => handleClose()}>
                                View details
                            </button>
                            <button
                                className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
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
                            htmlFor='Estate'
                            className='text-[1.4rem] font-medium'
                        >
                            Estate
                        </label>
                        <input
                            type='text'
                            required
                            id='Estate'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='lastName'
                            className='text-[1.4rem] font-medium'
                        >
                            Property (Block No. & Flat No.) *
                        </label>
                        <input
                            type='text'
                            required
                            placeholder='Block No. & Flat No.'
                            id='lastName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='lastName'
                            className='text-[1.4rem] font-medium'
                        >
                            Area/Street *
                        </label>
                        <input
                            type='text'
                            required
                            id='lastName'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <Select
                        label='Property Category'
                        state={['Business', 'Propertyial']}
                        placeholder='Propertyial'
                        selectedState={selectedPropertyType}
                        setSelectedState={setSelectedPropertyType}
                    />
                    <ComplexSelect
                        label='Property Type'
                        state={[
                            {
                                name: 'Duplex',
                                sub: 'A housing unit built on teo floors.',
                            },
                            {
                                name: 'Detached Duplex',
                                sub: 'A single unit of duplex standing on its own.',
                            },
                            {
                                name: 'Semi-Detached Duplex',
                                sub: 'Two units of duplex connected together, sharing a common wall and roof.',
                            },
                            {
                                name: 'Terrace',
                                sub: 'A housing unit built on teo floors',
                            },
                            {
                                name: 'Terrace',
                                sub: 'A housing unit built on teo floors',
                            },
                            {
                                name: 'Terrace',
                                sub: 'A housing unit built on teo floors',
                            },
                        ]}
                        placeholder='Propertyial'
                        isSearchable
                        double
                        selectedState={selectedPropertyType}
                        setSelectedState={setSelectedPropertyType}
                    />

                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='name'
                            className='text-[1.4rem] font-medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='name'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>

                    <div className='col-span-full items-center justify-between grid grid-cols-2 gap-16'>
                        <div className=' '>
                            <label
                                htmlFor='address'
                                className='flex mb-2 gap-4 items-center cursor-pointer'
                            >
                                Address Description
                            </label>

                            <textarea
                                name='address'
                                id='address'
                                placeholder='This is the address direction that would be displayed on the print out handed to the visitor at check in.'
                                rows={4}
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                            <p className='text-gray-400 text-[1.4rem]'>
                                Maximum of 80 characters
                            </p>
                        </div>
                        <div className=' rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full h-[13rem] content-center grid'>
                            <label
                                htmlFor='photoUpload'
                                className='grid justify-items-center justify-center gap-4 items-center cursor-pointer'
                            >
                                <img
                                    src='/icons/admins/photo_library.svg'
                                    alt=''
                                />
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
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg mt-[5rem]'
                        style={{ justifySelf: 'start' }}
                        onClick={addPropertyHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Property
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddProperty
