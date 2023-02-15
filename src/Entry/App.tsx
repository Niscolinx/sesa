import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom'



import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-toastify/dist/ReactToastify.css'

import Login from '../pages/Login'


const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path='/' element={<Login />} />,
        
        <Route path='*' element={<Navigate to='/' />} />,
    ])
)

const App = () => {
    return (
        <SkeletonTheme baseColor='#202020' highlightColor='#444'>
            <RouterProvider router={router} />
        </SkeletonTheme>
    )
}

export default App
