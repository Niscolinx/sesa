import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'



const Last: FC = () => {
   

    return (
        <main className='bg-color-white rounded-lg'>
            <p className='flex items-center gap-2'>
                <span>NB: All alphas are denoted with the icon </span>
                <img src='/img/alpha.svg' alt='' />
            </p>
            <div className='flex w-full justify-start items-center gap-12 p-10 bg-white rounded-lg'>
                <p className=' font-bold'>
                    Voters List <span>(50)</span>
                </p>
                <div className='relative flex items-center'>
                    <img
                        src='/icons/admins/search.svg'
                        alt=''
                        className='absolute left-4 text-[4rem]'
                    />
                    <input
                        type='text'
                        placeholder='Search Parameters'
                        className='pl-16 w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4'
                    />
                </div>
                <div className='relative flex items-center'>
                    <select className=' cursor-pointer w-[25rem] rounded-lg border border-color-blue-light appearance-none outline-none p-4 bg-white'>
                        <option hidden value=''>
                            Sort By
                        </option>
                        <option value='date'>property</option>
                        <option value='alpha'>Name</option>
                    </select>
                    <GrDown className='absolute right-4 text-[1.3rem]' />
                </div>
            </div>
            <div className='grid'>
                <div
                    className='grid justify-between text-color-dark-1 bg-gray-100 p-8 grid-cols-6 gap-6'
                    style={{
                        fontSize: '1.6rem',
                    }}
                >
                    <p className='flex items-center gap-2'>
                        <input type='checkbox' className='cursor-pointer' />
                        <p>Resident Code</p>
                    </p>
                    <p>Resident Name</p>
                    <p>Property Category</p>
                    <p>Property Name</p>
                    <p>Property Type</p>
                    <p>Tenancy Type</p>
                </div>

                <div className='grid gap-8 mt-8 p-8'>
                    {slicedPages && slicedPages.length > 0 ? (
                        React.Children.toArray(
                            slicedPages[paginate.index].map(
                                ({
                                    id,
                                    residentCode,
                                    residentName,
                                    propertyName,
                                    tenancyType,
                                    propertyType,
                                    propertyCategory,
                                    isAlpha,
                                }) => {
                                    return (
                                        <div className='grid justify-between border-b grid-cols-6 gap-8 py-4'>
                                            <p className='flex items-center gap-4'>
                                                <input
                                                    type='checkbox'
                                                    className='cursor-pointer'
                                                />

                                                <span>{residentCode}</span>
                                            </p>
                                            <p className='flex items-center gap-2'>
                                                <span>{residentName}</span>
                                                {isAlpha ? (
                                                    <img
                                                        src='/img/alpha.svg'
                                                        alt=''
                                                    />
                                                ) : null}
                                            </p>
                                            <p>{propertyCategory}</p>
                                            <p>{propertyName}</p>

                                            <p>{propertyType}</p>
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
            <footer className='flex items-center p-4 mt-4 bg-color-white rounded-lg'>
                <div className='flex gap-8 items-center'>
                    <p>View</p>
                    <select
                        name=''
                        id=''
                        className='flex items-center border px-4 rounded-lg outline-none cursor-pointer'
                        onChange={handleItemsPerPage}
                    >
                        {itemsPerPageArr.map((item, index) => (
                            <option
                                value={item}
                                key={index}
                                selected={item === itemsPerPage}
                                className='capitalize cursor-pointer bg-white'
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                    <p className='text'>List per page</p>
                </div>
                <ul className='flex items-center gap-5 ml-10'>
                    <HiOutlineChevronLeft
                        onClick={handlePrev}
                        className='cursor-pointer'
                    />

                    {slicedPages?.map((item, index) => {
                        return (
                            <li key={index}>
                                {index + 1 === currentPage ? (
                                    <span className='bg-color-primary text-white grid place-content-center w-[3rem] h-[3rem] cursor-pointer'>
                                        {index + 1}
                                    </span>
                                ) : (
                                    <span
                                        className='text-color-primary bg-white grid place-content-center border w-[3rem] h-[3rem] cursor-pointer'
                                        onClick={(e) => jumpToPage(e, index)}
                                    >
                                        {index + 1}
                                    </span>
                                )}
                            </li>
                        )
                    })}

                    <HiOutlineChevronRight
                        onClick={handleNext}
                        className='cursor-pointer'
                    />
                </ul>
            </footer>
        </main>
    )
}

export default Last
