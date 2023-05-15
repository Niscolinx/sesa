import {
    Navigate,
    //Route,
    createBrowserRouter,
    createHashRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom'

import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-toastify/dist/ReactToastify.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'animate.css'

import Login from '../pages/Login'
import superAdminRoutes from './routes/superAdminRoutes'
import securityCompanyRoutes from './routes/securityCompanyRoutes'
import { Route } from 'react-router-dom'
import estateManagerRoutes from './routes/estateManagerRoutes'
import { useAppSelector } from '../store/app/hooks'
import { selectAuth } from '../store/features/auth'
import AutoLogout from '../components/AutoLogout'

const App = () => {
    const { isAuth } = useAppSelector(selectAuth)

    console.log({ isAuth })

    const checkAuth = isAuth && [
        superAdminRoutes,
        securityCompanyRoutes,
        estateManagerRoutes,
    ]

    const router = createBrowserRouter(
        createRoutesFromElements([
            <Route path='/' element={<Login />} />,
            checkAuth,
            <Route path='*' element={<Navigate to='/' />} />,
        ])
    )

    return (
        <div className='text-[1.6rem] max-w-[180rem] mx-auto'>
            <SkeletonTheme baseColor='#202020' highlightColor='#444'>
                <RouterProvider router={router} />
            </SkeletonTheme>
        </div>
    )
}

export default App
