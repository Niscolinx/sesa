import React, { FormEvent, useRef, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import { BsQuestionCircle } from 'react-icons/bs'
import Select from '../../UI/Select'
import { toast, ToastContainer } from 'react-toastify'

type DialogType = 'validate' | 'add-Artisan'

const AddArtisanGroup = () => {
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedArtisan, setSelectedArtisan] = useState<string | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const [isAddArtisanGroup, setIsAddArtisanGroup] = useState(true)
    const [validationType, setValidationType] = useState<string | null>(
        'Phone Number'
    )

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const validateDialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const closeValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.close()
        }
    }

    const openValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.showModal()
        }
    }
    const handleOpen = (modalState: DialogType) => {
        if (modalState === 'validate') {
            setIsAddArtisanGroup(true)
        } else {
            setIsAddArtisanGroup(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const addArtisanGroupHandler = () => {
        // navigate('/dashboard/artisanCategory/add')
        handleOpen('add-Artisan')
    }

    const confirmAddArtisanGroup = () => {
        handleClose()
    }

    const handleDialogSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleClose()

        openValidateDialog()
    }

    return (
        <>
            <ToastContainer />

            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg gap-10'>
                <div className='grid gap-8 border-b py-10'>
                    <h2
                        className='text-[2rem] '
                        style={{
                            fontFamily: 'Satoshi-medium',
                        }}
                    >
                        Add Artisan Group
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <div className='grid gap-4 relative '>
                        <label
                            htmlFor='name'
                            className='text-[1.4rem] font-medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='name'
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                  
                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                        style={{ justifySelf: 'start' }}
                        onClick={addArtisanGroupHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Artisan
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddArtisanGroup
