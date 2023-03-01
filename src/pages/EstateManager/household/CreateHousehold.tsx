import { useState } from 'react'

type PathSwitch =
    | 'add-property'
    | 'add-resident'
    | 'add-RFID'
    | 'add-accessCard'

function CreateHousehold() {
    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('add-property')

    const handlePathSwitch = new Map<PathSwitch, JSX.Element>([
        ['add-property', <></>],
        ['add-resident', <></>],
        ['add-RFID', <></>],
        ['add-accessCard', <></>],
    ])
    return (
        <div>
            <div className='estateDetail__radioBox'>
                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-property'
                        className='hidden'
                        onChange={() => setPathToSwitch('add-property')}
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
                        onChange={() => setPathToSwitch('add-resident')}
                    />
                    <label htmlFor='add-resident'>Add Resident</label>
                </>

                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-RFID'
                        className='hidden'
                        onChange={() => setPathToSwitch('add-RFID')}
                    />
                    <label htmlFor='add-RFID'>Add RFID (Car Sticker)</label>
                </>
                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-accessCard'
                        className='hidden'
                        onChange={() => setPathToSwitch('add-accessCard')}
                    />
                    <label htmlFor='add-accessCard'>Add Access Card</label>
                </>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch.get(pathToSwitch)}
                </section>
            </div>
        </div>
    )
}

export default CreateHousehold
