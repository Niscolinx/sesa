import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import RenderArtisans from '../../../components/SuperAdmin/artisan/RenderArtisans'

function Artisan() {
    const navigate = useNavigate()

    const [artisan, setArtisan] = useState(false)

    const addArtisanHandler = () => {
        setArtisan(true)
        //navigate('/dashboard/artisan/add')
    }

    return (
        <div>
            <h1 className='heading2'>Artisan</h1>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {artisan ? (
                    <section>
                        <RenderArtisans />
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Artisan yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addArtisanHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Artisan
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Artisan
