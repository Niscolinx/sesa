import { Fragment, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useLocation } from 'react-router'
import ResidentUsers from './ResidentUserPackages'
import ResidentPackageHistory from './ResidentPackageHistory'
import ResidentPackageList from './ResidentPackageList'

function AdditionalResident() {
    const navigate = useLocation()
    const [additionalResident, setAdditionalResident] = useState(false)

    const handleAddEstate = () => {
        setAdditionalResident(true)
    }
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
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {additionalResident ? (
                    <>
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
                                            onChange={() =>
                                                setCurrentPath(path)
                                            }
                                            checked={currentPath === path}
                                        />
                                        <label htmlFor={label + idx}>
                                            {label}
                                        </label>
                                    </Fragment>
                                )
                            })}
                        </div>
                        <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll mt-8 min-h-[60vh]'>
                            {switchRoute.get(currentPath)}
                        </section>
                    </>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Package yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={handleAddEstate}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Package
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default AdditionalResident
