import React, {
    ChangeEvent,
    FC,
    useEffect,
    useState,
    MouseEvent,
    useMemo,
} from 'react'
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

    const memoizedList = useMemo(() => {
        return selectFrom.map((item, index) => (
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
    }, [selectFrom])

    const removeSelectedItem = (item: string) => {
        setSelected((prev) => prev.filter((i) => i !== item))
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold'>{label}</p>
            <div className='relative flex items-center w-[40rem]'>
                <p className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer h-[5rem] overflow-scroll flex gap-4 items-center pr-12'>
                    {selected && selected.length > 0 ? (
                        selected.map((item, i) => (
                            <span
                                className='text-white overflow-hidden text-ellipsis whitespace-nowrap bg-color-blue rounded-lg px-4 relative flex items-center h-[3.8rem] z-[2] pr-12'
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
                    {memoizedList}
                </div>
            )}
        </div>
    )
}
