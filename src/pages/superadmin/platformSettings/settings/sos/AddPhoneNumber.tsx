import { forwardRef, useState, ChangeEvent, useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";

interface AddPhoneNumber {
	idx: number;
	phoneError: any;
	value?: string;
}

const AddPhoneNumber = forwardRef<HTMLInputElement, AddPhoneNumber>(
	({ idx, phoneError, value }, ref) => {
		const [phone, setPhone] = useState(value);
		const [isError, setIsError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");

		useEffect(() => {
			setPhone(value);
		}, [value]);

		const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
			setIsError(false);
			setErrorMessage("");
			const value = e.target.value.replace(/\D/g, "");

			if (value.length <= 1 && value === "0") {
				return setPhone("");
			}

			if (value.length < 11) {
				setPhone(value);
			}
		};

		useEffect(() => {
			if (phoneError?.[`phone${idx + 1}`]) {
				setErrorMessage(phoneError[`phone${idx + 1}`]);
				setIsError(true);
			}
		}, [phoneError]);

		return (
			<div className={"w-full grid gap-4 self-baseline"}>
				<label
					htmlFor={`phone${idx + 1}`}
					className="text-[1.4rem] font-semibold capitalize"
				>
					phone Number {idx + 1}
				</label>

				<div
					className={`relative flex items-center w-full border pl-4 rounded-lg ${
						isError ? "border-red-500" : "border-color-grey"
					}`}
				>
					<input type="text" value={"+234"} className="w-[4.2rem]" />
					<input
						type="number"
						name="number"
						id={`phone${idx + 1}`}
						ref={ref}
						inputMode="numeric"
						maxLength={10}
						value={phone}
						onChange={handlePhoneChange}
						className={
							" w-full border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed p-4 pl-0 "
						}
					/>
				</div>
				<CiCircleRemove className="text-2xl bg-red-500" />
				<p>hello</p>
				<p className="text-red-500 text-[1.2rem]">{errorMessage}</p>
			</div>
		);
	},
);

export default AddPhoneNumber;
