import React, { useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'

function AddProperty() {
    const [selectedPropertyCode, setSelectedPropertyCode] = useState<
        string | null
    >(null)
    return (
        <div>
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
            <section className='w-full flex bg-white p-8 rounded-lg gap-16 relative'>
                <div>
                    <img
                        src={'/img/img3.png'}
                        alt=''
                        className='w-[42rem] h-[26rem] object-cover rounded-lg'
                    />
                </div>

                <div className='grid'>
                    <div>
                        <p className='text-[1.4rem] text-[#043FA7]'>
                            Estate&nbsp;Name
                        </p>
                        <p className='font-[1.6rem] whitespace-nowrap'>
                            Iba Housing Estate
                        </p>
                    </div>
                    <div>
                        <p className='text-[#043FA7]'>
                            Number of Security Guards
                        </p>
                        <p>21</p>
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
