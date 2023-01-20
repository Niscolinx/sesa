import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'


function RolesAndPerm() {

    const [estateManagersLoaded, setEstateManagersLoaded] = useState(false)

    

    const handlePathSwitch = () => {
        setEstateManagersLoaded(true)
    }

    return (
        <div className='estateManagers'>
            <h1 className='heading2'>EstateManagers</h1>
            <div className='estateManagers__container'>
                {estateManagersLoaded ? (
                    <section>{switchRoute(estateManagerPath)}</section>
                ) : (
                    <section className='estateManagers__wrapper'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any EstateManager yet
                        </p>
                        <button
                            className='btn estateManagers__btn'
                            onClick={handlePathSwitch}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add EstateManager
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default RolesAndPerm
