import { Outlet } from 'react-router'
import Sidebar from '../../components/SecurityCompany/Sidebar'
import Header from '../../components/SuperAdmin/dashboard/Header'
import useBreadcrumbs from 'use-react-router-breadcrumbs'



function Dashboard() {
            const breadcrumbs = useBreadcrumbs()

    return (
            <div className='dashboard'>
                <Sidebar />
                <div className='dashboard__container'>
                    <Header
                        fullName='Collins Igboanugwo'
                        role='Super Admin'
                        imgUrl='/img/me.jpeg'
                    />

                    <div className='p-10 overflow-scroll max-h-[90vh]'>
                        <Outlet />
                    </div>
                </div>
            </div>
    )
}

export default Dashboard
