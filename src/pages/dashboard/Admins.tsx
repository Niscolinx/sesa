import { createContext, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddAdmin from '../../components/admins/AddAdmin'
import RenderedAdmins from '../../components/admins/RenderedAdmins'
import { AdminPageContext, RenderAdminPath } from '../../Context/AdminPageContext'

export const adminsContext = createContext(null as any)

function Admins() {

    
    const [adminsLoaded, setAdminsLoaded] = useState(false)
    const [routeToRender, setRouteToRender] = useState<RenderAdminPath>('renderedAdmins')

    const switchRoute = (path: RenderAdminPath) => {
        switch (path) {
            case 'renderedAdmins':
                return <RenderedAdmins />

            case 'addAdmin':
                return <AddAdmin />

            default:
                return <RenderedAdmins />
        }
    }

    const handleAddAdmin = () => {
        setAdminsLoaded(true)
        setRouteToRender('addAdmin')

    }

    return (
        <AdminPageContext.Provider
            value={{
                routeToRender,
                setRouteToRender,
            }}
        >
            <div className='admins'>
                <h1 className='heading2'>Admins</h1>
                <div className='admins__container'>
                    {adminsLoaded ? (
                        <section>{switchRoute('addAdmin')}</section>
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
        </AdminPageContext.Provider>
    )
}

export default Admins
