import { Outlet } from 'react-router'
import Header from '../components/dashboard/Header'
import Sidebar from '../components/dashboard/Sidebar'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Modal = () => {
    return (
        <div className='bg-white rounded-lg justify-center justify-items-center w-[64rem] h-[34rem]'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />
            <p>You have successfully added an Estate</p>

            <div className='flex w-full'>
                <button className='btn'>View details</button>
                <button className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem]'>
                    Ok
                </button>
            </div>
        </div>
    )
}

function Dashboard() {
    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard__container'>
                <Header
                    fullName='Collins Igboanugwo'
                    role='Super Admin'
                    imgUrl='/img/me.jpeg'
                />
                <div className='p-10 overflow-scroll max-h-[90vh]'>
                    <Modal />
                    {/* <Outlet /> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
