import React, { FormEvent, useContext, useRef, useState } from 'react'

import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { EditHouseholdContext, HouseholdContext } from './EditHousehold'

function AddRFID() {
    interface InputField {
        RFID: number
        vehicleRegNumber: number
        vehicleMake: string
        vehicleType: string | null
        photoUrl: string
    }

    const [RFID_Details, setRFID_Details] = useState<InputField[]>([])

    const { vehicleType, setVehicleType } = useContext(EditHouseholdContext)
    const [photoUrl, setPhotoUrl] = useState('')
    const [RFID, setRFID] = useState<number>(0)
    const [vehicleRegNumber, setVehicleRegNumber] = useState<number>(0)
    const [vehicleMake, setVehicleMake] = useState('')
    const [idxToDelete, setIdxToDelete] = useState(0)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const details = {
            vehicleMake,
            vehicleRegNumber,
            vehicleType,
            RFID,
            photoUrl,
        }

        setRFID_Details((prev) => {
            return [...prev, details]
        })
        setRFID(0)
        setVehicleMake('')
        setVehicleRegNumber(0)
        setVehicleType(null)
        setPhotoUrl('')
    }

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const deleteDialog = (idx: number) => {
        setIdxToDelete(idx)
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const deleteRFIDHandler = () => {
        setRFID_Details((prev) => {
            return prev.filter((_, index) => index !== idxToDelete)
        })

        handleClose()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalWarning.svg' alt='' />
                        <p>Are you sure you want to delete this RFID?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={() => handleClose()}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={deleteRFIDHandler}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            <div className='grid gap-16'>
                <section className='w-full flex gap-16 relative'>
                    <div>
                        <img
                            src={'/img/img3.png'}
                            alt=''
                            className=' object-cover rounded-lg'
                        />
                    </div>

                    <div className='flex '>
                        <div className='grid gap-8'>
                            <div>
                                <p className='text-[1.4rem] text-[#043FA7]'>
                                    Property Code
                                </p>
                                <p className='font-[1.6rem] whitespace-nowrap'>
                                    ThomasEstate/SO-2345CDGK1
                                </p>
                            </div>
                            <div>
                                <p className='text-[#043FA7]'>Property Type</p>
                                <p>Duplex</p>
                            </div>
                            <div>
                                <p className='text-[#043FA7]'>
                                    Property Address
                                </p>
                                <p className='max-w-[30rem]'>
                                    10, Address Street, Address Avenue, Lagos,
                                    Nigeria.
                                </p>{' '}
                            </div>
                        </div>
                        <div className='grid gap-8 auto-rows-max'>
                            <div>
                                <p className='text-[1.4rem] text-[#043FA7]'>
                                    Property Category
                                </p>
                                <p className='font-[1.6rem] whitespace-nowrap'>
                                    Business
                                </p>
                            </div>
                            <div>
                                <p className='text-[#043FA7]'>Property Name</p>
                                <p>Wale House</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='mt-[5rem]'>
                    <p className='font-semibold border-b pb-2'>
                        {' '}
                        Add an RFID to this property{' '}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div
                            className='grid mt-[5rem] gap-16'
                            style={{
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(40rem, 1fr))',
                            }}
                            // onChange={handleChange}
                        >
                            <div className='grid gap-4 relative '>
                                <label
                                    htmlFor='RFID'
                                    className='text-[1.4rem] font-Satoshi-Medium'
                                >
                                    RFID Seriel Number *
                                </label>
                                <input
                                    type='number'
                                    required
                                    id='RFID'
                                    name='RFID'
                                    value={RFID <= 0 ? '' : RFID}
                                    onChange={(e) =>
                                        setRFID(
                                            e.target.value as unknown as number
                                        )
                                    }
                                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                />
                            </div>
                            <div className='grid gap-4 relative '>
                                <label
                                    htmlFor='vehicleRegNumber'
                                    className='text-[1.4rem] font-Satoshi-Medium'
                                >
                                    Vehicle Registration Number*
                                </label>
                                <input
                                    type='number'
                                    required
                                    id='vehicleRegNumber'
                                    name='vehicleRegNumber'
                                    value={
                                        vehicleRegNumber <= 0
                                            ? ''
                                            : vehicleRegNumber
                                    }
                                    onChange={(e) =>
                                        setVehicleRegNumber(
                                            e.target.value as unknown as number
                                        )
                                    }
                                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                />
                            </div>
                            <div className='grid gap-4 relative '>
                                <label
                                    htmlFor='vehicleMake'
                                    className='text-[1.4rem] font-Satoshi-Medium'
                                >
                                    Vehicle Make *
                                </label>
                                <input
                                    type='text'
                                    required
                                    id='vehicleMake'
                                    name='vehicleMake'
                                    value={vehicleMake}
                                    onChange={(e) =>
                                        setVehicleMake(e.target.value)
                                    }
                                    className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                                />
                            </div>
                            <Select
                                state={[
                                    'Motor Bike',
                                    'Tricycle (keke)',
                                    'Car',
                                    'SUV',
                                    'Bus',
                                    'Truck',
                                ]}
                                label='Vehicle Type'
                                isSearchable
                                selectedState={vehicleType}
                                setSelectedState={setVehicleType}
                            />
                            <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
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
                        <button className='btn text-color-blue-1 border border-color-blue-1 items-center gap-4 py-4 px-16 rounded-lg w-[15rem] mt-[5rem]'>
                            Add
                        </button>
                    </form>
                </section>

                <section>
                    {RFID_Details.length > 0 && (
                        <p className='font-Satoshi-Medium'>RFID Details</p>
                    )}

                    {RFID_Details.map((item, idx) => {
                        const {
                            photoUrl,
                            vehicleMake,
                            vehicleRegNumber,
                            vehicleType,
                            RFID,
                        } = item
                        return (
                            <div
                                className='grid relative border-b pb-4'
                                key={idx}
                            >
                                <img
                                    src='/img/closeIcon.svg'
                                    alt=''
                                    className='self-end justify-self-end cursor-pointer'
                                    onClick={() => deleteDialog(idx)}
                                />
                                <div className='flex gap-16 items-center pb-8'>
                                    <img
                                        src={photoUrl}
                                        alt='photoPreview'
                                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                                    />
                                    <div className='grid gap-4 min-w-[70rem]'>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                RFID Serial Number :
                                            </p>
                                            <p>{RFID}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Vehicle Registration Number :
                                            </p>
                                            <p>{vehicleRegNumber}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Vehicle Type :
                                            </p>
                                            <p>{vehicleType}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Vehicle Make :
                                            </p>
                                            <p>{vehicleMake}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>
        </>
    )
}

export default AddRFID
