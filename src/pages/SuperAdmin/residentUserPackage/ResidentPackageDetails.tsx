import Input, { SelectProps } from '../../../components/UI/input/Input'

const residentPackageDetails = () => {
    // interface Inputs {
    //     package_name: string
    //     buyer_name: string
    //     amount: number
    //     frequency: string
    //     start_date: string
    //     end_date: string
    //     user_estate: string
    //     transaction_type: string
    //     phone_number: number
    //     status: string
    // }

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }

    const formInputs = [
        {
            label: 'package_name',
        },
        {
            label: 'buyer_name',
        },
        {
            label: 'amount',
            type: 'number',
        },
        {
            label: 'frequency',
        },
        {
            label: 'start_date',
        },
        {
            label: 'end_date',
        },
        {
            label: 'user_estate',
        },
        {
            label: 'transaction_type',
        },
        {
            label: 'phone_number',
            type: 'number',
        },
        {
            label: 'status',
        },
    ] satisfies FormInputs[]

    return (
        <div className=' p-8 bg-white h-[80vh] rounded-lg overflow-y-scroll'>
            <div className='flex justify-end'>
                <button className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'>
                    <img src='/icons/admins/delete.svg' alt='' />
                    <span className='text-red-600 text-[1.4rem] font-semibold '>
                        Deactivate
                    </span>
                </button>
            </div>
            <form>
                <>
                    {formInputs.map((input, idx) => {
                        const { label, type } = input
                        return (
                            <Input
                                disabled={true}
                                key={idx + label}
                                label={label}
                                type={type}
                            />
                        )
                    })}
                </>
            </form>
            <section className='grid text-[1.4rem] w-full py-10 gap-8 border-t mt-20'>
                <h4 className='text-[1.6rem] font-semibold'>
                    Beneficiary Details
                </h4>
                <div
                    className='items-center w-full grid'
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(20rem, 1fr))',
                    }}
                >
                    <div className=' grid items-center gap-2'>
                        <p className='font-semibold'>Resident User</p>
                        <div className='flex items-center gap-6'>
                            <img
                                src='/img/me.jpeg'
                                alt=''
                                className='w-[3rem] h-[3rem] object-cover object-top rounded-full'
                            />
                            <p className='font-semibold'>Jacintha Sage</p>
                        </div>
                    </div>
                    <div className='grid items-center gap-2'>
                        <p className='font-semibold'>Email</p>
                        <p className='text-gray-500'>jacintha@gmail.com</p>
                    </div>
                    <div className='grid items-center gap-2'>
                        <p className='font-semibold'>Phone Number</p>
                        <p className='text-gray-500'>09072847232</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default residentPackageDetails
