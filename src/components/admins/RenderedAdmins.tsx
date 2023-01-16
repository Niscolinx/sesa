import { useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'

type Admin = {
    id: string
    name: string
    gender: string
    phoneNumber: string
    status: string
    onboardingDate: string
}

const ADMINDATA: Admin[] = [
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
    {
        id: '1',
        name: 'Jacintha Sage',
        gender: 'Male',
        phoneNumber: '(+234) 814 324 6719',
        onboardingDate: '02-May-22',
        status: 'Active',
    },
]

function RenderedAdmins() {
    const [fetchedUsers, setFetchedUsers] = useState<Admin[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ADMINDATA)
            }, 2000)
        }
        fetchData()
    }, [])

    return (
        <div className='renderedAdmins'>
            <table className='renderedAdmins__tableBox'>
                <caption className='renderedAdmins__caption'>
                    <p className='caption__title'>
                        Admin List <span>(200)</span>
                    </p>
                    <div className='caption__searchBox'>
                        <img src='/icons/admins/search.svg' alt='' />
                        <input type='text' placeholder='Search Parameters' />
                    </div>
                    <div className='caption__input'>
                        <select>
                            <option hidden value=''>
                                Sort By
                            </option>
                            <option value='date'>date</option>
                            <option value='alpha'>Alpha</option>
                        </select>
                        <GrDown />
                    </div>
                    <button className='btn admins__btn'>
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>Add Admin</p>
                    </button>
                </caption>
                <div className='renderedAdmins__table'>
                    <thead className='renderedAdmins__table--head'>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='renderedAdmins__table--body'>
                        {fetchedUsers && fetchedUsers.length > 0 ? (
                            fetchedUsers.map((value, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <span>{value.name}</span>
                                        </td>
                                        <td>{value.gender}</td>
                                        <td>{value.phoneNumber}</td>
                                        <td>{value.status.toString()}</td>
                                        <td>
                                            <>
                                                <div className='flex justify-center'>
                                                    {new Date(
                                                        value.onboardingDate
                                                    ).toLocaleDateString()}
                                                </div>
                                            </>
                                        </td>
                                        <td>
                                            <button>action</button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td>
                                    <div className='absolute w-full top-[50%]'>
                                        <CgSpinnerTwo className='animate-spin text-black text-4xl' />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </div>
            </table>
        </div>
    )
}

export default RenderedAdmins
