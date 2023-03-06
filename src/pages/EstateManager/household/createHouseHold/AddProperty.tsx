import React, { useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'

function AddProperty() {
    const [selectedPropertyCode, setSelectedPropertyCode] = useState<
        string | null
    >(null)

    return (
        <div className='grid gap-16'>
            <div className='w-[30rem]'>
                <Select
                    state={[
                        'ThomasEstate/SO-2345CDGK1',
                        'ThomasEstate/SO-2345CDGK2',
                        'ThomasEstate/SO-2345CDGK3',
                        'ThomasEstate/SO-2345CDGK4',
                        'ThomasEstate/SO-2345CDGK5',
                    ]}
                    label='Property Code*'
                    isSearchable
                    selectedState={selectedPropertyCode}
                    setSelectedState={setSelectedPropertyCode}
                />
            </div>
            <section className='w-full flex gap-16 relative'>
                <div>
                    <img
                        src={'/img/img3.png'}
                        alt=''
                        className='w-[20rem] h-[18rem] object-cover rounded-lg'
                    />
                </div>

                <div className='grid'>
                    <div>
                        <p className='text-[1.4rem] text-[#043FA7]'>
                            Property Code
                        </p>
                        <p className='font-[1.6rem] whitespace-nowrap'>
                            {selectedPropertyCode}
                        </p>
                    </div>
                    <div>
                        <p className='text-[#043FA7]'>Property Type</p>
                        <p>Duplex</p>
                    </div>
                    <div>
                        <p className='text-[#043FA7]'>Property Address</p>
                        <p>
                            10, Address Street, Address Avenue, Lagos, Nigeria.
                        </p>{' '}
                    </div>
                </div>
                <div className='grid'>
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
                    <div>
                        <p className='text-[#043FA7]'>Status</p>
                        <p className='text-[#1D9F5F]'>Active</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddProperty
