import { useAtom } from 'jotai'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'

function EnergyToken() {
    const navigate = useNavigate()

    const [isEnergyToken, setIsEnergyToken] = useState(false)

    const addEnergyTokenHandler = () => {
        setIsEnergyToken(true)
        //navigate('/superAdmin/artisan/add')
    }

    return (
        <div>
           
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isEnergyToken ? (
                    <section>
                     
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Energy Token yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addEnergyTokenHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add EnergyToken
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default EnergyToken
