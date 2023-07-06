import { ChangeEvent, useEffect, useRef, useState } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import useFetchData from "../../hooks/useFetchData";

interface Props {
	permissions: string[];
	setPermissions: React.Dispatch<React.SetStateAction<string[]>>;
}

function Permissions({ permissions, setPermissions }: Props) {
	const { isLoading, data: fetchedData } = useFetchData({
		url: "permission/get/all",
		name: "permissions",
	});

	const [data, setData] = useState<string[]>([]);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (fetchedData) {
			setData(fetchedData);


            const transformedData = fetchedData.map((permission: string) => {
                const reg = /(\w+)-/g;
                const match = permission.match(reg);
                const word = match?.[0].replace("-", "");
                console.log({match})
                return {

                }
            })


		}
	}, [fetchedData]);

	const closeDialog = () => {
		dialogRef.current?.close();
	};

	const openDialog = () => {
		dialogRef.current?.showModal();
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>{
		const value = e.target.value;

        const updated = JSON.parse(JSON.stringify(fetchedData))

		const filteredData = updated.filter((permission: string) => {
			return permission.toLowerCase().includes(value.toLowerCase());
		});

		setData(filteredData);
	}

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
							{data?.map((permission: string, idx: number) => {
								return (
									<label
										className="flex items-center gap-4 py-2"
										key={`${permission + idx}`}
									>
										<input
											type="checkbox"
											name={permission}
											className="cursor-pointer"
										/>

										<span className="capitalize cursor-pointer font-Satoshi-Medium">
											{permission}
										</span>
									</label>
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
