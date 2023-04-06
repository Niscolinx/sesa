import { useState, Fragment } from 'react'
import ResidentUsersList from './ResidentUsersList';
import ResidentUserHistory from './ResidentUserHistory';






function ResidentUsers() {
    type SwitchRoute = 'list' | 'history'

    const resident_paths = [
        { path: 'list', label: 'Additional Resident Package' },
        { path: 'history', label: 'Package purchase history' },
    ] satisfies { path: SwitchRoute; label: string }[]

    const [currentPath, setCurrentPath] = useState<SwitchRoute>('list')

    const switchRoute = new Map([
        ['list', <ResidentUsersList />],
        ['history', <ResidentUserHistory />],
    ]) satisfies Map<SwitchRoute, JSX.Element>

    return (
        <div>
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
                                defaultChecked={currentPath === 'list'}
                            />
                            <label htmlFor={label + idx}>{label}</label>
                        </Fragment>
                    )
                })}
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {switchRoute.get(currentPath)}
                </section>
            </div>
        </div>
    )
}

export default ResidentUsers
