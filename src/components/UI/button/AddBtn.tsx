import React from 'react'
import { IoMdAdd } from 'react-icons/io'

interface Props {
    isLoading: boolean
    title?: string
}

function AddBtn({ isLoading, title = 'add' }: Props) {
    return (
        <button className='btn justify-self-start btn-blue'>
            <span>
                <IoMdAdd />
            </span>{' '}
            {isLoading ? 'Loading...' : `${title}`}
        </button>
    )
}

export default AddBtn
