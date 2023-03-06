import { useState } from 'react'
import { TfiArrowCircleLeft } from 'react-icons/tfi'
import AddProperty from './AddProperty'

type PathSwitch =
    | 'add-property'
    | 'add-resident'
    | 'add-RFID'
    | 'add-accessCard'

function CreateHousehold() {
    const [pathToSwitch, setPathToSwitch] = useState<PathSwitch>('add-property')

    const handlePathSwitch = new Map<PathSwitch, JSX.Element>([
        ['add-property', <AddProperty />],
        ['add-resident', <></>],
        ['add-RFID', <></>],
        ['add-accessCard', <></>],
    ])
    return (
        <div className='bg-white p-16 rounded-lg h-[90vh]'>
            <div
                className='estateDetail__radioBox'
                style={{
                    marginTop: '0',
                }}
            >
                <>
                    <input
                        type='radio'
                        name='household'
                        id='add-property'
                        defaultChecked
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
            <section className='bg-color-white rounded-lg mt-[5rem]'>
                {handlePathSwitch.get(pathToSwitch)}
                <TfiArrowCircleLeft
               
                    className='overviewWalletNav__toggle'
                />
            </section>
        </div>
    )
}

export default CreateHousehold
