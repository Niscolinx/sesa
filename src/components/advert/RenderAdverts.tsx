import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import AdvertList, { IAdvertList } from './AdvertList'

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

type PathSwitch = 'advertList' | 'availableEstates'

function RenderAdverts() {
    const [fetchedAdvertList, setFetchedAdvertList] = useState<
        IAdvertList[] | null
    >(null)

    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('advertList')

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedAdvertList(ADVERT_LIST)
            }, 1000)
        }
        fetchData()
    }, [])

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        advertList: <AdvertList fetchedAdvertList={fetchedAdvertList ?? []} />,
        availableEstates: (
            <AdvertList fetchedAdvertList={fetchedAdvertList ?? []} />
        ),
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
                    {fetchedAdvertList && fetchedAdvertList.length > 0 ? (
                        handlePathSwitch[pathToSwitch]
                    ) : (
                        <section className='relative w-[70vw] h-[60vh] mx-auto grid'>
                            <div className='absolute w-full h-full grid place-content-center'>
                                <CgSpinnerTwo className='animate-spin text-color-green-light text-5xl' />
                            </div>
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}

export default RenderAdverts
