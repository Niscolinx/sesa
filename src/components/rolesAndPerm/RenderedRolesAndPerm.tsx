import { useEffect, useRef, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import React from 'react'

type Roles =
    | 'admin'
    | 'estate Manager'
    | 'security Company'
    | 'security Guard'
    | 'resident'

interface RolesAndPerm {
    id: string
    name: string
    roles: Roles[]
}

const ROLES_AND_PERM: RolesAndPerm[] = [
    {
        id: '1',
        name: 'Jacintha Sage',
        roles: [
            'admin',
            'estate Manager',
            'security Company',
            'security Guard',
            'resident',
        ],
    },
    // {
    //     id: '1',
    //     name: 'Jacintha Sage',
    //     roles: [
    //         'admin',
    //         'estateManager',
    //         'securityCompany',
    //         'securityGuard',
    //         'resident',
    //     ],
    // },
    // {
    //     id: '1',
    //     name: 'Jacintha Sage',
    //     roles: [
    //         'admin',
    //         'estateManager',
    //         'securityCompany',
    //         'securityGuard',
    //         'resident',
    //     ],
    // },
    // {
    //     id: '1',
    //     name: 'Jacintha Sage',
    //     roles: [
    //         'admin',
    //         'estateManager',
    //         'securityCompany',
    //         'securityGuard',
    //         'resident',
    //     ],
    // },
    // {
    //     id: '1',
    //     name: 'Jacintha Sage',
    //     roles: [
    //         'admin',
    //         'estateManager',
    //         'securityCompany',
    //         'securityGuard',
    //         'resident',
    //     ],
    // },
    // {
    //     id: '1',
    //     name: 'Jacintha Sage',
    //     roles: [
    //         'admin',
    //         'estateManager',
    //         'securityCompany',
    //         'securityGuard',
    //         'resident',
    //     ],
    // },
]

function RenderedRolesAndPerm() {
    const [showDialog, setShowDialog] = useState(false)
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const [fetchedUsers, setFetchedUsers] = useState<RolesAndPerm[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ROLES_AND_PERM)
            }, 2000)
        }
        fetchData()
    }, [])

    return (
        <div className='renderedEstateManagers'>
            <dialog ref={dialogRef}>
                <div>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tenetur deleniti fuga aliquid perferendis esse ab
                    necessitatibus ducimus ex, omnis porro aspernatur
                    exercitationem beatae maiores, a accusamus eaque ipsum vitae
                    expedita!
                </div>
            </dialog>
            <table className='renderedEstateManagers__tableBox'>
                <caption className='renderedEstateManagers__caption justify-baseline'>
                    <p className='caption__title'>
                        Role List <span>(200)</span>
                    </p>
                    <div className='caption__searchBox'>
                        <img src='/icons/estateManagers/search.svg' alt='' />
                        <input type='text' placeholder='Search Parameters' />
                    </div>
                    <div className='caption__select'>
                        <select>
                            <option hidden value=''>
                                Sort By
                            </option>
                            <option value='date'>date</option>
                            <option value='alpha'>Alpha</option>
                        </select>
                        <GrDown />
                    </div>
                </caption>
                <div className='renderedEstateManagers__table'>
                    <thead className='renderedEstateManagers__table--head'>
                        <tr>
                            <th>
                                <input type='checkbox' />
                                <p>Name</p>
                            </th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='renderedEstateManagers__table--body'>
                        {fetchedUsers && fetchedUsers.length > 0 ? (
                            React.Children.toArray(
                                fetchedUsers.map((value, i) => {
                                    return (
                                        <tr key={i} className='relative'>
                                            <td>
                                                <input type='checkbox' />
                                                <img
                                                    src='/img/me.jpeg'
                                                    alt=''
                                                />
                                                <span>{value.name}</span>
                                            </td>
                                            <td className='font-semibold capitalize'>
                                                {value.roles[i]
                                                    ? value.roles[i]
                                                    : value.roles[2]}
                                                <GrDown className='w-[1rem] h-[1rem]' />

                                                <div className='absolute top-[5rem] translate-x-[6rem] border border-color-primary-light w-[24rem] p-4 bg-color-white rounded-lg grid gap-2'>
                                                    {value.roles.map(
                                                        (item, i) => (
                                                            <p className='text-[1.4rem]' key={i}>{item}</p>
                                                        )
                                                    )}
                                                </div>
                                            </td>

                                            <td>
                                                <button className='text-[#098DFF]'>
                                                    Edit Permissions
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        ) : (
                            <tr>
                                <td className='relative'>
                                    <div className='absolute w-full grid place-content-center'>
                                        <CgSpinnerTwo className='animate-spin text-[#0660FE] text-4xl' />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </div>
                <footer className='renderedEstateManagers__footer'>
                    <div className='flex gap-8 items-center'>
                        <p>View</p>
                        <div className='flex items-center border px-4 rounded-lg'>
                            <input
                                type='text'
                                className='w-8 outline-none border-none cursor-pointer'
                                value={6}
                            />
                            <GrDown className='text-[1.3rem]' />
                        </div>
                        <p className='text'>List per page</p>
                    </div>
                    <ul className='flex items-center gap-5 ml-10'>
                        <HiOutlineChevronLeft />
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            1
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            2
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            3
                        </li>
                        <li className='grid place-content-center border w-[3rem] h-[3rem]'>
                            4
                        </li>
                        <HiOutlineChevronRight />
                    </ul>
                </footer>
            </table>
        </div>
    )
}

export default RenderedRolesAndPerm
