import { Outlet } from 'react-router'
import Header from '../components/dashboard/Header'
import Sidebar from '../components/dashboard/Sidebar'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Modal from '../components/Modal'

function Dashboard() {
   
    return (
        <Modal>
            <div className='dashboard'>
                <Sidebar />
                <div className='dashboard__container'>
                    <Header
                        fullName='Collins Igboanugwo'
                        role='Super Admin'
                        imgUrl='/img/me.jpeg'
                    />
                    
                    <div className='p-10 overflow-scroll max-h-[90vh]'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Dashboard
