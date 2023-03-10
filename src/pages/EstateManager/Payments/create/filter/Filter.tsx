import { FC, useState } from 'react'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'



const HouseholdFilter: FC = () => {
    const [filter, setFilter] = useState<string | null>(null)


    return (
        <main className='grid gap-9'>
            <div className='w-[40rem] p-8'>
                <p className='font-Satoshi-Medium text-[2rem]'>
                    {' '}
                    Filter Selection{' '}
                </p>
                <Select
                    state={['Households', 'Residents']}
                    selectedState={filter}
                    setSelectedState={setFilter}
                    placeholder='Households'
                />
            </div>
           
        </main>
    )
}

export default HouseholdFilter
