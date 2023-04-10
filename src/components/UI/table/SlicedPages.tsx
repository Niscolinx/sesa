import { Dispatch, FC } from 'react'
import TableDropDown from './TableDropDown'
import { SetStateAction } from 'jotai'
import { ToggleDropDown } from './TableData'
import { useTableContext } from './Table'

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
    const { data_to_display } = useTableContext()

    if (!pages || !pages.length) {
        return null
    }
    const page = pages[index]

    const TableItem = ({ user, id }: any) => {
        const details: Map<any, any> = new Map<
            string,
            string | { name: string; image: string | null }
        >()
        Object.entries(user).map(([key, value]: any, idx: number) => {
            if (data_to_display.includes(key)) {
                if (key === data_to_display[0]) {
                    details.set(key, {
                        name: value,
                        image: null,
                    })
                }

                if (key === 'image') {
                    const firstKey = details.keys().next().value
                    const firstValue = details.get(firstKey)
                    details.set(firstKey, {
                        firstValue,
                        image: value,
                    })
                } else {
                    details.set(key, value)
                }
            }
        })

        const sorted = []
        data_to_display.map((item: string, i: number) => {
            if (item)
                for (const [key, value] of details.entries()) {
                    if (key === item) {
                        return sorted.push({
                            key,
                            value,
                        })
                    }
                }
        })

        sorted.push({
            key: 'actions',
            value: null,
        })

        return (
            <>
                {sorted.map(({ key, value }: any, idx: number) => {
                    console.log({ key, value })

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
                        console.log({ key }, value.image, value.firstValue)
                        return (
                            <div className='flex items-center gap-4  '>
                                <input
                                    type='checkbox'
                                    className='cursor-pointer'
                                />
                                <div className='flex items-center gap-2'>
                                    <>
                                        {value.image && (
                                            <figure className='w-[3.5rem] h-[3.5rem]'>
                                                <img
                                                    src={value.image}
                                                    alt=''
                                                    className='w-full h-full rounded-full object-cover'
                                                />
                                            </figure>
                                        )}
                                    </>

                                    <p className=''>{value.firstValue}</p>
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
                                    <span className='text-green-600'>
                                        {value}
                                    </span>
                                ) : (
                                    <span className='text-red-500'>
                                        {value}
                                    </span>
                                )}
                            </p>
                        )
                    } else {
                        return <p>{value}</p>
                    }
                })}
            </>
        )
    }
    return (
        <>
            {page?.map(({ id, user }: any) => (
                <div
                    className={`grid justify-between border-b grid-cols-${data_to_display.length} items-center gap-8 text-[1.6rem] py-4 table__ellipsis`}
                    key={`${id}`}
                >
                    <TableItem id={id} user={user} key={id} />
                </div>
            ))}
        </>
    )
}

export default SlicedPages
