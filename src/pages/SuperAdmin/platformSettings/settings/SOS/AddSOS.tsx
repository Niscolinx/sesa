// import {
//     ChangeEvent,
//     FormEvent,
//     ForwardedRef,
//     forwardRef,
//     useImperativeHandle,
//     useRef,
//     useState,
// } from 'react'
// import { IoMdAdd, IoMdClose } from 'react-icons/io'
// import { useForm } from 'react-hook-form'
// import { useMutation } from 'react-query'
// import { toast } from 'react-toastify'
// import useFetchData from '../../../../../utils/useFetchData'
// import useAxios from '../../../../../components/hooks/useAxios'
// import Input, { SelectProps } from '../../../../../components/UI/input/Input'

// const AddPhoneNumber = forwardRef(
//     (
//         { value, idx }: { value: string; idx: number },
//         ref: ForwardedRef<any>
//     ) => {
//         const [phoneNumber, setPhoneNumber] = useState(value)

//         useImperativeHandle(ref, () => (phoneNumber))

//         return (
//             <div className={`w-full grid gap-4 self-baseline`}>
//                 <label
//                     htmlFor={`number${idx}`}
//                     className='text-[1.4rem] font-semibold capitalize'
//                 >
//                     phone Number {idx + 1}
//                 </label>

//                 <input
//                     type='number'
//                     name='number'
//                     id={`number${idx}`}
//                     ref={ref as any}
//                     value={phoneNumber}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setPhoneNumber(e.target.value)
//                     }
//                     className={` relative flex items-center border border-color-grey rounded-lg w-full  disabled:opacity-50 disabled:cursor-not-allowed p-4`}
//                 />
//             </div>
//         )
//     }
// )
// const AddSOS = () => {
//     type FormInputs = {
//         label: string
//         type?: string
//         name?: string
//         required?: boolean
//         selectProps?: SelectProps
//     }

//     type ResponseMessage = {
//         className: string
//         displayMessage: string
//     }

//     type Inputs = {
//         name: string
//         email: string
//         address: string
//     }

//     const { data: estates_data, isLoading: estates_loading } = useFetchData({
//         url: '/estate/getall',
//         name: 'estates',
//     })

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors: formErrors },
//     } = useForm<Inputs>()

//     const dialogRef = useRef<HTMLDialogElement | null>(null)

//     const [selectedEstates, setSelectedEstates] = useState<string[]>([])
//     const [selectFormErrors, setSelectFormErrors] = useState<{
//         [key: string]: string
//     } | null>(null)
//     const [responseMessage, setResponseMessage] =
//         useState<ResponseMessage | null>(null)

//     const phoneNumbersRef = useRef(['', ''])

//     const [phone_num_count, set_phone_num_count] = useState([''])

//     const axiosInstance = useAxios()

//     const postRequest = (inputs: Inputs) => {
//         return axiosInstance({
//             url: `/platformsettings/sos/create`,
//             method: 'post',
//             data: inputs,
//         })
//     }
//     const { mutate, isLoading } = useMutation(postRequest, {
//         onSuccess: () => {
//             reset()
//             setSelectedEstates([])
//             toast(`Artisan Group successfully`, {
//                 type: 'success',
//                 className: 'bg-green-100 text-green-600 text-[1.4rem]',
//             })

//             openDialog()
//         },
//         onError: (err: any) => {
//             setResponseMessage({
//                 className: 'text-red-600',
//                 displayMessage: err?.response.data.message,
//             })
//         },
//     })

//     const closeDialog = () => {
//         if (dialogRef.current) {
//             dialogRef.current.close()
//         }
//     }

//     const openDialog = () => {
//         if (dialogRef.current) {
//             dialogRef.current.showModal()
//         }
//     }
//     const onSubmit = handleSubmit((data) => {
//         let isError = false
//         setSelectFormErrors(null)

//         if (selectedEstates.length < 1) {
//             isError = true

//             setSelectFormErrors((prev) => {
//                 return {
//                     ...prev,
//                     Gender: 'Field cannot be empty',
//                 }
//             })
//         }

//         if (isError) {
//             return
//         }
//         setResponseMessage(null)

//         const slicedEstates: string[] = estates_data.data.map(
//             ({ estate_name, id }: any) => ({
//                 estate_name,
//                 id,
//             })
//         )

//         const estate = slicedEstates
//             .filter(({ estate_name }: any) =>
//                 selectedEstates.includes(estate_name)
//             )
//             .map(({ id }: any) => ({ id }))

//         const updated_data = {
//             ...data,
//         }

//         mutate(updated_data)
//     })

//     if (estates_loading) {
//         return <p>Loading...</p>
//     }

//     const slicedEstates: string[] = estates_data?.data.map(
//         ({ estate_name }: any) => estate_name
//     )

//     console.log({ slicedEstates })

//     const formInputs = [
//         {
//             label: 'name',
//         },

//         {
//             label: 'email',
//             type: 'email',
//         },

//         {
//             label: 'address',
//         },

//         {
//             label: 'Estates',
//             type: 'select',
//             selectProps: {
//                 state: slicedEstates,
//                 isMulti: true,
//                 selectedState: selectedEstates,
//                 setSelectedState: setSelectedEstates,
//             },
//         },
//     ] satisfies FormInputs[]

//     const submit = (e: FormEvent) => {
//         e.preventDefault()
//         console.log(phoneNumbersRef)
//     }

//     const addPhone = () => {

//         console.log('phones')
//     }

//     return (
//         <>
//             <dialog className='dialog' ref={dialogRef}>
//                 <section className='grid place-content-center w-full h-[100vh]'>
//                     <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
//                         <IoMdClose
//                             className='absolute right-4 top-4 text-[2rem] cursor-pointer'
//                             onClick={() => closeDialog()}
//                         />

//                         <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
//                             <img src='/icons/admins/modalSuccess.svg' alt='' />

//                             <p>You have successfully added SOS</p>

//                             <div className='flex w-full justify-center gap-8'>
//                                 <button
//                                     className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
//                                     onClick={closeDialog}
//                                 >
//                                     Ok
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </dialog>
//             <div className='grid p-8 bg-white h-[80vh] items-baseline overflow-y-scroll rounded-lg'>
//                 {responseMessage?.displayMessage && (
//                     <p className='text-center'>
//                         <span className={responseMessage?.className}>
//                             {responseMessage?.displayMessage}
//                         </span>
//                     </p>
//                 )}

//                 <form
//                     onSubmit={submit}
//                     className='grid max-w-[84rem] gap-16 mt-12'
//                     style={{
//                         gridTemplateColumns:
//                             ' repeat(auto-fit, minmax(35rem, 1fr))',
//                     }}
//                 >
//                     <>
//                         {formInputs.map((input, idx) => {
//                             const { label, type, selectProps } = input

//                             return (
//                                 <>
//                                     {/* {label === 'Estates' && (
//                                         <p className='text-[2rem] font-Satoshi-Medium py-8 -mb-10'>
//                                             Add Estates
//                                         </p>
//                                     )} */}
//                                     <Input
//                                         key={idx + label}
//                                         label={label}
//                                         register={register}
//                                         formErrors={formErrors}
//                                         selectFormErrors={selectFormErrors}
//                                         type={type}
//                                         isSelect={type === 'select'}
//                                         select={selectProps}
//                                     />
//                                 </>
//                             )
//                         })}
//                         {phoneNumbersRef.current.map((num: string, idx) => (
//                             <AddPhoneNumber
//                                 value={num}
//                                 idx={idx}
//                                 ref={(ref) =>
//                                     (phoneNumbersRef.current[idx] = ref)
//                                 }
//                             />
//                         ))}

//                         <button
//                             onClick={addPhone}
//                         >
//                             Add phone number
//                         </button>

//                         <button className='btn justify-self-start btn-blue col-span-full'>
//                             <span>
//                                 <IoMdAdd />
//                             </span>{' '}
//                             {isLoading ? 'Loading...' : 'Add SOS'}
//                         </button>
//                     </>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default AddSOS

import { ChangeEvent, FormEvent, useState } from 'react'
//const history = createBrowserHistory();

const Login = () => {
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [className, setClassName] = useState('input input-bordered')
    const [formError, setFormError] = useState({})

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (name !== 'admin') {
            setFormError((prev) => ({
                ...prev,
                name: 'border border-red-400',
            }))
        }

        if (pass !== 'vaidik@219') {
            setFormError((prev) => ({
                ...prev,
                pass: 'border border-red-400',
            }))
        }
    }

    return (
        <div className='hero min-h-screen bg-base-200'>
            <div className='hero-content flex-col lg:flex-row-reverse'>
                <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Username</span>
                                </label>
                                <input
                                    id='floatingInput'
                                    type='text'
                                    placeholder='Username'
                                    className={className}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Password</span>
                                </label>
                                <input
                                    id='floatingPassword'
                                    type='password'
                                    placeholder='Password'
                                    value={pass}
                                    className={className}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                            <div className='form-control mt-6'>
                                <button
                                    className='btn btn-outline no-animation btn-warning'
                                    type='submit'
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
