import { Route } from 'react-router'

import SecurityCompanyOverview from '../../pages/SecurityCompany/dashboard/SecurityCompanyOverview'
import SecurityCompanyDashboard from '../../pages/SecurityCompany/Dashboard'
import Estates from '../../pages/SecurityCompany/dashboard/Estates/Estates'

 const securityCompanyRoutes = (
     <Route path='/securityCompany' element={<SecurityCompanyDashboard />}>
         <Route index element={<SecurityCompanyOverview />} />
         <Route path='estates' element={<Estates />} />
     </Route>
 )

export default securityCompanyRoutes
