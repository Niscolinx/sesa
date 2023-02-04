import React, { ChangeEvent, FC, useState } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'

interface ISelect {
    state: Array<string>
    selectedState: string | null
    setSelectedState: React.Dispatch<React.SetStateAction<string | null>>
    label: string
    placeholder?: string
}

interface IMultipleSelect {
    selectFrom: Array<string>
    selected: Array<string> | null
    setSelected: React.Dispatch<React.SetStateAction<string[] | null>>
    label: string
    placeholder?: string
}

export const Select: FC<ISelect> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)

    const handleSelectedState = (item: string) => {
        setSelectedState(item)
        setToggleStateMenu(false)
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
                    {state.map((item, index) => (
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

export const MultipleSelect: FC<IMultipleSelect> = ({
    selectFrom,
    selected,
    setSelected,
    label,
    placeholder,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)

    const handleSelectedState = (e:ChangeEvent<HTMLInputElement>,  item: string) => {
        //setToggleStateMenu(false)

        if (selected && selected.includes(item)) {
            const newSelected = selected.filter((i) => i !== item)
            setSelected(newSelected)
            return
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
                    {selected || (
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
                    {selectFrom.map((item, index) => (
                        // <p
                        //     className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                        //     key={index}
                        //     onClick={() => handleSelectedState(item)}
                        // >
                        //     {item}
                        // </p>
                        <div className='flex items-center pl-4 cursor-pointer hover:bg-color-grey'>
                            <input
                                key={index}
                                type='checkbox'
                                className='cursor-pointer'
                                name={item}
                                id={item + index}
                                onChange={(e) => handleSelectedState(e, item)}
                            />
                            <label
                                htmlFor={item + index}
                                className='text-[1.4rem]  p-4 w-[7rem] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap'
                            >
                                {item}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
