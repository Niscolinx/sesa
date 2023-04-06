import { useState, Fragment } from 'react'
import ResidentPackageList from './ResidentPackageList'
import ResidentPackageHistory from './ResidentPackageHistory'

function ResidentUsers() {
    type SwitchRoute = 'list' | 'history'

    const resident_paths = [
        { path: 'list', label: 'Additional Resident Package' },
        { path: 'history', label: 'Package purchase history' },
    ] satisfies { path: SwitchRoute; label: string }[]

    const [currentPath, setCurrentPath] = useState<SwitchRoute>('list')

    const switchRoute = new Map([
        ['list', <ResidentPackageList />],
        ['history', <ResidentPackageHistory />],
    ]) satisfies Map<SwitchRoute, JSX.Element>

    return (
        <>
            <div className='estateDetail__radioBox'>
                {resident_paths.map((eachPath, idx) => {
                    const { label, path } = eachPath
                    return (
                        <Fragment key={label + idx}>
                            <input
                                type='radio'
                                name='report'
                                id={label + idx}
                                className='hidden'
                                onChange={() => setCurrentPath(path)}
                                checked={currentPath === path}
                            />
                            <label htmlFor={label + idx}>{label}</label>
                        </Fragment>
                    )
                })}
            </div>
            <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll mt-8 min-h-[60vh]'>
                {switchRoute.get(currentPath)}
            </section>
        </>
    )
}

export default ResidentUsers
