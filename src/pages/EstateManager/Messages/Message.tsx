import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import RenderMessages from './RenderMessages'

function Message() {
    const [isMessage, setIsMessage] = useState(false)

    const addMessageHandler = () => {
        setIsMessage(true) 
    }

    return (
        <div>
            <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                {isMessage ? (
                    <section>
                        <RenderMessages />
                    </section>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Message yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addMessageHandler}
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

export default Message
