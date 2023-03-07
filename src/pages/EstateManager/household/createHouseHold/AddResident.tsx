import React, { Fragment, useContext, useRef, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import { GrAdd } from 'react-icons/gr'
import {
    MultipleSelect,
    Select,
} from '../../../../components/SuperAdmin/UI/Select'
import { HouseholdContext } from './CreateHousehold'

function AddResident() {
    type DialogType = 'alphaResident' | 'residentUser'
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
    } = useContext(HouseholdContext)
    const [dialogType, setDialogType] = useState<DialogType>()
    const [addResidentUserCount, setAddResidentUserCount] = useState([1])

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        dialogRef.current?.close()
    }

    const openDialog = (dialogType: DialogType) => {
        console.log('clicked')
        dialogType === 'alphaResident'
            ? setDialogType('alphaResident')
            : setDialogType('residentUser')

        if (dialogRef.current) {
            return dialogRef.current.showModal()
        }
    }

    const AddResidentUser = () => {
        return (
            <div className='grid gap-8'>
                <p
                    className=' flex items-center gap-2 font-Satoshi-Medium border-b pb-10'
                    onClick={() => openDialog('alphaResident')}
                >
                    Add Alpha Resident{' '}
                    <BsQuestionCircle
                        className='text-[#043FA7] cursor-pointer'
                        onClick={() => openDialog('alphaResident')}
                    />
                </p>

                <div
                    className='grid gap-16'
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

                        <p className='text-color-blue-1 font-light text-[1.2rem] p-2 opacity-70'>
                            View Details
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
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
                                label='Select Landlord'
                                isSearchable
                                placeholder='Alice James/SO-2345CDGK'
                                selectedState={selectLandLord}
                                setSelectedState={setSelectLandLord}
                            />
                            <p className='text-color-blue-1 font-light text-[1.2rem] p-2 opacity-70'>
                                View Details
                            </p>
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
                <section className='mt-[5rem] grid gap-16'>
                    <p className='font-semibold border-b pb-2'>
                        {' '}
                        Step 2 (Add Occupants)
                    </p>

                    <div className='grid gap-8'>
                        <p
                            className=' flex items-center gap-2 font-Satoshi-Medium border-b pb-10'
                            onClick={() => openDialog('alphaResident')}
                        >
                            Add Alpha Resident{' '}
                            <BsQuestionCircle
                                className='text-[#043FA7] cursor-pointer'
                                onClick={() => openDialog('alphaResident')}
                            />
                        </p>

                        <div
                            className='grid gap-16'
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

                                <p className='text-color-blue-1 font-light text-[1.2rem] p-2 opacity-70'>
                                    View Details
                                </p>
                            </div>
                        </div>
                    </div>
                    {addResidentUserCount.map((item) => {
                        return (
                            <Fragment key={item}>
                                <AddResidentUser />
                            </Fragment>
                        )
                    })}
                    <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full justify-items-center'>
                        <p className='flex items-center gap-8'>
                            <span>
                                <GrAdd />
                            </span>
                            <span>Add Resident User</span>
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddResident
