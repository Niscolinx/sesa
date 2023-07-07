import { useEffect, useState } from "react";

interface ImageInput {
	handlePicture: (e: React.ChangeEvent) => void;
	photoPreview: string;
	dimension?: boolean;
}

export function ShowImage({ handlePicture, photoPreview }: ImageInput) {
	return (
		<>
			<label
				htmlFor="photoUpload"
				className="grid gap-4 cursor-pointer justify-items-center"
			>
				<img
					src={photoPreview || "/default-avatar.jpg"}
					alt="photoPreview"
					className="object-cover w-[11rem] h-[11rem] rounded-full object-top"
				/>
				<span className="text-color-blue-1 text-[1.4rem]">Edit</span>
			</label>
			<input
				type="file"
				name="photoUpload"
				id="photoUpload"
				accept="image/*"
				className="hidden"
				onChange={handlePicture}
			/>
		</>
	);
}

function ImageInput({ handlePicture, photoPreview, dimension }: ImageInput) {
	const IMAGE_HEIGHT = 5399;
	const IMAGE_WIDTH = 3599;
	const [imgSrc, setImgSrc] = useState(photoPreview);
	const [dimensionError, setDimensionError] = useState<boolean>(true);

	const imageHandler = (e: React.ChangeEvent) => {
		const target = e.target as HTMLInputElement;
		const file: File = (target.files as FileList)[0];

		const preview = URL.createObjectURL(file);
		setImgSrc(preview);

		const image = new Image();

		image.src = preview;

		image.onload = () => {
			const { width, height } = image;

			if (width === IMAGE_WIDTH || height === IMAGE_HEIGHT) {
				handlePicture(e);
				return setDimensionError(false);
			}
			return setDimensionError(true);
		};
	};

	return (
		<label
			className="col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full cursor-pointer"
			htmlFor="photoUpload"
		>
			<div className="flex justify-center gap-4 items-center ">
				<img src="/icons/admins/photo_library.svg" alt="" />
				<p>
					Drag picture here or{" "}
					<span className="text-color-blue font-Satoshi-Medium">click</span> to
					upload
				</p>
			</div>
			<input
				type="file"
				name="photoUpload"
				id="photoUpload"
				accept="image/*"
				className="hidden"
				onChange={imageHandler}
			/>

			{imgSrc && (
				<div className="flex justify-center justify-self-center">
					<img
						src={imgSrc || "/default-avatar.jpg"}
						alt="photoPreview"
						className="object-cover w-[11rem] h-[11rem] rounded-full"
					/>
				</div>
			)}
			{dimension && dimensionError && (
				<p className="text-center text-[1.4rem] font-Satoshi-Medium text-orange-500">
					Please upload an image with dimensions {IMAGE_WIDTH}px and{" "}
					{IMAGE_HEIGHT}px.
				</p>
			)}
		</label>
	);
}

export default ImageInput;
