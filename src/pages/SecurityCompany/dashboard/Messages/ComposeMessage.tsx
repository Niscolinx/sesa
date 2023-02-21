import React, { useRef, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'


const ComposeMessage = () => {

    const [selectedState, setSelectedState] = useState<State | null>(null)
    const [isWarning, setIsWarning] = useState(true)


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
            <div className='grid p-8 bg-white items-baseline rounded-lg'>
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
                    <MultipleSelect
                        selectFrom={[
                            'Estate 1',
                            'Estate 2',
                            'Estate 3',
                            'Estate 4',
                            'Estate 5',
                            'Estate 6',
                            'Estate 7',
                        ]}
                        label='Estates'
                        placeholder='Select Estate'
                        selected={selectedEstates}
                        setSelected={setSelectedEstates}
                    />

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

export default ComposeMessage
