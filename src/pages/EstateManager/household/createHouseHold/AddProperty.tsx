import React, { useState } from 'react'
import { Select } from '../../../../components/SuperAdmin/UI/Select'

function AddProperty() {
    const [selectedPropertyCode, setSelectedPropertyCode] = useState<
        string | null
    >(null)
    return (
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
    )
}

export default AddProperty
