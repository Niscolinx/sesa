import React, {
    ChangeEvent,
    FC,
    useState,
    useMemo,
    useEffect,
    useRef,
} from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { ValidateInputTypes } from '../../../pages/SecurityCompany/dashboard/company/AddSecurity/AddSecurityGuard'

type Complex = {
    name: string
    No?: number
    sub?: string
}

interface ISelect<T> {
    state: Array<string>
    selectedState: string | string[]
    setSelectedState: React.Dispatch<React.SetStateAction<string>>
    label?: string
    selectFormErrors?: Record<string, string> | null
    placeholder?: string
    validate?: boolean
    isSearchable?: boolean
    fullWidth?: boolean
    kyr?: boolean
    id?: number
    color?: string
}

interface MappedSelect {
    state: Array<string>
    selectedState: {
        [key: string]: string
    } | null
    setSelectedState: React.Dispatch<
        React.SetStateAction<{
            [key: string]: string
        } | null>
    >
    label?: string
    placeholder?: string
    validate?: boolean
    isSearchable?: boolean
    fullWidth?: boolean
    id?: number
    kyr?: boolean
    idx: string
    color: string
}

interface ComplexSelect extends Omit<ISelect<string>, 'state'> {
    state: Array<Complex>
    double?: boolean
}

interface IMultipleSelect {
    selectFrom: Array<string>
    selected: Array<string>
    id?: number

    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    label: string
    selectFormErrors?: Record<string, string> | null
    placeholder?: string
}

export const Select: FC<ISelect<ValidateInputTypes | string>> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
    kyr,
    id,
    selectFormErrors,
    fullWidth,
    color,
    isSearchable = false,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const [search, setSearch] = useState('')
    const [selectFrom, setSelectFrom] = useState(state)

    const stateMenuToggler = (which: 'inner' | 'outside') => {
        if (!toggleStateMenu) {
            return setToggleStateMenu(true)
        }
        const id = setTimeout(() => {
            if (which === 'outside') {
                if (toggleStateMenu) {
                    setToggleStateMenu(false)
                }
            }
            if (which === 'inner') {
                setToggleStateMenu(!toggleStateMenu)
            }
        }, 150)

        return () => clearTimeout(id)
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
            <div className='relative flex items-center '>
                {color ? (
                    <p
                        className='border border-color-grey px-4 py-2 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] capitalize'
                        onClick={() => stateMenuToggler('inner')}
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
                        onClick={() => {
                            stateMenuToggler('inner')
                        }}
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
                    <div className='absolute top-[6rem] left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize max-h-[20rem] overflow-y-scroll '>
                        <div
                            className={`flex items-center text-[1.4rem]  ${
                                isSearchable
                                    ? 'relative'
                                    : 'absolute left-[-9999px] opacity-0'
                            } `}
                        >
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
                                onBlur={(e) => {
                                    e.preventDefault()
                                    stateMenuToggler('outside')
                                }}
                                onChange={handleSearch}
                                className={`pl-16 rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none ${
                                    fullWidth ? 'w-full' : 'w-[25rem]'
                                }`}
                            />
                        </div>

                        {selectFrom.map((item, index) => (
                            <p
                                className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                key={index}
                                onClick={() => handleSelectedState(item)}
                            >
                                {item.replaceAll('_', ' ')}
                            </p>
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

export const ComplexSelect: FC<ComplexSelect> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
    double,
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
            <p className='text-[1.4rem] font-semibold capitalize'>{label}</p>
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
                <div
                    className={`absolute top-[8rem]  left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize max-h-[40rem] overflow-y-scroll`}
                >
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
                                className={`pl-16 ${
                                    double ? 'w-full' : 'w-[25rem] '
                                } rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none`}
                            />
                        </div>
                    )}
                    {selectFrom.map((item, index) => (
                        <p
                            className={`text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer ${
                                double ? 'grid' : 'flex justify-between'
                            }`}
                            key={index}
                            onClick={() => handleSelectedState(item.name)}
                        >
                            {double ? (
                                <>
                                    <span className='font-Satoshi-Medium text-[1.6rem]'>
                                        {item.name}
                                    </span>
                                    <span>{item.sub}</span>
                                </>
                            ) : (
                                <>
                                    <span>{item.name}</span>
                                    <span>{item.No}</span>
                                </>
                            )}
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
    selectFormErrors,
    label,
    placeholder,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedFrom, setSelectedFrom] = useState(selectFrom)

    const inputRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handler = (e: any) => {
            console.log(e.target)
            console.log(inputRef.current)
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                console.log('close')
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


    


    function handleSelectedState(
        e: ChangeEvent<HTMLInputElement>,
        item: string
    ) {

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
            <p className='text-[1.4rem] font-semibold capitalize'>{label}</p>
            <div className='relative items-center max-w-[40rem] flex'>
                <p
                    className={`border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] overflow-hidden overflow-x-scroll flex gap-4 items-center ${
                        selected.length > 0 ? 'justify-between' : 'justify-end'
                    }`}
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(12rem, 1fr))',
                    }}
                    onClick={toggleStateHandler}
                >
                    <div className='flex items-center gap-2'>
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
                    </div>
                    <div className='flex'>
                        {toggleStateMenu ? (
                            <GrUp className='text-[1.4rem] ' />
                        ) : (
                            <GrDown className='text-[1.4rem] ' />
                        )}
                    </div>
                </p>
            </div>

            {toggleStateMenu && (
                <div
                    className='absolute top-[8rem]  left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize max-h-[20rem] overflow-y-scroll'
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    ref={inputRef}
                >
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
                            autoFocus
                            onChange={handleSearch}
                            className='pl-16 w-[25rem] rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none'
                        />
                    </div>

                    {memoizedList}
                </div>
            )}
            {label && selectFormErrors && selectFormErrors[label] && (
                <p className='text-[1.2rem] text-red-500'>
                    {selectFormErrors[label]}
                </p>
            )}
        </div>
    )
}

export const MappedSelect: FC<MappedSelect> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    placeholder,
    kyr,
    fullWidth,
    color,
    idx,
    isSearchable = false,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const stateMenuToggler = () => setToggleStateMenu(!toggleStateMenu)
    const [search, setSearch] = useState('')
    const [selectFrom, setSelectFrom] = useState(state)

    const handleSelectedState = (item: string) => {
        setSelectedState((prev) => {
            return {
                ...prev,
                [idx]: item,
            }
        })

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

    const clearValue = (
        e: React.MouseEvent<SVGElement, MouseEvent>,
        idx: string
    ) => {
        e.stopPropagation()

        setSelectedState((prev) => {
            return {
                ...prev,
                [idx]: '',
            }
        })
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold'>{label}</p>
            <div className='relative flex items-center'>
                {selectedState && selectedState[idx] ? (
                    <p
                        className='border border-color-grey px-4 py-2 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] '
                        onClick={stateMenuToggler}
                    >
                        {color ? (
                            <span
                                className={`text-white whitespace-nowrap ${color}  rounded-lg px-4 relative flex items-center z-[2] pr-12 py-2 w-max`}
                            >
                                <>
                                    {selectedState[idx]}
                                    <IoMdClose
                                        className='absolute right-2 text-[1.4rem] cursor-pointer'
                                        onClick={(e) => clearValue(e, idx)}
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
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem]'
                        onClick={stateMenuToggler}
                    >
                        <span className='text-gray-500'>
                            {placeholder || ''}
                        </span>
                    </p>
                )}
                {toggleStateMenu ? (
                    <GrUp className='absolute right-4' />
                ) : (
                    <GrDown className='absolute right-4' />
                )}
                {toggleStateMenu && (
                    <div className='absolute top-[6rem] left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
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
                                    className={`pl-16 rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none ${
                                        fullWidth ? 'w-full' : 'w-[25rem]'
                                    }`}
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
                        {kyr && (
                            <p className='text-color-primary px-4 text-[1.4rem] py-1'>
                                NB: Choice of validation is ₦200
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export const SelectedItems: FC<
    Pick<IMultipleSelect, 'selectFrom' | 'label'>
> = ({ selectFrom, label }) => {
    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold'>{label}</p>
            <div className='relative items-center max-w-[40rem] flex'>
                <div
                    className='border border-color-grey p-4 outline-none rounded-lg w-full h-[5rem] flex items-center overflow-hidden overflow-x-scroll'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(12rem, 1fr))',
                    }}
                >
                    {selectFrom.slice(0, 3).map((item, i) => {
                        return (
                            <p
                                className=' whitespace-nowrap rounded-lg relative flex items-center h-[3.8rem] z-[2] pr-2 '
                                key={i}
                            >
                                {i < 2 ? (
                                    <span className='max-w-[10rem] text-ellipsis overflow-hidden'>
                                        {item},
                                    </span>
                                ) : (
                                    item
                                )}
                            </p>
                        )
                    })}
                    <span className='bg-color-blue-1 text-white flex items-center gap-4 rounded-2xl w-max py-2 px-4 mx-auto text-center whitespace-nowrap'>
                        + {selectFrom.length - 3} more
                    </span>
                </div>
            </div>
        </div>
    )
}
