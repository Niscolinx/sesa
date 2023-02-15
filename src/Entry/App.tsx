import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom'

import Admins from '../pages/SuperAdmin/dashboard/Admins'
import Overview from '../pages/SuperAdmin/dashboard/Overview'

import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-toastify/dist/ReactToastify.css'

import EstateDetails from '../pages/SuperAdmin/dashboard/Estate/EstateDetails'
import EstateReport from '../pages/SuperAdmin/dashboard/Estate/EstateReport'
import EstateManagers from '../pages/SuperAdmin/dashboard/EstateManagers'
import Estates from '../pages/SuperAdmin/dashboard/Estate/Estates'
import RolesAndPerm from '../pages/SuperAdmin/dashboard/RolesAndPerm'
import AdditionalResident from '../pages/SuperAdmin/dashboard/AdditionalResident'
import AdditionalResidentDetails from '../components/SuperAdmin/additionalResident/AdditionalResidentDetails'
import SecurityCompany from '../pages/SuperAdmin/dashboard/SecurityCompany'
import SecurityCompanyDetail from '../components/SuperAdmin/securityCompany/SecurityCompanyDetail'
import Wallet from '../pages/SuperAdmin/dashboard/Wallet'
import EstateWallet from '../pages/SuperAdmin/dashboard/Wallet/EstateWallet'
import EstateWalletDetails from '../components/SuperAdmin/wallet/EstateWalletDetails'
import ResidentWallet from '../pages/SuperAdmin/dashboard/Wallet/ResidentWallet'
import ResidentWalletDetails from '../components/SuperAdmin/wallet/resident/ResidentWalletDetails'
import CommissionWallet from '../pages/SuperAdmin/dashboard/Wallet/CommissionWallet'
import CommissionWalletDetails from '../components/SuperAdmin/wallet/CommissionWalletDetails'
import SecurityCompanyWallet from '../pages/SuperAdmin/dashboard/Wallet/SecurityCompanyWallet'
import SecurityCompanyWalletDetails from '../components/SuperAdmin/wallet/SecurityCompanyDetails'
import Artisan from '../pages/SuperAdmin/dashboard/Artisan'
import ViewArtisanCategory from '../components/SuperAdmin/artisans/category/ViewArtisanCategory'
import AddArtisan from '../components/SuperAdmin/artisans/list/AddArtisan'
import ArtisanDetail from '../components/SuperAdmin/artisans/list/ArtisanDetail'
import AddArtisanGroup from '../components/SuperAdmin/artisans/group/AddArtisanGroup'
import ViewArtisanGroup from '../components/SuperAdmin/artisans/group/ViewArtisanGroup'
import Advert from '../pages/SuperAdmin/dashboard/Advert'
import AddAdvert from '../components/SuperAdmin/advert/AddAdvert'
import AdvertDetail from '../components/SuperAdmin/advert/AdvertDetail'
import AdvertClickrateIncrease from '../components/SuperAdmin/advert/AdvertClickrateIncrease'
import AdvertClickrateDecrease from '../components/SuperAdmin/advert/AdvertClickrateDecrease'
import PlatformSettings from '../pages/SuperAdmin/dashboard/platformSettings'
import AddProperty from '../components/SuperAdmin/platformSettings/AddProperty'
import AddSOS from '../components/SuperAdmin/platformSettings/AddSOS'
import SOSDetails from '../components/SuperAdmin/platformSettings/SOSDetails'
import AddSecurityCompany from '../components/SuperAdmin/securityCompany/AddSecurityCompany'
import Dashboard from '../pages/SuperAdmin/Dashboard'
import Login from '../pages/Login'


const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Login />} />,
        
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
