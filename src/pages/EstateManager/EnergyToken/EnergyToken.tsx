import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { EstateChart as Chart } from '../../../components/SuperAdmin/charts/OverviewChart'

function EnergyToken() {
    const navigate = useNavigate()

    const [isEnergyToken, setIsEnergyToken] = useState(false)

    const addEnergyTokenHandler = () => {
        setIsEnergyToken(true)
    }

    const property_data = [
        { name: 'energyGain', value: 100 },
        { name: 'energyLoss', value: 20 },
    ]

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh] bg-white p-8'>
                {isEnergyToken ? (
                    <section>
                        <button className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize'>
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            <p>Create Token</p>
                        </button>
                        <div className='grid p-8 justify-items-center'>
                            {Array.from({length: 10}, (_, i) => (
                                <>
                                </>
                            ))}
                            <div className='overviewChart__box'>
                                <Chart
                                    color1='#098DFF'
                                    color2='#C5C1C3'
                                    outerRadius={90}
                                    data={property_data}
                                />

                                <div className='overviewChart__label'>
                                    <p className='text-[3rem] font-Satoshi-Medium relative text-[#FF0000]'>
                                        85%
                                    </p>
                                    <p className='text-[1.2rem] max-w-[9.8rem]'>
                                        count: XXXXX
                                    </p>
                                </div>
                            </div>
                            <div className=' grid justify-items-center'>
                                <p className='flex items-center'>
                                    <img src='/icons/Naira.svg' alt='' />
                                    <span>5,000</span>
                                </p>
                                <p>Denomination</p>
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
