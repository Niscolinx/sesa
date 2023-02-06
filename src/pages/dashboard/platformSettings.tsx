import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'


type PathSwitch = 'advertList' | 'availableEstates'

function PlatformSettings() {
    const [fetchedAdvertList, setFetchedAdvertList] = useState<
        IAdvertList[] | null
    >(null)
    const [fetchedAvailableEstateAdvert, setFetchedAvailableEstateAdvert] =
        useState<IAvailableEstateAdvert[] | null>(null)

    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('advertList')

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedAdvertList(ADVERT_LIST)
                setFetchedAvailableEstateAdvert(AVAILABLE_ESTATE_ADVERT)
            }, 1000)
        }
        fetchData()
    }, [])

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        advertList: <AdvertList fetchedAdvertList={fetchedAdvertList ?? []} />,
        availableEstates: (
            <AvailableEstateAdvert
                fetchedAvailableEstateAdvert={
                    fetchedAvailableEstateAdvert ?? []
                }
            />
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

export default PlatformSettings
