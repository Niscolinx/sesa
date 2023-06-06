import { Outlet } from 'react-router'
import Sidebar from '../../components/securitycompany/Sidebar'
import Header from '../../components/superadmin/dashboard/Header'
import BreadCrumb from '../../components/ui/BreadCrumb'

function Dashboard() {
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard__container'>
                <Header
                    fullName='Collins Igboanugwo'
                    role='Security Guard'
                    imgUrl='/img/me.jpeg'
                />

                <div className='p-10 overflow-scroll max-h-[90vh]'>
                    <BreadCrumb />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
