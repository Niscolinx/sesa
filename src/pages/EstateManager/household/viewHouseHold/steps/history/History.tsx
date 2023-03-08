import React, { createContext, Fragment, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import AccessCardList from './AccessCard'
import Resident from './Resident'
import RFIDList from './RFID'

function History() {
    type labelKeys = 'resident' | 'access Card' | 'RFID (Car Sticker)'

    const path: labelKeys[] = ['resident', 'access Card', 'RFID (Car Sticker)']

    const [pathToSwitch, setPathToSwitch] = useState<labelKeys>('resident')

    const handlePathSwitch = new Map<labelKeys, JSX.Element>([
        ['resident', <Resident />],
        ['RFID (Car Sticker)', <RFIDList/>],
        ['access Card', <AccessCardList/>]
    ])

    return (
        <>
            <div className='radioBox'>
                <>
                    {path.map((item) => {
                        return (
                            <Fragment key={item}>
                                <input
                                    type='radio'
                                    name='history'
                                    id={item}
                                    checked={item === pathToSwitch}
                                    className='hidden'
                                    onChange={() => setPathToSwitch(item)}
                                />
                                <label htmlFor={item} className={`capitalize`}>
                                    {item}
                                </label>
                            </Fragment>
                        )
                    })}
                </>
            </div>
            <section className='bg-color-white rounded-lg mt-[5rem] mb-[10rem] '>
                {handlePathSwitch.get(pathToSwitch)}
            </section>
        </>
    )
}

export default History
