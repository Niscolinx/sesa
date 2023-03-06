import { useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
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
        <div className='bg-white p-16 rounded-lg min-h-[90vh] relative'>
            <div
                className='estateDetail__radioBox'
                style={{
                    marginTop: '0',
                }}
            >
                 natus unde veniam reiciendis perferendis earum cum dignissimos quaerat nostrum quis incidunt impedit voluptatem eius enim, alias officia! Ipsum, eum. Nihil voluptatem quo enim ex perferendis, dignissimos quibusdam.
                Numquam provident mollitia soluta ullam sapiente dignissimos eaque iure pariatur minus laboriosam placeat, quas laborum. Magni, quod! Nihil facilis aliquam dicta numquam, cum assumenda. Cum libero tempora unde quibusdam laudantium?
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
            <section className='bg-color-white rounded-lg mt-[5rem] '>
                {handlePathSwitch.get(pathToSwitch)}
                <div className='absolute bottom-0 right-0 flex items-center gap-16'>
                    <div className='flex gap items-center gap-4'>
                        <TfiArrowCircleLeft className='w-[4rem] text-color-blue' />
                        <span>Previous</span>
                    </div>
                    <div className='flex gap items-center gap-4'>
                        <TfiArrowCircleRight className='w-[4rem] text-color-blue' />
                        <span>Next</span>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CreateHousehold
