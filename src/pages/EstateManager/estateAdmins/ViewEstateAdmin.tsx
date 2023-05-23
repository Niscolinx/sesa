import React, { useEffect, useState } from 'react'
import Input, { SelectProps } from '../../../components/ui/input/Input'
import ImageInput from '../../../components/ui/input/ImageInput'
import AddBtn from '../../../components/ui/button/AddBtn'
import AddedSuccess from '../../../components/ui/dialog/AddedSuccess'
import Spinner from '../../../components/ui/Spinner'
import useAddPageMutation from '../../../components/hooks/useAddPageMutation'
import ValidateKY from '../../../components/ui/dialog/ValidateKY'
import useFetchData from '../../../components/hooks/UseFetchData'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import Activate_Deactivate from '../../../components/ui/dialog/Activate_Deactivate'
import ValidatedResult from '../../../components/ui/dialog/ValidatedResult'

function ViewEstateAdmin() {
    type FormInputs = {
        label?: string
        type?: string
        name?: string
        value?: string | number
        selectProps?: SelectProps
    }

    const genderState = ['Male', 'Female']
    const [selectedPermissions, setSelectedPermissions] = React.useState<
        string[]
    >([])
    const [phone, setPhone] = useState(0)

    const params = useParams()
    const navigate = useNavigate()

    const id = params.id?.replace(':', '')

    if (!id) {
        toast('Estate Admin not Found', {
            type: 'error',
            className: 'bg-red-100 text-red-600 text-[1.4rem] capitalize',
        })

        navigate(-1)
    }

    const { isLoading: estate_admin_loading, data } = useFetchData({
        url: `/manager/estate-admin/get/${id}`,
        name: `view_estate_admin_${id}`,
    })

    

    // const { isLoading, data: permissionState } = useFetchData({
    //     url: '/manager/estate-admin/permission',
    //     name: 'estate-admin_permissions',
    // })

    const results: any[] = []
    const promise_resolved = async function handleAll() {
        await Promise.all([
            useFetchData({
                url: `/manager/estate-admin/get/${id}`,
                name: `view_estate_admin_${id}kk`,
            }),
            useFetchData({
                url: '/manager/estate-admin/permission',
                name: 'estate-admin_permissionskk',
            }),
        ]).then((res) => {
            res.forEach((e) => {
               console.log(e)
            })
        })
    }

    promise_resolved()


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
        register,
        setValue,
        reset,
    } = useAddPageMutation({
        url: '/manager/estate-admin/create',
        props: {
            permission: selectedPermissions,
            is_kyr_approved: 0,
            validation_option: 'phone_number',
        },
    })

    useEffect(() => {
        if (data) {
            const { name, email, phone, dob, gender } = data
            const first_name = name.split(' ')[0]
            const last_name = name.split(' ')[1]

            const phone_number = parseInt(phone.slice(3, -1))
            setPhone(phone_number)
            setSelectedGender(gender)
            setSelectedPermissions(data.permissions)

            reset({
                first_name,
                last_name,
                dob,
                email,
                phone_number,
            })
        }
    }, [data])

    if (estate_admin_loading) {
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
            label: 'permissions',
            type: 'select',
            selectProps: {
                state: data.permissions,
                isMulti: true,
                textarea: true,
                selectedState: selectedPermissions,
                setSelectedState: setSelectedPermissions,
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
            <Spinner start={postLoading ? true : false} />
            <AddedSuccess
                open={openDialog}
                title={'estate admin'}
                close={setOpenDialog}
            />

            <div className='flex justify-between items-center mb-10'>
                <ValidatedResult
                    image={photoPreview}
                    handlePicture={handlePicture}
                />

                <Activate_Deactivate
                    id={id!}
                    url={'/manager/estate-admin/deactivate_activate'}
                    status={data?.status}
                    title={'Estate Admin'}
                    queryCache={`view_estate_admin_${id}`}
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
                    <div className='grid items-center'>
                        <ValidateKY title={'Know your Estate Admin'} />
                    </div>

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

export default ViewEstateAdmin
