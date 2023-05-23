import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import StarRating from '../../../../components/ui/StarRating'

import { useParams } from 'react-router'
import useAxios from '../../../../components/hooks/UseAxios'
import Activate_Deactivate from '../../../../components/ui/dialog/Activate_Deactivate'
import Input, { SelectProps } from '../../../../components/ui/input/Input'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import ValidatedResult from '../../../../components/ui/dialog/ValidatedResult'
import ValidateKY from '../../../../components/ui/dialog/ValidateKY'

const ArtisanDetail = () => {
    interface Inputs {
        categories: string
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
    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
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

    const postUpdate = (data: Inputs) => {
        return axiosInstance({
            url: `/admin/artisan/update/${artisan_id}`,
            method: 'post',
            data,
        })
    }

    const getRequest = () => {
        return axiosInstance({
            url: `/admin/artisan/getSingleArtisan/${artisan_id}`,
        })
    }

    const { data: get_response, isLoading } = useQuery(
        [`view_artisan_${artisan_id}`],
        getRequest
    )
    const { mutate: update_mutation, isLoading: update_loading } = useMutation(
        [`update_artisan_${artisan_id}`],
        postUpdate,
        {
            onSuccess: () => {
                toast('Artisan Updated', {
                    type: 'success',
                    className: 'bg-green-100 text-green-600 text-[1.4rem]',
                })
            },

            onError: () => {
                toast('Failed to update Artisan ', {
                    type: 'error',
                    className: 'bg-red-100 text-red-600 text-[1.4rem]',
                })
            },
        }
    )

    const onSubmit = handleSubmit((data) => {
        const { category } = get_response?.data

        const get_category_ids: Object[] = []

        for (let item of category) {
            for (let selected of selectedCategories) {
                if (item.name === selected) {
                    get_category_ids.push({ id: item.id })
                }
            }
        }

        const updatedData = {
            ...data,
            category: get_category_ids,
            gender: selectedGender,
            is_kyr_approved: false,
        }

        console.log({ updatedData })

        update_mutation(updatedData)
    })

    useEffect(() => {
        if (get_response) {
            const { image, created_at, category, gender, ...other } =
                get_response.data

            const getOnlyNames: string[] = category.map(
                (each: any) => each.name
            )

            reset({
                ...other,
                onboarding_date: created_at.split('T')[0],
            })

            setSelectedCategories(getOnlyNames)
            // setSlicedCategories(getOnlyNames)
            setPhotoPreview(image)
            setSelectedGender(gender)
        }
    }, [get_response])

     const handlePicture = (e: React.ChangeEvent) => {
         const target = e.target as HTMLInputElement
         const file: File = (target.files as FileList)[0]

         const preview = URL.createObjectURL(file)
         setPhotoPreview(preview)
         setImageFile(file)
     }

    if (isLoading) {
        return <p className='p-8'>Loading...</p>
    }

    const slicedCategories: string[] = get_response?.data.category.map(
        (each: any) => each.name
    )

    const formInputs = [
        {
            name: 'first Name',
            label: 'firstname',
        },
        {
            name: 'last Name',
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
            label: 'categories',
            type: 'select',
            selectProps: {
                state: slicedCategories,
                isSearchable: true,
                isMulti: true,
                textarea: true,
                selectedState: selectedCategories,
                setSelectedState: setSelectedCategories,
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

    return (
        <>
            <ToastContainer />

            <div className='grid p-8 bg-white  rounded-lg gap-[10rem]'>
                <div>
                    <div className='flex justify-between items-center mb-10'>
                        <ValidatedResult
                            image={photoPreview}
                            handlePicture={handlePicture}
                        />

                        <Activate_Deactivate
                            id={artisan_id}
                            url={'/admin/artisan/changeStatus'}
                            status={get_response?.data.status}
                            title={'artisan'}
                            queryCache={`view_artisan_${artisan_id}`}
                        />
                    </div>

                    {responseMessage?.displayMessage && (
                        <p className='text-center my-5'>
                            <span className={responseMessage?.className}>
                                {responseMessage?.displayMessage}
                            </span>
                        </p>
                    )}
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
                                    const { label, type, name, selectProps } =
                                        input
                                    return (
                                        <Input
                                            key={idx + label}
                                            id={idx}
                                            label={label}
                                            setValue={setValue}
                                            select={selectProps}
                                            clearErrors={clearErrors}
                                            register={register}
                                            isSelect={type === 'select'}
                                            formErrors={formErrors}
                                            type={type}
                                            name={name}
                                        />
                                    )
                                })}
                            </section>
                            <ValidateKY title={'Validate Artisan'}/>
                        </div>

                        <button className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-self-start capitalize'>
                            <span>
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>
                            {update_loading ? 'Loading...' : 'Save changes'}
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
            </div>
        </>
    )
}

export default ArtisanDetail
