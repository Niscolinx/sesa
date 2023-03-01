import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import OverviewCard from '../../../components/EstateManager/OverviewCard'
import { EstateChart } from '../../../components/SuperAdmin/charts/OverviewChart'
import UniqueResident from '../residents/UniqueResident'

function Property() {
    const [isProperty, setIsProperty] = useState(false)

    const addproperty = () => {
        setIsProperty(true)
    }

    

    return (
        <>
            {isProperty ? (
                <div>
                    <section className='bg-white rounded-lg p-8 grid text-[1.4rem] grid-cols-2 '>
                        
                        <div className='overviewChart__box'>
                            <EstateChart color1='#3d08d2' color2='#F74183' />

                            <div className='overviewChart__label'>
                                <p className='text-[3rem] font-bold relative'>
                                    50,000
                                </p>
                                <p className='text-[1.2rem] max-w-[9.8rem]'>
                                    Total Check-Out
                                </p>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </section>

                    <div className='rounded-lg mt-[3rem] h-[80vh]'>
                        <section>
                            <UniqueResident />
                        </section>
                    </div>
                </div>
            ) : (
                <div className='h-[80vh]'>
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not any property list yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={addproperty}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add property
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default Property
