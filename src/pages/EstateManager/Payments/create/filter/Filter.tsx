import { FC, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'
import HouseholdFilter from './HouseholdFilter'
import ResidentFilter from './ResidentFilter'

const Filter: FC = () => {
    type FilterKeys = 'Households' | 'Residents'

    const [filter, setFilter] = useState<FilterKeys | string | null>(
        'Households'
    )

    const filterKeys = ['Households', 'Residents'] satisfies FilterKeys[]

    const renderFilters = new Map([
        ['Households', <HouseholdFilter />],
        ['Residents', <ResidentFilter />],
    ]) satisfies Map<FilterKeys, JSX.Element>

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        dialogRef.current?.showModal()
    }

    return (
        <>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />
                        <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                            {' '}
                            <img
                                src='/icons/admins/modalSuccess.svg'
                                alt=''
                                className='animate__animated animate__pulse '
                                style={{
                                    animationIterationCount: 'infinite',
                                }}
                            />
                            <p className='text-[1.6rem]'>
                                You have successfully added a{' '}
                                {filter &&
                                    filter.substring(0, filter.length - 1)}
                            </p>
                            <div className='flex w-full justify -center gap-8'>
                                <button
                                    className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    View details
                                </button>
                                <button
                                    className=' bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                    onClick={() => handleClose()}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </dialog>
            <main className='grid gap-9'>
                <p className='font-Satoshi-Medium text-[2rem]'>
                    {' '}
                    Filter Selection{' '}
                </p>
                <div className='flex items-center justify-between'>
                    <div className='w-[40rem]'>
                        <Select
                            state={filterKeys}
                            selectedState={filter}
                            setSelectedState={setFilter}
                            placeholder='Households'
                        />
                    </div>
                    {filter === 'Residents' && (
                        <p className='flex items-center gap-2'>
                            <span>
                                NB: All alphas are denoted with the icon{' '}
                            </span>
                            <img src='/img/alpha.svg' alt='' />
                        </p>
                    )}
                </div>

                {renderFilters.get(filter as FilterKeys)}

                <button
                    className='bg-color-blue-1 text-white py-4 px-8 rounded-lg mr-auto'
                    onClick={() => handleOpen()}
                >
                    Create Payment
                </button>
            </main>
        </>
    )
}

export default Filter
