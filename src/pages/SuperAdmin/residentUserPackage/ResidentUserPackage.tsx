import { Fragment, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import ResidentPackageHistory from './ResidentPackageHistory'
import ResidentPackageList from './ResidentPackageList'
import useAxios from '../../../components/hooks/useAxios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

function ResidentUserPackage() {
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
        <div className='rounded-lg h-[80vh]'>
            <div className='estateDetail__radioBox capitalize'>
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
            {switchRoute.get(currentPath)}
        </div>
    )
}

export default ResidentUserPackage
