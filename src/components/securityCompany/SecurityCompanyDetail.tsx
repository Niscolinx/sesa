import React, { useContext, useEffect, useRef, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { ModalContext } from '../../Context/ModalContext'
import { getPhotoUrl } from '../../utils/getPhotoUrl'
import SecurityCompSvg from '../icons/sidebar/SecurityCompSvg'

type State = 'Lagos' | 'Imo' | 'Abia' | 'FCT'

const SecurityCompanyDetail = () => {
    const state: Array<State> = ['Lagos', 'Imo', 'Abia', 'FCT']

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
                <div className='flex justify-between items-center'>
                    <img
                        src='/icons/admins/detailsImg.svg'
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                    />
                    <button
                        className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                        onClick={() => handleOpen('warning')}
                    >
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold'>
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
                            value='Orca Security'
                            required
                            disabled={true}
                            id='securityCompany'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
                    </div>
                    <div className='grid gap-4 relative'>
                        <label
                            htmlFor='email'
                            className='text-[1.4rem] font-medium'
                        >
                            Email Address 
                        </label>
                        <input
                            type='email'
                            required
                            disabled
                            value={`orcas@gmail.com`}
                            id='email'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
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
                            disabled
                            value={`04, Wright Avenue Lagos, Nigeria`}
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
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
                            disabled
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
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
                            disabled
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
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
                            disabled
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
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
                            disabled
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
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
                            disabled
                            id='address'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 disabled:text-gray-600'
                        />
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

export default SecurityCompanyDetail
