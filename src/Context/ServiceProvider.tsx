import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useAxios from '../components/hooks/UseAxios'
import Spinner from '../components/ui/Spinner'
import { useNavigate } from 'react-router'

const Context = React.createContext<any>({})

interface Props {
    children: React.ReactNode
}

function Provider({ children }: Props) {
    const axiosInstance = useAxios()
    const navigate = useNavigate()
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const genderState = ['Male', 'Female']
    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedGender, setSelectedGender] = useState<string>(genderState[0])

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors: formErrors },
    } = useForm()

    const postAdmin = (data: any) => {
        return axiosInstance({
            url: '/admin/create',
            method: 'post',
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(postAdmin, {
        onSuccess: () => {
            handleOpen()
        },
        onError: (err: any) => {
            toast(`${err?.response.data.message}`, {
                type: 'error',
                className: 'bg-red-100 text-red-600 text-[1.4rem]',
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries('admin')
        },
    })

    const onSubmit = handleSubmit((data) => {
        const { first_name, last_name, dob, email_address, phone_number } = data

        if (!phone_number || phone_number.length <= 9) {
            return setError('phone_number', {
                type: 'manual',
                message: 'Must be 10 characters',
            })
        }

        clearErrors('phone_number')

        if (imageFile) {
            const size = imageFile.size / 1000

            const KBSize = size.toString().split('.')[0]

            if (KBSize.length > 3) {
                const MBSize = Number(KBSize) / 1000
                return (
                    MBSize > 2 &&
                    toast(`File size must less than 2MB`, {
                        type: 'error',
                        className: 'bg-red-100 text-red-600 text-[1.4rem]',
                    })
                )
            }
        }

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

    const handleOpen = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }
    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

    const handleClose = () => {
        navigate(-1)
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const providerValue = {
        onSubmit,
        isLoading,
    }

    return (
        <Context.Provider value={providerValue}>
            <Spinner start={isLoading ? true : false} />
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        <img src='/icons/admins/modalSuccess.svg' alt='' />
                        <p>You have successfully added an Admin</p>

                        <div className='flex w-full justify-center gap-8'>
                            <button
                                className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                onClick={handleClose}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </section>
            </dialog>
            {children}
        </Context.Provider>
    )
}

const useContext = () => {
    const context = React.useContext(Context)
    if (!context) {
        throw new Error('useAdmin must be used within a Provider')
    }

    return context
}

export { Provider, useContext }
