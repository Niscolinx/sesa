import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import useFetchData from "../../hooks/useFetchData";

interface Props {
	permissions: string[];
	setPermissions: React.Dispatch<React.SetStateAction<string[]>>;
}

function Permissions({ permissions, setPermissions }: Props) {
	type EachPermission = {
		name: string;
		content: string[];
	};

	const { isLoading, data: fetchedData } = useFetchData({
		url: "permission/get/all",
		name: "permissions",
	});

	const [data, setData] = useState<EachPermission[]>([]);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (fetchedData as string[]) {
			setData(fetchedData);

			const eachPermission: EachPermission[] = [];

			const _permissions = fetchedData as string[];

			for (const perm of _permissions) {
				const reg = /(\w+)-/g;
				const match = perm.match(reg);

				const word = match?.[0].replace("-", "");

				if (word) {
					const found = eachPermission.find((each) => each.name === word);

					if (found) {
						found.content.push(perm);
					} else {
						eachPermission.push({
							name: word,
							content: [perm],
						});
					}
				}
			}

			setData(eachPermission);
		}
	}, [fetchedData]);

	const closeDialog = () => {
		dialogRef.current?.close();
	};

	const openDialog = () => {
		dialogRef.current?.showModal();
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();

		const updated: EachPermission[] = JSON.parse(JSON.stringify(data));
        const _update = [...updated]

		const filteredData = updated.map((each) => {
			const filteredContent = each.content.filter((perm) =>
				perm.toLowerCase().includes(value),
			);

			
			return {
				...each,
				content: filteredContent,
			};
		});

		console.log(filteredData);

	 setData(update);
	};

	return (
		<div className="">
			<dialog ref={dialogRef} className="dialog">
				<section className="grid justify-center w-full h-[100vh]">
					<div className="bg-white rounded-2xl grid  w-[64rem] h-[60rem] gap-8 py-8 px-10 items-center relative text-[1.8rem]">
						<IoMdClose
							className="absolute right-0 top-0 m-4 text-[2rem] cursor-pointer"
							onClick={closeDialog}
						/>
						<div className="border-b pb-4">
							<p className="font-semibold">Permissions List</p>

							<div className="flex items-center gap-4">
								<input
									type="text"
									placeholder="Search"
									className="border border-color-blue-1 rounded-lg px-4 py-2 w-[30rem]"
									onChange={handleSearch}
								/>
							</div>
						</div>

						<div className="overflow-y-scroll max-h-[40rem] scrollbar self-baseline ">
							{isLoading && <p>Loading...</p>}
							{data?.map(({ name, content }: EachPermission, idx: number) => {
								return (
									<div className="border-b pb-4">
										<h3 className="font-Satoshi-Medium text-[2rem] capitalize">
											{name}
										</h3>
										{content.map((perm: string) => (
											<label
												className="flex items-center gap-4 py-2"
												key={`${name + idx}`}
											>
												<input
													type="checkbox"
													name={perm}
													className="cursor-pointer"
												/>

												<span className="capitalize cursor-pointer font-Satoshi-Medium text-[1.6rem]">
													{perm}
												</span>
											</label>
										))}
									</div>
								);
							})}
						</div>

						<button
							className="bg-color-blue-1 px-12 py-4 text-white text-[1.4rem] flex items-center justify-self-start rounded-lg gap-4 self-center"
							onClick={closeDialog}
						>
							<img src="/icons/admins/saveDisk.svg" alt="" />
							<span>Save Changes</span>
						</button>
					</div>
				</section>
			</dialog>

			<button className="btn btn-blue" onClick={openDialog}>
				Set Permissions
			</button>
		</div>
	);
}

export default Permissions;
