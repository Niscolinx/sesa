import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { ValidateInputTypes } from '../../../pages/estateManager/securityGuard/AddSecurityGuard'

export interface ISelect<T> {
    state: Array<string>
    selectedState: string | string[]
    setSelectedState: React.Dispatch<React.SetStateAction<string>>
    label?: string
    selectFormErrors?: Record<string, string> | null
    placeholder?: string
    validate?: boolean
    isSearchable?: boolean
    absolute?: boolean
    fullWidth?: boolean
    kyr?: boolean
    id?: number
    color?: string
}

const SingleSelect: FC<ISelect<ValidateInputTypes | string>> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
    kyr,
    absolute = true,
    selectFormErrors,
    color,
    isSearchable = false,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const [search, setSearch] = useState('')
    const [selectFrom, setSelectFrom] = useState(state)

    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setToggleStateMenu(false)
            }
        }

        window.addEventListener('click', handler)
        return () => {
            window.removeEventListener('click', handler)
        }
    })

    const toggleStateHandler = () => {
        return setToggleStateMenu(!toggleStateMenu)
    }

    const handleSelectedState = (item: string) => {
        setSelectedState(item)
        setToggleStateMenu(false)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        const items = [...state]

        const updated = items.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
        )

        setSelectFrom([...updated])
    }

    const clearValue = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation()
        setSelectedState('')
    }

    return (
        <div
            className={`relative grid self-baseline capitalize ${
                label && 'gap-4'
            }`}
        >
            <p className='text-[1.4rem] font-semibold'>
                {label?.replaceAll('_', '  ')}
            </p>
            <div className='relative grid items-center ' ref={containerRef}>
                {color ? (
                    <p
                        className='border border-color-grey px-4 py-2 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] capitalize'
                        onClick={toggleStateHandler}
                    >
                        {selectedState ? (
                            <span
                                className={`text-white whitespace-nowrap bg-${color}  rounded-lg px-4 relative flex items-center z-[2] pr-12 py-2 w-max`}
                            >
                                <>
                                    {Array.isArray(selectedState)
                                        ? selectedState
                                        : selectedState.replaceAll('_', ' ')}
                                    <IoMdClose
                                        className='absolute right-2 text-[1.4rem] cursor-pointer'
                                        onClick={(e) => clearValue(e)}
                                    />
                                </>
                            </span>
                        ) : (
                            <span className='text-gray-500'>
                                {placeholder || ''}
                            </span>
                        )}
                    </p>
                ) : (
                    <p
                        className={`border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] flex items-center gap-4 capitalize ${
                            selectedState.length > 0
                                ? 'justify-between'
                                : 'justify-end'
                        }`}
                        onClick={toggleStateHandler}
                    >
                        {Array.isArray(selectedState)
                            ? selectedState
                            : selectedState.replaceAll('_', ' ') || (
                                  <span className='text-gray-500'>
                                      {placeholder || ''}
                                  </span>
                              )}
                        <div className='flex'>
                            {toggleStateMenu ? (
                                <GrUp className='text-[1.4rem] ' />
                            ) : (
                                <GrDown className='text-[1.4rem] ' />
                            )}
                        </div>
                    </p>
                )}

                {toggleStateMenu && (
                    <div
                        className={`${
                            absolute && 'absolute top-[6rem] left-0'
                        } border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize max-h-[20rem] overflow-y-scroll w-full`}
                    >
                        {isSearchable && (
                            <div className={`flex items-center text-[1.4rem]`}>
                                <img
                                    src='/icons/admins/search.svg'
                                    alt=''
                                    className='absolute left-4'
                                />

                                <input
                                    type='text'
                                    placeholder='Search Parameters'
                                    value={search}
                                    autoFocus
                                    onChange={handleSearch}
                                    className={`pl-16 rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none
                                    w-full`}
                                />
                            </div>
                        )}

                        {selectFrom.map((item, index) => (
                            <button
                                className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer text-left'
                                key={item + index}
                                onClick={() => handleSelectedState(item)}
                            >
                                {Array.isArray(item)
                                    ? item
                                    : item.replaceAll('_', ' ')}
                            </button>
                        ))}
                        {kyr && (
                            <p className='text-color-primary px-4 text-[1.4rem] py-1'>
                                NB: Choice of validation is ₦200
                            </p>
                        )}
                    </div>
                )}
            </div>
            {label && selectFormErrors && selectFormErrors[label] && (
                <p className='text-[1.2rem] text-red-500'>
                    {selectFormErrors[label]}
                </p>
            )}
        </div>
    )
}

export default SingleSelect
