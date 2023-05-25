import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { EstateChart } from '../../../components/superAdmin/charts/OverviewChart'
import PropertyTable from './PropertyTable'

function Property() {


    const property_data = [
        { name: 'residential', value: 120 },
        { name: 'business', value: 80 },
    ]

    return (
        <>
          
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
                                    <p className='text-[3rem] font-Satoshi-Medium relative'>
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
                        <div className='flex justify-between bg-white rounded-lg p-8'>
                            <div>
                                <p className='font-Satoshi-Medium text-[1.8rem] mb-5'>
                                    Property Type
                                </p>

                                <div className='grid gap-4'>
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
                                    <p className='flex items-center gap-4'>
                                        {' '}
                                        <span className='bg-[#5856D6] rounded-full w-[1rem] h-[1rem] flex'>
                                            &nbsp;
                                        </span>
                                        Duplex
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className='font-Satoshi-Medium text-[1.8rem] mb-5'>
                                    Count
                                </p>

                                <div className='grid gap-4'>
                                    {Array.from({ length: 4 }).map((_, i) => {
                                        return <p className=''>30</p>
                                    })}

                                    <Link to='/estateManager/'>
                                        <span className='text-[#098DFF]'>
                                            See More
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                   
                </div>
       
               
            
        </>
    )
}

export default Property
