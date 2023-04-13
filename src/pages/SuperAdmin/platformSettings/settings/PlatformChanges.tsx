import { FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useFetchData from '../../../../utils/useFetchData'
import Input from '../../../../components/UI/input/Input'

const PlatformChanges = () => {

 type FormInputs = {
     label?: string
     type?: string
     name?: string
 }

    const {data, isLoading, error} = useFetchData({
        url: '/platformsettings/generalsettings/get',
    })


    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const postAdmin = (data: Inputs) => {
        return axiosInstance({
            url: '/admin/create',
            method: 'post',
            data,

            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }
    const { mutate, isLoading } = useMutation(postAdmin, {
        onSuccess: () => {
            handleOpen()
        },
        onError: (err: any) => {
            setResponseMessage({
                className: 'text-red-600',
                displayMessage: err?.response.data.message,
            })
        },
    }) as any

    const onSubmit = handleSubmit((data) => {
        const { first_name, last_name, dob, email_address, phone_number } = data

        const adminData = {
            name: `${first_name} ${last_name}`,
            gender: selectedGender,
            dob,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phone_number}`,
            image: imageFile,
        }

        mutate(adminData)
    })


    interface Input {
        kyr_validation: number
        sms_notification: number
    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        toast('Changes saved successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }


    if(isLoading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>{error.message}</p>
    }

    const formInputs = [
        {
            label: 'kyr_validation',
            type: 'number'
        },
        {
            label: 'sms_notification',
            type: 'number'
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />
            <div className='p-8 bg-white h-[80vh] rounded-lg'>
                <h2 className='heading2 border-b pb-10'>Platform Changes</h2>

                <form
                    onSubmit={handleSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12 items-center'
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, name, selectProps } = input
                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    register={register}
                                    formErrors={formErrors}
                                    type={type}
                                    name={name}
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

                    <div>
                        <label htmlFor='KYR'>
                            <p className='text-[1.4rem] font-Satoshi-Medium'>
                                KYR Validation
                            </p>
                        </label>
                        <div className='relative flex items-center'>
                            <img
                                src='/icons/Naira.svg'
                                alt=''
                                className='absolute left-3'
                            />
                            <input
                                type='number'
                                required
                                placeholder='40'
                                id='description'
                                className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                            />
                        </div>
                        <p className=' text-[1.2rem] text-gray-400'>
                            Charges Per Validation
                        </p>
                    </div>
                    <div>
                        <label htmlFor='KYR'>
                            <p className='text-[1.4rem] font-Satoshi-Medium'>
                                SMS Notification
                            </p>
                        </label>
                        <div className='relative flex items-center'>
                            <img
                                src='/icons/Naira.svg'
                                alt=''
                                className='absolute left-3'
                            />
                            <input
                                type='number'
                                required
                                placeholder='40'
                                id='description'
                                className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem]'
                            />
                        </div>
                        <p className=' text-[1.2rem] text-gray-400'>
                            Charges Per sms notification
                        </p>
                    </div>

                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[10rem]'
                        style={{ justifySelf: 'start' }}
                    >
                        <span>
                            <img
                                src='/icons/admins/saveDisk.svg'
                                alt=''
                                className='w-[1.7rem] h-[1.7rem]'
                            />
                        </span>{' '}
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}

export default PlatformChanges
