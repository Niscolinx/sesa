import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import React from 'react'
import { useQuery } from 'react-query'
import useAxios from '../../../components/hooks/useAxios'
import { Select } from '../../../components/SuperAdmin/UI/Select'

type Roles =
    | 'admin'
    | 'estate Manager'
    | 'security Company'
    | 'security Guard'
    | 'resident'

interface RolesAndPerm {
    id: number
    name: string
    imgUrl: string
    role: {
        name: string
        permissions: string[]
    }[]
}

function Permissions() {
    const dialogRef = useRef<HTMLDialogElement>(null)

    const closeDialog = () => {
        dialogRef.current?.close()
    }

    const openDialog = () => {
        dialogRef.current?.showModal()
    }
 

    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <dialog ref={dialogRef} className='dialog'>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid  w-[64rem] h-[60rem] gap-8 py-8 px-10 items-center relative'>
                        <IoMdClose
                            className='absolute right-0 top-0 m-4 text-[2rem] cursor-pointer'
                            onClick={closeDialog}
                        />
                        <div className='border-b'>
                            <p className='text-[1.6rem] font-semibold'>
                                Permissions List
                            </p>
                        </div>
                        <div className='my-10 grid gap-4 h-full'>
                            {permissions &&
                            roleId &&
                            Object.values(permissions)[`${roleId}`].length >
                                0 ? (
                                React.Children.toArray(
                                    Object.values(permissions)[`${roleId}`].map(
                                        (value, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className='flex items-center gap-4 '
                                                >
                                                    <input
                                                        type='checkbox'
                                                        className='cursor-pointer'
                                                    />
                                                    <p className='text-[1.6rem]'>
                                                        Permission {i + 1}
                                                    </p>
                                                </div>
                                            )
                                        }
                                    )
                                )
                            ) : (
                                <p>No permission</p>
                            )}
                        </div>
                        <button
                            className='bg-color-blue-1 px-12 py-4 text-white text-[1.4rem] flex items-center justify-self-start rounded-lg gap-4 self-center'
                            onClick={closeDialog}
                        >
                            <img src='/icons/admins/saveDisk.svg' alt='' />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </section>
            </dialog>
           
        </div>
    )
}

export default Permissions
