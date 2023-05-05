import { useState } from 'react'
import AdvertList from './AdvertList'
import AvailableEstateAdvert from './AvailableEstateAdvert'

function Advert() {
    type PathSwitch = 'advertList'

    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('advertList')

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        advertList: <AdvertList />,
        // availableEstates: <AvailableEstateAdvert />,
    }

    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            {/* <div className='estateDetail__radioBox'>
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
                </div> */}
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch[pathToSwitch]}
                </section>
            </div>
        </div>
    )
}

export default Advert
