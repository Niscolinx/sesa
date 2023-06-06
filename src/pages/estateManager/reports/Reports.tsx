import axios from 'axios'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useQuery } from 'react-query'
import EstateStaffReport from './paths/EstateStaffReport'
import EventsReport from './paths/EventsReport'
import GroupReport from './paths/GroupReport'
import ResidentAccess from './paths/ResidentReport'
import SecurityGuardActivity from './paths/SecurityGuardActivity'
import SiteWorkerReport from './paths/SiteWorkerReport'
import VisitorReport from './paths/VisitorReport'
import WorkRate from './paths/WorkRate'

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

    const renderPath = new Map<Path, JSX.Element>([
        ['resident_access', <ResidentAccess />],
        ['voters_access', <VisitorReport />],
        ['group_access', <GroupReport />],
        ['estate_staff', <EstateStaffReport />],
        ['site_worker', <SiteWorkerReport />],
        ['events', <EventsReport />],
        ['security_guard_activity', <SecurityGuardActivity />],
        ['work_rate', <WorkRate />],
    ])

    type ResponseData = {
        id: string
        name: string
    }

    // const { isLoading, data: response_data } = useQuery('user', () => {
    //     return axios.get('http://localhost:4000/users')
    // }, {
    //     cacheTime: 5000,
    //     staleTime: 30000
    // })

    // if (isLoading) {
    //     return (
    //         <div>
    //             <p>Loading...</p>
    //         </div>
    //     )
    // }

    return (
        <div>
            <div className='rounded-lg min-min-h-[60vh]'>
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
                                        checked={currentPath === path}
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
                        <div className='mt-[5rem]'>
                            {renderPath.get(currentPath)}
                        </div>
                    </section>
                ) : (
                    <section className='grid place-content-center w-full min-h-[60vh] justify-items-center gap-4 bg-white rounded-lg'>
                        {/* {response_data?.data.map((data: ResponseData) => (
                            <div
                                key={data.id}
                                className='grid p-8 border rounded-2xl gap-4 items-center'
                            >
                                <p className='flex items-center p-'>
                                    {data.name}
                                </p>
                            </div>
                        ))} */}

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
