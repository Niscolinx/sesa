import React, { FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'
import { ToastContainer } from 'react-toastify'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import Input, { SelectProps } from '../../../../components/UI/input/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import ImageInput from '../../../../components/UI/input/ImageInput'
import useAxios from '../../../../components/hooks/useAxios'

type DialogType = 'validate' | 'add-Artisan'

const AddArtisan = () => {
    interface Inputs {
        first_name: string
        last_name: string
        phone_number: string
        email_address: string
        address_line_1: string
        address_line_2: string
        business_name: string
    }

    interface ValidationTypeInput {
        phone_number: string
        name: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        value?: string
        required?: boolean
        selectProps?: SelectProps
    }

    const axiosInstance = useAxios()

    const categories = ['Category1', 'Category2', 'Category3']
    const region = ['Lagos', 'FCT']
    const gender = ['Male', 'Female']

    const [isAddArtisan, setIsAddArtisan] = useState(true)
    const [validationType, setValidationType] = useState<string>('Phone Number')
    const [selectFormErrors, setSelectFormErrors] = useState<{
        [key: string]: string
    } | null>(null)

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedGender, setSelectedGender] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedRegions, setSelectedRegions] = useState<string[]>([])

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const {
        register: validation_register,
        handleSubmit: validation_handleSubmit,
        formState: { errors: validation_formErrors },
    } = useForm<ValidationTypeInput>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postRequest = (data: Inputs) => {
        return axiosInstance({
            url: '/admin/artisan',
            method: 'post',
            data,

            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
    const { mutate, isLoading } = useMutation(postRequest, {
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
    }) as any

    const postValidationType = (data: Inputs) => {
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
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
    }) as any

    const onSubmitValidation = validation_handleSubmit((data) => {})

    const onSubmit = handleSubmit((data) => {
        let isError = false
        if (selectedCategories.length < 1) {
            isError = true
            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    'Artisan Categories': 'Field cannot be empty',
                }
            })
        }
        if (selectedGender.length < 1) {
            isError = true

            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    Gender: 'Field cannot be empty',
                }
            })
        }
        if (selectedRegions.length < 1) {
            isError = true

            setSelectFormErrors((prev) => {
                return {
                    ...prev,
                    State: 'Field cannot be empty',
                }
            })
        }

        if (isError) {
            console.log({ isError }, 'error')
            return
        }
        setSelectFormErrors(null)
        handleClose()

        openValidateDialog()

        const updatedData = {
            ...data,
            estate_id: 4,
            image: imageFile,
        }

        mutate(updatedData)
    })

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const validateDialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const closeValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.close()
        }
    }

    const openValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.showModal()
        }
    }
    const handleOpen = (modalState: DialogType) => {
        if (modalState === 'validate') {
            setIsAddArtisan(true)
        } else {
            setIsAddArtisan(false)
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const confirmAddArtisan = () => {
        handleClose()
    }

 

    const formInputs = [
        {
            label: 'first_name',
        },
        {
            label: 'last_name',
        },
        {
            label: 'Gender',
            type: 'select',
            selectProps: {
                state: gender,
                selectedState: selectedGender,
                setSelectedState: setSelectedGender,
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
        {
            label: 'address_line_1',
        },
        {
            label: 'address_line_2',
        },
        {
            label: 'State',
            type: 'select',
            selectProps: {
                state: region,
                selectedState: selectedRegions,
                setSelectedState: setSelectedRegions,
            },
        },
        {
            label: 'Artisan Categories',
            type: 'select',
            selectProps: {
                isMulti: true,
                state: categories,
                selectedState: selectedCategories,
                setSelectedState: setSelectedCategories,
            },
        },
        {
            label: 'business_name',
            required: false,
        },
    ] satisfies FormInputs[]

    const validationResult = [
        {
            label: 'Validation Option',
            value: ' Phone Number | (+234) 813238432',
        },
        {
            label: 'Full Name',
            value: 'Michael Okoro',
        },
        {
            label: 'date of birth',
            value: '15 May, 1998',
        },
        {
            label: 'Phone number',
            value: '+23482309232',
        },
        {
            label: 'gender',
            value: 'Male',
        },
    ] satisfies FormInputs[]

    const validationInput = [
        {
            name: 'phone number',
            label: 'phone_number',
            type: 'number',
        },
        {
            name: 'name',
            label: 'name',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={validateDialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[90rem] min-h-[30rem] p-10 text-[1.6rem] relative gap-20'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => closeValidateDialog()}
                        />

                        <div className='relative h-[14rem] bg-blue-600 w-full mt-10 rounded-lg'>
                            <img
                                src='/img/me.jpeg'
                                alt=''
                                className='w-[10rem] h-[10rem] border rounded-full border-green-600 object-cover absolute bottom-[-6rem] left-10 object-top'
                            />
                        </div>
                        <div className='mt-20'>
                            <h2>Validation Result</h2>

                            <div className='border grid mt-5'>
                                {validationResult.map(
                                    ({ label, value }, idx) => (
                                        <div
                                            className='grid grid-cols-2 border-b gap-4'
                                            key={label + idx}
                                        >
                                            <p className='border-r py-4 pl-4 text-gray-700 font-Satoshi-Light capitalize'>
                                                {label}
                                            </p>
                                            <p className='py-4'>{value}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <button
                            className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem] justify-self-center'
                            onClick={() => closeValidateDialog()}
                        >
                            Ok
                        </button>
                    </div>
                </section>
            </dialog>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        {isAddArtisan ? (
                            <form
                                className='grid gap-12 max-w-[40rem]'
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

                                {validationInput
                                    .filter(
                                        ({ name }) =>
                                            name.toLowerCase() ===
                                            validationType.toLowerCase()
                                    )
                                    .map(({ label, type }) => {
                                        return (
                                            <Input
                                                label={label}
                                                register={validation_register}
                                                formErrors={
                                                    validation_formErrors
                                                }
                                                type={type}
                                            />
                                        )
                                    })}

                                <p
                                    className='text-[#043FA7] flex items-center gap-2'
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    What is KYA <BsQuestionCircle />
                                </p>

                                <button className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'>
                                    Validate
                                </button>
                            </form>
                        ) : (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                <img
                                    src='/icons/admins/modalSuccess.svg'
                                    alt=''
                                />

                                <p>You have successfully added an Artisan</p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn bg-white text-[#0556E5] border-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={confirmAddArtisan}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </dialog>
            <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
                <div className='grid gap-8 max-w-[40rem]'>
                    <p className='text-[2rem] font-Satoshi-Medium'>
                        KYA <span className='text-gray-500'>(Optional)</span>
                    </p>
                    <div className='flex justify-between text-[1.6rem]'>
                        <p
                            className='text-[#098DFF] cursor-pointer'
                            onClick={() => handleOpen('validate')}
                        >
                            Click her to validate this person
                        </p>
                        <p
                            className='text-[#043FA7] flex items-center gap-2'
                            style={{
                                fontFamily: 'Satoshi-Light',
                            }}
                        >
                            What is KYA <BsQuestionCircle />
                        </p>
                    </div>
                </div>
                {responseMessage?.displayMessage && (
                    <p className='text-center my-5'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    onSubmit={onSubmit}
                    id='formFile'
                    className='grid max-w-[84rem] gap-16 mt-12 '
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, selectProps, required } = input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    selectFormErrors={selectFormErrors}
                                    type={type}
                                    required={required}
                                    isSelect={type === 'select'}
                                    select={selectProps}
                                />
                            )
                        })}

                        <ImageInput
                            handlePicture={handlePicture}
                            photoPreview={photoPreview}
                        />
                        <button className='btn justify-self-start btn-blue'>
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            {isLoading ? 'Loading...' : 'Add'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default AddArtisan
