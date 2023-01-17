import { useContext, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { GrDown } from 'react-icons/gr'
import { IoMdAdd } from 'react-icons/io'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineDotsVertical } from 'react-icons/hi'
import { EstatePageContext } from '../../Context/EstatePageContext'

type Estate = {
    id: string
    img: string

    details: [
        { estateName: string; securityCompany: string; status: string },
        {
            estateBalance: number
            NoOfResidents: number
            signOutRequired: boolean
        },
        {
            estateManager: string
            NoOfHouseholds: number
        }
    ]
}

const ESTATEDATA: Estate[] = [
    {
        id: '1',
        img: '/img/img1.png',
        details: [
            {
                estateName: 'Iba Housing Estate',
                securityCompany: 'Proton',
                status: 'Active',
            },
            {
                estateBalance: 5000,
                NoOfResidents: 3400,
                signOutRequired: true,
            },
            {
                estateManager: 'Sladin Ama',
                NoOfHouseholds: 45,
            },
        ],
    },
]

function RenderedEstates() {
    const EstateContextData = useContext(EstatePageContext)
    const { setRouteToRender } = EstateContextData

    const [fetchedUsers, setFetchedUsers] = useState<Estate[] | null>([])

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedUsers(ESTATEDATA)
            }, 2000)
        }
        fetchData()
    }, [])

    return (
        <div className='renderedEstates'>
            <table className='renderedEstates__tableBox'>
                <caption className='renderedEstates__caption'>
                    <p className='caption__title'>
                        Estate List <span>(202)</span>
                    </p>
                    <div className='caption__searchBox'>
                        <img src='/icons/estates/search.svg' alt='' />
                        <input type='text' placeholder='Search Parameters' />
                    </div>
                    <div className='caption__select'>
                        <select>
                            <option hidden value=''>
                                Category
                            </option>
                            <option value='date'>date</option>
                            <option value='alpha'>Alpha</option>
                        </select>
                        <GrDown />
                    </div>
                    <button
                        className='btn estates__btn'
                        onClick={() => setRouteToRender('addEstate')}
                    >
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        <p>Add Estate</p>
                    </button>
                </caption>
                <div className='renderedEstates__table'>
                    <tbody className='renderedEstates__table--body'>
                        {fetchedUsers && fetchedUsers.length > 0 ? (
                            fetchedUsers.map((estate, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <img src={estate.img} alt='' />
                                        </td>
                                        
                                        <td>
                                            <button>
                                               <HiOutlineDotsVertical/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
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
                <footer className='renderedEstates__footer'>
                    <div className='flex gap-8 items-center'>
                        <p>View</p>
                        <div className='flex items-center border px-4 rounded-lg'>
                            <input
                                type='number'
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

export default RenderedEstates
