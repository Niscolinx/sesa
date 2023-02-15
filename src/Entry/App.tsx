import {
    Navigate,
    Route,
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
import {
    superAdminRoutes,
    securityCompanyRoutes,
} from './routes/superAdminRoutes'

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Login />} />,
        superAdminRoutes,
        securityCompanyRoutes,
        <Route path='*' element={<Navigate to='/' />} />,
    ])
)

const App = () => {
    return (
        <div className='text-[1.6rem]'>
            <SkeletonTheme baseColor='#202020' highlightColor='#444'>
                <RouterProvider router={router} />
            </SkeletonTheme>
        </div>
    )
}

export default App
