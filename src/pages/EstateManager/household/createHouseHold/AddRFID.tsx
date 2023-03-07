import React, { Fragment, useContext, useRef, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { GrAdd } from 'react-icons/gr'
import {
    MappedSelect,
    Select,
} from '../../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { HouseholdContext } from './CreateHousehold'

function AddRFID() {
    type DialogType = 'alphaResident' | 'residentUser'
    type DetailDialogType = 'alphaResident' | 'landlord'
    const {
        careTaker,
        setCareTaker,
        tenancyType,
        setTenancyType,
        selectLandLord,
        setSelectLandLord,
        alphaPropertyCode,
        setAlphaPropertyCode,
        alphaResident,
        setAlphaResident,
        addResidentUser,
        setAddResidentUser,
    } = useContext(HouseholdContext)
    const [dialogType, setDialogType] = useState<DialogType>()
    const [dialogDetailType, setDialogDetailType] = useState<DetailDialogType>()
    const [addResidentUserCount, setAddResidentUserCount] = useState(2)
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
    const DetailRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        dialogRef.current?.close()
    }

    const openDialog = (dialogType: DialogType) => {
        dialogType === 'alphaResident'
            ? setDialogType('alphaResident')
            : setDialogType('residentUser')

        if (dialogRef.current) {
            return dialogRef.current.showModal()
        }
    }

    const openDetailDialog = (detailDialogType: DetailDialogType) => {
        detailDialogType === 'alphaResident'
            ? setDialogDetailType('alphaResident')
            : setDialogDetailType('landlord')

        if (DetailRef.current) {
            return DetailRef.current.showModal()
        }
    }

    const closeDetailDialog = () => {
        DetailRef.current?.close()
    }

    return (
        <>
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
                    <div
                        className='grid mt-[5rem] gap-16'
                        style={{
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(40rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-medium'
                            >
                                RFID Seriel Number *
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
                                Vehicle Registration Number*
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-medium'
                            >
                                Vehicle Make *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

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
                </section>
                {tenancyType !== 'Landlord (developer)' && (
                    <section className='mt-[5rem] grid gap-16'>
                        <p className='font-semibold border-b pb-2'>
                            {' '}
                            Step 2 (Add Occupants)
                        </p>

                        <div className='grid gap-8'>
                            <p className=' flex items-center gap-2 font-Satoshi-Medium border-b pb-10'>
                                Add Alpha Resident{' '}
                                <BsQuestionCircle
                                    className='text-[#043FA7] cursor-pointer w-ma'
                                    onClick={() => openDialog('alphaResident')}
                                />
                            </p>

                            <div
                                className={`grid gap-16  ${
                                    tenancyType === 'Landlord (resident)' &&
                                    ' pointer-events-none select-none opacity-50 cursor-not-allowed'
                                }`}
                                style={{
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(40rem, 1fr))',
                                }}
                            >
                                <div>
                                    <Select
                                        state={[
                                            'Alice James/SO-2345CDGK',
                                            'Osaji James/SO-2345CDGK',
                                            'Ruth James/SO-2345CDGK',
                                            'Timothy James/SO-2345CDGK',
                                        ]}
                                        label='Property Type'
                                        isSearchable
                                        selectedState={alphaPropertyCode}
                                        setSelectedState={setAlphaPropertyCode}
                                    />
                                    <p className='text-color-blue-1 font-light text-[1.2rem] p-2 opacity-70'>
                                        View Details
                                    </p>
                                </div>
                                <div>
                                    <Select
                                        state={[
                                            'Osaji Valentine/SE-73',
                                            'Anthony Valentine/SE-73',
                                            'Michael Valentine/SE-73',
                                        ]}
                                        label='Alpha Resident 02*'
                                        color={'[#076AFF]'}
                                        isSearchable
                                        selectedState={alphaResident}
                                        setSelectedState={setAlphaResident}
                                    />

                                    <button
                                        className='text-color-blue-1 font-light text-[1.2rem] p-2 opacity-70 border-none outline-transparent'
                                        onClick={() =>
                                            openDetailDialog('alphaResident')
                                        }
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-8'>
                            <p className=' flex items-center gap-2 font-Satoshi-Medium border-b pb-10'>
                                Add Resident User{' '}
                                <BsQuestionCircle
                                    className='text-[#043FA7] cursor-pointer'
                                    onClick={() => openDialog('residentUser')}
                                />
                            </p>

                            <div
                                className='grid gap-16'
                                style={{
                                    gridTemplateColumns:
                                        'repeat(auto-fit, minmax(40rem, 1fr))',
                                }}
                            >
                                {Array.from({
                                    length: addResidentUserCount,
                                }).map((item, idx) => {
                                    return (
                                        <div key={idx}>
                                            <MappedSelect
                                                state={[
                                                    'Alice James/SO-2345CDGK',
                                                    'Osaji James/SO-2345CDGK',
                                                    'Ruth James/SO-2345CDGK',
                                                    'Timothy James/SO-2345CDGK',
                                                ]}
                                                idx={`${1 + idx}`}
                                                label={`Resident User ${
                                                    1 + idx
                                                }`}
                                                isSearchable
                                                color={'bg-[#076AFF]'}
                                                selectedState={addResidentUser}
                                                setSelectedState={
                                                    setAddResidentUser
                                                }
                                            />
                                            <p className='text-color-blue-1 font-light text-[1.2rem] p-2 opacity-70'>
                                                View Details
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full flex justify-items-center justify-center  max-w-[70%] mx-auto'>
                            <button
                                className='flex items-center gap-8'
                                onClick={() =>
                                    setAddResidentUserCount((prev) => prev + 1)
                                }
                            >
                                <span>
                                    <GrAdd />
                                </span>
                                <span>Add Resident User</span>
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}

export default AddRFID
