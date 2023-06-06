import { Route } from 'react-router-dom'
import Dashboard from '../../pages/estatemanager/Dashboard'
import Overview from '../../pages/estatemanager/Overview'
import Wallet from '../../pages/estatemanager/wallet/Wallet'
import WalletDetails from '../../pages/estatemanager/wallet/WalletDetails'
import Residents from '../../pages/estatemanager/residents/Residents'
import AddResident from '../../pages/estatemanager/residents/AddResident'
import Property from '../../pages/estatemanager/properties/Property'
import AddProperty from '../../pages/estatemanager/properties/AddProperty'
import ViewProperty from '../../pages/estatemanager/properties/ViewProperty'
import HouseHold from '../../pages/estatemanager/household/Household'
import CreateHousehold from '../../pages/estatemanager/household/createHouseHold/CreateHousehold'
import ViewHouseHold from '../../pages/estatemanager/household/viewHouseHold/ViewHouseHold'
import EditHousehold from '../../pages/estatemanager/household/editHouseHold/EditHousehold'
import EstateStaff from '../../pages/estatemanager/estateStaff/EstateStaff'
import AddEstateStaff from '../../pages/estatemanager/estateStaff/AddEstateStaff'
import ViewEstateStaff from '../../pages/estatemanager/estateStaff/ViewEstateStaff'
import SecurityGuard from '../../pages/estatemanager/securityGuard/SecurityGuard'
import AddSecurityGuard from '../../pages/estatemanager/securityGuard/AddSecurityGuard'
import EditSecurityGuard from '../../pages/estatemanager/securityGuard/EditSecurityGuard'
import ViewSecurityGuard from '../../pages/estatemanager/securityGuard/ViewSecurityGuard'
import Artisan from '../../pages/estatemanager/artisan/Artisan'
import ViewArtisan from '../../pages/estatemanager/artisan/ViewArtisan'
import Message from '../../pages/estatemanager/Messages/Message'
import ComposeMessage from '../../pages/estatemanager/Messages/ComposeMessage'
import ViewMessage from '../../pages/estatemanager/Messages/ViewMessage'
import Payments from '../../pages/estatemanager/payments/Payments'
import ViewPayment from '../../pages/estatemanager/payments/ViewPayment'
import CreatePayment from '../../pages/estatemanager/payments/create/CreatePayment'
import EnergyToken from '../../pages/estatemanager/energyToken/EnergyToken'
import AddEnergyToken from '../../pages/estatemanager/energyToken/AddEnergyToken'
import Voting from '../../pages/estatemanager/voting/Voting'
import ViewEnergyToken from '../../pages/estatemanager/energyToken/ViewEnergyToken'
import CreateElection from '../../pages/estatemanager/voting/createElection'
import ViewElection from '../../pages/estatemanager/voting/ViewElection'
import VotePhysically from '../../pages/estatemanager/voting/VotePhysically'
import Reports from '../../pages/estatemanager/reports/Reports'
import ReportDetail from '../../pages/estatemanager/reports/ReportDetail'
import ApprovalDetail from '../../pages/estatemanager/approvals/ApprovalDetail'
import Rules from '../../pages/estatemanager/rules/Rules'
import AddRule from '../../pages/estatemanager/rules/AddRule'
import SiteWorker from '../../pages/estatemanager/siteWorker/SiteWorker'
import ViewSiteWorker from '../../pages/estatemanager/siteWorker/ViewSiteWorker'
import AddSiteWorker from '../../pages/estatemanager/siteWorker/AddSiteWorker'
import Approvals from '../../pages/estatemanager/approvals/Approvals'
import BulkUpload from '../../pages/estatemanager/energyToken/BulkUpload'
import ViewResident from '../../pages/estatemanager/residents/ViewResident'
import AddEstateAdmin from '../../pages/estatemanager/estateAdmins/AddEstateAdmin'
import EstateAdmin from '../../pages/estatemanager/estateAdmins/EstateAdmin'
import ViewEstateAdmin from '../../pages/estatemanager/estateAdmins/ViewEstateAdmin'

const EstateManagerRoutes = (
    <Route path='/estateManager' element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path='wallet' element={<Wallet />} />
        <Route
            path='wallet/transaction-details/:id'
            element={<WalletDetails />}
        />
        <Route path='estate-admin' element={<EstateAdmin />} />
        <Route path='estate-admin/add' element={<AddEstateAdmin />} />
        <Route path='estate-admin/view/:id' element={<ViewEstateAdmin />} />
        <Route path='resident' element={<Residents />} />
        <Route path='resident/add' element={<AddResident />} />
        <Route path='resident/view/:id' element={<ViewResident />} />
        <Route path='property' element={<Property />} />
        <Route path='property/add' element={<AddProperty />} />
        <Route path='property/view/:id' element={<ViewProperty />} />
        <Route path='household' element={<HouseHold />} />
        <Route
            path='household/create-household'
            element={<CreateHousehold />}
        />
        <Route
            path='household/edit-household/:id'
            element={<EditHousehold />}
        />
        <Route path='household/view-details/:id' element={<ViewHouseHold />} />
        <Route path='household/view-details/:id' element={<ViewHouseHold />} />
        <Route path='estate-staff' element={<EstateStaff />} />
        <Route path='estate-staff/add' element={<AddEstateStaff />} />
        <Route path='estate-staff/view/:id' element={<ViewEstateStaff />} />
        <Route path='site-worker' element={<SiteWorker />} />
        <Route path='site-worker/add' element={<AddSiteWorker />} />
        <Route path='site-worker/view/:id' element={<ViewSiteWorker />} />
        <Route path='security-guard' element={<SecurityGuard />} />
        <Route path='security-guard/add' element={<AddSecurityGuard />} />
        <Route path='security-guard/edit/:id' element={<EditSecurityGuard />} />
        <Route path='security-guard/view/:id' element={<ViewSecurityGuard />} />
        <Route path='artisan' element={<Artisan />} />
        <Route path='artisan/view/:id' element={<ViewArtisan />} />
        <Route path='message' element={<Message />} />
        <Route path='message/compose' element={<ComposeMessage />} />
        <Route path='message/view/:id' element={<ViewMessage />} />
        <Route path='payments' element={<Payments />} />
        <Route path='payments/view/:id' element={<ViewPayment />} />
        <Route path='payments/create' element={<CreatePayment />} />
        <Route path='energy-token' element={<EnergyToken />} />
        <Route path='energy-token/add' element={<AddEnergyToken />} />
        <Route path='energy-token/view/:id' element={<ViewEnergyToken />} />
        <Route path='energy-token/bulk-upload' element={<BulkUpload />} />
        <Route path='voting-and-election' element={<Voting />} />
        <Route
            path='voting-and-election/create-new-poll'
            element={<CreateElection />}
        />
        <Route path='voting-and-election/view/:id' element={<ViewElection />} />
        <Route
            path='voting-and-election/view/vote-physically'
            element={<VotePhysically />}
        />
        <Route path='reports' element={<Reports />} />
        <Route path='reports/view/:id' element={<ReportDetail />} />
        <Route path='approvals' element={<Approvals />} />
        <Route path='approvals/view/:id' element={<ApprovalDetail />} />
        <Route path='estate-rules-and-regulations' element={<Rules />} />
        <Route path='estate-rules-and-regulations/add' element={<AddRule />} />
    </Route>
)

export default EstateManagerRoutes
