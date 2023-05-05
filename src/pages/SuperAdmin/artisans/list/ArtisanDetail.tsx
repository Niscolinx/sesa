import React, { useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import StarRating from '../../../../components/SuperAdmin/UI/StarRating'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { BsQuestionCircle } from 'react-icons/bs'
import ValidatedResult from '../../../../components/UI/Dialog/ValidatedResult'
import { useParams } from 'react-router'
import useAxios from '../../../../components/hooks/useAxios'
import Activate_Deactivate from '../../../../components/UI/Dialog/Activate_Deactivate'
import Input from '../../../../components/UI/input/Input'

type Actions = 'Deactivate' | 'Delete'

const ArtisanDetail = () => {
    const params = useParams()
    const axiosInstance = useAxios()

    const [photoPreview, setPhotoPreview] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const genderState = ['Male', 'Female']
    const [isWarning, setIsWarning] = useState(true)
    const [isSignOutRequired, setIsSignOutRequired] = useState(false)

    const toggleIsSignOutRequired = () =>
        setIsSignOutRequired(!isSignOutRequired)
    const [responseMessage, setResponseMessage] =
        useState<ResponseMessage | null>(null)
    const [selectedGender, setSelectedGender] = useState<string>('')
    const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    const company_id = params.id?.replace(':', '')

    if (!company_id) {
        toast('Company not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })

        return <p className='p-4'> Not found!</p>
    }

    const postDeactivate = (id: string) => {
        return axiosInstance({
            url: '/admin/deactivate_activate',
            method: 'post',
            data: { id },
        })
    }
    const postUpdateAdmin = (data: any) => {
        return axiosInstance({
            url: `/security-company/update/${company_id}`,
            method: 'post',
            data,
        })
    }

    const getAdmin = () => {
        return axiosInstance({
            url: `/security-company/get/${company_id}`,
        })
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const handleOpen = (dialogType: Actions) => {
        if (dialogType === 'Deactivate') {
            setDialogType('Deactivate')
        }
        if (dialogType === 'Delete') {
            setDialogType('Delete')
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const handleSelectedAction = (item: Actions) => {
        if (item === 'Deactivate') {
            handleOpen('Deactivate')
        }

        if (item === 'Delete') {
            handleOpen('Delete')
        }
    }

    const handleDeleteArtisan = () => {
        handleClose()

        toast('Artisan deleted successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }
    const handleDeactivateArtisan = () => {
        handleClose()

        toast('Artisan deactivated successfully', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem]',
        })
    }

    interface Inputs {
        name: string
        email: string
        address: string
        formatted_onboarding_date: string
        phone: string
        no_bank_account: number
        no_assigned_security_guards: number
        no_security_guards: number
        balance: number
    }

    type ResponseMessage = {
        className: string
        displayMessage: string
    }

    type FormInputs = {
        label?: keyof Inputs
        type?: string
        name?: string
    }

    const formInputs = [
        {
            name: 'Security Name',
            label: 'name',
        },
        {
            name: 'Email Address',
            label: 'email',
            type: 'email',
        },
        {
            label: 'address',
        },

        {
            name: 'phone Number',
            label: 'phone',
            type: 'number',
        },
        {
            name: 'no_of_security_guards',
            label: 'no_security_guards',
            type: 'number',
        },
        {
            name: 'wallet_balance',
            label: 'balance',
            type: 'number',
        },
        {
            name: 'Joined Date',
            label: 'formatted_onboarding_date',
            type: 'date',
        },
        {
            name: 'no_of_assigned_security_guards',
            label: 'no_assigned_security_guards',
            type: 'number',
        },
        {
            name: 'no_of_bank_accounts_opened',
            label: 'no_bank_account',
            type: 'number',
        },
    ] satisfies FormInputs[]

    return (
        <>
            <ToastContainer />

            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
                        {dialogType === 'Deactivate' ? (
                            <>
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to deactivate this
                                    Artisan
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeactivateArtisan}
                                    >
                                        Deactivate
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src='/icons/admins/modalWarning.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to delete this Artisan
                                </p>

                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className='bg-red-600 py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleDeleteArtisan}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </dialog>

            <div className='grid p-8 bg-white  rounded-lg gap-[10rem]'>
                <div>
                    <div className='flex justify-between items-center'>
                        <ValidatedResult />

                        <Activate_Deactivate
                            id={company_id}
                            url={'/security-company/deactivate_activate'}
                            status={0}
                            title={'security company'}
                            queryCache={`get_company_${company_id}`}
                        />
                    </div>
                    {/* <form
                        onSubmit={handleSubmit}
                        className='grid max-w-[84rem] gap-16 mt-12'
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='fullName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Full Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='fullName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='artisanCode'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Artisan Code
                            </label>
                            <input
                                type='text'
                                required
                                id='artisanCode'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='DateOfBirth'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Date of Birth
                            </label>
                            <input
                                type='text'
                                required
                                id='DateOfBirth'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='email'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Email Address
                            </label>
                            <input
                                type='email'
                                required
                                id='email'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4'>
                            <label
                                htmlFor='phoneNumber'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Phone Number *
                            </label>

                            <div className='flex text-[1.6rem] gap-4   h-[5rem]'>
                                <select className='w-[30%] rounded-lg border border-color-grey py-4.8 px-4 outline-none cursor-pointer text-color-dark relative h-full'>
                                    <option value='234'>+234</option>
                                </select>
                                <input
                                    required
                                    type='number'
                                    inputMode='numeric'
                                    id='phoneNumber'
                                    placeholder='Phone Number'
                                    className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                                />
                            </div>
                        </div>
                        <Select
                            label='Gender'
                            state={['Male', 'Female']}
                            placeholder='Male'
                            selectedState={selectedGender}
                            setSelectedState={setSelectedGender}
                        />

                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='homeAddress'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Home Address
                            </label>
                            <input
                                type='text'
                                required
                                id='homeAddress'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='businessName'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Business Name
                            </label>
                            <input
                                type='text'
                                required
                                id='businessName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='artisanGroup'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Artisan Group
                            </label>
                            <input
                                type='text'
                                required
                                id='artisanGroup'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='overallRating'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Overall Rating
                            </label>
                            <input
                                type='text'
                                placeholder='Optional'
                                id='overallRating'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='idNumber'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                ID Number
                            </label>
                            <input
                                type='text'
                                placeholder='Optional'
                                id='idNumber'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='dateOfOnboarding'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Date of Onboarding
                            </label>
                            <input
                                type='text'
                                placeholder='Optional'
                                id='dateOfOnboarding'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='status'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                Status
                            </label>
                            <input
                                type='text'
                                placeholder='Optional'
                                id='status'
                                value={'Active'}
                                className='w-full rounded-lg border-none text-[1.6rem] outline-none text-green-500'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='kya'
                                className='text-[1.4rem] font-Satoshi-Medium'
                            >
                                KYA
                            </label>
                            <input
                                type='text'
                                placeholder='Optional'
                                id='kya'
                                value={'Not validated'}
                                className='w-full rounded-lg border-none text-[1.6rem] outline-none underline text-red-500'
                            />
                        </div>

                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-10'
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
                    </form> */}
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
                                    const { label, type, name, tag, disabled } =
                                        input

                                    return (
                                        <Input
                                            key={idx + label}
                                            id={idx}
                                            label={label}
                                            tag={tag}
                                            disabled={disabled}
                                            setValue={setValue}
                                            clearErrors={clearErrors}
                                            register={register}
                                            formErrors={formErrors}
                                            type={type}
                                            name={name}
                                        />
                                    )
                                })}
                            </section>
                            <div className='grid items-center justify-between gap-4'>
                                <p className='font-Satoshi-Medium text-[1.4rem]'>
                                    Sign Out Required
                                </p>
                                <div
                                    onClick={toggleIsSignOutRequired}
                                    className='cursor-pointer'
                                >
                                    {isSignOutRequired ? (
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
                        </div>

                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-self-start'
                            // onClick={addArtisanHandler}
                        >
                            <span>
                                <img
                                    src='/icons/admins/saveDisk.svg'
                                    alt=''
                                    className='w-[1.7rem] h-[1.7rem]'
                                />
                            </span>
                            {true
                                ? 'Loading...'
                                : 'Save Changes'}
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
