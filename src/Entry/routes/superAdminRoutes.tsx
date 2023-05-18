import { Route } from 'react-router-dom'

import Admin from '../../pages/superAdmin/admin/Admin'
import AddAdmin from '../../pages/superAdmin/admin/AddAdmin'
import ViewAdmin from '../../pages/superAdmin/admin/ViewAdmin'

import EstateDetail from '../../pages/superAdmin/estates/EstateDetail'
import EstateManagers from '../../pages/superAdmin/estateManagers/EstateManagers'
// import RolesAndPerm from '../../pages/SuperAdmin/rolesAndPerm/RolesAndPerm'
import ResidentUserPackage from '../../pages/superAdmin/residentUserPackage/ResidentUserPackage'
import ResidentPackageDetails from '../../pages/superAdmin/residentUserPackage/packageHistory/ResidentPackageDetails'
import SecurityCompany from '../../pages/superAdmin/securityCompany/SecurityCompany'
import SecurityCompanyDetail from '../../pages/superAdmin/securityCompany/SecurityCompanyDetail'
import Wallet from '../../pages/superAdmin/Wallet'

import SecurityCompanyWalletDetails from '../../pages/estateManager/wallet/wallets-old/SecurityCompanyDetails'
import Artisan from '../../pages/superAdmin/artisans/Artisan'
import AddArtisan from '../../pages/superAdmin/artisans/list/AddArtisan'
import ArtisanDetail from '../../pages/superAdmin/artisans/list/ArtisanDetail'
import AddArtisanGroup from '../../pages/superAdmin/artisans/group/AddArtisanGroup'
import ViewArtisanGroup from '../../pages/superAdmin/artisans/group/ViewArtisanGroup'
import Advert from '../../pages/superAdmin/advert/Advert'
import AddAdvert from '../../pages/superAdmin/advert/AddAdvert'
import AdvertDetail from '../../pages/superAdmin/advert/AdvertDetail'
import AddSOS from '../../pages/superAdmin/platformSettings/settings/sos/AddSOS'
import SOSDetail from '../../pages/superAdmin/platformSettings/settings/sos/SOSDetail'
import AddSecurityCompany from '../../pages/superAdmin/securityCompany/AddSecurityCompany'
import SuperAdminDashboard from '../../pages/superAdmin/Dashboard'
import Overview from '../../pages/superAdmin/Overview'
import ViewArtisanCategory from '../../pages/superAdmin/artisans/category/ViewArtisanCategory'
import AddProperty from '../../pages/superAdmin/platformSettings/settings/property/AddProperty'
import Estates from '../../pages/superAdmin/estates/Estates'
import EstateReport from '../../pages/superAdmin/estates/EstateReport'
import ErrorBoundary from '../../components/ui/ErrorBoundary'
import AddEstate from '../../pages/superAdmin/estates/AddEstate'
import AddEstateManager from '../../pages/superAdmin/estateManagers/AddEstateManager'
import ViewEstateManager from '../../pages/superAdmin/estateManagers/ViewEstateManager'
import AddResidentUserPackage from '../../pages/superAdmin/residentUserPackage/residentPackage/AddResidentUserPackage'
import ViewProperty from '../../pages/superAdmin/platformSettings/settings/property/ViewProperty'
import EditEstate from '../../pages/superAdmin/estates/EditEstate'
import ViewPackage from '../../pages/superAdmin/residentUserPackage/residentPackage/ViewPackage'

import SecurityManagers from '../../pages/superAdmin/securityManagers/SecurityManagers'
import AddSecurityManager from '../../pages/superAdmin/securityManagers/AddSecurityManager'
import ViewSecurityManager from '../../pages/superAdmin/securityManagers/ViewSecurityManager'
import AdvertClicks from '../../pages/superAdmin/advert/AdvertClicks'
import AdvertViews from '../../pages/superAdmin/advert/AdvertViews'
import CommissionWalletDetails from '../../pages/superAdmin/Wallet/commission/CommissionWalletDetails'
import CommissionWallet from '../../pages/superAdmin/Wallet/commission/CommissionWallet'
import EstateWallet from '../../pages/superAdmin/Wallet/estate/EstateWallet'
import ResidentWallet from '../../pages/superAdmin/Wallet/resident/ResidentWallet'
import ResidentWalletDetails from '../../pages/superAdmin/Wallet/resident/ResidentWalletDetails'
import SecurityCompanyWallet from '../../pages/superAdmin/Wallet/security/SecurityCompanyWallet'
import PlatformSettings from '../../pages/superAdmin/platformSettings/platformSettings'
import EstateWalletDetails from '../../pages/superAdmin/Wallet/estate/EstateWalletDetails'

const SuperAdminRoutes = (
    <Route
        path='/superAdmin'
        element={<SuperAdminDashboard />}
        errorElement={<ErrorBoundary />}
    >
        <Route index element={<Overview />} />
        <Route path='admin' element={<Admin />} />
        <Route path='admin/add' element={<AddAdmin />} />
        <Route path='admin/view/:id' element={<ViewAdmin />} />
        <Route path='estates' element={<Estates />} />
        <Route path='estates/detail/:id' element={<EstateDetail />} />
        <Route path='estates/add' element={<AddEstate />} />
        <Route path='estates/report/:id' element={<EstateReport />} />
        <Route path='estates/edit/:id' element={<EditEstate />} />
        <Route path='security-company' element={<SecurityCompany />} />
        <Route
            path='security-company/:id'
            element={<SecurityCompanyDetail />}
        />
        <Route path='security-company/add' element={<AddSecurityCompany />} />
        <Route
            path='security-company/view/:id'
            element={<SecurityCompanyDetail />}
        />
        <Route path='estateManagers' element={<EstateManagers />} />
        <Route path='estateManagers/add' element={<AddEstateManager />} />
        <Route path='estateManagers/view/:id' element={<ViewEstateManager />} />

        {/* <Route path='roles-and-permissions' element={<RolesAndPerm />} /> */}
        <Route path='resident-user-package' element={<ResidentUserPackage />} />
        <Route
            path='resident-user-package/add'
            element={<AddResidentUserPackage />}
        />
        <Route
            path='resident-user-package/view/:id'
            element={<ViewPackage />}
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
        <Route path='securityManagers' element={<SecurityManagers />} />
        <Route path='securityManagers/add' element={<AddSecurityManager />} />
        <Route
            path='securityManagers/view/:id'
            element={<ViewSecurityManager />}
        />

        <Route path='artisan' element={<Artisan />} />
        <Route path='artisan/category/:id' element={<ViewArtisanCategory />} />
        <Route path='artisan/detail/:id' element={<ArtisanDetail />} />
        <Route path='artisan/add-list' element={<AddArtisan />} />
        <Route path='artisan/add-group' element={<AddArtisanGroup />} />
        <Route path='artisan/group/:id' element={<ViewArtisanGroup />} />
        <Route path='advert' element={<Advert />} />
        <Route path='advert/add' element={<AddAdvert />} />
        <Route path='advert/detail/:id' element={<AdvertDetail />} />
        <Route path='advert/clicks/:id' element={<AdvertClicks />} />
        <Route path='advert/views/:id' element={<AdvertViews />} />
        <Route path='platformSettings' element={<PlatformSettings />} />
        <Route path='platformSettings/addProperty' element={<AddProperty />} />
        <Route path='platformSettings/view/:id' element={<ViewProperty />} />
        <Route path='platformSettings/addSOS' element={<AddSOS />} />
        <Route path='platformSettings/SOSDetail/:id' element={<SOSDetail />} />
    </Route>
)

export default SuperAdminRoutes
