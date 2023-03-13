import React, { ChangeEvent, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

import { Select } from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'

const BulkUpload = () => {
    const [isUploaded, setIsUploaded] = useState(false)
    const [denomination, setDenomination] = useState('')
    const [customerNofication, setCustomerNotification] = useState<
        string | null
    >(null)
    const [convenienceFee, setConvenienceFee] = useState('')
    const [instruction, setInstruction] = useState('')
    const [notificationThreshold, setNotificationThreshold] = useState<
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

    const denominationHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value === '') {
            setDenomination('')
            return
        }
        const parsedValue = parseFloat(value.replace(/,/g, ''))

        if (!isNaN(parsedValue) && isFinite(parsedValue)) {
            const transformedValue = parsedValue.toLocaleString()
            setDenomination(transformedValue)
        }
    }
    const convenienceFeeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value === '') {
            setConvenienceFee('')
            return
        }
        const parsedValue = parseFloat(value.replace(/,/g, ''))

        if (!isNaN(parsedValue) && isFinite(parsedValue)) {
            const transformedValue = parsedValue.toLocaleString()
            setConvenienceFee(transformedValue)
        }
    }

    return (
        <>
            <main>
                {isUploaded ? (
                    <section className='grid p-8 bg-white items-baseline rounded-lg'>
                        <p className='text-[2rem] font-Satoshi-Medium'>
                            Token Details
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className='grid max-w-[84rem] gap-16 mt-12 '
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
                                    Token Seriel Number
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
                                    Token Code
                                </label>
                                <input
                                    type='text'
                                    required
                                    id='lastName'
                                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                />
                            </div>
                            <div className='grid gap-4'>
                                <label
                                    htmlFor='amount'
                                    className='text-[1.4rem] font-medium'
                                >
                                    Denomination
                                </label>
                                <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                                    <input
                                        type='text'
                                        required
                                        id='denomination'
                                        value={denomination}
                                        onChange={denominationHandler}
                                        name='amount'
                                        className='w-full border-none outline-none py-4 px-4 pl-5'
                                    />
                                    <img
                                        src='/icons/Naira.svg'
                                        alt=''
                                        className='absolute'
                                    />
                                </div>
                            </div>
                            <Select
                                label='Customer Notification'
                                state={['SMS', 'In-App']}
                                selectedState={customerNofication}
                                setSelectedState={setCustomerNotification}
                            />

                            <div className='grid gap-4'>
                                <label
                                    htmlFor='convenienceFee'
                                    className='text-[1.4rem] font-medium'
                                >
                                    Convenience Fee
                                </label>
                                <div className='relative rounded-lg border border-color-grey outline-none flex items-center pl-4'>
                                    <input
                                        type='text'
                                        required
                                        id='convenienceFee'
                                        value={convenienceFee}
                                        onChange={convenienceFeeHandler}
                                        name='convenienceFee'
                                        className='w-full border-none outline-none py-4 px-4 pl-5'
                                    />
                                    <img
                                        src='/icons/Naira.svg'
                                        alt=''
                                        className='absolute'
                                    />
                                </div>
                            </div>
                            <div className='grid gap-4 relative'>
                                <label
                                    htmlFor='instruction'
                                    className='text-[1.4rem] font-medium'
                                >
                                    Instuction/Message *
                                </label>
                                <input
                                    type='instruction'
                                    required
                                    id='instruction'
                                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                />
                            </div>

                            <div>
                                <Select
                                    label='Notification Threshold'
                                    state={['10%', '20%', '30%', '40%', '50%']}
                                    selectedState={notificationThreshold}
                                    setSelectedState={setNotificationThreshold}
                                />
                                <p className='text-color-blue-1 font-Satoshi-Light text-[1.2rem]'>
                                    This is the threshold the system
                                    automatically sends a notification
                                </p>
                            </div>

                            <button className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize'>
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                <p>Create Token</p>
                            </button>
                        </form>
                    </section>
                ) : (
                    <section className='grid justify-items-center h-[80vh] content-center'>
                        <div className='rounded-lg border border-width-[1rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full '>
                            <label
                                htmlFor='photoUpload'
                                className='flex justify-center gap-4 items-center cursor-pointer'
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
                                    {/* Drag picture here{' '}
                                <span className='text-color-blue font-bold'>
                                click
                                </span>{' '}
                            to upload */}
                                    Click to Upload document
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
                        </div>
                        <button className=' mt-5 border border-color-blue text-color-blue-1 font-Satoshi-Medium py-4 px-6 rounded-2xl flex justify-center'>
                            Download Excel Template
                        </button>
                    </section>
                )}
            </main>
        </>
    )
}

export default BulkUpload
