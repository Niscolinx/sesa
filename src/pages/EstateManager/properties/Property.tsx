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

    const property_data = [
        { name: 'residential', value: 120 },
        { name: 'business', value: 80 },
    ]

    return (
        <>
            {isProperty ? (
                <div>
                    <section className=' grid grid-cols-2 gap-16 '>
                        <div className='flex items-center gap-8 bg-white rounded-lg p-8'>
                            <div className='overviewChart__box'>
                                <EstateChart
                                    color1='#098DFF'
                                    color2='#23C375'
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
                        <div className='grid grid-cols-2 justify-items-end bg-white rounded-lg p-8'>
                            <div>
                                <p className='font-Satoshi-Medium text-[1.8rem]'>
                                    Property Type
                                </p>

                                <div>
                                    {Array.from({ length: 3 }).map((_, i) => {
                                        return (
                                            <p className='flex items-center gap-4'>
                                                <span className='bg-[#5856D6] rounded-full w-[1rem] h-[1rem] flex'>
                                                    &nbsp;
                                                </span>
                                                <span>{i + 2}</span> -
                                                <span>bedroom Self Con.</span>
                                            </p>
                                        )
                                    })}
                                </div>

                                <p className='flex items-center gap-4'>
                                    {' '}
                                    <span className='bg-[#5856D6] rounded-full w-[1rem] h-[1rem] flex'>
                                        &nbsp;
                                    </span>
                                    Duplex
                                </p>
                            </div>
                            <div>
                                <p className='font-Satoshi-Medium text-[1.8rem]'>
                                    Count
                                </p>

                                <div>
                                    {Array.from({ length: 3 }).map((_, i) => {
                                        return (
                                            <p>
                                                <span className='bg-[#5856D6] rounded-full w-[1rem] h-[1rem] flex'>
                                                    &nbsp;
                                                </span>
                                                <span>2</span> -
                                                <span>bedroom Self Con.</span>
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
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
