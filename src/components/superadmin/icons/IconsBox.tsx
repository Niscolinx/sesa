import { Link } from "react-router-dom";

import AdditionalResidentSvg from "./sidebar/AdditionalResidentSvg";
import AdminsSvg from "./sidebar/AdminsSvg";
import AdvertSvg from "./sidebar/AdvertSvg";
import ArtisanSvg from "./sidebar/ArtisanSvg";
import EstateManagerSvg from "./sidebar/EstateManagerSvg";
import EstatesSvg from "./sidebar/EstatesSvg";
import OverviewSvg from "./sidebar/overviewSvg";

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
			to: "/superAdmin/security-company",
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
			to: "/superAdmin/platformSettings",
			icon: <SettingsSvg />,
			text: "Settings",
			className: "fillIcon",
		},
	];

	return (
	//ToDo - ADd roles permissions, with the former overlay

		<ul className="iconsBox">
			{links.map(({className, to, icon, text}, index) => (
				<li className="iconsBox__list" key={`${index}link`}>
					<Link to={to} className={className} >
					{/* <Link to={to} className={`bg-red-500`} > */}
						{icon}
						<span>{text}</span>
					</Link>
				</li>
			))}
		</ul>
	);
}

export default IconsBox;
