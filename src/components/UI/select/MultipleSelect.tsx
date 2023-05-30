import React, {
    ChangeEvent,
    FC,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { GrUp, GrDown } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'

export interface IMultipleSelect {
    selectFrom: Array<string>
    selected: Array<string>
    textarea?: boolean
    id?: number
    absolute?: boolean
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
    label: string
    selectFormErrors?: Record<string, string> | null
    placeholder?: string
}

const MultipleSelect: FC<IMultipleSelect> = ({
    selectFrom,
    selected,
    setSelected,
    textarea = false,
    selectFormErrors,
    label,
    absolute = true,
    placeholder,
}) => {
    const [toggleStateMenu, setToggleStateMenu] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedFrom, setSelectedFrom] = useState(selectFrom)

    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handler = (e: any) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
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
                    className='cursor-pointer '
                    name={item + index}
                    id={item + index}
                    value={item}
                    checked={selected.includes(item)}
                    onChange={(e) => handleSelectedState(e, item)}
                />
                <label
                    htmlFor={item + index}
                    className={`text-[1.4rem] p-4 cursor-pointer w-full`}
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
            <div
                className='relative items-center max-w-[40rem] grid'
                ref={containerRef}
            >
                <div
                    className={`border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer min-h-[5rem] flex gap-4 items-center ${
                        textarea
                            ? 'flex-wrap'
                            : ' overflow-hidden overflow-x-scroll'
                    } ${
                        selected.length > 0 ? 'justify-between' : 'justify-end'
                    }`}
                    // style={{
                    //     gridTemplateColumns:
                    //         'repeat(auto-fit, minmax(12rem, 1fr))',
                    // }}
                    onClick={toggleStateHandler}
                >
                    <p
                        className={`flex items-center gap-2 ${
                            textarea && 'flex-wrap'
                        }`}
                    >
                        {selected && selected.length > 0 ? (
                            selected.map((item, i) => (
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
                {toggleStateMenu && (
                    <div
                        className={`${
                            absolute && 'absolute top-[6rem] left-0'
                        } border border-color-primary-light bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize max-h-[20rem] overflow-y-scroll w-full`}
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
                                className='pl-16 rounded-lg border border-color-blue-light py-4 px-8 outline-none appearance-none w-full'
                            />
                        </div>

                        {memoizedList}
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

export default MultipleSelect
