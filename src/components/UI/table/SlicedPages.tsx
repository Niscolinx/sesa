import { Dispatch, FC } from 'react'
import TableDropDown from './TableDropDown'
import { SetStateAction } from 'jotai'
import { ToggleDropDown } from './TableData'

interface SlicedPages {
    pages: any[][] | null
    index: number
    toggleDropDown: ToggleDropDown
    setToggleDropDown: Dispatch<SetStateAction<ToggleDropDown>>
}

const SlicedPages: FC<SlicedPages> = ({
    pages,
    index,
    toggleDropDown,
    setToggleDropDown,
}) => {
    console.log(pages)

    if (!pages || !pages.length) {
        return null
    }
    const page = pages[index]

    const dataToDisplay = [
        'name',
        'gender',
        'phone',
        'created_at',
        'image',
        'status',
    ]

    const TableItem = ({ user, id }: any) => {
        const details: any = []
        Object.entries(user).map(([key, value]: any, idx: number) => {
            if (dataToDisplay.includes(key)) {
                if (key === dataToDisplay[0]) {
                    console.log({idx, key, value})
                    details.push({
                        key,
                        value: {
                            name: value,
                            image: null,
                        },
                    })
                }

                if (key === 'image') {
                    details[0] = {
                        key: dataToDisplay[0],
                        value: {
                            name: null,
                            image: value,
                        },
                    }
                } else {
                    details.push({
                        key,
                        value,
                    })
                }
            }
        })

        console.log({details})

        const sorted: any = dataToDisplay.map(
            (item: string, i: number) =>
                details.filter((detail: any) => detail.key === item && detail)

            //console.log({isFound})
        )

        return sorted?.flat().map(({ key, value }: any, idx: number) => {
            console.log({key, value})
            if (key === 'actions') {
                return (
                    <TableDropDown
                        toggleDropDown={toggleDropDown}
                        setToggleDropDown={setToggleDropDown}
                        id={id}
                    />
                )
            }
            if (idx === 0) {
                return (
                    <div className='flex items-center gap-4  '>
                        <input type='checkbox' className='cursor-pointer' />
                        <div className='flex items-center gap-2'>
                            
                                <>
                                    {value && (
                                        <figure className='w-[3.5rem] h-[3.5rem]'>
                                            <img
                                                src={value}
                                                alt=''
                                                className='w-full h-full rounded-full object-cover'
                                            />
                                        </figure>
                                    )}
                                </>
                          
                            <p className=''>{value}</p>
                        </div>
                    </div>
                )
            }
            if (key === 'created_at') {
                return (
                    <p>
                        {new Date(value)
                            .toLocaleDateString()
                            .replace(/\//g, '-')}
                    </p>
                )
            }
            if (key === 'status') {
                return (
                    <p>
                        {value === 'active' ? (
                            <span className='text-green-600'>{value}</span>
                        ) : (
                            <span className='text-red-500'>{value}</span>
                        )}
                    </p>
                )
            }
            //  else {
            //     return <p>{value}</p>
            // }
        })
    }

    return (
        <>
            {page.map(({ id, user }: any) => (
                <div
                    className={`grid justify-between border-b grid-cols-${dataToDisplay.length} items-center gap-8 text-[1.6rem] py-4 table__ellipsis`}
                    key={`${id}`}
                >
                    <TableItem id={id} user={user} key={id} />
                </div>
            ))}
        </>
    )
}

export default SlicedPages
