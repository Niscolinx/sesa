import { Route } from 'use-react-router-breadcrumbs'
import Dashboard from '../../pages/EstateManager/Dashboard'
import Overview from '../../pages/EstateManager/Overview'
import Wallet from '../../pages/EstateManager/wallet/Wallet'
import WalletDetails from '../../pages/EstateManager/wallet/WalletDetails'
import Residents from '../../pages/EstateManager/residents/Residents'
import AddResident from '../../pages/EstateManager/residents/AddResident'
import ViewResident from '../../pages/EstateManager/residents/viewResident'
import EditResident from '../../pages/EstateManager/residents/EditResident'
import Property from '../../pages/EstateManager/properties/Property'
import AddProperty from '../../pages/EstateManager/properties/AddProperty'
import ViewProperty from '../../pages/EstateManager/properties/ViewProperty'
import HouseHold from '../../pages/EstateManager/household/Household'
import CreateHousehold from '../../pages/EstateManager/household/createHouseHold/CreateHousehold'
import ViewHouseHold from '../../pages/EstateManager/household/viewHouseHold/ViewHouseHold'
import EditHousehold from '../../pages/EstateManager/household/EditHouseHold/EditHousehold'
import EstateStaff from '../../pages/EstateManager/estateStaff/EstateStaff'
import AddEstateStaff from '../../pages/EstateManager/estateStaff/AddEstateStaff'
import ViewEstateStaff from '../../pages/EstateManager/estateStaff/ViewEstateStaff'
import EditEstateStaff from '../../pages/EstateManager/estateStaff/EditEstateStaff'
import SiteWorker from '../../pages/EstateManager/siteWorker/SiteWorker'
import AddSiteWorker from '../../pages/EstateManager/siteWorker/AddSiteWorker'
import ViewSiteWorker from '../../pages/EstateManager/siteWorker/ViewSiteWorker'
import EditSiteWorker from '../../pages/EstateManager/siteWorker/EditSiteWorker'
import SecurityGuard from '../../pages/EstateManager/securityGuard/SecurityGuard'
import AddSecurityGuard from '../../pages/EstateManager/securityGuard/AddSecurityGuard'
import EditSecurityGuard from '../../pages/EstateManager/securityGuard/EditSecurityGuard'
import ViewSecurityGuard from '../../pages/EstateManager/securityGuard/ViewSecurityGuard'
import Artisan from '../../pages/EstateManager/artisan/Artisan'
import ViewArtisan from '../../pages/EstateManager/artisan/ViewArtisan'
import Message from '../../pages/EstateManager/messages/Message'
import ComposeMessage from '../../pages/EstateManager/messages/ComposeMessage'
import ViewMessage from '../../pages/EstateManager/messages/ViewMessage'
import Payments from '../../pages/EstateManager/payments/Payments'
import ViewPayment from '../../pages/EstateManager/payments/ViewPayment'
import CreatePayment from '../../pages/EstateManager/payments/create/CreatePayment'
import EnergyToken from '../../pages/EstateManager/energyToken/EnergyToken'
import AddEnergyToken from '../../pages/EstateManager/energyToken/AddEnergyToken'
import BulkUpload from '../../pages/EstateManager/energyToken/BulkUpload'
import Voting from '../../pages/EstateManager/voting/Voting'
import ViewEnergyToken from '../../pages/EstateManager/energyToken/ViewEnergyToken'
import CreateElection from '../../pages/EstateManager/voting/createElection'
import ViewElection from '../../pages/EstateManager/voting/ViewElection'
import VotePhysically from '../../pages/EstateManager/voting/VotePhysically'
import Reports from '../../pages/EstateManager/reports/Reports'
import ReportDetail from '../../pages/EstateManager/reports/ReportDetail'
import Approvals from '../../pages/EstateManager/approvals/Approvals'
import ApprovalDetail from '../../pages/EstateManager/approvals/ApprovalDetail'
import Rules from '../../pages/EstateManager/rules/Rules'
import AddRule from '../../pages/EstateManager/rules/AddRule'

const estateManagerRoutes = (
    <Route path='/estateManager' element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path='wallet' element={<Wallet />} />
        <Route
            path='wallet/transaction-details/:id'
            element={<WalletDetails />}
        />
        <Route path='residents' element={<Residents />} />
        <Route path='residents/add' element={<AddResident />} />
        <Route path='residents/edit/:id' element={<EditResident />} />
        <Route path='residents/view/:id' element={<ViewResident />} />
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
        <Route path='estate-staff/edit/:id' element={<EditEstateStaff />} />
        <Route path='site-worker' element={<SiteWorker />} />
        <Route path='site-worker/add' element={<AddSiteWorker />} />
        <Route path='site-worker/view/:id' element={<ViewSiteWorker />} />
        <Route path='site-worker/edit/:id' element={<EditSiteWorker />} />
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
        <Route path='voting-and-election/create-new-poll' element={<CreateElection />} />
        <Route path='voting-and-election/view/:id' element={<ViewElection />} />
        <Route path='voting-and-election/view/vote-physically' element={<VotePhysically />} />
        <Route path='reports' element={<Reports />} />
        <Route path='reports/view/:id' element={<ReportDetail />} />
        <Route path='approvals' element={<Approvals />} />
        <Route path='approvals/view/:id' element={<ApprovalDetail />} />
        <Route path='estate-rules-and-regulations' element={<Rules />} />
        <Route path='estate-rules-and-regulations/add' element={<AddRule />} />
    </Route>
)

export default estateManagerRoutes
