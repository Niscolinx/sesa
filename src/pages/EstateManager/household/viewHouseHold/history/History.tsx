import React, { createContext, Fragment, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

function History() {
    type labelKeys = 'resident' | 'accessCard' | 'RFID'

    const [path, setPath] = useState<labelKeys[]>([
        'resident',
        'accessCard',
        'RFID',
    ])

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const [pathToSwitch, setPathToSwitch] = useState<labelKeys>('resident')

    const handlePathSwitch = new Map<labelKeys, JSX.Element>([
        ['resident', <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo molestias dignissimos animi fuga. Magnam impedit dolores deleniti dignissimos. Adipisci, non quam! Cum aliquid voluptates numquam ipsam rerum, deserunt eligendi amet.</>]
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
