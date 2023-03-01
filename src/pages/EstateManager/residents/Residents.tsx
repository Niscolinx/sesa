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
        ['profile', <ResidentProfile />],
    ])

    return (
        <>
            {isResident ? (
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
                                bottomLeft='LR 39%  TR 29%'
                                bottomRight='LD 10%  LNR 2%'
                            />
                        </div>
                    </section>

                    <div className='rounded-lg mt-[3rem] h-[80vh]'>
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

                            <div>{paths.get(currentPath)}</div>
                        </section>
                    </div>
                </div>
            ) : (
                <div className='h-[80vh]'>
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
                </div>
            )}
        </>
    )
}

export default Residents
