import { Fragment, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import DigitalRequest from './paths/DigitalRequest'
import EventRequest from './paths/EventRequest'
import ResidentOnboarding from './paths/ResidentOnboarding'
import SiteWorkerRequest from './paths/SiteWorkerRequest'

function Approvals() {
    type Path =
        | 'event-request'
        | 'resident-onboarding'
        | 'site-worker-request'
        | 'SESA-digital-request'

    const path: Path[] = [
        'event-request',
        'resident-onboarding',
        'site-worker-request',
        'SESA-digital-request',
    ]
    const [isApprovals, setIsApprovals] = useState(false)
    const [currentPath, setCurrentPath] = useState<Path>('event-request')

    const addApprovalsHandler = () => {
        setIsApprovals(true)
    }

    const paths = new Map<Path, JSX.Element>([
        ['event-request', <EventRequest/>],
        ['resident-onboarding', <ResidentOnboarding/>],
        ['site-worker-request', <SiteWorkerRequest/>],
        ['SESA-digital-request', <DigitalRequest/>],
    ])

    return (
        <div>
            <div className='rounded-lg min-h-[80vh]'>
                {isApprovals ? (
                    <section>
                        <div
                            className='estateDetail__radioBox'
                            style={{
                                marginTop: 0,
                                marginBottom: '2rem',
                            }}
                        >
                            {path.map((eachPath, i) => (
                                <Fragment key={eachPath + i}>
                                    <input
                                        type='radio'
                                        name='approval'
                                        id={eachPath + i}
                                        className='hidden'
                                        onChange={() =>
                                            setCurrentPath(eachPath)
                                        }
                                        checked={eachPath === currentPath}
                                    />
                                    <label
                                        htmlFor={eachPath + i}
                                        className={`capitalize ${
                                            currentPath === eachPath
                                                ? 'font-Satoshi-Medium'
                                                : ''
                                        }`}
                                    >
                                        {eachPath.replaceAll('-', ' ')}
                                    </label>
                                </Fragment>
                            ))}

                           
                        </div>
                        <div>{paths.get(currentPath)}</div>
                    </section>
                ) : (
                    <section className='grid place-content-center w-full h-[80vh] justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you do not have any pending approvals yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addApprovalsHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Approvals
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Approvals
