import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

function Approvals() {
    type Path =
        | 'event-request'
        | 'resident-onboarding'
        | 'site-worker-request'
        | 'SESA-digital-request'

    const path:Path[] = [
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
        ['event-request', <></>],
        ['resident-onboarding', <></>],
    ])

    return (
        <div>
            <div className='rounded-lg min-h-[80vh] p-8'>
                {isApprovals ? (
                    <section>
                        <div
                            className='estateDetail__radioBox'
                            style={{
                                marginTop: 0,
                                marginBottom: '2rem',
                            }}
                        >
                            {
                                
                            }
                            <input
                                type='radio'
                                name='token'
                                id='event-request'
                                className='hidden'
                                onChange={() => setCurrentPath('event-request')}
                                defaultChecked
                            />
                            <label
                                htmlFor='event-request'
                                className={` ${
                                    currentPath === 'event-request'
                                        ? 'font-Satoshi-Medium'
                                        : 'capitalize'
                                }`}
                            >
                                Token List
                            </label>

                            <input
                                type='radio'
                                name='token'
                                id='resident-onboarding'
                                className='hidden'
                                onChange={() =>
                                    setCurrentPath('resident-onboarding')
                                }
                            />
                            <label
                                htmlFor='resident-onboarding'
                                className={` ${
                                    currentPath === 'resident-onboarding'
                                        ? 'font-Satoshi-Medium'
                                        : 'capitalize'
                                }`}
                            >
                                Token Purchase
                            </label>
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
