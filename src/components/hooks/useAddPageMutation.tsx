import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from 'react-query'
import { toast } from 'react-toastify'
import useAxios from './UseAxios'


interface Props {
    url: string,
    props?: {
        [key: string]: any
    }
}
function useAddPageMutation({url, props}: Props) {
   
    const axiosInstance = useAxios()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [openDialog, setOpenDialog] = useState(false)

    const [selectedGender, setSelectedGender] = useState('Male')

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
            url,
            method: 'post',
            data,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

    const queryClient = useQueryClient()
    const { mutate, isLoading: postLoading } = useMutation(postRequest, {
        onSuccess: () => {
            setOpenDialog(true)
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
        console.log({data, props})
        debugger
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
        setOpenDialog,
        openDialog,
    }

    return providerValue
}

export default useAddPageMutation
