
export const PhoneNumber = () => {
    return (
        <div className='grid gap-4'>
            <label htmlFor='phoneNumber' className='text-[1.4rem] font-medium'>
                Phone Number
            </label>

            <div className='flex text-[1.6rem] gap-4 h-[5rem]'>
                <select className='w-[30%] rounded-lg border border-color-grey py-4.8 px-4 outline-none cursor-pointer text-color-dark relative h-full'>
                    <option value='234'>+234</option>
                </select>
                <input
                    required
                    type='number'
                    inputMode='numeric'
                    id='phoneNumber'
                    placeholder='Phone Number'
                    className='w-full rounded-lg border border-color-grey py-4.8 px-8 outline-none text-color-dark'
                />
            </div>
        </div>
    )
}