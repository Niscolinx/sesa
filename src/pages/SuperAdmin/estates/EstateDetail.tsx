import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import OverviewCard from '../../../components/SuperAdmin/overview/OverviewCard'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../store/app/hooks'
import AxiosRequest from '../../../utils/axios'
import useAxios from '../../../components/hooks/useAxios'

interface EstateManager {
    id: string
    propertyCode: string
    address: string
    propertyCategory: string
    propertyName: string
    occupants: number
    RFID: number
    accessCard: number
    status: string
}


function EstateDetail() {

    const [fetchedEstateDetails, setFetchedEstateDetails] = useState<
        EstateManager[]
    >([])

     const axiosInstance = useAxios()
    const fetchEstateDetails = () => {
        return axiosInstance({
            url: '/estate/getall',
        })
    }

    const {
        isLoading: get_estateDetails_loading,
        data: get_estateDetails_response,
        isError: get_estateDetails_isError,
        error: get_estateDetails_error,
    } = useQuery('estateDetails', fetchEstateDetails) as any

    useEffect(() => {
        if (get_estateDetails_response) {
            setFetchedEstateDetails(get_estateDetails_response.data)
        }
    }, [get_estateDetails_response])

    if (get_estateDetails_loading) {
        //     <p>Property Code</p>
        // </p>
        // <p>Address</p>
        // <p>Property Category</p>
        // <p>Property Name</p>
        // <p>Occupants</p>
        // <p>RFID</p>
        // <p>Access Card</p>
        // <p>Status</p>
        return <p>Loading...</p>
    }

    if (get_estateDetails_isError) {
        return <p>{get_estateDetails_error.message}</p>
    }

    const fetched: any[] =
        get_estateDetails_response.data.data || get_estateDetails_response.data

    return (
        <div className='mt-8 grid gap-8'>
            {fetched.length > 0 ? (
                <>
                    <section className='bg-white rounded-lg p-8 grid h-[28rem] text-[1.4rem]'>
                        <div className='flex w-full justify-between'>
                            <p>Iba Housing Estate</p>
                            <p className='text-[#666869]'>
                                Joined:{' '}
                                <span className='text-black'>08 May, 2022</span>
                            </p>
                        </div>
                        <div className='overview flex justify-between'>
                            <OverviewCard
                                title='Residents'
                                number={18_000}
                                iconUrl='/icons/overview/residents.svg'
                                bgColor='bg-[#DDFCDC]'
                                textColor='text-[#1A8F56]'
                            />
                            <OverviewCard
                                title='Property'
                                number={4}
                                iconUrl='/icons/overview/property.svg'
                                bgColor='bg-[#F5F9FA]'
                                textColor='text-[#00C2FF]'
                            />
                            <OverviewCard
                                title='Household'
                                number={40}
                                iconUrl='/icons/overview/household2.svg'
                                bgColor='bg-[#FCF3FA]'
                                textColor='text-[#B6008E]'
                            />
                        </div>
                        {/* <div className='flex justify-end'>
                            <Link
                                to={`/superAdmin/estates/detail/report/:4`}
                                className='text-[#0660FE] text-[1.4rem]'
                            >
                                View Estate Report
                            </Link>
                        </div> */}
                    </section>
                </>
            ) : (
                <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                    <img src='/icons/admins/errorSvg.svg' alt='' />
                    <p className='text'>Estate Details not Found</p>
                </section>
            )}
        </div>
    )
}

export default EstateDetail
