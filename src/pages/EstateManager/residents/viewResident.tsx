import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import { ToastContainer, toast } from 'react-toastify'
import useFetchData from '../../../components/hooks/UseFetchData'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'
import ValidatedResult from '../../../components/ui/dialog/ValidatedResult'

const AddAdmin = () => {
    
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        value?: number | string
        selectProps?: SelectProps
    }

    const genderState = ['Male', 'Female']

    const params = useParams()
    const navigate = useNavigate()
    const id = params.id?.replace(':', '')

    const [phone, setPhone] = useState(0)

    const {
        clearErrors,
        formErrors,
        onSubmit,
        openDialog,
        setOpenDialog,
        selectedGender,
        setSelectedGender,
        postLoading,
        handlePicture,
        photoPreview,
        reset,
        register,
        setValue,
    } = useAddPageMutation({
        title: `view_resident_${id}`,
        url: `/manager/resident/update/${id}`,
        props: {
            is_kyr_approved: 0,
            validation_option: 'phone_number',
        },
    })

    

    if (!id) {
        toast('Resident not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
        })

        navigate(-1)
    }

    const { isLoading , data } = useFetchData({
        url: `/manager/resident/getbyid/${id}`,
        name: `view_resident_${id}`,
    })

    useEffect(() => {
        if (data) {
            const { name, email, phone, dob, gender } = data
            const first_name = name.split(' ')[0]
            const last_name = name.split(' ')[1]

            const phone_number = parseInt(phone.slice(4))
            setPhone(phone_number)
            setSelectedGender(gender)

            reset({
                first_name,
                last_name,
                dob,
                email,
                phone: phone_number,
            })
        }
    }, [data])

    if (isLoading) {
        return <Spinner start={true} />
    }

    const formInputs = [
        {
            label: 'first_name',
        },
        {
            label: 'last_name',
        },
        {
            label: 'date_of_birth',
            type: 'date',
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
            name: 'phone_number',
            label: 'phone',
            type: 'tel',
            value: phone,
        },
        {
            name: 'Email Address',
            label: 'email',
            type: 'email',
        },
    ] satisfies FormInputs[]

    return (
        <div className='bg-white rounded-2xl grid p-8'>
            <ToastContainer />
            <Spinner start={postLoading ? true : false} />
            <AddedSuccess
                open={openDialog}
                title={'resident'}
                type={'updated'}
                close={setOpenDialog}
            />

            <div className='flex justify-between items-center mb-10'>
                <ValidatedResult
                    image={photoPreview}
                    handlePicture={handlePicture}
                />

                <Activate_Deactivate
                    id={id!}
                    url={'/manager/resident/deactivate_activate'}
                    status={data?.status}
                    title={'resident'}
                    queryCache={`view_resident_${id}`}
                />
            </div>

            <form
                onSubmit={onSubmit}
                className='grid max-w-[84rem] gap-16 mt-12 '
                style={{
                    gridTemplateColumns:
                        ' repeat(auto-fit, minmax(35rem, 1fr))',
                    columnGap: '10rem',
                }}
            >
                <>
                    {formInputs.map((input, idx) => {
                        const { label, type, name, selectProps, value } = input
                        return (
                            <Input
                                key={idx + label}
                                label={label}
                                register={register}
                                formErrors={formErrors}
                                type={type}
                                value={value}
                                clearErrors={clearErrors}
                                name={name}
                                setValue={setValue}
                                isSelect={type === 'select'}
                                select={selectProps}
                            />
                        )
                    })}

                    <ImageInput
                        handlePicture={handlePicture}
                        photoPreview={photoPreview}
                    />
                    <AddBtn
                        isLoading={postLoading}
                        title={'Save'}
                        is_addBtn={false}
                    />
                </>
            </form>
        </div>
    )
}

export default AddAdmin
