import { Route } from 'react-router-dom'

import Admin from '../../pages/SuperAdmin/admin/Admin'
import AddAdmin from '../../pages/SuperAdmin/admin/AddAdmin'
import ViewAdmin from '../../pages/SuperAdmin/admin/ViewAdmin'

import EstateDetail from '../../pages/SuperAdmin/estates/EstateDetail'
import EstateManagers from '../../pages/SuperAdmin/estateManagers/EstateManagers'
// import RolesAndPerm from '../../pages/SuperAdmin/rolesAndPerm/RolesAndPerm'
import ResidentUserPackage from '../../pages/SuperAdmin/residentUserPackage/ResidentUserPackage'
import ResidentPackageDetails from '../../pages/SuperAdmin/residentUserPackage/packageHistory/ResidentPackageDetails'
import SecurityCompany from '../../pages/SuperAdmin/securityCompany/SecurityCompany'
import SecurityCompanyDetail from '../../pages/SuperAdmin/securityCompany/SecurityCompanyDetail'
import Wallet from '../../pages/SuperAdmin/Wallet'
import EstateWallet from '../../pages/SuperAdmin/Wallet/estate/EstateWallet'
import EstateWalletDetails from '../../pages/EstateManager/wallet/wallets/EstateWalletDetails'
import ResidentWallet from '../../pages/SuperAdmin/Wallet/resident/ResidentWallet'
import ResidentWalletDetails from '../../pages/EstateManager/wallet/wallets/resident/ResidentWalletDetails'
import CommissionWallet from '../../pages/SuperAdmin/Wallet/commission/CommissionWallet'
import CommissionWalletDetails from '../../pages/EstateManager/wallet/wallets/CommissionWalletDetails'
import SecurityCompanyWallet from '../../pages/SuperAdmin/Wallet/security/SecurityCompanyWallet'
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
import AddSOS from '../../pages/SuperAdmin/platformSettings/settings/SOS/AddSOS'
import SOSDetails from '../../pages/SuperAdmin/platformSettings/settings/SOS/SOSDetails'
import AddSecurityCompany from '../../pages/SuperAdmin/securityCompany/AddSecurityCompany'
import SuperAdminDashboard from '../../pages/SuperAdmin/Dashboard'
import Overview from '../../pages/SuperAdmin/Overview'
import ViewArtisanCategory from '../../pages/SuperAdmin/artisans/category/ViewArtisanCategory'
import AddProperty from '../../pages/SuperAdmin/platformSettings/settings/property/AddProperty'
import Estates from '../../pages/SuperAdmin/estates/Estates'
import EstateReport from '../../pages/SuperAdmin/estates/EstateReport'
import ErrorBoundary from '../../components/UI/ErrorBoundary'
import AddEstate from '../../pages/SuperAdmin/estates/AddEstate'
import AddEstateManager from '../../pages/SuperAdmin/estateManagers/AddEstateManager'
import ViewEstateManager from '../../pages/SuperAdmin/estateManagers/ViewEstateManager'
import AddResidentUserPackage from '../../pages/SuperAdmin/residentUserPackage/residentPackage/AddResidentUserPackage'
import ViewProperty from '../../pages/SuperAdmin/platformSettings/settings/property/ViewProperty'
import EditEstate from '../../pages/SuperAdmin/estates/EditEstate'
import ViewPackage from '../../pages/SuperAdmin/residentUserPackage/residentPackage/ViewPackage'

const superAdminRoutes = (
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
        <Route path='artisan' element={<Artisan />} />
        <Route path='artisan/category/:id' element={<ViewArtisanCategory />} />
        <Route path='artisan/detail/:id' element={<ArtisanDetail />} />
        <Route path='artisan/add-list' element={<AddArtisan />} />
        <Route path='artisan/add-group' element={<AddArtisanGroup />} />
        <Route path='artisan/group/:id' element={<ViewArtisanGroup />} />
        <Route path='advert' element={<Advert />} />
        <Route path='advert/add' element={<AddAdvert />} />
        <Route path='advert/detail/:id' element={<AdvertDetail />} />
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
        <Route path='platformSettings/view/:id' element={<ViewProperty />} />
        <Route path='platformSettings/addSOS' element={<AddSOS />} />
        <Route
            path='platformSettings/SOSDetails/:id'
            element={<SOSDetails />}
        />
    </Route>
)

export default superAdminRoutes
