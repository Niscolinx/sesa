import { Route } from 'react-router'

import SecurityCompanyOverview from '../../pages/SecurityCompany/dashboard/SecurityCompanyOverview'
import SecurityCompanyDashboard from '../../pages/SecurityCompany/Dashboard'
import Estates from '../../pages/SecurityCompany/dashboard/Estates/Estates'
import ViewEstate from '../../pages/SecurityCompany/dashboard/Estates/ViewEstate'
import ViewSecurityGuard from '../../pages/SecurityCompany/dashboard/Estates/ViewSecurityGuard'
import EstateWorkRate from '../../pages/SecurityCompany/dashboard/Estates/EstateWorkRate'
import EstateReport from '../../pages/SecurityCompany/dashboard/Estates/EstateReport'
import Overview from '../../pages/SecurityCompany/dashboard/company/Overview'

 const securityCompanyRoutes = (
     <Route path='/securityCompany' element={<SecurityCompanyDashboard />}>
         <Route index element={<SecurityCompanyOverview />} />
         <Route path='estates' element={<Estates />} />
         <Route path='estates/detail/:Id' element={<ViewEstate />} />
         <Route path='estates/securityGuard/:Id' element={<ViewSecurityGuard />} />
         <Route path='estates/workrate' element={<EstateWorkRate />} />
         <Route path='estates/estateReport' element={<EstateReport />} />
         <Route path='company/' element={<Overview />} />
     </Route>
 )

export default securityCompanyRoutes
