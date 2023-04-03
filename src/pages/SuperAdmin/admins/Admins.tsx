import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import RenderedAdmins from './RenderedAdmins'

function Admins() {
    const [adminsLoaded, setAdminsLoaded] = useState(true)
    const navigate = useNavigate()

    const handleAddAdmin = () => {
        setAdminsLoaded(true)
        // dispatch(setAdminPath('renderedAdmins'))

        navigate('/superAdmin/admins/add')
    }

    return (
        <div>
            <div>
                {adminsLoaded ? (
                    <section>
                        <RenderedAdmins />
                    </section>
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
