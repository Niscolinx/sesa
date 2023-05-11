import React, { ChangeEvent, useEffect, useState } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { FiDownload } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router'
import Table from '../../../components/UI/table/Table'

export interface IAdvertClickrateIncrease {
    id: string
    estateName: string
    location: string
    noOfResidents: number
    noOfViews: number
}

export const ADVERT_CLICK_RATE_INCREASE: IAdvertClickrateIncrease[] = [
    {
        id: '1',
        estateName: 'Sun City',
        location: 'Lagos',
        noOfResidents: 50,
        noOfViews: 100,
    },
    {
        id: '1',
        estateName: 'Sun City',
        location: 'Lagos',
        noOfResidents: 50,
        noOfViews: 100,
    },
    {
        id: '1',
        estateName: 'Sun City',
        location: 'Lagos',
        noOfResidents: 50,
        noOfViews: 100,
    },
    {
        id: '1',
        estateName: 'Sun City',
        location: 'Lagos',
        noOfResidents: 50,
        noOfViews: 100,
    },
    {
        id: '1',
        estateName: 'Sun City',
        location: 'Lagos',
        noOfResidents: 50,
        noOfViews: 100,
    },
    {
        id: '1',
        estateName: 'Sun City',
        location: 'Lagos',
        noOfResidents: 50,
        noOfViews: 100,
    },
]

const AdvertClickrateIncrease = () => {
    const params = useParams()
    const advert_id = params.id


    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <Table
                fetch_url={
                    `/advertstatistics/clickorview/details?advert_id=${advert_id}&category=click&perPage=10`
                }
                title={'admin'}
                view_page_url={'/superAdmin/admin/view/'}
                add_page_url={'/superAdmin/admin/add'}
                is_add_btn={true}
                THeader={[
                    'name',
                    'gender',
                    'phone number',
                    'joined date',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'name',
                    'image',
                    'gender',
                    'phone',
                    'created_at',
                    'status',
                ]}
                deactivateProp={{ url: '/admin/deactivate_activate' }}
            />
        </div>
    )
}

export default AdvertClickrateIncrease
