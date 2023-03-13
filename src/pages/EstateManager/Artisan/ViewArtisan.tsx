import React, { useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Select } from '../../../components/SuperAdmin/UI/Select'
import StarRating from '../../../components/SuperAdmin/UI/StarRating'
import { getPhotoUrl } from '../../../utils/getPhotoUrl'


type Actions = 'Deactivate' | 'Delete'

const ViewArtisan = () => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null)
    // const [dialogType, setDialogType] = useState<Actions>('Deactivate')

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

   

    return (
        <>
            <ToastContainer />

      

            <div className='grid p-8 bg-white  rounded-lg gap-[10rem]'>
                <div>
                    <div className='flex justify-between items-center'>
                        <label
                            htmlFor='photoUpload'
                            className='grid gap-4 cursor-pointer justify-items-center'
                        >
                            <img
                                src={photoUrl ? photoUrl : '/img/me.jpeg'}
                                alt='photoPreview'
                                className='object-cover w-[11rem] h-[11rem] rounded-full object-top'
                            />
                          
                        </label>
                        <input
                            type='file'
                            name='photoUpload'
                            id='photoUpload'
                            accept='image/*'
                            className='hidden'
                            onClick={handlePhotoPreview}
                        />

                        {/* <div className='flex gap-8'>
                            <button
                                className='border border-color-blue-1 text-color-blue-1 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() =>
                                    handleSelectedAction('Deactivate')
                                }
                            >
                                <span className=' text-[1.4rem] font-semibold'>
                                    Deactivate
                                </span>
                            </button>
                            <button
                                className='border border-red-600 px-16 py-4 flex items-center  rounded-lg gap-4'
                                onClick={() => handleSelectedAction('Delete')}
                            >
                                <img src='/icons/admins/delete.svg' alt='' />
                                <span className='text-red-600 text-[1.4rem] font-semibold'>
                                    Delete
                                </span>
                            </button>
                        </div> */}
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className='grid max-w-[84rem] gap-16 mt-12'
                        style={{
                            gridTemplateColumns:
                                ' repeat(auto-fit, minmax(35rem, 1fr))',
                        }}
                    >
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='fullName'
                                className='text-[1.4rem] font-medium'
                            >
                                Full Name *
                            </label>
                            <input
                                type='text'
                                required
                                id='fullName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='artisanCode'
                                className='text-[1.4rem] font-medium'
                            >
                                Business Name
                            </label>
                            <input
                                type='text'
                                required
                                id='artisanCode'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='DateOfBirth'
                                className='text-[1.4rem] font-medium'
                            >
                                Artisan Category
                            </label>
                            <input
                                type='text'
                                required
                                id='DateOfBirth'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative '>
                            <label
                                htmlFor='email'
                                className='text-[1.4rem] font-medium'
                            >
                                Email Address
                            </label>
                            <input
                                type='email'
                                required
                                id='email'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4'>
                            <label
                                htmlFor='phoneNumber'
                                className='text-[1.4rem] font-medium'
                            >
                                Phone Number *
                            </label>

                            <div className='flex text-[1.6rem] gap-4   h-[5rem]'>
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
                        <Select
                            label='Gender'
                            state={['Male', 'Female']}
                            placeholder='Male'
                            selectedState={selectedGender}
                            setSelectedState={setSelectedGender}
                        />

                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='homeAddress'
                                className='text-[1.4rem] font-medium'
                            >
                                Home Address
                            </label>
                            <input
                                type='text'
                                required
                                id='homeAddress'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>
                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='businessName'
                                className='text-[1.4rem] font-medium'
                            >
                                Business Name
                            </label>
                            <input
                                type='text'
                                required
                                id='businessName'
                                className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                            />
                        </div>

                        <div className='grid gap-4 relative'>
                            <label
                                htmlFor='status'
                                className='text-[1.4rem] font-medium'
                            >
                                Status
                            </label>
                            <input
                                type='text'
                                placeholder='Optional'
                                id='status'
                                value={'Active'}
                                className='w-full rounded-lg border-none text-[1.6rem] outline-none text-green-500'
                            />
                        </div>
                        <div>
                            <p
                                className='text-[1.4rem] font-medium'
                            >
                                Rating
                            </p>
                            <StarRating starsNum={3} />
                        </div>
                    </form>
                </div>
                <section>
                    <h2
                        className='text-[2rem] py-10'
                        style={{
                            fontFamily: 'Satoshi-Medium',
                        }}
                    >
                        Testimonials
                    </h2>
                    <div
                        className='grid grid-cols-2 rounded-lg border p-10 border-color-grey'
                        style={{
                            boxShadow:
                                '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                        }}
                    >
                        <div className='grid gap-8 '>
                            <div
                                className='flex gap-4 justify-between items-center border rounded-lg h-[9rem] max-w-[38rem] px-10'
                                style={{
                                    boxShadow:
                                        '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                                }}
                            >
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src='/img/avatar1.png'
                                        alt=''
                                        className='w-[5rem] h-[5rem] object-cover rounded-full'
                                    />

                                    <div>
                                        <p
                                            className='text-[1.4rem]'
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Jessica Okafor
                                        </p>
                                        <StarRating starsNum={4} />
                                    </div>
                                </div>

                                <div className='text-[1.4rem]'>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        7 Aug 2022
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Peace Estate
                                    </p>
                                </div>
                            </div>
                            <div
                                className='flex gap-4 justify-between items-center border rounded-lg h-[9rem] max-w-[38rem] px-10'
                                style={{
                                    boxShadow:
                                        '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                                }}
                            >
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src='/img/avatar2.png'
                                        alt=''
                                        className='w-[5rem] h-[5rem] object-cover rounded-full'
                                    />

                                    <div>
                                        <p
                                            className='text-[1.4rem]'
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Jessica Okafor
                                        </p>
                                        <StarRating starsNum={4} />
                                    </div>
                                </div>

                                <div className='text-[1.4rem]'>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        7 Aug 2022
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Peace Estate
                                    </p>
                                </div>
                            </div>
                            <div
                                className='flex gap-4 justify-between items-center border rounded-lg h-[9rem] max-w-[38rem] px-10'
                                style={{
                                    boxShadow:
                                        '0px 12.6316px 31.5789px rgba(102, 104, 105, 0.15)',
                                }}
                            >
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src='/img/avatar3.png'
                                        alt=''
                                        className='w-[5rem] h-[5rem] object-cover rounded-full'
                                    />

                                    <div>
                                        <p
                                            className='text-[1.4rem]'
                                            style={{
                                                fontFamily: 'Satoshi-Medium',
                                            }}
                                        >
                                            Jessica Okafor
                                        </p>
                                        <StarRating starsNum={4} />
                                    </div>
                                </div>

                                <div className='text-[1.4rem]'>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        7 Aug 2022
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: 'Satoshi-Light',
                                        }}
                                    >
                                        Peace Estate
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-8'>
                            <h3
                                className='text-[2rem]'
                                style={{
                                    fontFamily: 'Satoshi-Medium',
                                }}
                            >
                                Wonderful Service
                            </h3>
                            <p className='text-[1.8rem]'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nulla optio labore autem
                                provident, dolore dolorum dicta vel tempore
                                voluptatibus deserunt recusandae porro deleniti
                                dolores illum, temporibus eveniet earum.
                                Ducimus, repellendus? Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Quos adipisci
                                voluptatem molestias, obcaecati molestiae
                                veritatis libero eveniet porro accusamus,
                                reiciendis facilis. Illum et doloremque fuga quo
                                aut laudantium consequatur nemo.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ViewArtisan
