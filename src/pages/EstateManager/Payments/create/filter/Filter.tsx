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
            <div className=' p-8'>
                <p className='font-Satoshi-Medium text-[2rem]'>
                    {' '}
                    Filter Selection{' '}
                </p>
                <div className='flex items-center justify-between'>
                    <div className='w-[40rem]'>
                        <Select
                            state={filterKeys}
                            selectedState={filter}
                            setSelectedState={setFilter}
                            placeholder='Households'
                        />
                    </div>
                    {filter === 'Residents' && (
                        <p className='flex items-center gap-2'>
                            <span>
                                NB: All alphas are denoted with the icon{' '}
                            </span>
                            <img src='/img/alpha.svg' alt='' />
                        </p>
                    )}
                </div>
            </div>

            {renderFilters.get(filter as FilterKeys)}

            <button className=' flex gap-2 items-center justify-start self-center  capitalize'>
                <p className=' bg-color-blue-1 text-white py-4 px-8 rounded-lg '>
                    Create Payment
                </p>
            </button>
        </main>
    )
}

export default Filter
