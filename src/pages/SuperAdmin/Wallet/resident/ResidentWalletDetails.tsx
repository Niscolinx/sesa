import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { useParams, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { SelectProps } from "../../../../components/UI/input/Input"
import useAxios from "../../../../components/hooks/useAxios"

const ResidentWalletDetails = () => {
     const params = useParams()


      const admin_id = params.id?.replace(':', '')


      if (!admin_id) {
          toast('Admin not Found', {
              type: 'error',
              className: 'bg-red-100 text-red-600 text-[1.4rem]',
          })

          return <p className='p-4'> Not found!</p>
      }



 interface Inputs {
     email_address: string
     first_name: string
     last_name: string
     dob: string
     gender: string
     phone_number: number | null
     photoUrl?: string
 }

 type FormInputs = {
     label?: string
     type?: string
     name?: string
     selectProps?: SelectProps
 }



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
     },
     {
         label: 'email_address',
         type: 'email',
     },
 ] satisfies FormInputs[]

 const {
     register,
     handleSubmit,
     formState: { errors: formErrors },
     reset,
 } = useForm<Inputs>()




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

            reset({
                first_name,
                last_name,
                dob,
                email_address: email,
                phone_number: parseInt(phone),
            })

            setPhotoPreview(image)
            setSelectedGender(gender)
        }
    }, [get_response])

     if (get_admin_loading || !get_response?.data) {
        return <p>loading...</p>
    }

    return (
        <div className=' p-8 bg-white min-h-[60vh] rounded-lg overflow-y-scroll'>
            <section
                className='grid max-w-[65vw] gap-16'
                style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(40rem, 1fr))',
                }}
            >
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='residentName'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Type
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='residentName'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'02-May-2022'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='withdrawalTime'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Time
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='withdrawalTime'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'3:00pm'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='status'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Type
                    </label>
                    <input
                        disabled
                        type='text'
                        required
                        id='status'
                        className='border border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-green-500 disabled:cursor-not-allowed'
                        value={'Credit'}
                    />
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Category
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase'}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Source
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase'}
                    />
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Amount
                    </label>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            disabled
                            type='text'
                            required
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                    </div>
                </div>

                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction ID
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={1004238232}
                    />
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Transaction Amount
                    </label>
                    <div className='relative flex items-center'>
                        <img
                            src='/icons/Naira.svg'
                            alt=''
                            className='absolute left-3'
                        />
                        <input
                            disabled
                            type='text'
                            required
                            id='description'
                            className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                            value={6000}
                        />
                    </div>
                </div>
                <div className='w-full grid gap-4'>
                    <label
                        htmlFor='description'
                        className='text-[1.4rem] font-semibold'
                    >
                        Narration
                    </label>

                    <input
                        disabled
                        type='text'
                        required
                        id='description'
                        className='border pl-8 border-color-grey p-4 outline-none rounded-lg w-full text-[1.6rem] disabled:text-gray-500 disabled:cursor-not-allowed'
                        value={'Product Purchase for 6000'}
                    />
                </div>
            </section>
        </div>
    )
}

export default ResidentWalletDetails
