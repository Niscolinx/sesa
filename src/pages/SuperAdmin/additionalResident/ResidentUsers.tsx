import { useState, useEffect, Fragment } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import ResidentUserHistory, {
    IResidentUserHistory,
} from './ResidentUserHistory'
;('react-icons/hi')

import ResidentUsersList, {
    RESIDENT_LISTS,
    IResidentUsersList,
} from './ResidentUsersList'

export const RESIDENT_HISTORY: IResidentUserHistory[] = [
    {
        id: '1',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '2',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '3',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '4',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '5',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '6',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '7',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '8',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '9',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
    {
        id: '10',
        packageName: 'Gold',
        userName: 'John Doe',
        frequency: 'Monthly',
        amount: 1000,
        startDate: '2021-01-01',
        endDate: '2021-01-31',
        transactionType: 'purchase',
        status: 'active',
    },
]

function ResidentUsers() {
    type SwitchRoute = 'list' | 'history'

    const resident_paths = [
        { path: 'list', label: 'Additional Resident Package' },
        { path: 'history', label: 'Package purchase history' },
    ] satisfies { path: SwitchRoute; label: string }[]

    const [fetchedResidentUsers, setFetchedResidentUsers] = useState<
        IResidentUsersList[] | null
    >(null)
    const [fetchedResidentUserHistory, setFetchedResidentUserHistory] =
        useState<IResidentUserHistory[] | null>(null)

    const [currentPath, setCurrentPath] = useState<SwitchRoute>('list')

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedResidentUsers(RESIDENT_LISTS)
                setFetchedResidentUserHistory(RESIDENT_HISTORY)
            }, 200)
        }
        fetchData()
    }, [])

    const switchRoute = new Map([
        ['list', <ResidentUsersList fetchedResidentUsers={[]} />],
        ['history', <ResidentUserHistory fetchedResidentUserHistory={[]} />],
    ]) satisfies Map<SwitchRoute, JSX.Element>

    return (
        <div>
            <div className='estateDetail__radioBox'>
                {resident_paths.map((eachPath, idx) => {
                    const {label, path} = eachPath
                    return (
                        <Fragment key={label + idx}>
                            <input
                                type='radio'
                                name='report'
                                id={label+idx}
                                className='hidden'
                                onChange={() => setCurrentPath(path)}
                                defaultChecked
                            />
                            <label htmlFor={label+idx}>
                                {label}
                            </label>
                        </Fragment>
                    )
                })}

                <input
                    type='radio'
                    name='report'
                    id='residentUserHistory'
                    className='hidden'
                    onChange={() => setCurrentPage(2)}
                />
                <label htmlFor='residentUserHistory' className='capitalize'>
                    Package purchase history
                    {/* //TODO Change the custom select of package to be normal input field
                    //comma separated in Amount */}
                </label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {fetchedResidentUsers && fetchedResidentUsers.length > 0 ? (
                        handlePathSwitch(currentPage)
                    ) : (
                        <section className='relative w-[70vw] h-[60vh] mx-auto grid'>
                            <div className='absolute w-full h-full grid place-content-center'>
                                <CgSpinnerTwo className='animate-spin text-color-green-light text-5xl' />
                            </div>
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}

export default ResidentUsers
