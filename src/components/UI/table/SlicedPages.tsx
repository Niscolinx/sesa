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
        'phone',
        'gender',
        'name',
        'created_at',
        'status',
        'image',
    ]

    const TableItem = ({ user, id }: any) => {
        const details:any = []
        Object.entries(user).map(
            ([key, value]: any, idx: number) => {
                console.log({key, value})
                return dataToDisplay.includes(key) && details.push({
                    key,
                    value
                })
            }
                
        )

        console.log({details})
        return (
            details?.map(({key, value}: any, idx: number) => {
              
                    return (
                        <div className='flex items-center gap-4  '>
                            <input type='checkbox' className='cursor-pointer' />
                            <div className='flex items-center gap-2'>
                                {key === 'image' && (
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
                                )}
                                <p className='min-w-[30rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                                    {value}
                                </p>
                            </div>
                        </div>
                    )
                
            }
        ))

        
        // if (key === 'created_at') {
        //     return (
        //         <p>
        //             {new Date(value).toLocaleDateString().replace(/\//g, '-')}
        //         </p>
        //     )
        // }

        // if (key === 'status') {
        //     return (
        //         <p>
        //             {value === 'active' ? (
        //                 <span className='text-green-600'>{status}</span>
        //             ) : (
        //                 <span className='text-red-500'>{status}</span>
        //             )}
        //         </p>
        //     )
        // } else {
        //     return <p>{value}</p>
        // }
    }

    return (
        <>
            {page.map(({ id, user }: any) => (
                <div
                    className={`grid justify-between border-b grid-cols-${
                        dataToDisplay.length + 1
                    } items-center gap-8 text-[1.6rem] py-4 table__ellipsis`}
                    key={`${id}`}
                >
                    <TableItem id={id} user={user} key={id} />
                </div>
            ))}
        </>
    )
}

export default SlicedPages
