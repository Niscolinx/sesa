import { useState } from 'react'

type PathSwitch = 'add-property' | 'add-resident' | 'add-RFID' | 'add-accessCard'

function CreateHousehold() {
    const [pathToSwitch, setPathToSwitch] =
        useState<PathSwitch>('add-property')

    const handlePathSwitch = new Map<PathSwitch, JSX.Element>([
        ['add-property', <></>],
        ['add-resident', <></>],
        ['add-RFID', <></>],
        ['add-accessCard', <></>],
    ])
    return (
        <div>
            <div className='estateDetail__radioBox'>
                <label htmlFor='add-property' className='capitalize'>
                <input
                    type='radio'
                    name='household'
                    id='add-property'
                    className='hidden'
                    defaultChecked
                    onChange={() => setPathToSwitch('add-property')}
                />
                    Add Property
                </label>

                <label htmlFor='add-resident'>
                <input
                    type='radio'
                    name='household'
                    id='add-resident'
                    className='hidden'
                    onChange={() => setPathToSwitch('add-resident')}
                />
                    Add Resident
                </label>
                <label htmlFor='add-resident'>
                <input
                    type='radio'
                    name='household'
                    id='add-RFID'
                    className='hidden'
                    onChange={() => setPathToSwitch('add-RFID')}
                />
                    Add RFID (Car Sticker)
                </label>
                <label htmlFor='add-resident'>
                <input
                    type='radio'
                    name='household'
                    id='add-accessCard'
                    className='hidden'
                    onChange={() => setPathToSwitch('add-accessCard')}
                />
                    Add Access Card
                </label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch.get(pathToSwitch)}
                </section>
            </div>
        </div>
    )
}

export default CreateHousehold
