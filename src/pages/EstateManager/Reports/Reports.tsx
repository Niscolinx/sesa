import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

function Reports() {
    type Path =
        | 'resident_access'
        | 'voters_access'
        | 'group_access'
        | 'estate_staff'
        | 'site_worker'
        | 'events'
        | 'security_guard_activity'
        | 'work_rate'

    const paths: Path[] = [
        'resident_access',
        'voters_access',
        'group_access',
        'estate_staff',
        'site_worker',
        'events',
        'security_guard_activity',
        'work_rate',
    ]

    const [isReport, setIsReport] = useState(false)
    const [currentPath, setCurrentPath] = useState<Path>('resident_access')

    const addReportsHandler = () => {
        setIsReport(true)
    }

    const renderPath = new Map<Path, JSX.Element>([['resident_access', <></>]])

    return (
        <div>
            <div className='rounded-lg min-h-[80vh] p-8'>
                {isReport ? (
                    <section>
                        <div
                            className='estateDetail__radioBox'
                            style={{
                                marginTop: 0,
                                marginBottom: '2rem',
                            }}
                        >
                            {paths.map((path, i) => (
                                <>
                                    <input
                                        type='radio'
                                        name='report'
                                        id={path + i}
                                        className='hidden'
                                        onChange={() => setCurrentPath(path)}
                                        defaultChecked
                                    />
                                    <label
                                        htmlFor={path + i}
                                        className={`capitalize ${
                                            currentPath === path
                                                ? 'font-Satoshi-Medium'
                                                : ''
                                        }`}
                                    >
                                        {path.split('_').join(' ')}
                                    </label>
                                </>
                            ))}
                        </div>
                        <div>{renderPath.get(currentPath)}</div>
                    </section>
                ) : (
                    <section className='grid place-content-center w-full h-[80vh] justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Reports yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addReportsHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Reports
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Reports
