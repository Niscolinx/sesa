import { FormEvent, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { useCreateElectionContext } from '../createElection'

function Second() {
    const { electionCategory } = useCreateElectionContext()
    const [candidate, setCandidate] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>(null)
    const [name, setName] = useState('Aliba Desmond')
    const [gender, setGender] = useState('Male')
    const [manifesto, setManifesto] = useState('')

    interface InputField {
        candidate: string | null
        category: string | null
        name: string
        gender: string
        manifesto: string
        photoUrl: string
    }
    const [candidate_details, setCandidate_details] = useState<InputField[]>([])

    const [photoUrl, setPhotoUrl] = useState('')

    const handlePhotoPreview = async (
        _: React.MouseEvent<HTMLInputElement>
    ) => {
        const getUrl = await getPhotoUrl(`#photoUpload`)
        setPhotoUrl(getUrl)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const details = {
            name,
            gender,
            manifesto,
            category,
            candidate,
            photoUrl,
        } satisfies InputField

        setCandidate_details((prev) => {
            return [...prev, details]
        })
        setCandidate('')
        setName('')
        setGender('')
        setManifesto('')
        setPhotoUrl('')
    }

    const deleteCandidateHandler = (idx: number) => {
        setCandidate_details((prev) => {
            return prev.filter((_, index) => index !== idx)
        })
    }

    return (
        <div>
            <form
                className='grid gap-16 items-start content-start capitalize border-b pb-10'
                onSubmit={handleSubmit}
            >
                <div className='grid gap-4 relative w-[35rem]'>
                    <Select
                        state={[
                            'ALIBA DESMOND (RES CODE: 2345CDGK1)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK2)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK3)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK4)',
                            'ALIBA DESMOND (RES CODE: 2345CDGK5)',
                        ]}
                        label='Election Candidates (Select Resident Code)'
                        selectedState={candidate}
                        setSelectedState={setCandidate}
                    />
                </div>

                <div
                    className='grid gap-16 '
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, 35rem)',
                    }}
                >
                    <div className='grid gap-4 select-none pointer-events-none opacity-50 '>
                        <label
                            htmlFor='name'
                            className='text-[1.4rem] font-medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='name'
                            defaultValue={candidate ? name : ''}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 select-none pointer-events-none opacity-50'>
                        <label
                            htmlFor='gender'
                            className='text-[1.4rem] font-medium'
                        >
                            Gender
                        </label>
                        <input
                            type='text'
                            required
                            id='gender'
                            defaultValue={candidate ? gender : ''}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <Select
                        state={electionCategory}
                        label='Election Category'
                        selectedState={category}
                        setSelectedState={setCategory}
                    />

                    <div className='col-span-full'>
                        <label className=' font-medium'>Manifesto</label>
                        <textarea
                            rows={5}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 '
                            value={manifesto}
                            onChange={(e) => setManifesto(e.target.value)}
                        />
                    </div>
                    <div className='col-span-full rounded-lg border border-width-[.2rem] border-dashed border-color-grey-1 p-8 text-[1.6rem] relative w-full'>
                        <label
                            htmlFor='photoUpload'
                            className='flex justify-center gap-4 items-center cursor-pointer'
                        >
                            <img src='/icons/admins/photo_library.svg' alt='' />
                            <p
                                className='text-color-dark-1'
                                style={{
                                    fontFamily: 'Satoshi-Light',
                                }}
                            >
                                Drag picture here{' '}
                                <span className='text-color-blue font-bold'>
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
                            onClick={handlePhotoPreview}
                        />

                        {photoUrl && (
                            <div className='flex justify-center justify-self-center'>
                                <img
                                    src={photoUrl}
                                    alt='photoPreview'
                                    className='object-cover w-[11rem] h-[11rem] rounded-full'
                                />
                            </div>
                        )}
                    </div>
                    <button className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg justify-center w-max'>
                        <span>
                            <IoMdAdd />
                        </span>{' '}
                        Add Candidate
                    </button>
                </div>
            </form>

            <section className='mt-[5rem]'>
                {candidate_details.map((item, idx) => {
                    const { photoUrl, name, gender, manifesto, candidate } =
                        item
                    return (
                        <div>
                            <p className='font-Satoshi-Medium capitalize'>
                                candidate {idx} Details
                            </p>

                            <div
                                className='grid relative border-b pb-4'
                                key={idx}
                            >
                                <img
                                    src='/img/closeIcon.svg'
                                    alt=''
                                    className='self-end justify-self-end cursor-pointer'
                                    onClick={() => deleteCandidateHandler(idx)}
                                />
                                <div className='flex gap-16 items-center pb-8'>
                                    <img
                                        src={photoUrl}
                                        alt='photoPreview'
                                        className='object-cover w-[11rem] h-[11rem] rounded-full'
                                    />
                                    <div className='grid gap-4 min-w-[70rem]'>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                candidate Serial Number :
                                            </p>
                                            <p>{candidate}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Vehicle Registration Number :
                                            </p>
                                            <p>{gender}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Vehicle Type :
                                            </p>
                                            <p>{manifesto}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Vehicle Make :
                                            </p>
                                            <p>{name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export default Second
