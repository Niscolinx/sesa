import { FC, useState } from 'react'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'
import HouseholdFilter from './HouseholdFilter'
import ResidentFilter from './ResidentFilter'

const Filter: FC = () => {
    type FilterKeys = 'Households' | 'Residents'

    const [filter, setFilter] = useState<FilterKeys | string | null>(
        'Households'
    )

    const filterKeys = ['Households', 'Residents'] satisfies FilterKeys[]

    const renderFilters = new Map([
        ['Households', <HouseholdFilter />],
        ['Residents', <ResidentFilter />],
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
                <p className='flex items-center gap-2'>
                    <span>NB: All alphas are denoted with the icon </span>
                    <img src='/img/alpha.svg' alt='' />
                </p>
            </div>

            {renderFilters.get(filter as FilterKeys)}
        </main>
    )
}

export default Filter
