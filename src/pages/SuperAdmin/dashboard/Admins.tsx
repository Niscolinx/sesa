import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddAdmin from '../../../components/SuperAdmin/admins/AddAdmin'
import RenderedAdmins from '../../../components/SuperAdmin/admins/RenderedAdmins'

import { useAppDispatch, useAppSelector } from '../../../store/app/hooks'
import {
    routeChangeSelector,
    setAdminPath,
} from '../../../store/features/routeChange'

function Admins() {
    const dispatch = useAppDispatch()
    const { adminPath } = useAppSelector(routeChangeSelector)

    const [adminsLoaded, setAdminsLoaded] = useState(false)

    // const switchRoute = (path: RenderAdminPath) => {
    //     switch (path) {
    //         case 'renderedAdmins':
    //             return <RenderedAdmins />

    //         case 'addAdmin':
    //             return <AddAdmin />

    //         default:
    //             return <AddAdmin />
    //     }
    // }

    const switchRoute = {
        renderedAdmins: <RenderedAdmins />,
        addAdmin: <AddAdmin />,
    }

    const handleAddAdmin = () => {
        setAdminsLoaded(true)
        dispatch(setAdminPath('renderedAdmins'))
    }

    return (
        <div className='admins'>
            <h1 className='heading2'>Admins</h1>
            <div className='admins__container'>
                {adminsLoaded ? (
                    <section>{switchRoute[adminPath]}</section>
                ) : (
                    <section className='admins__wrapper'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Admin yet
                        </p>
                        <button
                            className='btn admins__btn'
                            onClick={handleAddAdmin}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Admin
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Admins
