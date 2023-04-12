import { Dispatch, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Actions, useTableContext } from './Table'
import { SetStateAction } from 'jotai'
import { ToggleDropDown } from './TableData'

interface TableDropDown {
    id: number
    toggleDropDown: ToggleDropDown
    setToggleDropDown: Dispatch<SetStateAction<ToggleDropDown>>
    actions: Actions[]
}

const TableDropDown = ({
    id,
    toggleDropDown,
    setToggleDropDown,
    actions,
}: TableDropDown) => {
    const { setFetchedId, setIsDialogOpen, view_page_url, isCategory } =
        useTableContext()

    const navigate = useNavigate()

    const handleSelectedAction = (item: Actions, itemId: number) => {
        setToggleDropDown(() => {
            return {
                isDropDownOpen: false,
                index: null,
            }
        })

        setFetchedId(itemId)

        if (item === 'view details') {
            navigate(`${view_page_url}:${itemId}`)
        }

        if (item === 'deactivate') {
            console.log('deactivate')
            setIsDialogOpen({
                isOpen: true,
                type: 'deactivate',
            })
        }

        if (item === 'delete') {
            console.log('delete')
            setIsDialogOpen({
                isOpen: true,
                type: 'delete',
            })
        }
    }

    const { isDropDownOpen, index } = toggleDropDown

    return (
        <div className='relative'>
            <label
                className='font-semibold capitalize cursor-pointer flex items-center gap-2 relative z-10'
                htmlFor={id.toString()}
                onClick={() =>
                    setToggleDropDown((prev) => ({
                        isDropDownOpen: !prev.isDropDownOpen,
                        index: id,
                    }))
                }
            >
                <span className='text-color-primary'>
                    <img src='/icons/admins/threeDots.svg' alt='' />
                </span>
            </label>
            <input
                type='radio'
                name='dropdown'
                className='hidden'
                id={id.toString()}
                onChange={(e) =>
                    setToggleDropDown(() => ({
                        isDropDownOpen: e.target.checked,
                        index: id,
                    }))
                }
            />

            {isDropDownOpen && index === id && (
                <div className='absolute top-0 translate-x-[4rem] border border-color-primary-light w-[10rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                    {actions.map((item, i) => (
                        <p
                            className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                            key={i}
                            onClick={() => handleSelectedAction(item, id)}
                        >
                            {['deactivate', 'delete'].includes(item) ? (
                                <span className='text-red-600'>{item}</span>
                            ) : item === 'activate' ? (
                                <span className='text-green-600'>{item}</span>
                            ) : (
                                <span>{item}</span>
                            )}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TableDropDown
