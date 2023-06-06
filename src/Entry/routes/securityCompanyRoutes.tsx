import { Route } from 'react-router-dom'

import SecurityCompanyOverview from '../../pages/securitycompany/dashboard/SecurityCompanyOverview'
import SecurityCompanyDashboard from '../../pages/securitycompany/Dashboard'
import Estates from '../../pages/securitycompany/dashboard/estates/Estates'
import ViewEstate from '../../pages/securitycompany/dashboard/estates/ViewEstate'
import ViewSecurityGuard from '../../pages/securitycompany/dashboard/estates/ViewSecurityGuard'
import EstateWorkRate from '../../pages/securitycompany/dashboard/estates/EstateWorkRate'
import EstateReport from '../../pages/securitycompany/dashboard/estates/EstateReport'
import CompanyOverview from '../../pages/securitycompany/dashboard/company/CompanyOverview'
import ViewGuard from '../../pages/securitycompany/dashboard/company/ViewGuard'
import AddSecurityGuard from '../../pages/securitycompany/dashboard/company/addSecurity/AddSecurityGuard'
import Messages from '../../pages/securitycompany/dashboard/messages/Messages'
import ComposeMessage from '../../pages/securitycompany/dashboard/messages/ComposeMessage'
import ViewMessage from '../../pages/securitycompany/dashboard/messages/ViewMessage'
import Wallet from '../../pages/securitycompany/dashboard/wallet/Wallet'
import WalletTransactionDetails from '../../pages/securitycompany/dashboard/wallet/WalletTransactionDetails'
import PasswordSettings from '../../pages/securitycompany/dashboard/settings/PasswordSettings'
import Settings from '../../pages/securitycompany/dashboard/settings/Settings'
import { Link } from 'react-router-dom'

const SecurityCompanyRoutes = (
    <Route path='/securityCompany' element={<SecurityCompanyDashboard />}>
        <Route index element={<SecurityCompanyOverview />} />
        <Route path='estates' element={<Estates />} />
        <Route path='estates/detail/:Id' element={<ViewEstate />} />
        <Route
            path='estates/securityGuard/:Id'
            element={<ViewSecurityGuard />}
        />
        <Route path='estates/workrate' element={<EstateWorkRate />} />
        <Route path='estates/estateReport' element={<EstateReport />} />
        <Route path='security-guard' element={<CompanyOverview />} />
        <Route path='security-guard/viewGuard/:Id' element={<ViewGuard />} />
        <Route
            path='security-guard/addSecurity'
            element={<AddSecurityGuard />}
        />
        <Route path='messages' element={<Messages />} />
        <Route path='messages/compose' element={<ComposeMessage />} />
        <Route path='messages/view/:Id' element={<ViewMessage />} />
        <Route path='wallet' element={<Wallet />} />
        <Route
            path='wallet/transactions/:Id'
            element={<WalletTransactionDetails />}
        />
        <Route path='settings/' element={<Settings />} />
    </Route>
)

export default SecurityCompanyRoutes
