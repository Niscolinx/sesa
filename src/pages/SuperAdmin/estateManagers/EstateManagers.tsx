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


    const routeToAddEstateManager = () => {
        
    }


    return (
        <div className='estateManagers'>
            <div className='estateManagers__container'>
                {estateManagersLoaded ? (
                    <section><RenderedEstateManagers/></section>
                ) : (
                    <section className='estateManagers__wrapper'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any EstateManager yet
                        </p>
                        <button
                            className='btn estateManagers__btn'
                            onClick={routeToAddEstateManager}
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
