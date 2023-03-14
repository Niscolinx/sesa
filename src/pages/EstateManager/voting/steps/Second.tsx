import { FormEvent, useRef, useState } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { Select } from '../../../../components/SuperAdmin/UI/Select'
import { getPhotoUrl } from '../../../../utils/getPhotoUrl'
import { useCreateElectionContext } from '../createElection'

function Second() {
    const { electionCategory, candidate_details, setCandidate_details } = useCreateElectionContext()
    const [candidate, setCandidate] = useState<string | null>(null)
    const [category, setCategory] = useState<string | null>(null)
    const [name, setName] = useState('Aliba Desmond')
    const [gender, setGender] = useState('Male')
    const [manifesto, setManifesto] = useState('')
    const [currentIdx, setCurrentIdx] = useState<number>(0)

  
    const [photoUrl, setPhotoUrl] = useState('')
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close()
        }
    }

    const openDialog = (idx: number) => {
        const detailIdx = candidate_details.findIndex((_, i) => i === idx)

        setCurrentIdx(detailIdx)

        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
    }

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
        }

        setCandidate_details((prev) => {
            return [...prev, details]
        })
        setCandidate(null)
        setManifesto('')
        setPhotoUrl('')
        //setCategory(null)
    }

    const deleteCandidateHandler = (idx: number) => {
        setCandidate_details((prev) => {
            return prev.filter((_, index) => index !== idx)
        })
    }

    return (
        <div>
            <dialog className='dialog' ref={dialogRef}>
                <section className='grid place-content-center w-full h-[100vh]'>
                    <div className=' rounded-2xl justify-items-center w-[64rem] h-[30rem] bg-white'>
                        <div className=' relative p-8 capitalize h-full'>
                            <IoMdClose
                                className='absolute right-0 top-0 text-[2.5rem] cursor-pointer m-5'
                                onClick={() => closeDialog()}
                            />
                            <section className='grid gap-8'>
                                <p className='font-Satoshi-Bold pb-4 border-b'>
                                    Manifesto
                                </p>
                                <div className='col-span-full'>
                                    <label className=' font-Satoshi-Medium'>
                                        Details
                                    </label>
                                    <>
                                        {console.log({
                                            candidate_details,
                                            currentIdx,
                                        })}
                                    </>
                                    <textarea
                                        rows={5}
                                        className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4 '
                                        value={
                                            candidate_details[currentIdx]
                                                ?.manifesto
                                        }
                                        onChange={(e) => {
                                            setCandidate_details((prev) => {
                                                console.log({ prev })
                                                if (prev.length < 1) {
                                                    return (prev = [])
                                                }

                                                const updated = [...prev]
                                                updated[currentIdx].manifesto =
                                                    e.target.value

                                                console.log({ updated })
                                                return updated
                                            })
                                        }}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </dialog>
            <form
                className='grid gap-16 items-start content-start capitalize border-b pb-10'
                onSubmit={handleSubmit}
            >
                <div className='grid gap-4 relative w-[40rem]'>
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
                        gridTemplateColumns: 'repeat(auto-fit, 40rem)',
                    }}
                >
                    <div className='grid gap-4 select-none pointer-events-none opacity-50 '>
                        <label
                            htmlFor='name'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Name
                        </label>
                        <input
                            type='text'
                            required
                            id='name'
                            disabled
                            defaultValue={candidate ? name : ''}
                            className='w-full rounded-lg border border-color-grey text-[1.6rem] outline-none py-4 px-4'
                        />
                    </div>
                    <div className='grid gap-4 select-none pointer-events-none opacity-50'>
                        <label
                            htmlFor='gender'
                            className='text-[1.4rem] font-Satoshi-Medium'
                        >
                            Gender
                        </label>
                        <input
                            type='text'
                            required
                            id='gender'
                            disabled
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
                        <label className=' font-Satoshi-Medium'>
                            Manifesto
                        </label>
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
                    const { photoUrl, name, gender, category } = item
                    return (
                        <div className='mb-5'>
                            <p className='font-Satoshi-Medium capitalize text-[2rem]'>
                                candidate {idx + 1} Details
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
                                                Name:
                                            </p>
                                            <p>{name}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Gender :
                                            </p>
                                            <p>{gender}</p>
                                        </div>
                                        <div className='grid grid-cols-2 items-center justify-start '>
                                            <p className='font-Satoshi-Light'>
                                                Election Category :
                                            </p>
                                            <p>{category}</p>
                                        </div>
                                        <button
                                            className='text-[#098DFF] text-left cursor-pointer'
                                            onClick={() => openDialog(idx)}
                                        >
                                            View Details
                                        </button>
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
