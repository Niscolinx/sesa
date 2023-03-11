import { useAtom } from 'jotai'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { EstateChart } from '../../../components/SuperAdmin/charts/OverviewChart'

function EnergyToken() {
    const navigate = useNavigate()

    const [isEnergyToken, setIsEnergyToken] = useState(false)

    const addEnergyTokenHandler = () => {
        setIsEnergyToken(true)
        //navigate('/superAdmin/artisan/add')
    }

    const property_data = [
        { name: 'energyGain', value: 100 },
        { name: 'energyLoss', value: 20 },
    ]

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {isEnergyToken ? (
                    <section>
                        <div className='flex items-center gap-8 bg-white rounded-lg p-8'>
                            <div className='overviewChart__box'>
                                <EstateChart
                                    color1='#098DFF'
                                    color2='#C5C1C3'
                                    data={property_data}
                                />

                                <div className='overviewChart__label'>
                                    <p className='text-[3rem] font-bold relative'>
                                        50,000
                                    </p>
                                    <p className='text-[1.2rem] max-w-[9.8rem]'>
                                        Total Properties
                                    </p>
                                </div>
                            </div>
                            <div className='grid gap-4'>
                                <section className='flex items-center justify-between gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#098DFF] rounded-full w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>Residential</p>
                                    </div>
                                    <p>20,000</p>
                                </section>
                                <section className='flex items-center justify-between gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-[#23C375] rounded-full w-[1rem] h-[1rem] flex'>
                                            {' '}
                                        </span>{' '}
                                        <p>Business</p>
                                    </div>
                                    <p>30,000</p>
                                </section>
                            </div>
                        </div>
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
