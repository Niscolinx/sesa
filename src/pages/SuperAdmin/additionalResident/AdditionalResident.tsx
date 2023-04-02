import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import ResidentUsers from './ResidentUsers'

function AdditionalResident() {
    const dispatch = useAppDispatch()

    type SwitchRoute = 'showAll' | 'add'

    const [additionalResident, setAdditionalResident] = useState(false)

    const handleAddEstate = () => {
        setAdditionalResident(true)
    }

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {additionalResident ? (
                    <section>
                        <ResidentUsers />
                    </section>
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
