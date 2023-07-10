import React from 'react'
import { IoMdAdd } from 'react-icons/io'

interface Props {
    isLoading: boolean
    title?: string
    is_addBtn?: boolean
}

function AddBtn({ isLoading, title = 'add', is_addBtn = true }: Props) {
    return (
        <button className='btn justify-self-start btn-blue capitalize'>
            {is_addBtn ? (
                <span>
                    <IoMdAdd />
                </span>
            ) : (
                <span>
                    <img
                        src='/icons/admins/saveDisk.svg'
                        alt=''
                        className='w-[1.7rem] h-[1.7rem]'
                    />
                </span>
            )}

            {isLoading ? 'Loading...' : `${title}`}
        </button>
    )
}

export default AddBtn
