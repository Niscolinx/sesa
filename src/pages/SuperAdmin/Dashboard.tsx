import { Outlet, useNavigate } from 'react-router'
import Header from '../../Components/SuperAdmin/dashboard/Header'
import Sidebar from '../../Components/SuperAdmin/dashboard/Sidebar'
// import Header from '../../../../components/SuperAdmin/dashboard/Header'
// import Sidebar from '../../components/SuperAdmin/dashboard/Sidebar'

import BreadCrumb from '../../Components/UI/BreadCrumb'
import PrevLocation from '../../Components/hooks/prevLocation'
import AutoLogout from '../../Components/AutoLogout'
import { useEffect } from 'react'

function Dashboard() {
    PrevLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role?.indexOf('super') === -1) {
            navigate('/')
        }
    }, [])

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard__container'>
                <Header
                    fullName='Collins Igboanugwo'
                    role='Super Admin'
                    imgUrl='/img/me.jpeg'
                />
                <AutoLogout>
                    <div className='p-10 overflow-scroll max-h-[90vh]'>
                        <BreadCrumb />
                        <Outlet />
                    </div>
                </AutoLogout>
            </div>
        </div>
    )
}

export default Dashboard
