import React, { createContext, FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdCheckmarkCircleOutline, IoMdClose } from 'react-icons/io'
import { BsQuestionCircle } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'

import {
    AddBankAccount,
    AddedEstateStaffSuccessfully,
    OpenedBankAccountSuccessful,
} from './DialogSteps'
import {
    MultipleSelect,
    Select,
} from '../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'
import {
    BVN_Number,
    DriversLicence,
    International_PassPort,
    NIN_Number,
    PhoneNumber,
    Voters_Card,
} from '../../SecurityCompany/dashboard/company/AddSecurity/Inputs'

type DialogType = 'validate' | 'add-estateStaff' | 'reassign'

export type AddedEstateStaffSteps =
    | 'addedEstateStaffSuccessful'
    | 'addBankAccount'
    | 'openedBankAccountSuccessful'

export type ValidateInputTypes =
    | 'Phone Number'
    | 'BVN Number'
    | 'NIN Number'
    | 'Drivers License'
    | 'International Passport'
    | 'Voters Card'

interface AddedEstateStaffContext {
    addedEstateStaffStep: AddedEstateStaffSteps
    setAddedEstateStaffStep: React.Dispatch<
        React.SetStateAction<AddedEstateStaffSteps>
    >
    selectedBank: string | null
    setSelectedBank: React.Dispatch<React.SetStateAction<string | null>>
    handleClose: () => void
}

export const CreateAddedEstateStaffContext =
    createContext<AddedEstateStaffContext>(null as any)

const AddEstateStaff = () => {
    const [workDays, setWorkDays] = useState<string[]>([])
    const [isValidated, setIsValidated] = useState(false)
    const [iskyg, setIskyg] = useState(false)

    const toggleIskyg = () => setIskyg(!iskyg)
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    const [dialogState, setDialogState] = useState<DialogType>('validate')
    const [validationType, setValidationType] = useState<
        ValidateInputTypes | string | null
    >('Phone Number')

    const [selectedBank, setSelectedBank] = useState<null | string>(null)
    const [addedEstateStaffStep, setAddedEstateStaffStep] =
        useState<AddedEstateStaffSteps>('addedEstateStaffSuccessful')

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const validateDialogRef = useRef<HTMLDialogElement | null>(null)

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const closeValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.close()
        }
    }

    const openValidateDialog = () => {
        if (validateDialogRef.current) {
            validateDialogRef.current.showModal()
        }
    }
    const handleOpen = (modalState: DialogType) => {
        if (modalState === 'validate') {
            setDialogState('validate')
        }
        if (modalState === 'add-estateStaff') {
            setDialogState('add-estateStaff')
        }
        if (modalState === 'reassign') {
            setDialogState('reassign')
        }

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

    const addEstateStaffHandler = () => {
        // navigate('/superAdmin/EstateStaff GuardCategory/add')
        handleOpen('add-estateStaff')
    }

    const handleDialogSubmit = (e: FormEvent) => {
        e.preventDefault()
        handleClose()

        openValidateDialog()
    }

    const handleReAssign = () => {
        handleClose()

        toast(' Reassigned successfully', {
            type: 'success',
            className: 'bg-green-100 text-green-600 text-[1.4rem]',
        })
    }

    const renderValidationType = new Map([
        ['Phone Number', <PhoneNumber />],
        ['BVN Number', <BVN_Number />],
        ['NIN Number', <NIN_Number />],
        ['Drivers License', <DriversLicence />],
        ['International Passport', <International_PassPort />],
        ['Voters Card', <Voters_Card />],
    ]) satisfies Map<ValidateInputTypes, JSX.Element>

    const handleValidate = () => {
        setIsValidated(true)
    }

    const addedEstateStaffSteps = new Map([
        ['addedEstateStaffSuccessful', <AddedEstateStaffSuccessfully />],
        ['addBankAccount', <AddBankAccount />],
        ['openedBankAccountSuccessful', <OpenedBankAccountSuccessful />],
    ])

    return (
        <CreateAddedEstateStaffContext.Provider
            value={{
                addedEstateStaffStep,
                setAddedEstateStaffStep,
                handleClose,
                selectedBank,
                setSelectedBank,
            }}
        >
            <ToastContainer />

            <dialog className='dialog' ref={validateDialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[90rem] min-h-[30rem] p-10 text-[1.6rem] relative gap-20'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => closeValidateDialog()}
                        />

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
                        <button
                            className='btn text-white bg-[#0556E5] border rounded-lg w-[15rem] justify-self-center'
                            onClick={() => closeValidateDialog()}
                        >
                            Ok
                        </button>
                    </div>
                </section>
            </dialog>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className='bg-white rounded-2xl grid items-baseline w-[64rem] min-h-[30rem] p-10 gap-8 text-[1.6rem] relative'>
                        <IoMdClose
                            className='absolute right-4 top-4 text-[2rem] cursor-pointer'
                            onClick={() => handleClose()}
                        />

                        {dialogState === 'validate' ? (
                            <form
                                className='grid gap-12'
                                onSubmit={handleDialogSubmit}
                            >
                                <h3
                                    className='text-[2rem] font-bold border-b '
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                >
                                    Know Your Guard (KYG)
                                </h3>

                                <Select
                                    state={[
                                        'Phone Number',
                                        'BVN Number',
                                        'NIN Number',
                                        'Drivers License',
                                        'International Passport',
                                        'Voters Card',
                                    ]}
                                    label='Validation Option'
                                    validate
                                    selectedState={validationType}
                                    setSelectedState={setValidationType}
                                />

                                <p
                                    className='text-[#043FA7] flex items-center gap-2 border-b pb-10 w-full'
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    What is KYG <BsQuestionCircle />
                                </p>
                                {renderValidationType.get(
                                    validationType as ValidateInputTypes
                                )}

                                <button
                                    className='btn bg-[#0556E5] text-white rounded-lg py-4 place-self-start w-[15rem]'
                                    onClick={handleValidate}
                                >
                                    Validate
                                </button>
                            </form>
                        ) : dialogState === 'add-estateStaff' ? (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                {addedEstateStaffSteps.get(
                                    addedEstateStaffStep
                                )}
                            </div>
                        ) : (
                            <div className='bg-white rounded-2xl grid place-content-center justify-items-center h-[30rem] gap-8 text-[1.6rem]'>
                                {' '}
                                <img
                                    src='/icons/admins/modalDeactivate.svg'
                                    alt=''
                                />
                                <p className='text-[1.6rem]'>
                                    Are you sure you want to reassign this
                                    estate staff guard primary estate
                                </p>
                                <div className='flex w-full justify-center gap-8'>
                                    <button
                                        className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className=' bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'
                                        onClick={handleReAssign}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </dialog>
            <main>
                <section className='grid p-8 bg-white items-baseline rounded-lg'>
                    <form
                        onSubmit={handleSubmit}
                        className='grid max-w-[84rem] gap-16 mt-12 '
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='firstName'
                                className='text-[1.4rem] font-medium'
                            >
                                First Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='firstName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-medium'
                            >
                                Last Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-medium'
                            >
                                Middle Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='lastName'
                                className='text-[1.4rem] font-medium'
                            >
                                Date of Birth
                            </label>
                            <input
                                type='text'
                                required
                                id='lastName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4'>
                            <label
                                htmlFor='phoneNumber'
                                className='text-[1.4rem] font-medium'
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
                            selectedState={selectedGender}
                            setSelectedState={setSelectedGender}
                        />
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='email'
                                className='text-[1.4rem] font-medium'
                            >
                                Email Address *
                            </label>
                            <input
                                type='email'
                                required
                                id='email'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='address1'
                                className='text-[1.4rem] font-medium'
                            >
                                Address
                            </label>
                            <input
                                type='text'
                                required
                                id='address1'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <Select
                            label='State'
                            state={['Lagos', 'Imo', 'Abia', 'FCT']}
                            placeholder='Select State'
                            selectedState={selectedState}
                            setSelectedState={setSelectedState}
                        />
                        <MultipleSelect
                            label='Work Day'
                            selectFrom={['Mon', 'Tue', 'Wed', 'Thur', 'Fri']}
                            placeholder='Select Work days'
                            selected={workDays}
                            setSelected={setWorkDays}
                        />

                        <div className='col-span-full'>
                            <label
                                htmlFor='address'
                                className='flex mb-2 gap-4 items-center cursor-pointer'
                            >
                                Estate Staff Message
                            </label>

                            <textarea
                                name='address'
                                id='address'
                                placeholder='This message will be displayed to the security guard when the site worker checks in / out'
                                rows={4}
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                            <p className='text-gray-400 text-[1.4rem]'>
                                Maximum of 30 characters
                            </p>
                        </div>

                        <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
                            <label
                                htmlFor='photoUpload'
                                className='flex justify-center gap-4 items-center cursor-pointer'
                            >
                                <img
                                    src='/icons/admins/photo_library.svg'
                                    alt=''
                                />
                                <p
                                    className='text-color-dark-1'
                                    style={{
                                        fontFamily: 'Satoshi-Light',
                                    }}
                                >
                                    picture here{' '}
                                    <span className='text-color-blue font-bold'>
                                        click
                                    </span>{' '}
                                    to upload
                                </p>
                            </label>
                            <input
                                type='file'
                                name='photoUpload'
                                id='photoUpload'
                                accept='image/*'
                                className='hidden'
                                onClick={handlePhotoPreview}
                            />

                            {photoUrl && (
                                <div className='flex justify-center justify-self-center'>
                                    <img
                                        src={photoUrl}
                                        alt='photoPreview'
                                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                                    />
                                </div>
                            )}
                        </div>
                    </form>
                </section>
                <section className='grid p-8 bg-white'>
                    <div className='grid gap-8 max-w-[40rem] mt-[5rem] '>
                        <div className='flex items-center justify-between'>
                            <p className='text-[2rem] font-bold flex items-center gap-2'>
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
                                <p className='text-[#098DFF] cursor-pointer flex items-center font-medium'>
                                    KYG Validated <IoMdCheckmarkCircleOutline />
                                </p>
                                <button
                                    className='text-green-600 flex items-center gap-2'
                                    style={{
                                        fontFamily: 'Satoshi-Medium',
                                    }}
                                    onClick={() => openValidateDialog()}
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
                                            onClick={() =>
                                                handleOpen('validate')
                                            }
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Click here to validate this person
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <button
                        className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg mt-32'
                        style={{ justifySelf: 'start' }}
                        onClick={addEstateStaffHandler}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Staff
                    </button>
                </section>
            </main>
        </CreateAddedEstateStaffContext.Provider>
    )
}

export default AddEstateStaff
