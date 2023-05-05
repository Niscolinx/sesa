import React, { useRef, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/bs'
import useAxios from '../../hooks/useAxios'
import { useForm } from 'react-hook-form'
import { IoMdClose, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useMutation } from 'react-query'
import { Select } from '../../SuperAdmin/UI/Select'
import Input from '../input/Input'
import { toast, ToastContainer } from 'react-toastify'

function ValidateKY() {
    interface ValidationTypeInput {
        validation_content: string
    }
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const axiosInstance = useAxios()
    const [isValidated, setIsValidated] = useState(false)
    const [iskyg, setIskyg] = useState(false)

    const toggleIskyg = () => setIskyg(!iskyg)

    const [validationType, setValidationType] = useState<string>('Phone Number')

    const {
        register: validation_register,
        handleSubmit: validation_handleSubmit,
        reset: validation_reset,
        formState: { errors: validation_formErrors },
    } = useForm<ValidationTypeInput>()

    const postValidationType = (data: ValidationTypeInput) => {
        return axiosInstance({
            url: '/admin/artisan',
            method: 'post',
            data,
        })
    }
    const {
        mutate: validationType_mutation,
        isLoading: validationType_isloading,
    } = useMutation(postValidationType, {
        onError: (err: any) => {
            toast('Failed to Validate', {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem]',
            })
        },
    })

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = () => {
        dialogRef.current?.showModal()
    }
    const onSubmitValidation = validation_handleSubmit((data) => {
        validationType_mutation(data)
    })

    const validationInput = [
        {
            name: 'phone number',
            label: 'validation_content',
            type: 'number',
        },
        {
            name: 'name',
            label: 'validation_content',
        },
    ]

    return (
        <>
            <ToastContainer />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        <form
                            className='grid gap-12'
                            onSubmit={onSubmitValidation}
                        >
                            <h3
                                className='text-[2rem] font-Satoshi-Medium border-b '
                                style={{
                                    fontFamily: 'Satoshi-Medium',
                                }}
                            >
                                Know Your Artisan (KYA)
                            </h3>

                            <Select
                                state={['Phone Number', 'Name']}
                                label='Validation Option'
                                selectedState={validationType}
                                setSelectedState={setValidationType}
                            />
                            <p
                                className='text-[#043FA7] flex items-center gap-2'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                What is KYA <BsQuestionCircle />
                            </p>

                            <div className='border-t pt-10'>
                                {validationInput
                                    .filter(
                                        ({ name }) =>
                                            name.toLowerCase() ===
                                            validationType.toLowerCase()
                                    )
                                    .map(({ label, type, name }) => {
                                        return (
                                            <Input
                                                label={label}
                                                key={label}
                                                name={name}
                                                register={validation_register}
                                                formErrors={
                                                    validation_formErrors
                                                }
                                                type={type}
                                            />
                                        )
                                    })}
                            </div>

                            <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                {validationType_isloading
                                    ? 'Loading...'
                                    : 'Validate'}
                            </button>
                        </form>
                    </div>
                </section>
            </dialog>
            <div className='grid max-w-[40rem]'>
                <div className='flex items-center justify-between'>
                    <p className='text-[2rem] font-Satoshi-Medium flex items-center gap-2'>
                        KYG{' '}
                        <span className='text-[#043FA7]'>
                            <BsQuestionCircle />
                        </span>
                    </p>
                    <div onClick={toggleIskyg} className='cursor-pointer'>
                        {iskyg ? (
                            <img src='/icons/admins/switchOn.svg' alt='' />
                        ) : (
                            <img src='/icons/admins/switchOff.svg' alt='' />
                        )}
                    </div>
                </div>

                {isValidated ? (
                    <div className='flex gap-8 text-[1.6rem]'>
                        <p className='text-[#098DFF] cursor-pointer flex items-center font-Satoshi-Medium'>
                            KYG Validated <IoMdCheckmarkCircleOutline />
                        </p>
                        <button
                            className='text-green-600 flex items-center gap-2'
                            style={{
                                fontFamily: 'Satoshi-Medium',
                            }}
                            // onClick={() => openValidateDialog()}
                        >
                            View Results <BsQuestionCircle />
                        </button>
                    </div>
                ) : (
                    <>
                        {iskyg && (
                            <div className='flex justify-between text-[1.6rem]'>
                                <p
                                    className='text-[#098DFF] cursor-pointer'
                                    onClick={handleOpen}
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    Click here to validate this person
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default ValidateKY
