import { Route } from 'react-router'

import SecurityCompanyOverview from '../../pages/SecurityCompany/dashboard/SecurityCompanyOverview'
import SecurityCompanyDashboard from '../../pages/SecurityCompany/Dashboard'
import Estates from '../../pages/SecurityCompany/dashboard/Estates/Estates'
import ViewEstate from '../../pages/SecurityCompany/dashboard/Estates/ViewEstate'
import ViewSecurityGuard from '../../pages/SecurityCompany/dashboard/Estates/ViewSecurityGuard'
import EstateWorkRate from '../../pages/SecurityCompany/dashboard/Estates/EstateWorkRate'
import EstateReport from '../../pages/SecurityCompany/dashboard/Estates/EstateReport'
import CompanyOverview from '../../pages/SecurityCompany/dashboard/company/CompanyOverview'
import ViewGuard from '../../pages/SecurityCompany/dashboard/company/ViewGuard'
import AddSecurityGuard from '../../pages/SecurityCompany/dashboard/company/AddSecurity/AddSecurityGuard'
import Messages from '../../pages/SecurityCompany/dashboard/Messages/Messages'
import ComposeMessage from '../../pages/SecurityCompany/dashboard/Messages/ComposeMessage'
import ViewMessage from '../../pages/SecurityCompany/dashboard/Messages/ViewMessage'
import Wallet from '../../pages/SecurityCompany/dashboard/wallet/Wallet'
import WalletTransactionDetails from '../../pages/SecurityCompany/dashboard/wallet/WalletTransactionDetails'
import PasswordSettings from '../../pages/SecurityCompany/dashboard/Settings/PasswordSettings'
import Settings from '../../pages/SecurityCompany/dashboard/Settings/Settings'
import { Link } from 'react-router-dom'

const securityCompanyRoutes = (
    <Route path='/securityCompany' element={<SecurityCompanyDashboard />}>
        <Route index element={<SecurityCompanyOverview />} />
        <Route path='estates' element={<Estates />} />
        <Route
            path='estates/detail/:Id'
            element={<ViewEstate />}
            handle={{
                // `crumb` is your own abstraction, we decided
                // to make this one a function so we can pass
                // the data from the loader to it so that our
                // breadcrumb is made up of dynamic content
                crumb: (data) => <span>{data.threadName}</span>,
            }}
        />
        <Route
            path='estates/securityGuard/:Id'
            element={<ViewSecurityGuard />}
        />
        <Route path='estates/workrate' element={<EstateWorkRate />} />
        <Route path='estates/estateReport' element={<EstateReport />} />
        <Route path='company-overview' element={<CompanyOverview />} />
        <Route path='company-overview/viewGuard/:Id' element={<ViewGuard />} />
        <Route
            path='company-overview/addSecurity'
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

export default securityCompanyRoutes
