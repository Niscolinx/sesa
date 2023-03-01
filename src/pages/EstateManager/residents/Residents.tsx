import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import OverviewCard from '../../../components/EstateManager/OverviewCard'
import ResidentProfile from './ResidentProfile'
import UniqueResident from './UniqueResident'

function Residents() {
    type Path = 'unique' | 'profile'

    const [isResident, setIsResident] = useState(false)
    const [currentPath, setCurrentPath] = useState<Path>('unique')

    const addResident = () => {
        setIsResident(true)
    }

    const paths = new Map<Path, JSX.Element>([
        ['unique', <UniqueResident />],
        ['profile', <ResidentProfile/>],
    ])

    return (
        <div>
            <section className='bg-white rounded-lg p-8 grid text-[1.4rem] w-max'>
                <div className='overview flex gap-8'>
                    <OverviewCard
                        title='Total Residents'
                        number={18_000}
                        iconUrl='/icons/securityCompany/totalEstates.svg'
                        bgColor='bg-[#EDFDEC]'
                        textColor='text-[#1A8F56]'
                        bottomLeft='Alpha 56%'
                        bottomRight='Res. User 44%'
                    />
                    <OverviewCard
                        title='Properties'
                        number={1532}
                        iconUrl='/icons/securityCompany/uniqueResidents.svg'
                        bgColor='bg-[#F5F9FA]'
                        textColor='text-[#00C2FF]'
                        bottomLeft='Residential 56%'
                        bottomRight='Business 44%'
                    />
                    <OverviewCard
                        title='Security Guards'
                        number={1200}
                        iconUrl='/icons/securityCompany/AssignedUniqueResidents.svg'
                        bgColor='bg-[#FCF3FA]'
                        textColor='text-[#B6008E]'
                        bottomLeft='23 guards on duty'
                    />
                </div>
            </section>

            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isResident ? (
                    <section>
                        <div className='estateDetail__radioBox'>
                            <input
                                type='radio'
                                name='resident'
                                id='unique'
                                className='hidden'
                                onChange={() => setCurrentPath('unique')}
                                defaultChecked
                            />
                            <label htmlFor='unique'>Unique Resident</label>

                            <input
                                type='radio'
                                name='resident'
                                id='profile'
                                className='hidden'
                                onChange={() => setCurrentPath('profile')}
                            />
                            <label htmlFor='profile' className='capitalize'>
                                Resident Profile
                            </label>
                        </div>

                        <div>
                            {paths.get(currentPath)}
                        </div>
                    </section>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not any resident list yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={addResident}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Resident
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Residents
