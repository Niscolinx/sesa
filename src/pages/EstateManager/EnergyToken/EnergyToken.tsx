import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'


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
            <div className='rounded-lg min-h-[80vh] bg-white p-8'>
                {isEnergyToken ? (
                    <section>
                        <section>
                            <div className='estateDetail__radioBox' style={{
                                marginTop: 0,
                                marginBottom: '2rem'
                            }}>
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
                                    Token List
                                </label>

                                <input
                                    type='radio'
                                    name='token'
                                    id='tokenPurchase'
                                    className='hidden'
                                    onChange={() =>
                                        setCurrentPath('tokenPurchase')
                                    }
                                />
                                <label
                                    htmlFor='tokenPurchase'
                                    className={` ${
                                        currentPath === 'tokenPurchase'
                                            ? 'font-Satoshi-Medium'
                                            : 'capitalize'
                                    }`}
                                >
                                    Token Purchase
                                </label>
                            </div>
                            <div>{paths.get(currentPath)}</div>
                        </section>
                        
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
