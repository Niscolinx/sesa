import React, { ChangeEvent, FC, useEffect, useState, MouseEvent } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'

interface ISelect {
    state: Array<string>
    selectedState: string | null
    setSelectedState: React.Dispatch<React.SetStateAction<string | null>>
    label: string
    placeholder?: string
}

interface IMultipleSelect {
    selectFrom: Array<string>
    selected: Array<string>
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
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

    const stateMenuToggler = (e: MouseEvent<HTMLParagraphElement>) => {

        console.log(e)
        setToggleStateMenu(!toggleStateMenu)
    }

    const handleSelectedState = (
        e: ChangeEvent<HTMLInputElement>,
        item: string
    ) => {
        //setToggleStateMenu(false)

        const checked = e.target.checked

        if (checked) {
            if (selected && selected.includes(item)) {
                const newSelected = selected.filter((i) => i !== item)
                setSelected(newSelected)
                return
            }
        }
    }

    useEffect(() => {
        console.log(selected)
    }, [selected])

    const removeSelectedItem = (item: string) => {
        console.log('remove')
        setSelected((prev) => prev.filter((i) => i !== item))
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold'>{label}</p>
            <div className='relative flex items-center'>
                <p
                    className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] overflow-scroll flex gap-4'
                    onClick={(e) => stateMenuToggler(e)}
                >
                    {selected && selected.length > 0 ? (
                        selected.map((item) => (
                            <span className='text-white overflow-hidden text-ellipsis whitespace-nowrap w-[10rem] bg-color-blue rounded-lg px-4 relative flex items-center h-[3.8rem]'>
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
                    <GrUp className='absolute right-4' />
                ) : (
                    <GrDown className='absolute right-4' />
                )}
            </div>

            {toggleStateMenu && (
                <div className='absolute top-[8rem]  left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                    {selectFrom.map((item, index) => (
                        <div
                            className='flex items-center pl-4 cursor-pointer hover:bg-color-grey'
                            key={index}
                        >
                            <input
                                type='checkbox'
                                className='cursor-pointer'
                                name={item}
                                id={item + index}
                                onChange={(e) => handleSelectedState(e, item)}
                            />
                            <label
                                htmlFor={item + index}
                                className='text-[1.4rem]  p-4 cursor-pointer '
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
