import {  useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddEstateManager from '../../components/estateManagers/AddEstateManager'
import RenderedEstateManagers from '../../components/estateManagers/RenderedEstateManagers'
import {
    EstateManagerPageContext,
    RenderEstateManagerPath,
} from '../../Context/EstateManagerPageContext'



function EstateManagers() {
    const [estateManagersLoaded, setEstateManagersLoaded] = useState(false)
    const [routeToRender, setRouteToRender] =
        useState<RenderEstateManagerPath>('renderedEstateManagers')

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

    const handleAddEstateManager = () => {
        setEstateManagersLoaded(true)
    }

    return (
        <EstateManagerPageContext.Provider
            value={{
                routeToRender,
                setRouteToRender,
            }}
        >
            <div className='estateManagers'>
                <h1 className='heading2'>EstateManagers</h1>
                <div className='estateManagers__container'>
                    {estateManagersLoaded ? (
                        <section>{switchRoute(routeToRender)}</section>
                    ) : (
                        <section className='estateManagers__wrapper'>
                            <img src='/icons/admins/errorSvg.svg' alt='' />
                            <p className='text'>
                                Ooops you have not added any EstateManager yet
                            </p>
                            <button
                                className='btn estateManagers__btn'
                                onClick={handleAddEstateManager}
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
        </EstateManagerPageContext.Provider>
    )
}

export default EstateManagers
