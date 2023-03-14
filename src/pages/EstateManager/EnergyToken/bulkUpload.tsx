import React, { ChangeEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'

import {
    MultipleSelect,
    Select,
    SelectedItems,
} from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import EnergyTokenSpreadsheet from './Spreadsheet'

const BulkUpload = () => {
    const [isUploaded, setIsUploaded] = useState(false)
    const [denomination, setDenomination] = useState('')
    const [selectedSerialNumbers, setSelectedSerialNumbers] = useState<
        string[]
    >([])

    const [customerNofication, setCustomerNotification] = useState<
        string | null
    >(null)
    const [convenienceFee, setConvenienceFee] = useState('')
    const [instruction, setInstruction] = useState('')
    const [notificationThreshold, setNotificationThreshold] = useState<
        string | null
    >(null)

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openRecipientListDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {}

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

    const tokenSerialNumbers = Array.from(
        { length: 117 },
        (_, i) => `variable ${i + 1}`
    )
    const tokenCodes = Array.from({ length: 200 }, (_, i) => `Code ${i + 1}`)

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <EnergyTokenSpreadsheet closeDialog={closeDialog} />
            </dialog>
            <main>
                {isUploaded ? (
                    <section className='grid p-8 bg-white items-baseline rounded-lg'>
                        <p className='text-[2rem] font-Satoshi-Medium'>
                            Token Details
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className='grid max-w-[84rem] gap-16 mt-12 '
                        >
                            <section>
                                <p className='text-[2rem] border-b pb-2 mb-10'>
                                    Denomination (N10,000)
                                </p>
                                <div
                                    className='grid gap-16 items-baseline'
                                    style={{
                                        gridTemplateColumns:
                                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                                    }}
                                >
                                    <SelectedItems
                                        selectFrom={tokenSerialNumbers}
                                        label={'Token Serial Number'}
                                    />
                                    <SelectedItems
                                        selectFrom={tokenCodes}
                                        label={'Token Code'}
                                    />
                                </div>
                            </section>
                            <section>
                                <p className='text-[2rem] border-b pb-2 mb-10'>
                                    Denomination (N15,000)
                                </p>
                                <div
                                    className='grid gap-16 items-baseline'
                                    style={{
                                        gridTemplateColumns:
                                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                                    }}
                                >
                                    <SelectedItems
                                        selectFrom={tokenSerialNumbers}
                                        label={'Token Serial Number'}
                                    />
                                    <SelectedItems
                                        selectFrom={tokenCodes}
                                        label={'Token Code'}
                                    />
                                </div>
                            </section>
                            <div
                                className='grid gap-16 items-baseline border-t py-4 mt-10'
                                style={{
                                    gridTemplateColumns:
                                        ' repeat(auto-fit, minmax(35rem, 1fr))',
                                }}
                            >
                                <Select
                                    label='Customer Notification'
                                    state={['SMS', 'In-App']}
                                    selectedState={customerNofication}
                                    setSelectedState={setCustomerNotification}
                                />

                                <div className='grid gap-4'>
                                    <label
                                        htmlFor='convenienceFee'
                                        className='text-[1.4rem] font-Satoshi-Medium'
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
                                        className='text-[1.4rem] font-Satoshi-Medium'
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
                                        state={[
                                            '10%',
                                            '20%',
                                            '30%',
                                            '40%',
                                            '50%',
                                        ]}
                                        selectedState={notificationThreshold}
                                        setSelectedState={
                                            setNotificationThreshold
                                        }
                                    />
                                    <p className='text-color-blue-1 font-Satoshi-Light text-[1.2rem]'>
                                        This is the threshold the system
                                        automatically sends a notification
                                    </p>
                                </div>
                            </div>
                            <button
                                className='btn bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize w-max'
                                onClick={() => openRecipientListDialog()}
                            >
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                <p>Create Tokens</p>
                            </button>
                        </form>
                    </section>
                ) : (
                    <section className='grid justify-items-center h-[80vh] content-center'>
                        <div className='rounded-lg border border-dashed border-gray-400 p-8 relative w-full '>
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
                                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                                className='hidden'
                                onClick={handlePhotoPreview}
                            />
                        </div>
                        <button
                            className=' mt-5 border border-color-blue text-color-blue-1 font-Satoshi-Medium py-4 px-6 rounded-2xl flex justify-center'
                            onClick={() => setIsUploaded(true)}
                        >
                            Download Excel Template
                        </button>
                    </section>
                )}
            </main>
        </>
    )
}

export default BulkUpload
