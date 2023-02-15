import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderedRolesAndPerm from '../../components/rolesAndPerm/RenderedRolesAndPerm'


function RolesAndPerm() {

    const [estateManagersLoaded, setEstateManagersLoaded] = useState(false)

    

    const handlePathSwitch = () => {
        setEstateManagersLoaded(true)
    }

    return (
        <div className='estateManagers'>
            <h1 className='heading2'>Roles Manager</h1>
            <div className='estateManagers__container'>
                {estateManagersLoaded ? (
                    <section><RenderedRolesAndPerm/></section>
                ) : (
                    <section className='estateManagers__wrapper'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any users to enroll yet
                        </p>
                        <button
                            className='btn estateManagers__btn'
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
