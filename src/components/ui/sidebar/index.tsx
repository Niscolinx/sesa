import { BiMenu } from "react-icons/bi";
import { useRef, useState } from "react";
import SidebarLinks, { LinkProps } from "./links";
import { SUPER_ADMIN_LINKS } from "./links/SuperAdmin";
import { SECURITY_COMPANY_LINKS } from "./links/SecurityCompany";
import { ESTATE_MANAGER_LINKS } from "./links/EstateManager";


type viewType = 'superAdmin' | 'securityCompany' | 'estateManager'

interface Props {
	type: viewType
}

function Sidebar({type}: Props) {
	const sidebarRef = useRef<HTMLDivElement>(null as any);

	const [openSidebar, setOpenSidebar] = useState(true);

	const handleLogout = () => {
		console.log("logout");
	};

	const handleToggleMenu = () => {
		const sidebar: HTMLDivElement = sidebarRef.current;

		sidebar.classList.toggle("sidebarToggle");

		setOpenSidebar((state) => !state);
	};

	const renderSidebar = {
		"superAdmin": SUPER_ADMIN_LINKS,
		"securityCompany": SECURITY_COMPANY_LINKS,
		"estateManager": ESTATE_MANAGER_LINKS
	} satisfies Record<viewType, LinkProps[]>

	return (
		<div className="sidebar shadow overflow-scroll" ref={sidebarRef}>
			<div
				className={`sidebar__container ${
					openSidebar ? "items-start" : "items-center justify-center"
				}`}
			>
				<section className="section-1">
					<div className="section-1__box">
						<img src="/logo.svg" alt="" width={127} height={33} />
					</div>
					<span onClick={handleToggleMenu}>
						<BiMenu />
					</span>
				</section>
				<section className="section-2">
					<SidebarLinks links={renderSidebar[type]} />
				</section>
			</div>
		</div>
	);
}

export default Sidebar;
