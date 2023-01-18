import { Outlet } from 'react-router'
import Header from '../components/dashboard/Header'
import Sidebar from '../components/dashboard/Sidebar'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'



function Dashboard() {
    const openModal = () => {
        const dialog = document.querySelector('.dialog') as any
        dialog.showModal()
    }
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard__container'>
                <Header
                    fullName='Collins Igboanugwo'
                    role='Super Admin'
                    imgUrl='/img/me.jpeg'
                />
                <button className='btn' onClick={openModal}>Open modal</button>
                <div className='p-10 overflow-scroll max-h-[90vh]'>
                    {/* <Outlet /> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
