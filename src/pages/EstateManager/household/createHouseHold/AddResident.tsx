import React, { useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'

function AddResident() {
    const [tenancyType, setTenancyType] = useState<string | null>(
        'Landlord (developer)'
    )
    const [selectLandLord, setSelectLandLord] = useState<string | null>(
        'Alice James/SO-2345CDGK'
    )

    const [careTaker, setCareTaker] = useState<string | null>('careTaker 1')

    return (
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
                            <p className='text-[#043FA7]'>Property Address</p>
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

            <section>
                <p className='font-semibold'> Step 1 (Select Tenanacy Type)</p>
                <div
                    className='grid'
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
                            selectedState={selectLandLord}
                            setSelectedState={setSelectLandLord}
                        />
                        <p className='text-color-blue-1 font-light'>
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
                            selectedState={careTaker}
                            setSelectedState={setCareTaker}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddResident
