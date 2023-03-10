import { FC, useState } from 'react'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'

const Filter: FC = () => {
    const [filter, setFilter] = useState<string | null>(null)

    type FilterKeys = 'Households' | 'Residents'
    const filterKeys = ['Households', 'Residents'] satisfies FilterKeys[]

    const renderFilters = new Map([
        ['Households', <></>],
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
                    state={}
                    selectedState={filter}
                    setSelectedState={setFilter}
                    placeholder='Households'
                />
            </div>
        </main>
    )
}

export default Filter
