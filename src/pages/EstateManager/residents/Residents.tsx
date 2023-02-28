import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'


function Residents() {
    
    const [isResident, setIsResident] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

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
                                name='report'
                                id='additionalResidentUsr'
                                className='hidden'
                                onChange={() => setCurrentPage(1)}
                                defaultChecked
                            />
                            <label htmlFor='additionalResidentUsr'>
                                Additional Resident Package
                            </label>

                            <input
                                type='radio'
                                name='report'
                                id='residentUserHistory'
                                className='hidden'
                                onChange={() => setCurrentPage(2)}
                            />
                            <label
                                htmlFor='residentUserHistory'
                                className='capitalize'
                            >
                                Package purchase history
                                {/* //TODO Change the custom select of package to be normal input field
                    //comma separated in Amount */}
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
