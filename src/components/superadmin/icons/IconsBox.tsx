import { Link } from "react-router-dom";

import AdditionalResidentSvg from "./sidebar/AdditionalResidentSvg";
import AdminsSvg from "./sidebar/AdminsSvg";
import AdvertSvg from "./sidebar/AdvertSvg";
import ArtisanSvg from "./sidebar/ArtisanSvg";
import EstateManagerSvg from "./sidebar/EstateManagerSvg";
import EstatesSvg from "./sidebar/EstatesSvg";
import OverviewSvg from "./sidebar/overviewSvg";
import RolesAndPermSvg from "./sidebar/RolesAndPermSvg";
import SecurityCompSvg from "./sidebar/SecurityCompSvg";
import SettingsSvg from "./sidebar/SettingsSvg";
import WalletSvg from "./sidebar/WalletSvg";

function IconsBox() {
	interface LinkProps {
		to: string;
		icon: JSX.Element;
		text: string;
		className?: string;
	}

	const links: LinkProps[] = [
		{
			to: "/superAdmin",
			icon: <OverviewSvg />,
			text: "Overview",
		},
		{
			to: "/superAdmin/admin",
			icon: <AdminsSvg />,
			text: "Admin",
		},

		{
			to: "/superAdmin/estates",
			icon: <EstatesSvg />,
			text: "Estates",
			className: "fillIcon",
		},

		{
			to: "/superAdmin/estateManagers",
			icon: <EstateManagerSvg />,
			text: "Estate Manager",
			className: "fillIcon",
		},

		{
			to: "/superAdmin/resident-user-package",
			icon: <AdditionalResidentSvg />,
			text: "Resident User Package",
		},

		{
			to: "/superAdmin/securityCompany",
			icon: <SecurityCompSvg />,
			text: "Security Company",
			className: "fillIcon",
		},

		{
			to: "/superAdmin/securityManagers",
			icon: <EstateManagerSvg />,
			text: "Security Manager",
			className: "fillIcon",
		},

		{
			to: "/superAdmin/wallet",
			icon: <WalletSvg />,
			text: "Wallet",
			className: "fillIcon",
		},

		{
			to: "/superAdmin/artisan",
			icon: <ArtisanSvg />,
			text: "Artisan",
			className: "fillIcon",
		},

		{
			to: "/superAdmin/advert",
			icon: <AdvertSvg />,
			text: "Advert",
		},

		{
			to: "/superAdmin/settings",
			icon: <SettingsSvg />,
			text: "Settings",
			className: "fillIcon",
		},
	];

	return (
		// <ul className="iconsBox">
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin">
		// 			<OverviewSvg />
		// 			<span>Overview</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/admin">
		// 			{" "}
		// 			<AdminsSvg />
		// 			<span>Admin</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/estates" className="fillIcon">
		// 			<EstatesSvg />
		// 			<span>Estates</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/estateManagers" className="fillIcon">
		// 			{" "}
		// 			<EstateManagerSvg />
		// 			<span>Estate Manager</span>
		// 		</Link>
		// 	</li>
		// 	{/* <li className='iconsBox__list'>
		//       <Link to='/superAdmin/roles-and-permissions'>
		//           <RolesAndPermSvg />
		//           <span>Roles & Permissions</span>
		//       </Link>
		//   </li> */}
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/resident-user-package">
		// 			{" "}
		// 			<AdditionalResidentSvg />
		// 			<span>Resident User Package</span>{" "}
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/security-company" className="fillIcon">
		// 			{" "}
		// 			<SecurityCompSvg />
		// 			<span>Security Company</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/securityManagers" className="fillIcon">
		// 			{" "}
		// 			<EstateManagerSvg />
		// 			<span>Security Manager</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/wallet" className="fillIcon">
		// 			<WalletSvg />
		// 			<span>Wallet</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/artisan" className="fillIcon">
		// 			{" "}
		// 			<ArtisanSvg />
		// 			<span>Artisan</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/advert">
		// 			<AdvertSvg />
		// 			<span>Advert</span>
		// 		</Link>
		// 	</li>
		// 	<li className="iconsBox__list">
		// 		<Link to="/superAdmin/platformSettings" className="fillIcon">
		// 			<SettingsSvg />
		// 			<span>Settings</span>
		// 		</Link>
		// 	</li>
		// </ul>

		<ul className="iconsBox">
			{links.map(({className, to, icon, text}, index) => (
				<li className="iconsBox__list" key={`${index}link`}>
					<Link to={to} className={className}>
						{icon}
						<span>{text}</span>
					</Link>
				</li>
			))}
		</ul>
	);
}

export default IconsBox;
