import { LinkProps } from ".";
import EstatesSvg from "../icons/security_company/EstatesSvg";
import MessagesSvg from "../icons/security_company/MessagesSvg";
import SecurityCompSvg from "../icons/security_company/SecurityCompSvg";
import SettingsSvg from "../icons/security_company/SettingsSvg";
import WalletSvg from "../icons/security_company/WalletSvg";
import OverviewSvg from "../icons/security_company/overviewSvg";

export const SECURITY_COMPANY_LINKS: LinkProps[] = [
	{
		to: "/securityCompany",
		icon: <OverviewSvg />,
		text: "Overview",
	},
	{
		to: "/securityCompany/estates",
		icon: <EstatesSvg />,
		text: "Estates",
	},
	{
		to: "/securityCompany/security-guard",
		icon: <SecurityCompSvg />,
		text: "Security Guard",
	},
	{
		to: "/securityCompany/wallet",
		icon: <WalletSvg />,
		text: "Wallet",
	},
	{
		to: "/securityCompany/messages",
		icon: <MessagesSvg />,
		text: "Messages",
	},
	{
		to: "/securityCompany/settings",
		icon: <SettingsSvg />,
		text: "Platform Settings",
	},
];
