import { NavLink, useLocation } from "react-router-dom";

export interface LinkProps {
	to: string;
	icon: JSX.Element;
	text: string;
	classes?: string;
}

interface Props {
	links: LinkProps[];
}

const SidebarLinks = ({ links }: Props) => {
	const location = useLocation();

	return (
		<ul className="iconsBox">
			{links.map(({ classes, to, icon, text }, idx) => {
				const pathLength = location.pathname.split("/").length;

				return (
					<li className="iconsBox__list" key={`${idx}link`}>
						<NavLink
							to={to}
							className={(props) =>
								(idx === 0 && props.isActive && pathLength < 3) ||
								(props.isActive && idx > 0)
									? "iconsBox__list--item active "
									: "iconsBox__list--item"
							}
						>
							<span
								className={`${classes ? "list--svg-fillIcon" : "list--svg"}`}
							>
								{icon}
							</span>

							<span> {text} </span>
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
};

export default SidebarLinks;
