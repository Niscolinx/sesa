import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Admins from '../pages/dashboard/Admins'
import Overview from '../pages/dashboard/Overview'

import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import Estates from '../pages/dashboard/Estates'
import EstateManagers from '../pages/dashboard/EstateManagers'
import EstateDetails from '../pages/dashboard/Estate/EstateDetails'

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Navigate to='/dashboard' />} />,
        <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path='admins' element={<Admins />} />
            <Route path='estates' element={<Estates />} />
            <Route path='estates/:detailId' element={<EstateDetails />} />
            <Route path='estates/:reportsId' element={<EstateReport />} />
            <Route path='estateManagers' element={<EstateManagers />} />
        </Route>,
        <Route path='*' element={<Navigate to='/' />} />,
    ])
)

const App = () => {
    return (
        <SkeletonTheme baseColor='#202020' highlightColor='#444'>
            <RouterProvider router={router} />
        </SkeletonTheme>
    )
}

export default App
