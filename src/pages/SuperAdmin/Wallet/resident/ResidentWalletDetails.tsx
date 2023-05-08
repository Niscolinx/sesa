import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import useFetchData from '../../../../utils/useFetchData'

const ResidentWalletDetails = () => {
    interface Inputs {
        type: string
        transaction_date: string
        transaction_time: string
        category: string
        transaction_source: string
        amount: string
        tran_id: string
        description: string
    }

    type FormInputs = {
        label: keyof Inputs
        type?: string
        name?: string
        disabled?: string
    }

    const params = useParams()

    const wallet_id = params.id?.replace(':', '')

    if (!wallet_id) {
        toast('Wallet not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }

    const formInputs = [
        {
            label: 'type',
            name: 'transaction_type',
        },

        {
            label: 'transaction_date',
        },
        {
            label: 'transaction_time',
        },
        {
            label: 'category',
            name: 'transaction_category',
        },
        {
            label: 'transaction_source',
        },
        {
            label: 'amount',
            name: 'transaction_amount',
        },
        {
            label: 'tran_id',
            name: 'transaction_ID',
        },
        {
            label: 'description',
            name: 'narration',
        },
    ] satisfies FormInputs[]

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
    } = useForm<Inputs>()

    const { isLoading, data } = useFetchData({
        url: `admin/get/wallet/transaction/details/resident/${wallet_id}`,
        name: `resident_wallet_detail_${wallet_id}`,
    })

    useEffect(() => {
        if (data) {
            const {
                type,
                transaction_date,
                transaction_time,
                category,
                transaction_source,
                amount,
                tran_id,
                description,
            } = data
            const first_name = name.split(' ')[0]
            const last_name = name.split(' ')[1]

            reset({
                first_name,
                last_name,
                dob,
                email_address: email,
                phone_number: parseInt(phone),
            })
        }
    }, [data])

    if (isLoading) {
        return <p>loading...</p>
    }

    return (
        <div className=' p-8 bg-white min-h-[60vh] rounded-lg overflow-y-scroll'>
            <section
                className='grid max-w-[65vw] gap-16'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
                }}
            >
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='residentName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Type
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='residentName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'02-May-2022'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='withdrawalTime'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Time
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='withdrawalTime'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'3:00pm'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='status'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Type
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='status'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-green-500 disabled:cursor-not-allowed'
                        value={'Credit'}
                    />
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Category
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Source
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase'}
                    />
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Amount
                    </label>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            disabled
                            type='text'
                            required
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                    </div>
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction ID
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={1004238232}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Amount
                    </label>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            disabled
                            type='text'
                            required
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                    </div>
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Narration
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase for 6000'}
                    />
                </div>
            </section>
        </div>
    )
}

export default ResidentWalletDetails
