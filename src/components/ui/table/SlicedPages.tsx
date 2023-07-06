import { Dispatch, FC, SetStateAction } from "react";
import TableDropDown from "./TableDropDown";
import { ToggleDropDown } from "./TableData";
import { Actions, useTableContext } from "./Table";
import StarRating from "../StarRating";
import dayjs from 'dayjs'

interface SlicedPages {
	pages: any[][] | null;
	index: number;
	toggleDropDown: ToggleDropDown;
	setToggleDropDown: Dispatch<SetStateAction<ToggleDropDown>>;
}

const SlicedPages: FC<SlicedPages> = ({
	pages,
	index,
	toggleDropDown,
	setToggleDropDown,
}) => {
	const {
		data_to_display,
		nested,
		THeader,
		secondary_id,
		actions,
		is_dropdown,
		isStrictAction,
		is_checkbox,
	} = useTableContext();

	if (!pages || !pages.length) {
		return null;
	}

	const page = pages[index];

	const TableItem = ({ data }: any) => {
		console.log({ data });
		if (!data) {
			return null;
		}

		const { id, ...restData } = data;

		const get_secondary_id = secondary_id && data[secondary_id];

		const details: Map<any, any> = new Map<
			string,
			string | { name: string; image: string | null }
		>();

		const dataToLoop = nested ? restData.user : restData;

		Object.entries(dataToLoop).map(([key, value]: any) => {
			if (data_to_display.includes(key)) {
				const firstTableItem = details.get(data_to_display[0]) ?? "";

				if (key === data_to_display[0]) {
					return details.set(data_to_display[0], {
						name: value,
						image: firstTableItem.image,
					});
				}

				if (key.includes("image")) {
					return details.set(data_to_display[0], {
						name: firstTableItem.name,
						image: value,
					});
				} else {
					return details.set(key, value);
				}
			}
		});

		const sorted: any[] = [];
		data_to_display.map((item: string, i: number) => {
			if (item) {
				for (const [key, value] of details.entries()) {
					if (key === item) {
						sorted.push({
							key,
							value,
						});

						return;
					}
				}
			}
		});

		const isAction = sorted.some(({ key }: any) => key === "actions");
		const findStatus = sorted.find(({ key }: any) => key === "status");

		if (is_dropdown && !isAction) {
			sorted.push({
				key: "actions",
				value: findStatus?.value || 0,
			});
		}

		return (
			<>
				{sorted.map(({ key, value }: any, idx: number) => {
					if (idx === 0) {
						return (
							<div className="flex items-center gap-4 " key={key}>
								{is_checkbox && (
									<input type="checkbox" className="cursor-pointer" />
								)}

								<div className="flex items-center gap-2">
									{value.image && (
										<figure className="w-[3.5rem] h-[3.5rem]">
											<img
												src={value.image}
												alt=""
												width={"56px"}
												height={"56px"}
												className="w-full h-full rounded-full object-cover"
											/>
										</figure>
									)}

									<p className="">{value.name}</p>
								</div>
							</div>
						);
					}
					if (
						key === "created_at" ||
						key === "onboarding_date" ||
						key.includes("date")
					) {
						const get_only_date = value.slice(0, 10);
						const get_only_time = value.slice(11, 16);
						const formattedDate = new Date(get_only_date).toLocaleDateString(
							"en-US",
							{
								day: "numeric",
								month: "short",
								year: "numeric",
							},
						);
						

						// const date_and_time = `${formattedDate}, ${formattedTime}`;

						// console.log({ formattedTime });

						// const currentTime = new Date(formattedTime);

						const timeString = "23:12";
						const parsedTime = dayjs(timeString, "HH:mm");
						const formattedTime = parsedTime.format("h:mm A");

						console.log({formattedTime})

						return (
							<button key={key} disabled type="button">
								{THeader.includes("date/time") ? formattedDate : formattedDate}
							</button>
						);
					}
					if (key === "status") {
						return (
							<p key={key}>
								{value === 1 ? (
									<span className="text-green-600">active</span>
								) : (
									<span className="text-red-500">inactive</span>
								)}
							</p>
						);
					}
					if (key === "actions") {
						let updatedActions: Actions[] = ["view details"];

						actions.indexOf("remove") !== 0
							? value === 0
								? // rome-ignore lint/suspicious/noAssignInExpressions: <explanation>
								  (updatedActions = [...updatedActions, "activate"])
								: // rome-ignore lint/suspicious/noAssignInExpressions: <explanation>
								  (updatedActions = [...updatedActions, "deactivate"])
							: null;

						updatedActions = [...updatedActions, ...actions];
						return is_dropdown ? (
							<div className="absolute right-0 mr-10">
								<TableDropDown
									toggleDropDown={toggleDropDown}
									setToggleDropDown={setToggleDropDown}
									id={id}
									secondary_id={get_secondary_id}
									actions={isStrictAction ? actions : updatedActions}
									key={key}
								/>
							</div>
						) : null;
					}
					if (key.toLowerCase() === "work_days") {
						return (
							<p
								key={key}
								className="max-w-[20rem] overflow-hidden text-ellipsis"
							>
								{JSON.parse(JSON.stringify(value)).length > 1
									? "multiple"
									: JSON.parse(JSON.stringify(value))}
							</p>
						);
					}
					if (key.toLowerCase() === "rating") {
						return <StarRating starsNum={value} key={key} />;
					}
					if (["price", "amount", "balance"].includes(key.toLowerCase())) {
						return (
							<div
								key={key}
								className="flex items-center max-w-[20rem] overflow-hidden text-ellipsis"
							>
								<img src="/icons/Naira.svg" alt="" className="mr-1" />
								{Number(value).toLocaleString()}
							</div>
						);
					} else {
						return (
							<p
								key={key}
								className="max-w-[20rem] overflow-hidden text-ellipsis"
							>
								{value}
							</p>
						);
					}
				})}
			</>
		);
	};

	return (
		<>
			{page.map((data, idx) => {
				const headerLength = THeader.includes("actions")
					? THeader.length - 1
					: THeader.length;

				return (
					<div
						className={`grid justify-between border-b grid-cols-${headerLength} items-center gap-8 text-[1.6rem] capitalize py-4 table__ellipsis relative`}
						key={`${idx}`}
					>
						<TableItem data={data} />
					</div>
				);
			})}
		</>
	);
};

export default SlicedPages;
