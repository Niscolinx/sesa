import { IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { EstateChart as Chart } from '../../../components/SuperAdmin/charts/OverviewChart'

function TokenList() {
    const property_data = [
        { name: 'energyGain', value: 100 },
        { name: 'energyLoss', value: 20 },
    ]

    return (
        <div>
            <Link to='/estateManager/energy-token/add'>
                <button className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize'>
                    <span>
                        <IoMdAdd />
                    </span>{' '}
                    <p>Add Token</p>
                </button>
            </Link>
            <div
                className='grid p-8 justify-items-center'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))',
                }}
            >
                {Array.from({ length: 7 }, (_, i) => (
                    <div key={i}>
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
                ))}
            </div>
        </div>
    )
}

export default TokenList
