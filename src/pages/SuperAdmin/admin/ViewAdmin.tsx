import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import Input, { SelectProps } from '../../../components/UI/input/Input'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import useAxios from '../../../components/hooks/useAxios'
import Activate_Deactivate from '../../../components/UI/Dialog/Activate_Deactivate'
import { ShowImage } from '../../../components/UI/input/ImageInput'

const ViewAdmin = () => {
    interface Inputs {
        email_address: string
        first_name: string
        last_name: string
        dob: string
        image: string
        gender: string
        phone_number: number | null
        photoUrl?: string
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: string
        type?: string
        name?: string
        value?: string | number
        selectProps?: SelectProps
    }

    const params = useParams()
    const axiosInstance = useAxios()

    const photoPreview = useRef<string>('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const genderState = ['Male', 'Female']
    const [selectedGender, setSelectedGender] = useState<string>(genderState[0])
    const [phone, setPhone] = useState(0)

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
                state: genderState,
                selectedState: selectedGender,
                setSelectedState: setSelectedGender,
            },
        },
        {
            label: 'phone_number',
            type: 'number',
            value: phone,
        },
        {
            label: 'email_address',
            type: 'email',
        },
    ] satisfies FormInputs[]

    const {
        register,
        handleSubmit,
        clearErrors,
        setValue,
        formState: { errors: formErrors },
        reset,
    } = useForm<Inputs>()

    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)

    const admin_id = params.id?.replace(':', '')

    if (!admin_id) {
        toast('Admin not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }

    const postUpdateAdmin = (data: any) => {
        return axiosInstance({
            url: `/admin/update/${admin_id}`,
            method: 'post',
            data,
        })
    }

    const getAdmin = () => {
        return axiosInstance({
            url: `/admin/get/${admin_id}`,
        })
    }

    const { data: get_response, isLoading: get_admin_loading } = useQuery(
        [`view_admin_${admin_id}`],
        getAdmin
    )

    useEffect(() => {
        if (get_response) {
            const { name, email, phone, image, dob, gender } = get_response.data
            const first_name = name.split(' ')[0]
            const last_name = name.split(' ')[1]

            const phone_number = parseInt(phone.slice(3, -1))
            setPhone(phone_number)

            reset({
                first_name,
                last_name,
                dob,
                email_address: email,
                phone_number,
            })

           // setPhotoPreview((prev) => prev ?? image)
            setSelectedGender(gender)
        }
    }, [get_response])

    const { mutate: post_admin_mutation, isLoading: post_admin_loading } =
        useMutation(postUpdateAdmin, {
            onSuccess: (res) => {
                toast('Admin Updated successfully', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },
            onError: (err: any) => {
                setResponseMessage({
                    className: 'text-red-600',
                    displayMessage: err?.response?.data.message,
                })
            },
        })

    const onSubmit = handleSubmit((data) => {
        const { first_name, last_name, dob, email_address, phone_number } = data

        const adminData = {
            name: `${first_name} ${last_name}`,
            gender: selectedGender,
            dob,
            id: admin_id,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phone_number}`,
            image: imageFile,
        }

        post_admin_mutation(adminData)
    })

  

    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]

        const preview = URL.createObjectURL(file)
        photoPreview.current = preview
        setImageFile(file)
    }

    if (get_admin_loading || !get_response?.data) {
        return <p>loading...</p>
    }

    

    return (
        <>
            <ToastContainer />

            <div className='bg-white rounded-2xl grid p-8'>
                <div className='flex justify-between items-center mb-20'>
                    <ShowImage
                        handlePicture={handlePicture}
                        photoPreview={photoPreview.current}
                    />

                    <Activate_Deactivate
                        id={admin_id}
                        url={'/admin/deactivate_activate'}
                        status={get_response.data.status}
                        title={'admin'}
                        queryCache={`view_admin_${admin_id}`}
                    />
                </div>
                <p className='text-[2rem] font-Satoshi-Medium'>
                    Personal Information
                </p>
                {responseMessage?.displayMessage && (
                    <p className='text-center'>
                        <span className={responseMessage?.className}>
                            {responseMessage?.displayMessage}
                        </span>
                    </p>
                )}
                <form
                    onSubmit={onSubmit}
                    className='grid max-w-[84rem] gap-16 mt-12 '
                    style={{
                        gridTemplateColumns:
                            ' repeat(auto-fit, minmax(35rem, 1fr))',
                    }}
                >
                    <>
                        {formInputs.map((input, idx) => {
                            const { label, type, name, selectProps, value } =
                                input

                            return (
                                <Input
                                    key={idx + label}
                                    label={label}
                                    value={value}
                                    register={register}
                                    formErrors={formErrors}
                                    clearErrors={clearErrors}
                                    setValue={setValue}
                                    type={type}
                                    name={name}
                                    isSelect={type === 'select'}
                                    select={selectProps}
                                />
                            )
                        })}

                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[5rem]'
                            style={{ justifySelf: 'start' }}
                        >
                            <span>
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>{' '}
                            {post_admin_loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </>
                </form>
            </div>
        </>
    )
}

export default ViewAdmin
