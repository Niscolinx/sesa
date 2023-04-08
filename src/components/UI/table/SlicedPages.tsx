import { Dispatch, FC } from 'react'
import TableDropDown from './TableDropDown'
import { SetStateAction } from 'jotai'
import { ToggleDropDown } from './TableData'

interface SlicedPages {
    pages: any[][] | null
    index: number
    toggleDropDown: ToggleDropDown,
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

    const TableItem = ({ key, value }: any) => {
        
        return (
            <>
                <div className='flex items-center gap-4  '>
                    <input type='checkbox' className='cursor-pointer' />

                    <div className='flex items-center gap-2'>
                        {imgUrl && (
                            <img
                                src={imgUrl}
                                alt=''
                                className='w-[3.5rem] h-[h-3.5rem] rounded-full object-cover'
                            />
                        )}

                        <p className='min-w-[30rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                            {name}
                        </p>
                    </div>
                </div>
                <p>{gender}</p>
                <p>{phone}</p>
                <p>
                    {new Date(created_at)
                        .toLocaleDateString()
                        .replace(/\//g, '-')}
                </p>

                <p>
                    {status === 'Active' ? (
                        <span className='text-green-600'>{status}</span>
                    ) : (
                        <span className='text-red-500'>{status}</span>
                    )}
                </p>
            </>
        )
    }

    const dataToDisplay = [
        'phone',
        'gender',
        'name',
        'created_at',
        'status',
        'image',
    ]
    return (
        <>
            {page.map(({ id, user }: any) =>
                Object.entries(user).map(([key, value]: any, idx: number) => (
                    <div
                        className='grid justify-between border-b grid-cols-6 items-center gap-8 text-[1.6rem] py-4 table__ellipsis'
                        key={`${id}-${idx}`}
                    >
                        dataToDisplay.includes(key) &&{' '}
                        <TableItem value={value} key={key} index={idx} />
                        <TableDropDown
                            toggleDropDown={toggleDropDown}
                            setToggleDropDown={setToggleDropDown}
                            id={id}
                        />
                    </div>
                ))
            )}
        </>
    )
}

export default SlicedPages
