import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'


function Residents() {
    type Path = 'unique' | 'profile'

    const [isResident, setIsResident] = useState(false)
    const [currentPage, setCurrentPage] = useState<Path>('unique')

    const addResident = () => {
        setIsResident(true)
    }
   
    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isResident ? (
                    <section>
                        <div className='estateDetail__radioBox'>
                            <input
                                type='radio'
                                name='resident'
                                id='unique'
                                className='hidden'
                                onChange={() => setCurrentPage('unique')}
                                defaultChecked
                            />
                            <label htmlFor='unique'>
                                Unique Resident
                            </label>

                            <input
                                type='radio'
                                name='resident'
                                id='profile'
                                className='hidden'
                                onChange={() => setCurrentPage('profile')}
                            />
                            <label
                                htmlFor='profile'
                                className='capitalize'
                            >
                                Resident Profile
                             
                            </label>
                        </div>
                    </section>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not any resident list yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={addResident}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Resident
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Residents
