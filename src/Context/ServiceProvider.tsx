import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useAxios from '../components/hooks/UseAxios'
import Spinner from '../components/ui/Spinner'
import { NavigateFunction, useNavigate } from 'react-router'

interface Props {
    children: React.ReactNode
}

// interface ContextProps {
//     photoPreview: string
//     selectedGender: string
//     setSelectedGender: React.Dispatch<React.SetStateAction<string>>
//     register: any
//     setValue: any
//     setError: any
//     clearErrors: any
//     formErrors: any
//     postLoading: boolean
//     handlePicture: (e: React.ChangeEvent) => void
//     onSubmit: () => void
// }

// const Context = React.createContext<ContextProps | null>(null)

function ServiceProvider() {
    const axiosInstance = useAxios()
   

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)

    const [selectedGender, setSelectedGender] = useState<string>('')

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors: formErrors },
    } = useForm()

    const postRequest = (data: any) => {
        return axiosInstance({
            url: '/admin/create',
            method: 'post',
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    const queryClient = useQueryClient()
    const { mutate, isLoading: postLoading } = useMutation(postRequest, {
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

        const updatedData = {
            name: `${first_name} ${last_name}`,
            gender: selectedGender,
            dob,
            email: email_address,
            address: 'no 4 odeyim street',
            phone: `+234${phone_number}`,
            image: imageFile,
        }

        mutate(updatedData)
    })

   
    const handlePicture = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement
        const file: File = (target.files as FileList)[0]
        const preview = URL.createObjectURL(file)
        setPhotoPreview(preview)
        setImageFile(file)
    }

   

    const providerValue = {
        onSubmit,
        postLoading,
        handlePicture,
        selectedGender,
        setSelectedGender,
        photoPreview,
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formErrors,
    }

   return providerValue
}



// const useServiceContext = () => {
//     const context = React.useContext(Context)
//     if (!context) {
//         throw new Error('service must be used within a Provider')
//     }

//     return context
// }

export default ServiceProvider



// export { ServiceProvider, useServiceContext }
