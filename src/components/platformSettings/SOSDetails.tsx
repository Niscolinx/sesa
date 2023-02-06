import React, { FormEvent, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { MultipleSelect } from '../UI/Select'

const SOSDetails = () => {
    const [selectedEstates, setSelectedEstates] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmAddedSOS = () => {
        console.log('hellow ')
    }

    return (
        
            
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                
            </div>
   
    )
}

export default SOSDetails
