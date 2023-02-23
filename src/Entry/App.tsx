import {
    Navigate,
    //Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    NavLink,
} from 'react-router-dom'

import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-toastify/dist/ReactToastify.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Login from '../pages/Login'
import superAdminRoutes from './routes/superAdminRoutes'
import securityCompanyRoutes from './routes/securityCompanyRoutes'
import { Route } from 'use-react-router-breadcrumbs'
import useBreadcrumbs from 'use-react-router-breadcrumbs'


const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Login />} breadcrumb='sdfdsfdfjkdfskdjfdkfdsfkfsdkfkdskfn' />,
        superAdminRoutes,
        securityCompanyRoutes,
        <Route path='*' element={<Navigate to='/' />} />,
    ])
)

const App = () => {
        const breadcrumbs = useBreadcrumbs()

    return (
        <div className='text-[1.6rem] max-w-[180rem] mx-auto'>
            <div className='flex gap-4'>
                {breadcrumbs.map(({ match, breadcrumb }, i) => {
                    console.log({ match, breadcrumb })
                    if (i > 1)
                        return (
                            <NavLink key={match.pathname} to={match.pathname}>
                                {breadcrumb}
                            </NavLink>
                        )
                })}
            </div>
            <SkeletonTheme baseColor='#202020' highlightColor='#444'>
                <RouterProvider router={router} />
            </SkeletonTheme>
        </div>
    )
}

export default App


