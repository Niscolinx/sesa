import { useState } from 'react'
import OverviewCard from '../../../components/estateManager/OverviewCard'
import ResidentProfile from './ResidentProfile'
import UniqueResident from './UniqueResident'

function Residents() {
    type Path = 'unique_resident' | 'resident_profile'

    const paths: Path[] = ['unique_resident', 'resident_profile']

    const [currentPath, setCurrentPath] = useState<Path>('unique_resident')

    const displayPath = new Map<Path, JSX.Element>([
        ['unique_resident', <UniqueResident />],
        ['resident_profile', <ResidentProfile />],
    ])

    return (
        <>
            <div>
                <section className='bg-white rounded-lg p-8 grid text-[1.4rem] '>
                    <div
                        className=' grid gap-8'
                        style={{
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(30rem, 1fr))',
                        }}
                    >
                        <OverviewCard
                            title='Unique Residents'
                            number={1532}
                            iconUrl='/icons/estateManager/people.svg'
                            bgColor='bg-[#F5F9FA]'
                            textColor='text-[#00C2FF]'
                            bottomLeft='Alpha 56%'
                            bottomRight='Res. User 44%'
                        />
                        <OverviewCard
                            title='KYR Validation'
                            number='45%'
                            iconUrl='/icons/estateManager/validation.svg'
                            bgColor='bg-[#EDFDEC]'
                            textColor='text-[#1A8F56]'
                            bottomLeft='% of residents whose identity has been validated'
                        />
                        <OverviewCard
                            title='Resident Profiles'
                            number={18100}
                            iconUrl='/icons/estateManager/profiles.svg'
                            bgColor='bg-[#FCF3FA]'
                            textColor='text-[#B6008E]'
                            bottomLeft='LR 39% - TR 29%'
                            bottomRight='LD 10% - LNR 2%'
                        />
                    </div>
                </section>

                <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                    <div className='estateDetail__radioBox'>
                        {paths.map((path) => (
                            <>
                                <input
                                    type='radio'
                                    name='resident'
                                    id={path}
                                    className='hidden'
                                    onChange={() => setCurrentPath(path)}
                                    defaultChecked = {currentPath === path}
                                />
                                <label
                                    htmlFor={path}
                                    className={` capitalize ${
                                        currentPath === path &&
                                        'font-Satoshi-Medium'
                                    }`}
                                >
                                    {path.replaceAll('_', ' ')}
                                </label>
                            </>
                        ))}
                    </div>

                    <div>{displayPath.get(currentPath)}</div>
                </div>
            </div>
        </>
    )
}

export default Residents
