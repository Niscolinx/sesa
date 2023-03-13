import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { EstateChart as Chart } from '../../../components/SuperAdmin/charts/OverviewChart'

function EnergyToken() {

    type Path = 'tokenList' | 'tokenPurchase'
    const [isEnergyToken, setIsEnergyToken] = useState(false)
    const [currentPath, setCurrentPath] = useState<Path>('tokenList')

    const addEnergyTokenHandler = () => {
        setIsEnergyToken(true)
    }

    const property_data = [
        { name: 'energyGain', value: 100 },
        { name: 'energyLoss', value: 20 },
    ]



    

     const paths = new Map<Path, JSX.Element>([
         ['tokenList', <></> ],
         ['tokenPurchase', <></> ],
     ])

    return (
        <div>
            <div className='rounded-lg mt-[3rem] min-h-[80vh] bg-white p-8'>
                {isEnergyToken ? (
                    <section>
                        <Link to='/estateManager/energy-token/add'>
                            <button className='btn ml-auto bg-color-blue-1 text-white flex gap-2 items-center self-center rounded-lg py-4 px-8 capitalize'>
                                <span>
                                    <IoMdAdd />
                                </span>{' '}
                                <p>Add Token</p>
                            </button>
                        </Link>
                        <section>
                            <div className='estateDetail__radioBox'>
                                <input
                                    type='radio'
                                    name='token'
                                    id='tokenList'
                                    className='hidden'
                                    onChange={() => setCurrentPath('tokenList')}
                                    defaultChecked
                                />
                                <label
                                    htmlFor='tokenList'
                                    className={` ${
                                        currentPath === 'tokenList'
                                            ? 'font-Satoshi-Medium'
                                            : 'capitalize'
                                    }`}
                                >
                                    Unique Resident
                                </label>

                                <input
                                    type='radio'
                                    name='token'
                                    id='tokenPurchase'
                                    className='hidden'
                                    onChange={() => setCurrentPath('tokenPurchase')}
                                />
                                <label
                                    htmlFor='tokenPurchase'
                                    className={` ${
                                        currentPath === 'tokenPurchase'
                                            ? 'font-Satoshi-Medium'
                                            : 'capitalize'
                                    }`}
                                >
                                    Resident Profile
                                </label>
                            </div>
                            <div>{paths.get(currentPath)}</div>
                        </section>
                        <div
                            className='grid p-8 justify-items-center'
                            style={{
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(25rem, 1fr))',
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
                                            <img
                                                src='/icons/Naira.svg'
                                                alt=''
                                            />
                                            <span>5,000</span>
                                        </p>
                                        <p>Denomination</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <section className='grid place-content-center w-full h-[80vh] justify-items-center gap-4 bg-white rounded-lg'>
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
