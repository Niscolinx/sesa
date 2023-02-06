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
import 'react-toastify/dist/ReactToastify.css'

import EstateDetails from '../pages/dashboard/Estate/EstateDetails'
import EstateReport from '../pages/dashboard/Estate/EstateReport'
import EstateManagers from '../pages/dashboard/EstateManagers'
import Estates from '../pages/dashboard/Estate/Estates'
import RolesAndPerm from '../pages/dashboard/RolesAndPerm'
import AdditionalResident from '../pages/dashboard/AdditionalResident'
import AdditionalResidentDetails from '../components/additionalResident/AdditionalResidentDetails'
import SecurityCompany from '../pages/dashboard/SecurityCompany'
import AddSecurityCompany from '../components/securityCompany/AddSecurityCompany'
import SecurityCompanyDetail from '../components/securityCompany/SecurityCompanyDetail'
import Wallet from '../pages/dashboard/Wallet'
import EstateWallet from '../pages/dashboard/Wallet/EstateWallet'
import EstateWalletDetails from '../components/wallet/EstateWalletDetails'
import ResidentWallet from '../pages/dashboard/Wallet/ResidentWallet'
import ResidentWalletDetails from '../components/wallet/resident/ResidentWalletDetails'
import CommissionWallet from '../pages/dashboard/Wallet/CommissionWallet'
import CommissionWalletDetails from '../components/wallet/CommissionWalletDetails'
import SecurityCompanyWallet from '../pages/dashboard/Wallet/SecurityCompanyWallet'
import SecurityCompanyWalletDetails from '../components/wallet/SecurityCompanyDetails'
import Artisan from '../pages/dashboard/Artisan'
import ViewArtisanCategory from '../components/artisans/category/ViewArtisanCategory'
import AddArtisan from '../components/artisans/list/AddArtisan'
import ArtisanDetail from '../components/artisans/list/ArtisanDetail'
import AddArtisanGroup from '../components/artisans/group/AddArtisanGroup'
import ViewArtisanGroup from '../components/artisans/group/ViewArtisanGroup'
import Advert from '../pages/dashboard/Advert'
import AddAdvert from '../components/advert/AddAdvert'
import AdvertDetail from '../components/advert/AdvertDetail'
import AdvertClickView from '../components/advert/AdvertClickView'

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
            <Route
                path='security-company/:Id'
                element={<SecurityCompanyDetail />}
            />
            <Route
                path='security-company/add'
                element={<AddSecurityCompany />}
            />
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
            <Route path='wallet' element={<Wallet />} />
            <Route path='wallet/estate' element={<EstateWallet />} />
            <Route path='wallet/estate/:id' element={<EstateWalletDetails />} />
            <Route path='wallet/resident' element={<ResidentWallet />} />
            <Route
                path='wallet/resident/:id'
                element={<ResidentWalletDetails />}
            />
            <Route path='wallet/commission' element={<CommissionWallet />} />
            <Route
                path='wallet/commision/:id'
                element={<CommissionWalletDetails />}
            />
            <Route
                path='wallet/security-company'
                element={<SecurityCompanyWallet />}
            />
            <Route
                path='wallet/security-company/:id'
                element={<SecurityCompanyWalletDetails />}
            />
            <Route path='artisan' element={<Artisan />} />
            <Route
                path='artisan/category/:Id'
                element={<ViewArtisanCategory />}
            />
            <Route
                path='artisan/detail/:Id'
                element={<ArtisanDetail />}
            />
            <Route
                path='artisan/add'
                element={<AddArtisan />}
            />
            <Route
                path='artisan/group/add'
                element={<AddArtisanGroup />}
            />
            <Route
                path='artisan/group/:Id'
                element={<ViewArtisanGroup />}
            />
            <Route
                path='advert'
                element={<Advert />}
            />
            <Route
                path='advert/add'
                element={<AddAdvert />}
            />
            <Route
                path='advert/detail/:Id'
                element={<AdvertDetail />}
            />
            <Route
                path='advert/clickrate/increase:Id'
                element={<AdvertClickView />}
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
