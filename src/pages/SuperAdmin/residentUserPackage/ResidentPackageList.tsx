import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import useAxios from '../../../components/hooks/useAxios'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import Table from '../../../components/UI/table/Table'

export interface ResidentPackageList {
    id: string

    package_name: string
    frequency: string
    price: number
    status: string
}

interface ResponseData {
    fetched: []
}

const ResidentPackageList = () => {
    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <Table
                fetch_url={'/admin/resident/user/get/package'}
                title={'package'}
                view_page_url={'/superAdmin/resident-user-package/view/'}
                add_page_url={'/superAdmin/resident-user-package/add'}
                is_add_btn={true}
                nested={false}
                THeader={[
                    'package name',
                    'frequency',
                    'price',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'package_name',
                    'frequency',
                    'price',
                    'status',
                ]}
                deactivateProp={{
                    url: '/admin/resident/user/package/changestatus',
                    tag: 'id',
                }}
            />
        </div>
    )
}

export default ResidentPackageList
