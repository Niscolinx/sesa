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
import EstateStaff from '../../pages/EstateManager/EstateStaff/EstateStaff'
import AddEstateStaff from '../../pages/EstateManager/EstateStaff/AddEstateStaff'
import ViewEstateStaff from '../../pages/EstateManager/EstateStaff/ViewEstateStaff'
import EditEstateStaff from '../../pages/EstateManager/EstateStaff/EditEstateStaff'

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
        <Route path='household/edit-household/:id' element={<EditHousehold />} />
        <Route path='household/view-details/:id' element={<ViewHouseHold />} />
        <Route path='household/view-details/:id' element={<ViewHouseHold />} />
        <Route path='estate-staff' element={<EstateStaff />} />
        <Route path='estate-staff/add' element={<AddEstateStaff />} />
        <Route path='estate-staff/view/:id' element={<ViewEstateStaff />} />
        <Route path='estate-staff/edit/:id' element={<EditEstateStaff />} />
    </Route>
)

export default estateManagerRoutes
