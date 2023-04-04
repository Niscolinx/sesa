interface ImageInput {
    handlePicture: (e: React.ChangeEvent) => void
    photoPreview: string
}

function ImageInput({ handlePicture, photoPreview }: ImageInput) {
    return (
        <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
            <label
                htmlFor='photoUpload'
                className='flex justify-center gap-4 items-center cursor-pointer'
            >
                <img src='/icons/admins/photo_library.svg' alt='' />
                <p>
                    Drag picture here or{' '}
                    <span className='text-color-blue font-Satoshi-Medium'>
                        click
                    </span>{' '}
                    to upload
                </p>
            </label>
            <input
                type='file'
                name='photoUpload'
                id='photoUpload'
                accept='image/*'
                className='hidden'
                onChange={handlePicture}
            />

            {photoPreview && (
                <div className='flex justify-center justify-self-center'>
                    <img
                        src={photoPreview}
                        alt='photoPreview'
                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                    />
                </div>
            )}
        </div>
    )
}

export default ImageInput
