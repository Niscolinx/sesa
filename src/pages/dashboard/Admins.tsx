import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddAdmin from '../../components/admins/AddAdmin'
import RenderedAdmins from '../../components/admins/RenderedAdmins'

function Admins() {

    type RenderAdminPath = 'renderedAdmins' | 'addAdmin'

    const [adminsLoaded, setAdminsLoaded] = useState(false)
    const [addAdmin, setAddAdmin] = useState<RenderAdminPath>('renderedAdmins')

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
        setAddAdmin('addAdmin')

    }

    return (
        <div className='admins'>
            <h1 className='heading2'>Admins</h1>
            <div className='admins__container'>
                {adminsLoaded ? (
                    <section>
                        {switchRoute('addAdmin')}
                    </section>
                ) : (
                    <section className='admins__wrapper'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Admin yet
                        </p>
                        <button className='btn admins__btn' onClick={handleAddAdmin}>
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
