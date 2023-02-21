import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'

const NotificationSettings = () => {
    const [isWarning, setIsWarning] = useState(true)

    const [photoUrl, setPhotoUrl] = useState('')

    const [eyeIcon, setEyeIcon] = useState(false)
    const toggleEyeIcon = () => setEyeIcon(!eyeIcon)

    const handlePhotoPreview = async (
        value: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        toast('Password Updated successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    return (
        <>
            <ToastContainer />
            <div className=' p-8 bg-white h-[80vh] overflow-y-scroll rounded-lg'>
                <section>
                    <p
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Notification Settings
                    </p>
                    <p>
                        Select method of notifying security guards when
                        assigning or reassigning occurs
                    </p>
                </section>

                <section>

                        
                    <p className='text-color-blue-1'>NB: A charge of N3 would be incured for this process</p>
                </section>
            </div>
        </>
    )
}

export default NotificationSettings
