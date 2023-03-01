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
import CreateHousehold from '../../pages/EstateManager/household/CreateHousehold'

const estateManagerRoutes = (
    <Route path='/estateManager' element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path='wallet' element={<Wallet />} />
        <Route path='wallet/transaction-details/:id' element={<WalletDetails />} />
        <Route path='residents' element={<Residents />} />
        <Route path='residents/add' element={<AddResident />} />
        <Route path='residents/edit/:id' element={<EditResident />} />
        <Route path='residents/view/:id' element={<ViewResident />} />
        <Route path='property' element={<Property />} />
        <Route path='property/add' element={<AddProperty />} />
        <Route path='property/view/:id' element={<ViewProperty />} />
        <Route path='household' element={<HouseHold />} />
        <Route path='household/create-household' element={<CreateHousehold />} />
    </Route>
)

export default estateManagerRoutes
