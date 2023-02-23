import { Outlet } from 'react-router'
import Sidebar from '../../components/SecurityCompany/Sidebar'
import Header from '../../components/SuperAdmin/dashboard/Header'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { NavLink } from 'react-router-dom'

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
                    <div className='flex gap-4'>
                        {breadcrumbs.map(({ match, breadcrumb }, i) => {
                            console.log({ match, breadcrumb })
                            if (i > 1)
                                return (
                                    <NavLink
                                        key={match.pathname}
                                        to={match.pathname}
                                    >
                                        {breadcrumb}
                                    </NavLink>
                                )
                        })}
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
