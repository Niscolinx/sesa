import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'

function Messages() {
    const navigate = useNavigate()

    const [isMessage, setIsMessage] = useState(false)

    const addArtisanHandler = () => {
        setIsMessage(false)
        //navigate('/superAdmin/artisan/add')
    }

    return (
        <div>
            <h1 className='heading2'>Artisan</h1>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isMessage ? (
                    <section>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi maxime, ipsum exercitationem reiciendis adipisci quidem maiores est voluptas officiis soluta nam earum optio harum quo explicabo eum laboriosam nostrum quas.
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
                            Add Message
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Messages
