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

import EstateDetails from '../pages/dashboard/Estate/EstateDetails'
import EstateReport from '../pages/dashboard/Estate/EstateReport'
import EstateManagers from '../pages/dashboard/EstateManagers'
import Estates from '../pages/dashboard/Estate/Estates'
import RolesAndPerm from '../pages/dashboard/RolesAndPerm'
import AdditionalResident from '../pages/dashboard/AdditionalResident'
import AdditionalResidentDetails from '../components/additionalResident/AdditionalResidentDetails'
import SecurityCompany from '../pages/dashboard/SecurityCompany'

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Navigate to='/dashboard' />} />,
        <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path='admins' element={<Admins />} />
            <Route path='estates' element={<Estates />} />
            <Route path='estates/detail/:Id' element={<EstateDetails />} />
            <Route path='estates/report/:Id' element={<EstateReport />} />
            <Route path='security-company' element={<SecurityCompany />} />
            <Route path='security-company/:Id' element={<SecurityCompany />} />
            <Route path='estateManagers' element={<EstateManagers />} />
            <Route path='rolesAndPerm' element={<RolesAndPerm />} />
            <Route
                path='additional-resident'
                element={<AdditionalResident />}
            />
            <Route
                path='additional-resident/:Id'
                element={<AdditionalResidentDetails />}
            />
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
