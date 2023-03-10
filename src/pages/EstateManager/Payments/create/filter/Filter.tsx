import { FC, useState } from 'react'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'
import HouseholdFilter from './HouseholdFilter'

const Filter: FC = () => {
    type FilterKeys = 'Households' | 'Residents'
    
    const [filter, setFilter] = useState<FilterKeys | string | null>('Households')

    const filterKeys = ['Households', 'Residents'] satisfies FilterKeys[]

    const renderFilters = new Map([
        ['Households', <HouseholdFilter />],
        ['Residents', <></>],
    ]) satisfies Map<FilterKeys, JSX.Element>

    return (
        <main className='grid gap-9'>
            <div className='w-[40rem] p-8'>
                <p className='font-Satoshi-Medium text-[2rem]'>
                    {' '}
                    Filter Selection{' '}
                </p>
                <Select
                    state={filterKeys}
                    selectedState={filter}
                    setSelectedState={setFilter}
                    placeholder='Households'
                />
            </div>

            {renderFilters.get(filter)}
        </main>
    )
}

export default Filter
