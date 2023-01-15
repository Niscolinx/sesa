import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Admins from '../pages/dashboard/Admins'
import Overview from '../pages/dashboard/Overview'

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Navigate to='/dashboard' />} />,
        <Route path='/dashboard' element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path='admins' element={<Admins />} />
        </Route>,
        <Route path='*' element={<Navigate to='/' />} />,
    ])
)

const App = () => {
    return <RouterProvider router={router} />
}

export default App
