import React, { useContext, useEffect, useState } from 'react'
import { GrDown, GrUp } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { i } from 'vitest/dist/types-71ccd11d'
import { ModalContext } from '../../Context/ModalContext'
import RolesAndPerm from '../../pages/dashboard/RolesAndPerm'
import { getPhotoUrl } from '../../utils/getPhotoUrl'


type Packages = 'package 1' | 'package 2' | 'package 3' | 'package 4'
type Frequency = 'monthly' | 'weekly' | 'quarterly' | 'yearly'

const AddResidentUserPackage = () => {
    const ModalContextData = useContext(ModalContext)
    const { handleOpen } = ModalContextData
     const [packages, setPackages] = useState<Packages[]>([
        'package 1',
        'package 2',
        'package 3',
        'package 4'
    ])
     const [frequency, setFrequency] = useState<Frequency[]>([
        'monthly',
        'weekly',
        'quarterly',
        'yearly'
    ])



    
    const [selectedPackage, setSelectedPackage] = useState<{
        [key: string]: Packages
    }>(null as any)
    const [toggleDropDown, setToggleDropDown] = useState<{
        isDropDownOpen: boolean
        index: number | null
    }>({
        isDropDownOpen: false,
        index: null,
    })

     const dropDownHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        setToggleDropDown((prev) => {
            return {
                isDropDownOpen: e.target.checked,
                index: index,
            }
        })
    }



    const selectRole = (e: React.MouseEvent, item: string, index: number) => {
        console.log('select role')
        setSelectedPackage((prev) => {
            return {
                ...prev,
                [index]: item,
            }
        })
    }

    return (
        <div className=' p-8 bg-white h-[70vh] rounded-lg overflow-y-scroll'>
            <section
                className='grid max-w-[65vw] gap-16'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
                }}
            >
                <td>
                    <label
                        className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                        htmlFor={i.toString()}
                        onClick={() =>
                            setToggleDropDown((prev) => {
                                return {
                                    isDropDownOpen: !prev.isDropDownOpen,
                                    index: i,
                                }
                            })
                        }
                    >
                        {selectedPackage && selectedPackage[i] ? (
                            selectedPackage[i]
                        ) : (
                            <span className='text-color-primary'>
                                Select Role
                            </span>
                        )}
                        {isDropDownOpen && index === i ? (
                            <GrUp className='w-[1rem] h-[1rem]' />
                        ) : (
                            <GrDown className='w-[1rem] h-[1rem]' />
                        )}
                    </label>
                    <input
                        type='radio'
                        name='dropdown'
                        className='hidden'
                        id={i.toString()}
                        onChange={(e) => dropDownHandler(e, i)}
                    />

                    {isDropDownOpen && index === i && (
                        <div className='absolute top-[5rem] translate-x-[6rem] border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                            {roles.map((item, index) => (
                                <p
                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                    key={index + i}
                                    onClick={(e) => selectRole(e, item, i)}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='frequency'
                        className='text-[1.4rem] font-semibold'
                    >
                        Frequency
                    </label>
                    <input
                        type='text'
                        required
                        id='frequency'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='packageName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Amount
                    </label>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            type='text'
                            required
                            id='amount'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='userName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Details
                    </label>
                    <input
                        type='text'
                        required
                        id='userName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='startDate'
                        className='text-[1.4rem] font-semibold'
                    >
                        Start Date
                    </label>
                    <input
                        type='text'
                        required
                        id='startDate'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                    />
                </div>
            </section>
        </div>
    )
}

export default AddResidentUserPackage
