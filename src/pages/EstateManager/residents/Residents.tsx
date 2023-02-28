import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'


function Residents() {
    
    const [isResident, setIsResident] = useState(false)

    const addResident = () => {
        setIsResident(true)
    }
   
    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isResident ? (
                    <section></section>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Package yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={addResident}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Package
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Residents
