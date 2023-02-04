import React, { FormEvent, useRef, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

import { toast, ToastContainer } from 'react-toastify'
import { MultipleSelect } from '../../UI/Select'

type DialogType = 'validate' | 'add-Artisan'

const AddArtisanGroup = () => {

    const [isAddArtisanGroup, setIsAddArtisanGroup] = useState(true)
    const [selected, setSelected] = useState<string[]>([])
   



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }  

    
  

    const addArtisanGroupHandler = () => {
    }

   

    return (
        <>
            <ToastContainer />

            <div className='p-8 bg-white rounded-lg '>
                <div className='grid gap-8 border-b py-10 self-start'>
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
                    className='flex flex-col gap-16 max-w-[50rem] h-[60vh] mt-10'
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

                    <MultipleSelect
                        selectFrom={['Lagos', 'Abuja', 'Ogun']}
                        label='Artisans'
                        placeholder='Select Artisans'
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-auto mr-auto'
                        onClick={addArtisanGroupHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Artisan Group
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddArtisanGroup
