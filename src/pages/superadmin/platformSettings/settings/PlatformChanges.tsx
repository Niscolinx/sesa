import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useFetchData from "../../../../components/hooks/useFetchData";
import Input from "../../../../components/ui/input/Input";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import useAxios from "../../../../components/hooks/useAxios";
import Spinner from "../../../../components/ui/Spinner";

const PlatformChanges = () => {
	type FormInputs = {
		label: string;
		type: string;
		name?: string;
		tag: "amount";
	};

	type ResponseMessage = {
		className: string;
		displayMessage: string;
	};

	type Inputs = {
		kyr_validation: number;
		sms_notification: number;
		transferable_fee: number;
	};

	const get_request = () => {
		return axiosInstance({
			url: "/platformsettings/generalsettings/get",
		});
	};

	const {
		isLoading,
		data: get_data,
		error,
	} = useQuery("platformChanges", get_request, {
		onSuccess: ({ data }) => {
			const { kyr_validation, sms_notification, transferable_fee } = data;

			reset({
				kyr_validation,
				sms_notification,
				transferable_fee,
			});

			//TODO
		},
	}) as any;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors: formErrors },
	} = useForm<Inputs>();

	const [responseMessage, setResponseMessage] =
		useState<ResponseMessage | null>(null);

	const axiosInstance = useAxios();
	const postSettings = (inputs: Inputs) => {
		return axiosInstance({
			url: `/platformsettings/generalsettings/update/${get_data.data.id}`,
			method: "put",
			data: inputs,
		});
	};
	const { mutate, isLoading: mutation_loading } = useMutation(postSettings, {
		onSuccess: () => {
			toast("Changes saved successfully", {
				type: "success",
				className: "bg-green-100 text-green-600 text-[1.4rem]",
			});
		},
		onError: (err: any) => {
			setResponseMessage({
				className: "text-red-600",
				displayMessage: err?.response.data.message,
			});
		},
	}) as any;

	const onSubmit = handleSubmit((data) => {
		setResponseMessage(null);

		const adminData = {
			...data,
		};

		mutate(adminData);
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	const formInputs = [
		{
			label: "kyr_validation",
			name: "kYR Validation",
			type: "number",
			tag: "amount",
		},
		{
			label: "sms_notification",
			name: "SMS Notification",
			type: "number",
			tag: "amount",
		},
		{
			label: "withdrawal_fee",
			type: "number",
			tag: "amount",
		},
	] satisfies FormInputs[];

	return (
		<>
			<ToastContainer />
			<Spinner start={mutation_loading} />
			<div className="p-8 bg-white min-h-[60vh] rounded-lg">
				<h2 className="heading2 border-b pb-10">Platform Changes</h2>

				<form
					onSubmit={onSubmit}
					className="grid max-w-[84rem] gap-16 mt-12 items-center"
					style={{
						gridTemplateColumns: " repeat(auto-fit, minmax(35rem, 1fr))",
					}}
				>
					<>
						{formInputs.map((input, idx) => {
							const { label, type, name, tag } = input;
							return (
								<Input
									key={idx + label}
									label={label}
									tag={tag}
									register={register}
									formErrors={formErrors}
									type={type}
									minLength={0}
									name={name}
								/>
							);
						})}

						<button
							className="btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg col-span-full mt-[10rem]"
							style={{ justifySelf: "start" }}
						>
							<span>
								<img
									src="/icons/admins/saveDisk.svg"
									alt=""
									className="w-[1.7rem] h-[1.7rem]"
								/>
							</span>{" "}
							{mutation_loading ? "Loading..." : "Save Changes"}
						</button>
					</>
				</form>
			</div>
		</>
	);
};

export default PlatformChanges;
