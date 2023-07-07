import { LinkProps } from "..";
import OverviewSvg from "../icons/super_admin/overviewSvg";
import AdditionalResidentSvg from "../icons/super_admin/AdditionalResidentSvg";
import AdminsSvg from "../icons/super_admin/AdminsSvg";
import AdvertSvg from "../icons/super_admin/AdvertSvg";
import ArtisanSvg from "../icons/super_admin/ArtisanSvg";
import EstateManagerSvg from "../icons/super_admin/EstateManagerSvg";
import EstatesSvg from "../icons/super_admin/EstatesSvg";
import SecurityCompSvg from "../icons/super_admin/SecurityCompSvg";
import SettingsSvg from "../icons/super_admin/SettingsSvg";
import WalletSvg from "../icons/super_admin/WalletSvg";

export const SUPER_ADMIN_LINKS: LinkProps[] = [
	{
		to: "/superAdmin",
		icon: <OverviewSvg/>,
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
		classes: "fillIcon",
	},

	{
		to: "/superAdmin/estateManagers",
		icon: <EstateManagerSvg />,
		text: "Estate Manager",
		classes: "fillIcon",
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
		classes: "fillIcon",
	},

	{
		to: "/superAdmin/securityManagers",
		icon: <EstateManagerSvg />,
		text: "Security Manager",
		classes: "fillIcon",
	},

	{
		to: "/superAdmin/wallet",
		icon: <WalletSvg />,
		text: "Wallet",
		classes: "fillIcon",
	},

	{
		to: "/superAdmin/artisan",
		icon: <ArtisanSvg />,
		text: "Artisan",
		classes: "fillIcon",
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
		classes: "fillIcon",
	},
];