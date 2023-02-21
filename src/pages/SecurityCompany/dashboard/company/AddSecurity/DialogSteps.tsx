import { useContext } from 'react'
import { CreateAddedSecurityGuardContext } from './AddSecurityGuard'

export const AddedSecuritySuccessfully = () => {
    const { handleClose, setAddedSecurityGuardStep} = useContext(CreateAddedSecurityGuardContext)

    return (
        <>
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

            <div className='flex w-full justify-center gap-8'>
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
        </>
    )
}
