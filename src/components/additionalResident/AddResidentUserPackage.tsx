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
        'package 4',
    ])
    const [frequency, setFrequency] = useState<Frequency[]>([
        'monthly',
        'weekly',
        'quarterly',
        'yearly',
    ])

    const [togglePackageMenu, setTogglePackageMenu] = useState(false)
    const [selectedPackage, setSelectedPackage] = useState<Packages>('package 1')
    const [toggleFrequencyMenu, setToggleFrequencyMenu] = useState(false)
    const [selectedFrequency, setSelectedFrequency] = useState<Frequency>('monthly')
  

    const packageMenuToggler = () =>  setTogglePackageMenu(!togglePackageMenu)

    const handleSelectedPackage = (item: Packages) => {
        setSelectedPackage(item)
        setTogglePackageMenu(false)
    }
    const frequencyMenuToggler = () =>  setToggleFrequencyMenu(!toggleFrequencyMenu)

    const handleSelectedFrequency = (item: Frequency) => {
        setSelectedFrequency(item)
        setToggleFrequencyMenu(false)
    }

    return (
        <div className=' p-8 bg-white h-[70vh] rounded-lg overflow-y-scroll'>
            <section
                className='grid max-w-[65vw] gap-16'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
                }}
            >
                <div className='relative self-end grid gap-4'>
                    <p className='text-[1.4rem] font-semibold'>Name of Package</p>
                    <p
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                        onClick={packageMenuToggler}
                    >
                        {selectedPackage}
                    </p>

                    {togglePackageMenu && (
                        <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                            {packages.map((item, index) => (
                                <p
                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                    key={index}
                                    onClick={() => handleSelectedPackage(item)}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <div className='relative self-end grid gap-4'>
                    <p className='text-[1.4rem] font-semibold'>Frequency</p>
                    <p
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                        onClick={frequencyMenuToggler}
                    >
                        {selectedFrequency}
                    </p>

                    {toggleFrequencyMenu && (
                        <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                            {frequency.map((item, index) => (
                                <p
                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                    key={index}
                                    onClick={() => handleSelectedFrequency(item)}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
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
