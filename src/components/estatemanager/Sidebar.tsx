import { BiMenu } from 'react-icons/bi'
import { useRef, useState } from 'react'
import IconsBox from './icons/IconsBox'

function Sidebar() {
    const sidebarRef = useRef(null)

    const [openSidebar, setOpenSidebar] = useState(true)

    const handleLogout = () => {
        console.log('logout')
    }

    const handleToggleMenu = () => {
        const sidebar: HTMLDivElement = sidebarRef.current!

        sidebar.classList.toggle('sidebarToggle')

        setOpenSidebar((state) => !state)
    }

    return (
        <div className='sidebar shadow overflow-scroll' ref={sidebarRef}>
            <div
                className={`sidebar__container ${
                    openSidebar ? 'items-start' : 'items-center justify-center'
                }`}
            >
                <section className='section-1'>
                    <div className='section-1__box'>
                        <img src='/logo.svg' alt='' width={127} height={33} />
                    </div>
                    <span onClick={handleToggleMenu}>
                        <BiMenu />
                    </span>
                </section>
                <section className='section-2'>
                    <IconsBox />
                </section>
            </div>
        </div>
    )
}

export default Sidebar
