import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import RenderArtisans from '../../components/artisans/RenderArtisans'

function Advert() {
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
              
                        <RenderArtisans />
         
                
            </div>
        </div>
    )
}

export default Advert
