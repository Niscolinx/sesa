//import { Route } from 'react-router-dom'
import { Route } from 'use-react-router-breadcrumbs'

import EstateDetail from '../../pages/SuperAdmin/Estate/EstateDetail'
import EstateManagers from '../../pages/SuperAdmin/EstateManagers'
import Estates from '../../pages/SuperAdmin/Estate/Estates'
import RolesAndPerm from '../../pages/SuperAdmin/RolesAndPerm'
import AdditionalResident from '../../pages/SuperAdmin/AdditionalResident'
import AdditionalResidentDetails from '../../components/SuperAdmin/additionalResident/AdditionalResidentDetails'
import SecurityCompany from '../../pages/SuperAdmin/SecurityCompany'
import SecurityCompanyDetail from '../../components/SuperAdmin/securityCompany/SecurityCompanyDetail'
import Wallet from '../../pages/SuperAdmin/Wallet'
import EstateWallet from '../../pages/SuperAdmin/Wallet/EstateWallet'
import EstateWalletDetails from '../../components/SuperAdmin/wallet/EstateWalletDetails'
import ResidentWallet from '../../pages/SuperAdmin/Wallet/ResidentWallet'
import ResidentWalletDetails from '../../components/SuperAdmin/wallet/resident/ResidentWalletDetails'
import CommissionWallet from '../../pages/SuperAdmin/Wallet/CommissionWallet'
import CommissionWalletDetails from '../../components/SuperAdmin/wallet/CommissionWalletDetails'
import SecurityCompanyWallet from '../../pages/SuperAdmin/Wallet/SecurityCompanyWallet'
import SecurityCompanyWalletDetails from '../../components/SuperAdmin/wallet/SecurityCompanyDetails'
import Artisan from '../../pages/SuperAdmin/Artisan'
import ViewArtisanCategory from '../../components/SuperAdmin/artisans/category/ViewArtisanCategory'
import AddArtisan from '../../components/SuperAdmin/artisans/list/AddArtisan'
import ArtisanDetail from '../../components/SuperAdmin/artisans/list/ArtisanDetail'
import AddArtisanGroup from '../../components/SuperAdmin/artisans/group/AddArtisanGroup'
import ViewArtisanGroup from '../../components/SuperAdmin/artisans/group/ViewArtisanGroup'
import Advert from '../../pages/SuperAdmin/Advert'
import AddAdvert from '../../components/SuperAdmin/advert/AddAdvert'
import AdvertDetail from '../../components/SuperAdmin/advert/AdvertDetail'
import AdvertClickrateIncrease from '../../components/SuperAdmin/advert/AdvertClickrateIncrease'
import AdvertClickrateDecrease from '../../components/SuperAdmin/advert/AdvertClickrateDecrease'
import PlatformSettings from '../../pages/SuperAdmin/platformSettings'
import AddProperty from '../../components/SuperAdmin/platformSettings/AddProperty'
import AddSOS from '../../components/SuperAdmin/platformSettings/AddSOS'
import SOSDetails from '../../components/SuperAdmin/platformSettings/SOSDetails'
import AddSecurityCompany from '../../components/SuperAdmin/securityCompany/AddSecurityCompany'
import SuperAdminDashboard from '../../pages/SuperAdmin/Dashboard'
import Admins from '../../pages/SuperAdmin/admins/Admins'
import Overview from '../../pages/SuperAdmin/Overview'
import EstateReport from '../../pages/SuperAdmin/Estate/EstateReport'

const superAdminRoutes = (
    <Route path='/superAdmin' element={<SuperAdminDashboard />}>
        <Route index element={<Overview />} />
        <Route path='admins' element={<Admins />} />
        <Route path='estates' element={<Estates />} />
        <Route path='estates/detail/:Id' element={<EstateDetail />} />
        <Route path='estates/detail/report/:Id' element={<EstateReport />} />
        <Route path='security-company' element={<SecurityCompany />} />
        <Route
            path='security-company/:Id'
            element={<SecurityCompanyDetail />}
        />
        <Route path='security-company/add' element={<AddSecurityCompany />} />
        <Route path='estateManagers' element={<EstateManagers />} />
        <Route path='rolesAndPerm' element={<RolesAndPerm />} />
        <Route path='additional-resident' element={<AdditionalResident />} />
        <Route
            path='additional-resident/:Id'
            element={<AdditionalResidentDetails />}
        />
        <Route path='wallet' element={<Wallet />} />
        <Route path='wallet/estate' element={<EstateWallet />} />
        <Route path='wallet/estate/:id' element={<EstateWalletDetails />} />
        <Route path='wallet/resident' element={<ResidentWallet />} />
        <Route path='wallet/resident/:id' element={<ResidentWalletDetails />} />
        <Route path='wallet/commission' element={<CommissionWallet />} />
        <Route
            path='wallet/commission/:id'
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
        <Route path='artisan/category/:Id' element={<ViewArtisanCategory />} />
        <Route path='artisan/detail/:Id' element={<ArtisanDetail />} />
        <Route path='artisan/add' element={<AddArtisan />} />
        <Route path='artisan/group/add' element={<AddArtisanGroup />} />
        <Route path='artisan/group/:Id' element={<ViewArtisanGroup />} />
        <Route path='advert' element={<Advert />} />
        <Route path='advert/add' element={<AddAdvert />} />
        <Route path='advert/detail/:Id' element={<AdvertDetail />} />
        <Route
            path='advert/clickrate/increase'
            element={<AdvertClickrateIncrease />}
        />
        <Route
            path='advert/clickrate/decrease'
            element={<AdvertClickrateDecrease />}
        />
        <Route path='platformSettings' element={<PlatformSettings />} />
        <Route path='platformSettings/addProperty' element={<AddProperty />} />
        <Route path='platformSettings/addSOS' element={<AddSOS />} />
        <Route
            path='platformSettings/SOSDetails/:Id'
            element={<SOSDetails />}
        />
    </Route>
)

export default superAdminRoutes
