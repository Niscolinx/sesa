import React, { useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { ComplexSelect, Select } from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'

const ViewProperty = () => {
    const [selectedPropertyType, setSelectedPropertyType] = useState<
        string | null
    >(null)
    const [isDelete, setIsDelete] = useState(true)

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleOpen('isDelete')
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (modalState?: 'isDelete') => {
        if (modalState === 'isDelete') {
            setIsDelete(true)
        } else {
            setIsDelete(false)
        }

        dialogRef.current?.showModal()
    }

    const confirmDeactivation = () => {
        handleClose()
    }

    const addPropertyHandler = () => {
        handleOpen()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8 text-[1.6rem]'>
                        {isDelete ? (
                            <img src='/icons/admins/modalWarning.svg' alt='' />
                        ) : (
                            <img src='/icons/admins/modalSuccess.svg' alt='' />
                        )}

                        {isDelete ? (
                            <p>
                                Are you sure you want to delete this property?
                            </p>
                        ) : (
                            <p>You have successfully added a property</p>
                        )}

                        <div className='flex w-full justify-center gap-8'>
                            {isDelete ? (
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
                                    Ok
                                </button>
                            )}
                            {isDelete ? (
                                <button
                                    className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={confirmDeactivation}
                                >
                                    Delete
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
                <div className='flex gap-8 items-center justify-between'>
                    <div className='flex items-center gap-8'>
                        <label
                            htmlFor='photoUpload'
                            className='grid gap-4 cursor-pointer justify-items-center'
                        >
                            <img
                                src={photoUrl ? photoUrl : '/img/me.jpeg'}
                                alt='photoPreview'
                                className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                            />

                            <input
                                type='file'
                                name='photoUpload'
                                id='photoUpload'
                                accept='image/*'
                                className='hidden'
                                onClick={handlePhotoPreview}
                            />
                        </label>
                        <p
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            Property Code :{' '}
                            <span
                                style={{
                                    fontFamily: 'Satoshi-Medium',
                                }}
                            >
                                SG09897
                            </span>
                        </p>
                    </div>
                    <button
                        className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleOpen('isDelete')}
                    >
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold'>
                            Delete
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
                        placeholder='property'
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

                    <div className='col-span-full items-center grid'>
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

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg mt-[5rem]'
                        style={{ justifySelf: 'start' }}
                        onClick={addPropertyHandler}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>{' '}
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default ViewProperty
