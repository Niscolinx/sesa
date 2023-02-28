import {
    Navigate,
    //Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
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
import estateManagerRoutes from './routes/estateManagerRoutes'

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Login />} />,
        superAdminRoutes,
        securityCompanyRoutes,
        estateManagerRoutes,
        <Route path='*' element={<Navigate to='/' />} />,
    ])
)

const App = () => {
    return (
        <div className='text-[1.6rem] max-w-[180rem] mx-auto'>
            <SkeletonTheme baseColor='#202020' highlightColor='#444'>
                <RouterProvider router={router} />
            </SkeletonTheme>
        </div>
    )
}

export default App
