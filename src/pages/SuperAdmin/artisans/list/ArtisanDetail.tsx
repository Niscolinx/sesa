import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import StarRating from '../../../../components/SuperAdmin/UI/StarRating'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { BsQuestionCircle } from 'react-icons/bs'
import ValidatedResult from '../../../../components/UI/Dialog/ValidatedResult'
import { useParams } from 'react-router'
import useAxios from '../../../../components/hooks/useAxios'
import Activate_Deactivate from '../../../../components/UI/Dialog/Activate_Deactivate'
import Input, { SelectProps } from '../../../../components/UI/input/Input'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { IoMdCheckmarkCircleOutline, IoMdClose } from 'react-icons/io'

const ArtisanDetail = () => {
    type Actions = 'Deactivate' | 'Delete'
    interface ValidationTypeInput {
        validation_content: string
    }

    interface Inputs {
        firstname: string
        lastname: string
        artisan_code: string
        email_address: string
        phone_number: string
        gender: string
        address_line_1: string
        address_line_2: string
        business_name: string
        onboarding_date: string
        status: number
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: keyof Inputs
        type?: string
        name?: string
        selectProps?: SelectProps
    }

    const params = useParams()
    const axiosInstance = useAxios()

    const genderState = ['Male', 'Female']
    const [isSignOutRequired, setIsSignOutRequired] = useState(false)
    const [photoPreview, setPhotoPreview] = useState('')
    const [isValidated, setIsValidated] = useState(false)
    const [iskyg, setIskyg] = useState(false)

    const toggleIskyg = () => setIskyg(!iskyg)

    const [isAddArtisan, setIsAddArtisan] = useState(true)
    const [validationType, setValidationType] = useState<string>('Phone Number')
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)
    const [selectedGender, setSelectedGender] = useState<string>('')

    const artisan_id = params.id?.replace(':', '')

    if (!artisan_id) {
        toast('Artisan not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors: formErrors },
        reset,
    } = useForm<Inputs>()

    const {
        register: validation_register,
        handleSubmit: validation_handleSubmit,
        reset: validation_reset,
        formState: { errors: validation_formErrors },
    } = useForm<ValidationTypeInput>()

    const postUpdate = (data: any) => {
        return axiosInstance({
            url: `/security-company/update/${artisan_id}`,
            method: 'post',
            data,
        })
    }

    const getRequest = () => {
        return axiosInstance({
            url: `/security-company/get/${artisan_id}`,
        })
    }

    const { data: get_response, isLoading } = useQuery(
        [`view_artisan_${artisan_id}`],
        getRequest
    )

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

    useEffect(() => {
        if (get_response) {
            const { name, email, phone, image, dob, gender, ...other } =
                get_response.data

            reset({
                ...other,
            })

            setPhotoPreview(image)
            setSelectedGender(gender)
        }
    }, [get_response])

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }
    const onSubmitValidation = validation_handleSubmit((data) => {
        validationType_mutation(data)
    })

    const onSubmit = handleSubmit((data) => {
        // const { first_name, last_name, dob, email_address, phone_number } = data
        // const adminData = {
        //     name: `${first_name} ${last_name}`,
        //     gender: selectedGender,
        //     dob,
        //     id: artisan_id,
        //     email: email_address,
        //     address: 'no 4 odeyim street',
        //     phone: `+234${phone_number}`,
        //     image: imageFile,
        // }
        //post_admin_mutation(adminData)
    })

    const formInputs = [
        {
            label: 'firstname',
        },
        {
            label: 'lastname',
        },
        {
            label: 'email_address',
            type: 'email',
        },
        {
            label: 'artisan_code',
        },

        {
            label: 'phone_number',
            type: 'number',
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
            label: 'address_line_1',
        },
        {
            label: 'address_line_2',
        },
        {
            label: 'business_name',
        },
        {
            label: 'onboarding_date',
            type: 'date',
        },
    ] satisfies FormInputs[]

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
            <div className='grid p-8 bg-white  rounded-lg gap-[10rem]'>
                <div>
                    <div className='flex justify-between items-center'>
                        <ValidatedResult />

                        <Activate_Deactivate
                            id={artisan_id}
                            url={'/security-company/deactivate_activate'}
                            status={0}
                            title={'security company'}
                            queryCache={`get_company_${artisan_id}`}
                        />
                    </div>

                    <form onSubmit={onSubmit} className='grid gap-20'>
                        <div className='grid gap-10'>
                            <section
                                className='grid max-w-[84rem] gap-16'
                                style={{
                                    gridTemplateColumns:
                                        ' repeat(auto-fit, minmax(35rem, 1fr))',
                                }}
                            >
                                {formInputs.map((input, idx) => {
                                    const { label, type } = input

                                    return (
                                        <Input
                                            key={idx + label}
                                            id={idx}
                                            label={label}
                                            //  tag={tag}
                                            //  disabled={disabled}
                                            setValue={setValue}
                                            clearErrors={clearErrors}
                                            register={register}
                                            formErrors={formErrors}
                                            type={type}
                                            // name={name}
                                        />
                                    )
                                })}
                            </section>
                            <div className='grid max-w-[40rem]'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[2rem] font-Satoshi-Medium flex items-center gap-2'>
                                        KYG{' '}
                                        <span className='text-[#043FA7]'>
                                            <BsQuestionCircle />
                                        </span>
                                    </p>
                                    <div
                                        onClick={toggleIskyg}
                                        className='cursor-pointer'
                                    >
                                        {iskyg ? (
                                            <img
                                                src='/icons/admins/switchOn.svg'
                                                alt=''
                                            />
                                        ) : (
                                            <img
                                                src='/icons/admins/switchOff.svg'
                                                alt=''
                                            />
                                        )}
                                    </div>
                                </div>

                                {isValidated ? (
                                    <div className='flex gap-8 text-[1.6rem]'>
                                        <p className='text-[#098DFF] cursor-pointer flex items-center font-Satoshi-Medium'>
                                            KYG Validated{' '}
                                            <IoMdCheckmarkCircleOutline />
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
                                                    //  onClick={() =>
                                                    //   handleOpen()
                                                    // }
                                                    style={{
                                                        fontFamily:
                                                            'Satoshi-Medium',
                                                    }}
                                                >
                                                    Click here to validate this
                                                    person
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        <button className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-self-start'>
                            <span>
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>
                            {true ? 'Loading...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
                <section>
                    <h2
                        className='text-[2rem] py-10'
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Testimonials
                    </h2>
                    <div
                        className='grid grid-cols-2 rounded-lg border p-10 border-color-grey'
                        style={{
                            boxShadow:
                                '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                        }}
                    >
                        <div className='grid gap-8 '>
                            <div
                                className='flex gap-4 justify-between items-center border rounded-lg h-[9rem] max-w-[38rem] px-10'
                                style={{
                                    boxShadow:
                                        '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                                }}
                            >
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src='/img/avatar1.png'
                                        alt=''
                                        className='w-[5rem] h-[5rem] object-cover rounded-full'
                                    />

                                    <div>
                                        <p
                                            className='text-[1.4rem]'
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Jessica Okafor
                                        </p>
                                        <StarRating starsNum={4} />
                                    </div>
                                </div>

                                <div className='text-[1.4rem]'>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        7 Aug 2022
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Peace Estate
                                    </p>
                                </div>
                            </div>
                            <div
                                className='flex gap-4 justify-between items-center border rounded-lg h-[9rem] max-w-[38rem] px-10'
                                style={{
                                    boxShadow:
                                        '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                                }}
                            >
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src='/img/avatar2.png'
                                        alt=''
                                        className='w-[5rem] h-[5rem] object-cover rounded-full'
                                    />

                                    <div>
                                        <p
                                            className='text-[1.4rem]'
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Jessica Okafor
                                        </p>
                                        <StarRating starsNum={4} />
                                    </div>
                                </div>

                                <div className='text-[1.4rem]'>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        7 Aug 2022
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Peace Estate
                                    </p>
                                </div>
                            </div>
                            <div
                                className='flex gap-4 justify-between items-center border rounded-lg h-[9rem] max-w-[38rem] px-10'
                                style={{
                                    boxShadow:
                                        '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                                }}
                            >
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src='/img/avatar3.png'
                                        alt=''
                                        className='w-[5rem] h-[5rem] object-cover rounded-full'
                                    />

                                    <div>
                                        <p
                                            className='text-[1.4rem]'
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Jessica Okafor
                                        </p>
                                        <StarRating starsNum={4} />
                                    </div>
                                </div>

                                <div className='text-[1.4rem]'>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        7 Aug 2022
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Peace Estate
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-8'>
                            <h3
                                className='text-[2rem]'
                                style={{
                                    fontFamily: 'Satoshi-Medium',
                                }}
                            >
                                Wonderful Service
                            </h3>
                            <p className='text-[1.8rem]'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nulla optio labore autem
                                provident, dolore dolorum dicta vel tempore
                                voluptatibus deserunt recusandae porro deleniti
                                dolores illum, temporibus eveniet earum.
                                Ducimus, repellendus? Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Quos adipisci
                                voluptatem molestias, obcaecati molestiae
                                veritatis libero eveniet porro accusamus,
                                reiciendis facilis. Illum et doloremque fuga quo
                                aut laudantium consequatur nemo.
                            </p>
                        </div>
                    </div>
                </section>
                <section className='grid w-full'>
                    <h3
                        className='text-[2rem]'
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Know Your Artisan (KYA)
                    </h3>
                    <div className='bg-white rounded-2xl grid items-baseline  p-10 text-[1.6rem] relative gap-20'>
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
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Validation Option
                                    </p>
                                    <p className='py-4'>
                                        Phone Number | (+234) 813238432
                                    </p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Full Name
                                    </p>
                                    <p className='py-4'>Michael Okonkwo</p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Date of Birth
                                    </p>
                                    <p className='py-4'>15 May, 1998</p>
                                </div>
                                <div className='grid grid-cols-2 border-b gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Phone Number
                                    </p>
                                    <p className='py-4'> (+234) 813238432</p>
                                </div>
                                <div className='grid grid-cols-2  gap-4'>
                                    <p
                                        className='border-r py-4 pl-4 text-gray-700'
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Gender
                                    </p>
                                    <p className='py-4'>Male</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ArtisanDetail
