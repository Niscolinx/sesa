import React, { Fragment, useContext, useRef, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { GrAdd } from 'react-icons/gr'
import { MappedSelect, Select } from '../../../../components/ui/Select'
import { HouseholdContext } from './CreateHousehold'

function AddResident() {
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
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center gap-8 text-[1.6rem]'>
                            <p className='font-Satoshi-Medium text-[#0446B9]'>
                                {dialogType === 'alphaResident' ? (
                                    <span>Who is Alpha Resident?</span>
                                ) : (
                                    <span>Who is Resident User?</span>
                                )}
                            </p>

                            <div className='grid gap-4'>
                                <p>
                                    Know Your Resident (KYR) is a service that
                                    allows you confirm the true identity of your
                                    users (ie: resident). With basic information
                                    like phone number or any valid ID type, you
                                    can know "who is who"
                                </p>
                                <p>
                                    Please note: this service costs N200 per
                                    successful validation and it will be charged
                                    from your SESA wallet
                                </p>
                            </div>

                            <div className='flex w-full justify-center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => closeDialog()}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </dialog>
            <dialog className='dialog' ref={DetailRef}>
                <section className='grid w-full h-[100vh] place-content-center'>
                    <div className='bg-white rounded-2xl items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative grid'>
                        <p className='font-Satoshi-Medium border-b pb-5'>
                            {dialogDetailType === 'alphaResident' ? (
                                <span>Alpha Resident</span>
                            ) : (
                                <span>Landlord Details</span>
                            )}
                        </p>

                        <div className='flex items-center gap-16'>
                            <img
                                src='/img/avatar11.png'
                                alt=''
                                className='w-[12rem] h-[12rem] rounded-full object-cover'
                            />
                            <div>
                                <p>Resident Code</p>
                                <p>Resident Name</p>
                                <p>Phone Number</p>
                                <p>Tenancy Type</p>
                                <p>Resident Category</p>
                                <p>KYR Status</p>
                            </div>
                        </div>
                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn bg-[#0556E5] text-white border rounded-lg w-[15rem]'
                                onClick={() => closeDetailDialog()}
                            >
                                Ok
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
                        Step 1 (Select Tenanacy Type)
                    </p>
                    <div
                        className='grid mt-[5rem] gap-16'
                        style={{
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(40rem, 1fr))',
                        }}
                    >
                        <div>
                            <Select
                                state={[
                                    'Landlord (developer)',
                                    'Landlord (resident)',
                                    'Landlord (non-resident)',
                                    'Tenant (resident)',
                                ]}
                                label='Tenancy Type'
                                isSearchable
                                placeholder='Landlord (resident)'
                                selectedState={tenancyType}
                                setSelectedState={setTenancyType}
                            />
                        </div>
                        <div>
                            <Select
                                state={[
                                    'Alice James/SO-2345CDGK',
                                    'Osaji James/SO-2345CDGK',
                                    'Ruth James/SO-2345CDGK',
                                    'Timothy James/SO-2345CDGK',
                                ]}
                                label='Landlord Code'
                                isSearchable
                                placeholder='Alice James/SO-2345CDGK'
                                selectedState={selectLandLord}
                                setSelectedState={setSelectLandLord}
                            />
                            <button
                                className='text-color-blue-1 font-light text-[1.2rem] p-2 opacity-70 border-none outline-none'
                                onClick={() => openDetailDialog('landlord')}
                            >
                                View Details
                            </button>
                        </div>
                        <div>
                            <Select
                                state={[
                                    'careTaker 1',
                                    'careTaker 2',
                                    'careTaker 3',
                                    'careTaker 4',
                                ]}
                                label='Add Caretaker/Property Admin (optional)'
                                isSearchable
                                placeholder='placeholder'
                                selectedState={careTaker}
                                setSelectedState={setCareTaker}
                            />
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

export default AddResident
