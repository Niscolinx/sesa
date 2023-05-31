import { FC, useState, ChangeEvent, useEffect, useRef } from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'

type Compound = {
    name: string
    No?: number
    sub?: string
    disabled?: boolean
}

interface CompoundSelect {
    state: Array<Compound>
    double?: boolean
    selectedState: string[]
    setSelectedState: React.Dispatch<React.SetStateAction<string[]>>
    selectFormErrors?: Record<string, string> | null
    textarea?: boolean
    label?: string
    placeholder?: string
    isSearchable?: boolean
}

export const CompoundSelect: FC<CompoundSelect> = ({
    state,
    selectedState,
    setSelectedState,
    label,
    textarea = false,
    selectFormErrors,
    placeholder,
    double,
    isSearchable = false,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handler = (e: any) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setToggleStateMenu(false)
            }
        }

        window.addEventListener('click', handler)
        return () => {
            window.removeEventListener('click', handler)
        }
    })

    const [toggleStateMenu, setToggleStateMenu] = useState(false)

    const toggleStateHandler = () => setToggleStateMenu(!toggleStateMenu)

    const [search, setSearch] = useState('')
    const [selectFrom, setSelectFrom] = useState(state)

    function handleSelectedState(
        e: ChangeEvent<HTMLInputElement>,
        item: string
    ) {
        const checked = e.target.checked

        if (checked) {
            setSelectedState((prev) => [...prev, item])
        } else {
            const filtered = selectedState.filter((i) => i !== item)
            setSelectedState(filtered)
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)

        if (value.length > 0) {
            setSelectFrom((prev) => {
                return state.filter((item) => {
                    return item.name.toLowerCase().includes(value.toLowerCase())
                })
            })
        } else {
            setSelectFrom(state)
        }
    }

    const removeSelectedItem = (item: string) => {
        setSelectedState((prev) => prev.filter((i) => i !== item))
    }

    return (
        <div className='relative grid gap-4'>
            <p className='text-[1.4rem] font-semibold capitalize'>{label?.replaceAll('_', ' ')}</p>
            <div
                className='relative grid max-w-[40rem] items-center'
                ref={containerRef}
            >
                <div
                    className={`border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] flex gap-4 items-center ${
                        textarea
                            ? 'flex-wrap'
                            : ' overflow-hidden overflow-x-scroll'
                    } ${
                        selectedState.length > 0
                            ? 'justify-between'
                            : 'justify-end'
                    }`}
                    // style={{
                    //     gridTemplateColumns:
                    //         'repeat(auto-fit, minmax(12rem, 1fr))',
                    // }}
                    onClick={toggleStateHandler}
                >
                    <p
                        className={`flex items-center gap-2 capitalize ${
                            textarea && 'flex-wrap'
                        }`}
                    >
                        {selectedState && selectedState.length > 0 ? (
                            selectedState.map((item, i) => (
                                <span
                                    className={`text-white  bg-color-blue-1 rounded-lg px-4 relative flex items-center h-[3.8rem] z-[2] pr-12 whitespace-nowrap`}
                                    key={i}
                                >
                                    {item}

                                    <IoMdClose
                                        className='absolute right-2 text-[1.4rem] cursor-pointer'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeSelectedItem(item)
                                        }}
                                    />
                                </span>
                            ))
                        ) : (
                            <span className='text-gray-500'>
                                {placeholder || ''}
                            </span>
                        )}
                    </p>
                    <div className='flex'>
                        {toggleStateMenu ? (
                            <GrUp className='text-[1.4rem] ' />
                        ) : (
                            <GrDown className='text-[1.4rem] ' />
                        )}
                    </div>
                </div>
                {toggleStateMenu ? (
                    <GrUp className='absolute right-4' />
                ) : (
                    <GrDown className='absolute right-4' />
                )}
                {toggleStateMenu && (
                    <div
                        className={`absolute top-[6rem] w-full left-0 border border-color-primary-light min-w-[12rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize max-h-[40rem] overflow-y-scroll`}
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
                                    className={`pl-16 w-full rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none`}
                                />
                            </div>
                        )}
                        {selectFrom.map((item, index) => (
                            <div
                                className='flex items-center pl-4 cursor-pointer hover:bg-color-grey capitalize'
                                key={index}
                            >
                                <input
                                    type='checkbox'
                                    className='cursor-pointer '
                                    name={`${index}`}
                                    id={`${index}`}
                                    disabled={item.disabled}
                                    checked={selectedState.includes(item.name)}
                                    onChange={(e) =>
                                        handleSelectedState(e, item.name)
                                    }
                                />

                                <label
                                    htmlFor={`${index}`}
                                    className={`text-[1.4rem] w-full hover:bg-color-grey border-b p-4 cursor-pointer ${
                                        item.disabled &&
                                        'opacity-50 cursor-not-allowed'
                                    } ${
                                        double ? 'grid' : 'flex justify-between'
                                    }`}
                                    key={index}
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
                                </label>
                            </div>
                        ))}
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

export default CompoundSelect
