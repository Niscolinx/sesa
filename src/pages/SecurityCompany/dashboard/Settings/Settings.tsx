import { useState } from 'react'

import PasswordSettings from './PasswordSettings'

type PathSwitch =
    | 'passwordSettings'
    | 'notificationSettings'

function Settings() {
    const [pathToSwitch, setPathToSwitch] =
        useState<PathSwitch>('passwordSettings')

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        passwordSettings: <PasswordSettings />,
        notificationSettings: <div>Notification Settings</div>,
    }

    return (
        <div>
            <h1 className='heading2'>Platform Settings</h1>

            <div className='estateDetail__radioBox'>
                <input
                    type='radio'
                    name='platform'
                    id='passwordSettings'
                    className='hidden'
                    defaultChecked
                    onChange={() => setPathToSwitch('passwordSettings')}
                />
                <label htmlFor='passwordSettings' className='capitalize'>
                    Password Settings
                </label>

                <input
                    type='radio'
                    name='platform'
                    id='notificationSettings'
                    className='hidden'
                    onChange={() => setPathToSwitch('notificationSettings')}
                />
                <label htmlFor='notificationSettings'>Property Type</label>
                
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {handlePathSwitch[pathToSwitch]}
                </section>
            </div>
        </div>
    )
}

export default Settings
