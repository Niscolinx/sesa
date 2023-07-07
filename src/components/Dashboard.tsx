import { Outlet, useNavigate } from "react-router";
import Header from "./superadmin/dashboard/Header";
// import Header from '../../../../components/SuperAdmin/dashboard/Header'
// import Sidebar from '../../components/SuperAdmin/dashboard/Sidebar'

import BreadCrumb from "./ui/BreadCrumb";
import PrevLocation from "./hooks/usePrevLocation";
import AutoLogout from "./AutoLogout";
import { useEffect } from "react";
import Sidebar from "./ui/sidebar";

export type viewType = "superAdmin" | "securityCompany" | "estateManager";

interface Props {
	type: viewType;
}
function Dashboard({ type }: Props) {
	PrevLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const role = localStorage.getItem("role");
		if (role?.indexOf("super") === -1) {
			navigate("/");
		}
	}, []);

	return (
		<div className="dashboard">
			<Sidebar type={type} />
			<div className="dashboard__container">
				<Header
					fullName="Collins Igboanugwo"
					role="Super Admin"
					imgUrl="/img/me.jpeg"
				/>
				<AutoLogout>
					<div className="p-10 overflow-scroll max-h-[90vh]">
						<BreadCrumb />
						<Outlet />
					</div>
				</AutoLogout>
			</div>
		</div>
	);
}

export default Dashboard;
