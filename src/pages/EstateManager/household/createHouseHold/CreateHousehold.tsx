import { Fragment, useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import AddProperty from './AddProperty'

// type PathSwitch =
//     | 'add-property'
//     | 'add-resident'
//     | 'add-RFID'
//     | 'add-accessCard'

const paths = [
    {
        name: 'add Property',
        index: 1,
    },
    {
        name: 'add resident',
        index: 2,
    },
    {
        name: 'add RFID',
        index: 3,
    },
    {
        name: 'add accessCard',
        index: 4,
    }
  
]
function CreateHousehold() {
    const [pathToSwitch, setPathToSwitch] = useState(1)

    const handlePathSwitch = new Map<number, JSX.Element>([
        [1, <AddProperty />],
        [2, <></>],
        [3, <></>],
        [4, <></>],
    ])
    return (
        <div className='bg-white p-16 rounded-lg min-h-[90vh] relative'>
            <div
                className='estateDetail__radioBox'
                style={{
                    marginTop: '0',
                }}
            >
                {
                    paths.map((item) => {
                        <Fragment key={item}>
                            <input
                                type='radio'
                                name='household'
                                id={item}
                                defaultChecked
                                className='hidden'
                                onChange={() => setPathToSwitch(1)}
                            />
                            <label
                                htmlFor={item}
                                className='capitalize'
                            >
                                Add Property
                            </label>
                        </Fragment>
                    })
                }

                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-property'
                        defaultChecked
                        className='hidden'
                        onChange={() => setPathToSwitch(1)}
                    />
                    <label htmlFor='add-property' className='capitalize'>
                        Add Property
                    </label>
                </>

                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-resident'
                        className='hidden'
                        onChange={() => setPathToSwitch(2)}
                    />
                    <label htmlFor='add-resident'>Add Resident</label>
                </>

                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-RFID'
                        className='hidden'
                        onChange={() => setPathToSwitch(3)}
                    />
                    <label htmlFor='add-RFID'>Add RFID (Car Sticker)</label>
                </>
                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-accessCard'
                        className='hidden'
                        onChange={() => setPathToSwitch(4)}
                    />
                    <label htmlFor='add-accessCard'>Add Access Card</label>
                </>
            </div>
            <section className='bg-color-white rounded-lg mt-[5rem] '>
                {handlePathSwitch.get(pathToSwitch)}
                <div className='absolute bottom-0 right-0 flex items-center gap-16 m-10'>
                    <button
                        className='flex gap items-center cursor-pointer gap-4 disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={pathToSwitch === 1}
                        onClick={() =>
                            setPathToSwitch((prev) => {
                                return prev === 1 ? prev : prev - 1
                            })
                        }
                    >
                        <TfiArrowCircleLeft className='w-[3rem] h-[3rem] text-color-blue' />
                        <span>Previous</span>
                    </button>
                    <button
                        className='flex gap items-center cursor-pointer gap-4 disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={pathToSwitch === 4}
                        onClick={() =>
                            setPathToSwitch((prev) => {
                                console.log({prev})
                                return prev === 4 ? prev : prev + 1
                            })
                        }
                    >
                        {' '}
                        <TfiArrowCircleRight className='w-[3rem] h-[3rem] text-color-blue' />
                        <span className=''>Next</span>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default CreateHousehold
