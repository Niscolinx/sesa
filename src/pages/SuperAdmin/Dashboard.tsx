import { Outlet } from 'react-router'
import Header from '../../components/SuperAdmin/dashboard/Header'
import Sidebar from '../../components/SuperAdmin/dashboard/Sidebar'
// import Header from '../../../../components/SuperAdmin/dashboard/Header'
// import Sidebar from '../../components/SuperAdmin/dashboard/Sidebar'

import BreadCrumb from '../../components/UI/BreadCrumb'
import PrevLocation from '../../components/hooks/prevLocation'
import AutoLogout from '../../components/AutoLogout'

function Dashboard() {
    PrevLocation()

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
