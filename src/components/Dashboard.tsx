import { Outlet, useNavigate } from "react-router";
import Header from "./superadmin/dashboard/Header";

import BreadCrumb from "./ui/BreadCrumb";
import PrevLocation from "./hooks/usePrevLocation";
import AutoLogout from "./AutoLogout";
import { useEffect } from "react";
import Sidebar from "./ui/sidebar";
import { useAppSelector } from "../store/app/hooks";

export type viewType = "superAdmin" | "securityCompany" | "estateManager";

interface Props {
	type: viewType;
}
function Dashboard({ type }: Props) {
	PrevLocation();
	const navigate = useNavigate();
	const role = useAppSelector((state) => state.auth.role)


	useEffect(() => {
		const getRole = role.split('-')[0]
		if (!type.startsWith(getRole)) {
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
