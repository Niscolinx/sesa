import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddEstate from './AddEstate'
import RenderedEstates from './RenderedEstates'


function Estates() {

    const [estatesLoaded, setEstatesLoaded] = useState(false)

   
    const handleAddEstate = () => {
        setEstatesLoaded(true)
    }

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {estatesLoaded ? (
                    <section>
                        <RenderedEstates />
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Estate yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
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
