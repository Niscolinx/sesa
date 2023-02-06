import { useState } from 'react'
import AccountSettings from '../../components/platformSettings/AccountSettings'
import PlatformChanges from '../../components/platformSettings/PlatformChanges'
import PropertyType from '../../components/platformSettings/PropertyType'
import SOSTable from '../../components/platformSettings/SOSTable'

type PathSwitch =
    | 'platformChanges'
    | 'propertyType'
    | 'SOSTable'
    | 'accountSettings'

function PlatformSettings() {
    const [pathToSwitch, setPathToSwitch] =
        useState<PathSwitch>('platformChanges')

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        platformChanges: <PlatformChanges />,
        propertyType: <PropertyType />,
        SOSTable: <SOSTable />,
        accountSettings: <AccountSettings />,
    }

    return (
        <div>
            <h1 className='heading2'>Platform Settings</h1>

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
                    id='propertyType'
                    className='hidden'
                    onChange={() => setPathToSwitch('propertyType')}
                />
                <label htmlFor='propertyType'>Property Type</label>
                <input
                    type='radio'
                    name='platform'
                    id='SOSTable'
                    className='hidden'
                    onChange={() => setPathToSwitch('SOSTable')}
                />
                <label htmlFor='SOSTable'>SOS Table</label>
                <input
                    type='radio'
                    name='platform'
                    id='accountSettings'
                    className='hidden'
                    onChange={() => setPathToSwitch('accountSettings')}
                />
                <label htmlFor='accountSettings'>SOS Table</label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch[pathToSwitch]}
                </section>
            </div>
        </div>
    )
}

export default PlatformSettings
