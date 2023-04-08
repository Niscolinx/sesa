import { useRef, useState } from 'react'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import useAxios from '../../../components/hooks/useAxios'
import { useMutation } from 'react-query'
import { toast, ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'

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

    const params = useParams()

    const packageId = params.id?.replace(':', '')

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        selectProps?: SelectProps
    }
    const axiosInstance = useAxios()

    const postDeactivate = () => {
        return axiosInstance({
            url: '/admin/resident/user/package/changestatus',
            method: 'post',
            data: { id: packageId },
        })
    }

    const {
        mutate: deactivate_package_mutation,
        isLoading: deactivate_package_loading,
    } = useMutation(postDeactivate, {
        onSuccess: () => {
            closeDialog()

            toast('Package deactivated successfully', {
                type: 'success',
                className: 'bg-green-100 text-green-600 text-[1.4rem]',
            })
        },
    }) as any

    const fetchEstateManagers = () => {
        return axiosInstance({
            // url: '/admin/get/all',
            url: '/manager/get/all',
        })
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

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img
                            src='/icons/admins/modalWarning.svg'
                            alt=''
                            className='animate__animated animate__pulse '
                            style={{
                                animationIterationCount: 'infinite',
                            }}
                        />
                        <p>Are you sure you want to deactivate this Package?</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                onClick={closeDialog}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-red-500 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem] capitalize'
                                onClick={() => deactivate_package_mutation()}
                            >
                                {deactivate_package_loading
                                    ? 'Loading...'
                                    : 'deactivate'}
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>

            <div className=' p-8 bg-white h-[80vh] rounded-lg overflow-y-scroll'>
                <div className='flex justify-end'>
                    <button className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'>
                        <img src='/icons/admins/delete.svg' alt='' />
                        <span className='text-red-600 text-[1.4rem] font-semibold '>
                            Deactivate
                        </span>
                    </button>
                </div>
                <div
                    className='grid max-w-[84rem] gap-16 mt-12 '
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    {formInputs.map((input, idx) => {
                        const { label, type } = input
                        return (
                            <Input
                                disabled={true}
                                key={idx + label}
                                label={label}
                                value={'sdfsf'}
                                type={type}
                            />
                        )
                    })}
                </div>
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
        </>
    )
}

export default residentPackageDetails
