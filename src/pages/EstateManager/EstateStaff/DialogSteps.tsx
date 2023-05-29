import { useContext } from 'react'
import { TbCopy } from 'react-icons/tb'
import { Select } from '../../../components/ui/Select'


export const AddBankAccount = () => {
    const { selectedBank, setSelectedBank, setAddedEstateStaffStep } =
        useContext(context)


    

    return (
        <div className='w-[40rem] grid justify-items-center gap-10'>
            <p
                className='border-b w-full text-left pb-2'
                style={{
                    fontFamily: 'Satoshi-Medium',
                }}
            >
                Open a bank Account
            </p>
            <div className='w-full'>
                <Select
                    label='Select Bank'
                    state={[
                        'FCMB Easy Wallet',
                        'FCMB Account',
                        'Parallax Bank Account',
                    ]}
                    selectedState={selectedBank}
                    setSelectedState={setSelectedBank}
                />
            </div>

            <button
                className='bg-[#0556E5] py-6 px-12 w-full text-white text-[1.6rem] rounded-lg mt-10'
                onClick={() =>
                    setAddedEstateStaffStep('openedBankAccountSuccessful')
                }
            >
                Generate Account Number
            </button>
        </div>
    )
}

export const OpenedBankAccountSuccessful = ({
    context,
}: {
    context: React.Context<AddedEstateStaffContext>
}) => {
    const { handleClose, selectedBank, setAddedEstateStaffStep } =
        useContext(context)

    const closeSteps = () => {
        handleClose()
        setAddedEstateStaffStep('addedEstateStaffSuccessful')
    }

    return (
        <div className='w-full grid justify-items-center gap-4'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />

            <p>You have successfully opened an account number for this staff</p>

            <div className='grid justify-items-center gap-4'>
                <h2
                    className='font-Satoshi-Medium text-[2rem] text-center uppercase flex items-center gap-4'
                    style={{
                        fontFamily: 'Satoshi-Medium',
                    }}
                >
                    2094828922 <TbCopy className='text-[#0556E5]' /> -{' '}
                    {selectedBank}
                </h2>
                <p
                    className='uppercase text-[2rem] font-Satoshi-Medium'
                    style={{
                        fontFamily: 'Satoshi-Medium',
                    }}
                >
                    Ajayi Suileman Adeyemi
                </p>
            </div>
            <div className='flex justify-center gap-8 w-full mt-10'>
                <button
                    className='bg-[#0556E5] py-4 px-12 text-white text-[1.6rem] rounded-lg w-[20rem]'
                    onClick={() => closeSteps()}
                >
                    Ok
                </button>
            </div>
        </div>
    )
}
