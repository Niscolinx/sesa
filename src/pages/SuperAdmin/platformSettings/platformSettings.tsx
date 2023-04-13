import { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import AccountSettings from './settings/account/AccountSettings'
import PropertyType from './settings/property/PropertyType'
import PlatformChanges from './settings/PlatformChanges'
import SOSTable from './settings/SOS/SOSTable'
import PrevLocation from '../../../components/hooks/prevLocation'

type PathSwitch =
    | 'platform_changes'
    | 'property_type'
    | 'SOS_table'
    | 'account_settings'

function PlatformSettings() {
    const [currentPath, setCurrentPath] = useState<PathSwitch>('property_type')

    const handlePathSwitch = new Map([
        ['platform_changes', <PlatformChanges />],
        ['property_type', <PropertyType />],
        ['SOS_table', <SOSTable />],
        ['account_settings', <AccountSettings />],
    ]) satisfies Map<PathSwitch, JSX.Element>

    const paths = [
        'platform_changes',
        'property_type',
        'SOS_table',
        'account_settings',
    ] satisfies PathSwitch[]

    const { prevLocation } = PrevLocation()

    let getLastPath = prevLocation.split('/').pop()

    useLayoutEffect(() => {
        if (getLastPath) {
            getLastPath = getLastPath.replace(/([a-z])([A-Z])/g, '$1 $2')

            let word = getLastPath.split(' ').pop()?.toLowerCase()

            paths.some((path) => {
                return (
                    path.replace('_', ' ').toLowerCase().includes(word!) &&
                    setCurrentPath(path)
                )
            })
        }
    }, [getLastPath])

    return (
        <div>
            <div className='estateDetail__radioBox'>
                {paths.map((path) => (
                    <Fragment key={path}>
                        <input
                            type='radio'
                            name='platform'
                            id={path}
                            className='hidden'
                            checked={path === currentPath}
                            onChange={() => setCurrentPath(path)}
                        />
                        <label htmlFor={path} className='capitalize'>
                            {path.replace('_', ' ')}
                        </label>
                    </Fragment>
                ))}
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch.get(currentPath)}
                </section>
            </div>
        </div>
    )
}

export default PlatformSettings
