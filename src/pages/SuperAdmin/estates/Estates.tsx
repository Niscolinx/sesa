import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddEstate from './AddEstate'
import RenderedEstates from './RenderedEstates'
// import {
//     RenderEstatePath,
//     routeChangeSelector,
//     setEstatePath,
// } from '../../../../store/features/routeChange'

function Estates() {

    const [estatesLoaded, setEstatesLoaded] = useState(false)

    // const switchRoute = (estatePath: RenderEstatePath) => {
    //     switch (estatePath) {
    //         case 'renderedEstates':
    //             return <RenderedEstates />

    //         case 'addEstate':
    //             return <AddEstate />

    //         default:
    //             return <AddEstate />
    //     }
    // }

    const handleAddEstate = () => {
        setEstatesLoaded(true)
    }

    return (
        <div className='estates'>
            <div className='estates__container'>
                {estatesLoaded ? (
                    <section><RenderedEstates/></section>
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
