import { Route } from 'react-router'

import SecurityCompanyOverview from '../../pages/SecurityCompany/dashboard/SecurityCompanyOverview'
import SecurityCompanyDashboard from '../../pages/SecurityCompany/Dashboard'
import Estates from '../../pages/SecurityCompany/dashboard/Estates/Estates'
import ViewEstate from '../../pages/SecurityCompany/dashboard/Estates/ViewEstate'

 const securityCompanyRoutes = (
     <Route path='/securityCompany' element={<SecurityCompanyDashboard />}>
         <Route index element={<SecurityCompanyOverview />} />
         <Route path='estates' element={<Estates />} />
         <Route path='estates/detail/:Id' element={<ViewEstate />} />
     </Route>
 )

export default securityCompanyRoutes
