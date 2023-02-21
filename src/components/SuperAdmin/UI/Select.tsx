import React, { ChangeEvent, FC, useState, useMemo, useEffect } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { ValidateInputTypes } from '../../../pages/SecurityCompany/dashboard/company/AddSecurity/AddSecurityGuard'

type Complex = {
    name: string
    No: number
}

interface ISelect<T> {
    state: Array<string>
    selectedState: string | null
    setSelectedState: React.Dispatch<React.SetStateAction<T>>
    label?: string
    placeholder?: string
    isSearchable?: boolean
}

interface ComplexSelect extends Omit<ISelect<string>, 'state'> {
    state: Array<Complex>
}

interface IMultipleSelect {
    selectFrom: Array<string>
    selected: Array<string>
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    label: string
    placeholder?: string
}

export const Select: FC<ISelect<string | ValidateInputTypes>> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
    isSearchable = false,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)
    const [search, setSearch] = useState('')
    const [selectFrom, setSelectFrom] = useState(state)

    const handleSelectedState = (item: string) => {
        setSelectedState(item)
        setToggleStateMenu(false)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        if (value.length > 0) {
            setSelectFrom((prev) => {
                return prev.filter((item) => {
                    return item.toLowerCase().includes(value.toLowerCase())
                })
            })
        } else {
            setSelectFrom(selectFrom)
        }
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold'>{label}</p>
            <div className='relative flex items-center'>
                <p
                    className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem]'
                    onClick={stateMenuToggler}
                >
                    {selectedState || (
                        <span className='text-gray-500'>
                            {placeholder || ''}
                        </span>
                    )}
                </p>
                {toggleStateMenu ? (
                    <GrUp className='absolute right-4' />
                ) : (
                    <GrDown className='absolute right-4' />
                )}
            </div>

            {toggleStateMenu && (
                <div className='absolute top-[8rem]  left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                    {isSearchable && (
                        <div className='relative flex items-center text-[1.4rem]'>
                            <img
                                src='/icons/admins/search.svg'
                                alt=''
                                className='absolute left-4'
                            />

                            <input
                                type='text'
                                placeholder='Search Parameters'
                                value={search}
                                onChange={handleSearch}
                                className='pl-16 w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'
                            />
                        </div>
                    )}
                    {selectFrom.map((item, index) => (
                        <p
                            className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                            key={index}
                            onClick={() => handleSelectedState(item)}
                        >
                            {item}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}
export const ComplexSelect: FC<ComplexSelect> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
    isSearchable = false,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)
    const [search, setSearch] = useState('')
    const [selectFrom, setSelectFrom] = useState(state)

    const handleSelectedState = (item: string) => {
        setSelectedState(item)
        setToggleStateMenu(false)
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        if (value.length > 0) {
            setSelectFrom((prev) => {
                return prev.filter((item) => {
                    return item.name.toLowerCase().includes(value.toLowerCase())
                })
            })
        } else {
            setSelectFrom(selectFrom)
        }
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold'>{label}</p>
            <div className='relative flex items-center'>
                <p
                    className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem]'
                    onClick={stateMenuToggler}
                >
                    {selectedState || (
                        <span className='text-gray-500'>
                            {placeholder || ''}
                        </span>
                    )}
                </p>
                {toggleStateMenu ? (
                    <GrUp className='absolute right-4' />
                ) : (
                    <GrDown className='absolute right-4' />
                )}
            </div>

            {toggleStateMenu && (
                <div className='absolute top-[8rem]  left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                    {isSearchable && (
                        <div className='relative flex items-center text-[1.4rem]'>
                            <img
                                src='/icons/admins/search.svg'
                                alt=''
                                className='absolute left-4'
                            />

                            <input
                                type='text'
                                placeholder='Search Parameters'
                                value={search}
                                onChange={handleSearch}
                                className='pl-16 w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'
                            />
                        </div>
                    )}
                    {selectFrom.map((item, index) => (
                        <p
                            className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer flex justify-between'
                            key={index}
                            onClick={() => handleSelectedState(item.name)}
                        >
                            <span>{item.name}</span>
                            <span>{item.No}</span>
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export const MultipleSelect: FC<IMultipleSelect> = ({
    selectFrom,
    selected,
    setSelected,
    label,
    placeholder,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedFrom, setSelectedFrom] = useState(selectFrom)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)

    const handleSelectedState = (
        e: ChangeEvent<HTMLInputElement>,
        item: string
    ) => {
        const checked = e.target.checked

        if (checked) {
            setSelected((prev) => [...prev, item])
        } else {
            setSelected((prev) => prev.filter((i) => i !== item))
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        if (value.length > 0) {
            setSelectedFrom((prev) => {
                return prev.filter((item) => {
                    return item.toLowerCase().includes(value.toLowerCase())
                })
            })
        } else {
            setSelectedFrom(selectFrom)
        }
    }

    const memoizedList = useMemo(() => {
        return selectedFrom.map((item, index) => (
            <div
                className='flex items-center pl-4 cursor-pointer hover:bg-color-grey'
                key={index}
            >
                <input
                    type='checkbox'
                    className='cursor-pointer'
                    name={item + index}
                    id={item + index}
                    value={item}
                    checked={selected.includes(item)}
                    onChange={(e) => handleSelectedState(e, item)}
                />
                <label
                    htmlFor={item + index}
                    className='text-[1.4rem] p-4 cursor-pointer w-full'
                >
                    {item}
                </label>
            </div>
        ))
    }, [selectedFrom, selected])

    const removeSelectedItem = (item: string) => {
        setSelected((prev) => prev.filter((i) => i !== item))
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold'>{label}</p>
            <div className='relative items-center max-w-[40rem] flex'>
                <p
                    className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer h-[5rem] overflow-hidden overflow-x-scroll flex gap-4 items-center pr-16'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(12rem, 1fr))',
                    }}
                >
                    {selected && selected.length > 0 ? (
                        selected.map((item, i) => (
                            <span
                                className='text-white whitespace-nowrap bg-color-blue-1 rounded-lg px-4 relative flex items-center h-[3.8rem] z-[2] pr-12'
                                key={i}
                            >
                                {item}
                                <IoMdClose
                                    className='absolute right-2 text-[1.4rem] cursor-pointer'
                                    onClick={() => removeSelectedItem(item)}
                                />
                            </span>
                        ))
                    ) : (
                        <span className='text-gray-500'>
                            {placeholder || ''}
                        </span>
                    )}
                </p>
                {toggleStateMenu ? (
                    <div
                        className='absolute w-full h-full z-[1] left-0 flex items-center justify-end pr-3 cursor-pointer'
                        onClick={stateMenuToggler}
                    >
                        <GrUp />
                    </div>
                ) : (
                    <div
                        className='absolute w-full h-full z-[1] left-0 flex items-center justify-end pr-3 cursor-pointer'
                        onClick={stateMenuToggler}
                    >
                        <GrDown />
                    </div>
                )}
            </div>

            {toggleStateMenu && (
                <div className='absolute top-[8rem]  left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                    <div className='relative flex items-center text-[1.4rem]'>
                        <img
                            src='/icons/admins/search.svg'
                            alt=''
                            className='absolute left-4'
                        />
                        <input
                            type='text'
                            placeholder='Search Parameters'
                            value={search}
                            onChange={handleSearch}
                            className='pl-16 w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'
                        />
                    </div>
                    {memoizedList}
                </div>
            )}
        </div>
    )
}
