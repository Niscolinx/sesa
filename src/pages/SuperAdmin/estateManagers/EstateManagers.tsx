import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'


import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import {
    routeChangeSelector,
    RenderEstateManagerPath,
    setEstateManagerPath,
} from '../../../store/features/routeChange'
import AddEstateManager from './AddEstateManager'
import RenderedEstateManagers from './RenderedEstateManagers'

function EstateManagers() {
    const dispatch = useAppDispatch()
    const { estateManagerPath } = useAppSelector(routeChangeSelector)

    const [estateManagersLoaded, setEstateManagersLoaded] = useState(false)

    const switchRoute = (path: RenderEstateManagerPath) => {
        switch (path) {
            case 'renderedEstateManagers':
                return <RenderedEstateManagers />

            case 'addEstateManager':
                return <AddEstateManager />

            default:
                return <AddEstateManager />
        }
    }

    const handlePathSwitch = () => {
        setEstateManagersLoaded(true)
        dispatch(setEstateManagerPath('renderedEstateManagers'))
    }

    return (
        <div className='estateManagers'>
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

export default EstateManagers
