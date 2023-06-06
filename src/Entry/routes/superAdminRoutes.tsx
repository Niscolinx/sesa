import { Route } from 'react-router-dom'

import Admin from '../../pages/superadmin/admin/Admin'
import AddAdmin from '../../pages/superadmin/admin/AddAdmin'
import ViewAdmin from '../../pages/superadmin/admin/ViewAdmin'

import EstateDetail from '../../pages/superadmin/estates/EstateDetail'
import EstateManagers from '../../pages/superadmin/estateManagers/EstateManagers'
// import RolesAndPerm from '../../pages/SuperAdmin/rolesAndPerm/RolesAndPerm'
import ResidentUserPackage from '../../pages/superadmin/residentUserPackage/ResidentUserPackage'
import ResidentPackageDetails from '../../pages/superadmin/residentUserPackage/packageHistory/ResidentPackageDetails'
import SecurityCompany from '../../pages/superadmin/securityCompany/SecurityCompany'
import SecurityCompanyDetail from '../../pages/superadmin/securityCompany/SecurityCompanyDetail'
import Wallet from '../../pages/superadmin/Wallet'

import Artisan from '../../pages/superadmin/artisans/Artisan'
import AddArtisan from '../../pages/superadmin/artisans/list/AddArtisan'
import ArtisanDetail from '../../pages/superadmin/artisans/list/ArtisanDetail'
import AddArtisanGroup from '../../pages/superadmin/artisans/group/AddArtisanGroup'
import ViewArtisanGroup from '../../pages/superadmin/artisans/group/ViewArtisanGroup'
import Advert from '../../pages/superadmin/advert/Advert'
import AddAdvert from '../../pages/superadmin/advert/AddAdvert'
import AdvertDetail from '../../pages/superadmin/advert/AdvertDetail'
import AddSOS from '../../pages/superadmin/platformSettings/settings/sos/AddSOS'
import SOSDetail from '../../pages/superadmin/platformSettings/settings/sos/SOSDetail'
import AddSecurityCompany from '../../pages/superadmin/securityCompany/AddSecurityCompany'
import SuperAdminDashboard from '../../pages/superadmin/Dashboard'
import Overview from '../../pages/superadmin/Overview'
import ViewArtisanCategory from '../../pages/superadmin/artisans/category/ViewArtisanCategory'
import AddProperty from '../../pages/superadmin/platformSettings/settings/property/AddProperty'
import Estates from '../../pages/superadmin/estates/Estates'
import EstateReport from '../../pages/superadmin/estates/EstateReport'
import ErrorBoundary from '../../components/ui/ErrorBoundary'
import AddEstate from '../../pages/superadmin/estates/AddEstate'
import AddEstateManager from '../../pages/superadmin/estateManagers/AddEstateManager'
import ViewEstateManager from '../../pages/superadmin/estateManagers/ViewEstateManager'
import AddResidentUserPackage from '../../pages/superadmin/residentUserPackage/residentPackage/AddResidentUserPackage'
import ViewProperty from '../../pages/superadmin/platformSettings/settings/property/ViewProperty'
import EditEstate from '../../pages/superadmin/estates/EditEstate'
import ViewPackage from '../../pages/superadmin/residentUserPackage/residentPackage/ViewPackage'

import SecurityManagers from '../../pages/superadmin/securityManagers/SecurityManagers'
import AddSecurityManager from '../../pages/superadmin/securityManagers/AddSecurityManager'
import ViewSecurityManager from '../../pages/superadmin/securityManagers/ViewSecurityManager'
import AdvertClicks from '../../pages/superadmin/advert/AdvertClicks'
import AdvertViews from '../../pages/superadmin/advert/AdvertViews'
import CommissionWalletDetails from '../../pages/superadmin/Wallet/commission/CommissionWalletDetails'
import CommissionWallet from '../../pages/superadmin/Wallet/commission/CommissionWallet'
import EstateWallet from '../../pages/superadmin/Wallet/estate/EstateWallet'
import ResidentWallet from '../../pages/superadmin/Wallet/resident/ResidentWallet'
import ResidentWalletDetails from '../../pages/superadmin/Wallet/resident/ResidentWalletDetails'
import SecurityCompanyWallet from '../../pages/superadmin/Wallet/security/SecurityCompanyWallet'
import PlatformSettings from '../../pages/superadmin/platformSettings/platformSettings'
import EstateWalletDetails from '../../pages/superadmin/Wallet/estate/EstateWalletDetails'

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
        {/* <Route
            path='wallet/security-company/:id'
            element={<SecurityCompanyWalletDetails />}
        /> */}
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
