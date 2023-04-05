import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderedRolesAndPerm from './RenderedRolesAndPerm'


function RolesAndPerm() {

    const [estateManagersLoaded, setEstateManagersLoaded] = useState(true)

    

    const handlePathSwitch = () => {
        setEstateManagersLoaded(true)
    }

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {estateManagersLoaded ? (
                    <section>
                        <RenderedRolesAndPerm />
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any users to enroll yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={handlePathSwitch}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            View Users
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default RolesAndPerm
