import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import AdvertList, { IAdvertList } from './AdvertList'
import AvailableEstateAdvert, {
    IAvailableEstateAdvert,
} from './AvailableEstateAdvert'

export const ADVERT_LIST: IAdvertList[] = [
    {
        id: '1',
        advertName: 'Pepsi Advert',
        startDate: '02-May-22',
        endDate: '22-May-22',
        status: 'Active',
    },
    {
        id: '1',
        advertName: 'Pepsi Advert',
        startDate: '02-May-22',
        endDate: '22-May-22',
        status: 'Inactive',
    },
    {
        id: '1',
        advertName: 'Pepsi Advert',
        startDate: '02-May-22',
        endDate: '22-May-22',
        status: 'Inactive',
    },
    {
        id: '1',
        advertName: 'Pepsi Advert',
        startDate: '02-May-22',
        endDate: '22-May-22',
        status: 'Active',
    },
    {
        id: '1',
        advertName: 'Pepsi Advert',
        startDate: '02-May-22',
        endDate: '22-May-22',
        status: 'Active',
    },
    {
        id: '1',
        advertName: 'Pepsi Advert',
        startDate: '02-May-22',
        endDate: '22-May-22',
        status: 'Active',
    },
]

export const AVAILABLE_ESTATE_ADVERT: IAvailableEstateAdvert[] = [
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
    {
        id: '1',
        estateName: 'Pepsi Estate',
        state: 'Lagos',
        address: 'No 1, Pepsi Street, Pepsi Estate',
        noOfResidents: 50,
    },
]

type PathSwitch = 'advertList' | 'availableEstates'

function RenderAdverts() {
    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('advertList')

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        advertList: <AdvertList />,
        availableEstates: <AvailableEstateAdvert />,
    }

    return (
        <div>
            <div className='estateDetail__radioBox'>
                <input
                    type='radio'
                    name='advert'
                    id='advertList'
                    className='hidden'
                    defaultChecked
                    onChange={() => setPathToSwitch('advertList')}
                />
                <label htmlFor='advertList' className='capitalize'>
                    Advert List
                </label>

                <input
                    type='radio'
                    name='advert'
                    id='availableEstates'
                    className='hidden'
                    onChange={() => setPathToSwitch('availableEstates')}
                />
                <label htmlFor='availableEstates'>Available Estates</label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch[pathToSwitch]}
                </section>
            </div>
        </div>
    )
}

export default RenderAdverts
