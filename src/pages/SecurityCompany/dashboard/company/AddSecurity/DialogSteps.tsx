import { useContext } from 'react'
import { TbCopy } from 'react-icons/tb'
import { Select } from '../../../../../components/SuperAdmin/UI/Select'
import { CreateAddedSecurityGuardContext } from './AddSecurityGuard'

export const AddedSecuritySuccessfully = () => {
    const { handleClose, setAddedSecurityGuardStep } = useContext(
        CreateAddedSecurityGuardContext
    )

    return (
        <div className='w-full grid justify-items-center gap-4'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />

            <p>You have successfully added an Security Guard</p>

            <p
                className='font-bold text-[1.8rem] max-w-[40rem] text-center'
                style={{
                    fontFamily: 'Satoshi-Medium',
                }}
            >
                Do you want to open a bank account for this Security Guard?
            </p>

            <div className='flex w-full justify-center gap-8 mt-10'>
                <button
                    className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[20rem] font-bold'
                    onClick={() => handleClose()}
                >
                    Skip, Later
                </button>
                <button
                    className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[20rem]'
                    onClick={() => setAddedSecurityGuardStep('addBankAccount')}
                >
                    Open an Account
                </button>
            </div>
        </div>
    )
}

export const AddBankAccount = () => {
    const { selectedBank, setSelectedBank, setAddedSecurityGuardStep } =
        useContext(CreateAddedSecurityGuardContext)

    return (
        <div className='w-full grid justify-items-center gap-4'>
            <p
                className='border-b'
                style={{
                    fontFamily: 'Satoshi-Medium',
                }}
            >
                Open a bank Account
            </p>
            <div>
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
                className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg'
                onClick={() =>
                    setAddedSecurityGuardStep('openedBankAccountSuccessful')
                }
            >
                Generate Account Number
            </button>
        </div>
    )
}

export const OpenedBankAccountSuccessful = () => {
    const { handleClose, selectedBank, setAddedSecurityGuardStep } = useContext(
        CreateAddedSecurityGuardContext
    )

    const closeSteps = () => {
        handleClose()
        setAddedSecurityGuardStep('addedSecuritySuccessful')
    }

    return (
        <div className='w-full grid justify-items-center gap-4'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />

            <p>
                You have successfully opened an account number for this security
                guard
            </p>

            <div className='grid justify-center gap-4'>
                <h2
                    className='font-bold text-[2rem] text-center uppercase flex items-center'
                    style={{
                        fontFamily: 'Satoshi-Medium',
                    }}
                >
                    2094828922 <TbCopy /> - {selectedBank}
                </h2>
                <p
                    className='uppercase text-[2rem] font-bold'
                    style={{
                        fontFamily: 'Satoshi-Medium',
                    }}
                >
                    Ajayi Suileman Adeyemi
                </p>
            </div>
            <div className='flex w-full justify-center gap-8'>
                <button
                    className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[20rem]'
                    onClick={() => closeSteps()}
                >
                    Ok
                </button>
            </div>
        </div>
    )
}
