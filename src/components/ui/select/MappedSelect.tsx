import { FC, useState, ChangeEvent } from "react"
import { GrUp, GrDown } from "react-icons/gr"
import { IoMdClose } from "react-icons/io"

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

export default MappedSelect