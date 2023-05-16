import { Route } from 'react-router-dom'
import Dashboard from '../../pages/estateManager/Dashboard'
import Overview from '../../pages/estateManager/Overview'
import Wallet from '../../pages/estateManager/wallet/Wallet'
import WalletDetails from '../../pages/estateManager/wallet/WalletDetails'
import Residents from '../../pages/estateManager/residents/Residents'
import AddResident from '../../pages/estateManager/residents/AddResident'
import ViewResident from '../../pages/estateManager/residents/ViewResident'
import EditResident from '../../pages/estateManager/residents/EditResident'
import Property from '../../pages/estateManager/properties/Property'
import AddProperty from '../../pages/estateManager/properties/AddProperty'
import ViewProperty from '../../pages/estateManager/properties/ViewProperty'
import HouseHold from '../../pages/estateManager/household/Household'
import CreateHousehold from '../../pages/estateManager/household/createHouseHold/CreateHousehold'
import ViewHouseHold from '../../pages/estateManager/household/viewHouseHold/ViewHouseHold'
import EditHousehold from '../../pages/estateManager/household/editHouseHold/EditHousehold'
import EstateStaff from '../../pages/estateManager/estateStaff/EstateStaff'
import AddEstateStaff from '../../pages/estateManager/estateStaff/AddEstateStaff'
import ViewEstateStaff from '../../pages/estateManager/estateStaff/ViewEstateStaff'
import EditEstateStaff from '../../pages/estateManager/estateStaff/EditEstateStaff'
import SecurityGuard from '../../pages/estateManager/securityGuard/SecurityGuard'
import AddSecurityGuard from '../../pages/estateManager/securityGuard/AddSecurityGuard'
import EditSecurityGuard from '../../pages/estateManager/securityGuard/EditSecurityGuard'
import ViewSecurityGuard from '../../pages/estateManager/securityGuard/ViewSecurityGuard'
import Artisan from '../../pages/estateManager/artisan/Artisan'
import ViewArtisan from '../../pages/estateManager/artisan/ViewArtisan'
import Message from '../../pages/estateManager/messages/Message'
import ComposeMessage from '../../pages/estateManager/messages/ComposeMessage'
import ViewMessage from '../../pages/estateManager/messages/ViewMessage'
import Payments from '../../pages/estateManager/payments/Payments'
import ViewPayment from '../../pages/estateManager/payments/ViewPayment'
import CreatePayment from '../../pages/estateManager/payments/create/CreatePayment'
import EnergyToken from '../../pages/estateManager/energyToken/EnergyToken'
import AddEnergyToken from '../../pages/estateManager/energyToken/AddEnergyToken'
import Voting from '../../pages/estateManager/voting/Voting'
import ViewEnergyToken from '../../pages/estateManager/energyToken/ViewEnergyToken'
import CreateElection from '../../pages/estateManager/voting/createElection'
import ViewElection from '../../pages/estateManager/voting/ViewElection'
import VotePhysically from '../../pages/estateManager/voting/VotePhysically'
import Reports from '../../pages/estateManager/reports/Reports'
import ReportDetail from '../../pages/estateManager/reports/ReportDetail'
import Approvals from '../../pages/estateManager/approvals/Approvals'
import ApprovalDetail from '../../pages/estateManager/approvals/ApprovalDetail'
import Rules from '../../pages/estateManager/rules/Rules'
import AddRule from '../../pages/estateManager/rules/AddRule'
import BulkUpload from '../../pages/estateManager/energyToken/BulkUpload'
import EditSiteWorker from '../../pages/estateManager/siteWorker/EditSiteWorker'
import SiteWorker from '../../pages/estateManager/siteWorker/SiteWorker'
import ViewSiteWorker from '../../pages/estateManager/siteWorker/ViewSiteWorker'
import AddSiteWorker from '../../pages/estateManager/siteWorker/AddSiteWorker'

const EstateManagerRoutes = (
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
