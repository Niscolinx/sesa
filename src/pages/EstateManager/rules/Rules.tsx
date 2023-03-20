import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

function Rules() {
    const [isRules, setIsRules] = useState(false)

    const addRulesHandler = () => {
        setIsRules(true)
    }

    return (
        <div className='grid'>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isRules ? (
                    <section>
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any rules and regulations yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addRulesHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Rule
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Rules
