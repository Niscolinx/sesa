import { Route } from 'react-router-dom'

import SecurityCompanyOverview from '../../pages/securityCompany/dashboard/SecurityCompanyOverview'
import SecurityCompanyDashboard from '../../pages/securityCompany/Dashboard'
import Estates from '../../pages/securityCompany/dashboard/estates/Estates'
import ViewEstate from '../../pages/securityCompany/dashboard/estates/ViewEstate'
import ViewSecurityGuard from '../../pages/securityCompany/dashboard/estates/ViewSecurityGuard'
import EstateWorkRate from '../../pages/securityCompany/dashboard/estates/EstateWorkRate'
import EstateReport from '../../pages/securityCompany/dashboard/estates/EstateReport'
import CompanyOverview from '../../pages/securityCompany/dashboard/company/CompanyOverview'
import ViewGuard from '../../pages/securityCompany/dashboard/company/ViewGuard'
import AddSecurityGuard from '../../pages/securityCompany/dashboard/company/addSecurity/AddSecurityGuard'
import Messages from '../../pages/securityCompany/dashboard/messages/Messages'
import ComposeMessage from '../../pages/securityCompany/dashboard/messages/ComposeMessage'
import ViewMessage from '../../pages/securityCompany/dashboard/messages/ViewMessage'
import Wallet from '../../pages/securityCompany/dashboard/wallet/Wallet'
import WalletTransactionDetails from '../../pages/securityCompany/dashboard/wallet/WalletTransactionDetails'
import PasswordSettings from '../../pages/securityCompany/dashboard/settings/PasswordSettings'
import Settings from '../../pages/securityCompany/dashboard/settings/Settings'
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
