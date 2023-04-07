import { useState } from 'react'
import { SelectProps } from '../../../components/UI/input/Input'

type Frequency = 'monthly' | 'weekly' | 'quarterly' | 'yearly'

const AddResidentUserPackage = () => {
    const frequencyState = [
        'monthly',
        'weekly',
        'quarterly',
        'yearly',
    ] satisfies Frequency[]

    const [togglePackageMenu, setTogglePackageMenu] = useState(false)

    const [toggleFrequencyMenu, setToggleFrequencyMenu] = useState(false)
    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
        'monthly'
    )

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }

    const formInputs = [
        {
            label: 'first_name',
        },
        {
            label: 'last_name',
        },
        {
            label: 'dob',
            type: 'date',
            name: 'date of birth',
        },
        {
            label: 'gender',
            type: 'select',
            selectProps: {
                state: frequencyState,
                selectedState: selectedFrequency,
                setSelectedState: setSelectedFrequency,
            },
        },
        {
            label: 'phone_number',
            type: 'number',
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ] satisfies FormInputs[]

    return (
        <div className=' p-8 bg-white h-[70vh] rounded-lg overflow-y-scroll'>
            <section
                className='grid max-w-[65vw] gap-16'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
                }}
            >
                <div className='relative self-end grid gap-4'>
                    <p className='text-[1.4rem] font-semibold'>
                        Name of Package
                    </p>
                    <p
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                        onClick={packageMenuToggler}
                    >
                        {selectedPackage}
                    </p>

                    {togglePackageMenu && (
                        <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                            {packages.map((item, index) => (
                                <p
                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                    key={index}
                                    onClick={() => handleSelectedPackage(item)}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <div className='relative self-end grid gap-4'>
                    <p className='text-[1.4rem] font-semibold'>Frequency</p>
                    <p
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] cursor-pointer'
                        onClick={frequencyMenuToggler}
                    >
                        {selectedFrequency}
                    </p>

                    {toggleFrequencyMenu && (
                        <div className='absolute top-[8rem]  left-0 border border-color-primary-light w-[24rem] bg-color-white rounded-lg grid gap-2 shadow z-20 capitalize'>
                            {frequency.map((item, index) => (
                                <p
                                    className='text-[1.4rem] hover:bg-color-grey border-b p-4 cursor-pointer'
                                    key={index}
                                    onClick={() =>
                                        handleSelectedFrequency(item)
                                    }
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='packageName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Amount
                    </label>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            type='text'
                            required
                            id='amount'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                        />
                    </div>
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='userName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Details
                    </label>
                    <input
                        type='text'
                        required
                        id='userName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='startDate'
                        className='text-[1.4rem] font-semibold'
                    >
                        Discount
                    </label>
                    <input
                        type='text'
                        required
                        id='discount'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                    />
                </div>
            </section>
        </div>
    )
}

export default AddResidentUserPackage
