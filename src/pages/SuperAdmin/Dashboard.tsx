import { Outlet } from 'react-router'
import Header from '../../components/SuperAdmin/dashboard/Header'
import Sidebar from '../../components/SuperAdmin/dashboard/Sidebar'

import Modal from '../../components/SuperAdmin/Modal'
import BreadCrumb from '../../components/UI/BreadCrumb'

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
                        <BreadCrumb />
                        <Outlet />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Dashboard
