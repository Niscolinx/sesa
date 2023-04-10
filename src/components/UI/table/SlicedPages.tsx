import { Dispatch, FC, SetStateAction } from 'react'
import TableDropDown from './TableDropDown'
import { ToggleDropDown } from './TableData'
import { Actions, useTableContext } from './Table'

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
    const { data_to_display, nested, THeader, actions } = useTableContext()

    if (!pages || !pages.length) {
        return null
    }

    const page = pages[index]

    const TableItem = ({ data }: any) => {
        const { id, ...restData } = data

        const details: Map<any, any> = new Map<
            string,
            string | { name: string; image: string | null }
        >()

        const dataToLoop = nested ? restData.user : restData

        Object.entries(dataToLoop).map(([key, value]: any, idx: number) => {
            if (data_to_display.includes(key)) {
                if (key === data_to_display[0]) {
                    return details.set(key, {
                        name: value,
                        image: null,
                    })
                }

                if (key === 'image') {
                    const firstKey = details.keys().next().value
                    const firstValue = details.get(firstKey)

                    return details.set(firstKey, {
                        name: firstValue.name,
                        image: value,
                    })
                } else {
                    return details.set(key, value)
                }
            }
        })

        const sorted: any[] = []
        let status
        data_to_display.map((item: string, i: number) => {
            if (item)
                for (const [key, value] of details.entries()) {
                    if (key === item) {
                        sorted.push({
                            key,
                            value,
                        })

                        if (item === 'status') {
                            sorted.push({
                                key: 'actions',
                                value,
                            })
                        }

                        return
                    }
                }
        })

        return (
            <>
                {sorted.map(({ key, value }: any, idx: number) => {
                    if (key === 'actions') {
                        let updatedActions: Actions[] = ['view details']

                        value === '0'
                            ? (updatedActions = [...updatedActions, 'activate'])
                            : (updatedActions = [...updatedActions, 'deactivate'])

                        updatedActions = [...updatedActions, ...actions]
                        return (
                            <TableDropDown
                                toggleDropDown={toggleDropDown}
                                setToggleDropDown={setToggleDropDown}
                                id={id}
                                actions={updatedActions}
                                key={idx}
                            />
                        )
                    }
                    if (idx === 0) {
                        return (
                            <div className='flex items-center gap-4 ' key={idx}>
                                <input
                                    type='checkbox'
                                    className='cursor-pointer'
                                />
                                <div className='flex items-center gap-2'>
                                    {value.image && (
                                        <figure className='w-[3.5rem] h-[3.5rem]'>
                                            <img
                                                src={value.image}
                                                alt=''
                                                className='w-full h-full rounded-full object-cover'
                                            />
                                        </figure>
                                    )}

                                    <p className=''>{value.name}</p>
                                </div>
                            </div>
                        )
                    }
                    if (key === 'created_at') {
                        return (
                            <p key={idx}>
                                {new Date(value)
                                    .toLocaleDateString()
                                    .replace(/\//g, '-')}
                            </p>
                        )
                    }
                    if (key === 'status') {
                        return (
                            <p key={idx}>
                                {value === '1' ? (
                                    <span className='text-green-600'>
                                        active
                                    </span>
                                ) : (
                                    <span className='text-red-500'>
                                        inactive
                                    </span>
                                )}
                            </p>
                        )
                    } else {
                        return <p key={idx}>{value}</p>
                    }
                })}
            </>
        )
    }

    return (
        <>
            {page.map((data, idx) => (
                <div
                    className={`grid justify-between border-b grid-cols-${THeader.length} items-center gap-8 text-[1.6rem] capitalize py-4 table__ellipsis`}
                    key={`${idx}`}
                >
                    <TableItem data={data} />
                </div>
            ))}
        </>
    )
}

export default SlicedPages
