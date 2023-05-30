import { FC } from 'react'
import { IMultipleSelect } from './MultipleSelect'

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
