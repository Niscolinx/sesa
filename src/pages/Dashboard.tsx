import { Outlet } from 'react-router'
import Header from '../components/dashboard/Header'
import Sidebar from '../components/dashboard/Sidebar'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Modal = () => {
    return (
        <dialog className='dialog'>
            <section className='grid place-c w-full h-[100vh]'>

        <div className='bg-white rounded-2xl grid place-content-center justify-items-center w-[64rem] h-[30rem] gap-8'>
            <img src='/icons/admins/modalSuccess.svg' alt='' />
            <p>You have successfully added an Estate</p>

            <div className='flex w-full justify-center gap-8'>
                <button className='btn border-[#0556E5] text-[#0556E5] border rounded-lg w-[15rem]'>
                    View details
                </button>
                <button className='bg-[#0556E5] py-2 px-12 text-white text-[1.6rem] rounded-lg w-[15rem]'>
                    Ok
                </button>
            </div>
        </div>
            </section>
        </dialog>
    )
}

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
                    <Modal />
                    {/* <Outlet /> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
