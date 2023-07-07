import { LinkProps } from ".";
import AdditionalResidentSvg from "../icons/estate_manager/AdditionalResidentSvg";
import AdminsSvg from "../icons/estate_manager/AdminsSvg";
import ApprovalsSvg from "../icons/estate_manager/ApprovalsSvg";
import ArtisanSvg from "../icons/estate_manager/ArtisanSvg";
import EnergyTokenSvg from "../icons/estate_manager/EnergyTokenSvg";
import EstateAdminSvg from "../icons/estate_manager/EstateAdminSvg";
import EstateManagerSvg from "../icons/estate_manager/EstateManagerSvg";
import MessageSvg from "../icons/estate_manager/MessageSvg";
import PaymentsSvg from "../icons/estate_manager/PaymentsSvg";
import ReportsSvg from "../icons/estate_manager/ReportsSvg";
import RolesAndPermSvg from "../icons/estate_manager/RolesAndPermSvg";
import EstatesSvg from "../icons/estate_manager/EstatesSvg";
import SecurityCompSvg from "../icons/estate_manager/SecurityCompSvg";
import SettingsSvg from "../icons/estate_manager/SettingsSvg";
import WalletSvg from "../icons/estate_manager/WalletSvg";
import OverviewSvg from "../icons/estate_manager/overviewSvg";

export const ESTATE_MANAGER_LINKS: LinkProps[] = [
	{
		to: "/estateManager",
		icon: <OverviewSvg />,
		text: "Overview",
	},
	{
		to: "/estateManager/wallet",
		icon: <WalletSvg />,
		text: "Wallet",
		classes: "fillIcon",
	},
	{
		to: "/estateManager/estate-admin",
		icon: <EstateAdminSvg />,
		text: "Estate Admin",
	},
	{
		to: "/estateManager/resident",
		icon: <AdminsSvg />,
		text: "Residents",
	},
	{
		to: "/estateManager/property",
		icon: <EstatesSvg />,
		text: "Properties",
		classes: "fillIcon",
	},
	{
		to: "/estateManager/household",
		icon: <EstateManagerSvg />,
		text: "Household",
		classes: "fillIcon",
	},
	{
		to: "/estateManager/estate-staff",
		icon: <RolesAndPermSvg />,
		text: "Estate Staff",
	},
	{
		to: "/estateManager/site-worker",
		icon: <AdditionalResidentSvg />,
		text: "Site Worker",
	},
	{
		to: "/estateManager/security-guard",
		icon: <SecurityCompSvg />,
		text: "Security Guard",
		classes: "fillIcon",
	},
	{
		to: "/estateManager/artisan",
		icon: <ArtisanSvg />,
		text: "Artisan",
		classes: "fillIcon",
	},
	{
		to: "/estateManager/message",
		icon: <MessageSvg />,
		text: "Message",
	},
	{
		to: "/estateManager/payments",
		icon: <PaymentsSvg />,
		text: "Payments",
	},
	{
		to: "/estateManager/energy-token",
		icon: <EnergyTokenSvg />,
		text: "Energy Token",
	},
	{
		to: "/estateManager/voting-and-election",
		icon: <ReportsSvg />,
		text: "Voting & Election",
	},
	{
		to: "/estateManager/reports",
		icon: <ReportsSvg />,
		text: "Reports",
	},
	{
		to: "/estateManager/approvals",
		icon: <ApprovalsSvg />,
		text: "Approvals",
	},
	{
		to: "/estateManager/estate-rules-and-regulations",
		icon: <SettingsSvg />,
		text: "Estate Rules and Regulations",
		classes: "fillIcon",
	},
];
