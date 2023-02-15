import { Route } from 'react-router'

import SecurityCompanyOverview from '../../pages/SecurityCompany/dashboard/SecurityCompanyOverview'
import SecurityCompanyDashboard from '../../pages/SecurityCompany/Dashboard'

export const securityCompanyRoutes = (
    <Route path='/securityCompany' element={<SecurityCompanyDashboard />}>
        <Route index element={<SecurityCompanyOverview />} />
    </Route>
)
