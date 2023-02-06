import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'


type PathSwitch = 'platformChanges' | 'propertyType' | 'SOSDetails' | 'Account Settings'

function PlatformSettings() {


    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('platformChanges')

  

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
      
    }

    return (
        <div>
            <div className='estateDetail__radioBox'>
                <input
                    type='radio'
                    name='platform'
                    id='platformChanges'
                    className='hidden'
                    defaultChecked
                    onChange={() => setPathToSwitch('platformChanges')}
                />
                <label htmlFor='platformChanges' className='capitalize'>
                    Platform Changes
                </label>

                <input
                    type='radio'
                    name='platform'
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
