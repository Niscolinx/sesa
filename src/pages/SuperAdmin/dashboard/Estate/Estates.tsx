import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddEstate from '../../../../components/SuperAdmin/estates/AddEstate'
import RenderedEstates from '../../../../components/SuperAdmin/estates/RenderedEstates'
import { useAppDispatch, useAppSelector } from '../../../../store/app/hooks'
import {
    RenderEstatePath,
    routeChangeSelector,
    setEstatePath,
} from '../../../../store/features/routeChange'

function Estates() {
    const dispatch = useAppDispatch()
    const { estatePath } = useAppSelector(routeChangeSelector)

    const [estatesLoaded, setEstatesLoaded] = useState(false)

    const switchRoute = (estatePath: RenderEstatePath) => {
        switch (estatePath) {
            case 'renderedEstates':
                return <RenderedEstates />

            case 'addEstate':
                return <AddEstate />

            default:
                return <AddEstate />
        }
    }

    const handleAddEstate = () => {
        setEstatesLoaded(true)
        dispatch(setEstatePath('renderedEstates'))
    }

    return (
        <div className='estates'>
            <h1 className='heading2'>Estates</h1>
            <div className='estates__container'>
                {estatesLoaded ? (
                    <section>{switchRoute(estatePath)}</section>
                ) : (
                    <section className='estates__wrapper bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Estate yet
                        </p>
                        <button
                            className='btn addEstate__btn'
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
    )
}

export default Estates
