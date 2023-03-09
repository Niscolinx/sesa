import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'

function Payment() {
    const navigate = useNavigate()

    const [isPayment, setIsPayment] = useState(false)

    const addPaymentHandler = () => {
        setIsPayment(true)
        //navigate('/superAdmin/artisan/add')
    }

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isPayment ? (
                    <section>
                       
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Payment yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addPaymentHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Payment
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default Payment
