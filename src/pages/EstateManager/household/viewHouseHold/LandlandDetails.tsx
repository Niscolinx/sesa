import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { ViewHouseHoldContext } from './ViewHouseHold'

function LandlandDetails() {
    const { closeDialog } = useContext(ViewHouseHoldContext)

    interface Landlord {
        resCode: string
        name: string
        gender: string
        phoneNo: string
        tenancyType: string
        id: string
        imgUrl: string
    }

    const LANDLORD_DETAIL: Landlord[] = Array.from({ length: 1 }, (_, i) => {
        return {
            id: `1 + ${i}`,
            resCode: `R${(Math.random() * 0.1 + 0.9).toFixed(5).split('.')[1]}`,
            imgUrl: '/img/avatar11.png',
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            name: 'Darlene Robert',
            phoneNo: '(+234) 9076577689',
            tenancyType: 'Landlord (Non-Resident)',
        }
    })

   

    

  

    return (
        <section className='bg-color-white rounded-lg   overflow-scroll h-full'>
            <div className='grid text-[1.6rem]'>
                

                <div className='grid'>
                    <div className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-5 gap-6 capitalize'>
                        <p>Res. Code</p>
                        <p>Name</p>
                        <p>Gender</p>
                        <p>Phone No.</p>
                        <p>Tenancy Type</p>
                    </div>

                    <div className='grid gap-8 mt-8 p-8'>
                        { LANDLORD_DETAIL.length > 0 ? (
                            React.Children.toArray(
                                LANDLORD_DETAIL.map(
                                    ({
                                        id,
                                        gender,
                                        name,
                                        resCode,
                                        phoneNo,
                                        tenancyType,
                                        imgUrl,
                                    }) => {
                                        return (
                                            <div className='grid justify-between border-b grid-cols-5 gap-8 py-4 items-center'>
                                                <p>{resCode}</p>
                                                <p className='flex items-center gap-4'>
                                                    <img
                                                        src={imgUrl}
                                                        alt=''
                                                        className='w-[3.5rem] h-[h-3.5rem] rounded-full object-cover'
                                                    />

                                                    <span className=' max-w-[40rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                                        {name}
                                                    </span>
                                                </p>
                                                <p>{gender}</p>
                                                <p>{phoneNo}</p>
                                                <p>{tenancyType}</p>
                                            </div>
                                        )
                                    }
                                )
                            )
                        ) : (
                            <div>
                                <div className='relative'>
                                    <div className='absolute w-full grid place-content-center'>
                                        <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
              
            </div>{' '}
        </section>
    )
}

export default LandlandDetails
