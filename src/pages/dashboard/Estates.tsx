import { createContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddEstate from '../../components/estates/AddEstate'
import RenderedEstates from '../../components/estates/RenderedEstates'
import {
    EstatePageContext,
    RenderEstatePath,
} from '../../Context/EstatePageContext'


function Estates() {
    const [estatesLoaded, setEstatesLoaded] = useState(false)
    const [routeToRender, setRouteToRender] =
        useState<RenderEstatePath>('renderedEstates')

    const switchRoute = (path: RenderEstatePath) => {
        switch (path) {
            case 'renderedEstates':
                return <RenderedEstates />

            case 'addEstate':
                return <AddEstate />

            default:
                return <AddEstate />
        }
    }

    console.log({ routeToRender })
    const handleAddEstate = () => {
        setEstatesLoaded(true)
    }

    return (
        <EstatePageContext.Provider
            value={{
                routeToRender,
                setRouteToRender,
            }}
        >
            <div className='estates'>
                <h1 className='heading2'>Estates</h1>
                <div className='estates__container'>
                    {estatesLoaded ? (
                        <section>{switchRoute(routeToRender)}</section>
                    ) : (
                        <section className='estates__wrapper'>
                            <img src='/icons/admins/errorSvg.svg' alt='' />
                            <p className='text'>
                                Ooops you have not added any Estate yet
                            </p>
                            <button
                                className='btn estates__btn'
                                onClick={handleAddEstate}
                            >
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                Add Estate
                            </button>
                        </section>
                    )}
                </div>
            </div>
        </EstatePageContext.Provider>
    )
}

export default Estates
