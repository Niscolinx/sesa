//import { Route } from 'react-router-dom'
import { Route } from 'use-react-router-breadcrumbs'

import Admins from '../../pages/SuperAdmin/admins/Admins'
import AddAdmin from '../../pages/SuperAdmin/admins/AddAdmin'

import EstateDetail from '../../pages/SuperAdmin/estates/EstateDetail'
import EstateManagers from '../../pages/SuperAdmin/estateManagers/EstateManagers'
import RolesAndPerm from '../../pages/SuperAdmin/rolesAndPerm/RolesAndPerm'
import AdditionalResident from '../../pages/SuperAdmin/additionalResident/AdditionalResident'
import AdditionalResidentDetails from '../../pages/SuperAdmin/additionalResident/AdditionalResidentDetails'
import SecurityCompany from '../../pages/SuperAdmin/securityCompany/SecurityCompany'
import SecurityCompanyDetail from '../../pages/SuperAdmin/securityCompany/SecurityCompanyDetail'
import Wallet from '../../pages/SuperAdmin/Wallet'
import EstateWallet from '../../pages/SuperAdmin/Wallet/EstateWallet'
import EstateWalletDetails from '../../pages/EstateManager/wallet/wallets/EstateWalletDetails'
import ResidentWallet from '../../pages/SuperAdmin/Wallet/ResidentWallet'
import ResidentWalletDetails from '../../pages/EstateManager/wallet/wallets/resident/ResidentWalletDetails'
import CommissionWallet from '../../pages/SuperAdmin/Wallet/CommissionWallet'
import CommissionWalletDetails from '../../pages/EstateManager/wallet/wallets/CommissionWalletDetails'
import SecurityCompanyWallet from '../../pages/SuperAdmin/Wallet/SecurityCompanyWallet'
import SecurityCompanyWalletDetails from '../../pages/EstateManager/wallet/wallets/SecurityCompanyDetails'
import Artisan from '../../pages/SuperAdmin/artisans/Artisan'
import AddArtisan from '../../pages/SuperAdmin/artisans/list/AddArtisan'
import ArtisanDetail from '../../pages/SuperAdmin/artisans/list/ArtisanDetail'
import AddArtisanGroup from '../../pages/SuperAdmin/artisans/group/AddArtisanGroup'
import ViewArtisanGroup from '../../pages/SuperAdmin/artisans/group/ViewArtisanGroup'
import Advert from '../../pages/SuperAdmin/advert/Advert'
import AddAdvert from '../../pages/SuperAdmin/advert/AddAdvert'
import AdvertDetail from '../../pages/SuperAdmin/advert/AdvertDetail'
import AdvertClickrateIncrease from '../../pages/SuperAdmin/advert/AdvertClickrateIncrease'
import AdvertClickrateDecrease from '../../pages/SuperAdmin/advert/AdvertClickrateDecrease'
import PlatformSettings from '../../pages/SuperAdmin/platformSettings/platformSettings'
import AddSOS from '../../pages/SuperAdmin/platformSettings/settings/AddSOS'
import SOSDetails from '../../pages/SuperAdmin/platformSettings/settings/SOSDetails'
import AddSecurityCompany from '../../pages/SuperAdmin/securityCompany/AddSecurityCompany'
import SuperAdminDashboard from '../../pages/SuperAdmin/Dashboard'
import Overview from '../../pages/SuperAdmin/Overview'
import ViewArtisanCategory from '../../pages/SuperAdmin/artisans/category/ViewArtisanCategory'
import AddProperty from '../../pages/SuperAdmin/platformSettings/settings/AddProperty'
import Estates from '../../pages/SuperAdmin/estates/Estates'
import EstateReport from '../../pages/SuperAdmin/estates/EstateReport'
import ViewAdmin from '../../pages/SuperAdmin/admins/ViewAdmin'
import ErrorBoundary from '../../components/UI/ErrorBoundary'
import AddEstate from '../../pages/SuperAdmin/estates/AddEstate'
import AddEstateManager from '../../pages/SuperAdmin/estateManagers/AddEstateManager'
import ViewEstateManager from '../../pages/SuperAdmin/estateManagers/ViewEstateManager'

const superAdminRoutes = (
    <Route
        path='/superAdmin'
        element={<SuperAdminDashboard />}
        errorElement={<ErrorBoundary />}
    >
        <Route index element={<Overview />} />
        <Route path='admins' element={<Admins />} />
        <Route path='admins/add' element={<AddAdmin />} />
        <Route path='admins/view/:Id' element={<ViewAdmin />} />
        <Route path='estates' element={<Estates />} />
        <Route path='estates/detail/:Id' element={<EstateDetail />} />
        <Route path='estates/add' element={<AddEstate />} />
        <Route path='estates/report/:Id' element={<EstateReport />} />
        <Route path='security-company' element={<SecurityCompany />} />
        <Route
            path='security-company/:Id'
            element={<SecurityCompanyDetail />}
        />
        <Route path='security-company/add' element={<AddSecurityCompany />} />
        <Route path='estateManagers' element={<EstateManagers />} />
        <Route path='estateManagers/add' element={<AddEstateManager />} />
        <Route path='estateManagers/view/:Id' element={<ViewEstateManager />} />

        <Route path='roles-and-permissions' element={<RolesAndPerm />} />
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
