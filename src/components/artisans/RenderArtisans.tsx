import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'
import ResidentUsersList, {
    IResidentUsersList,
    RESIDENT_LISTS,
} from '../additionalResident/ResidentUsersList'
import ArtisanCategory, { IArtisanCategory } from './ArtisanCategory'

export const ARTISAN_CATEGORY: IArtisanCategory[] = [
    {
        id: '1',
        name: 'Plumber',
        createdAt: '04 May 2021',
        NoOfArtisans: 10,
    },
    {
        id: '1',
        name: 'Plumber',
        createdAt: '04 May 2021',
        NoOfArtisans: 10,
    },
    {
        id: '1',
        name: 'Plumber',
        createdAt: '04 May 2021',
        NoOfArtisans: 10,
    },
    {
        id: '1',
        name: 'Plumber',
        createdAt: '04 May 2021',
        NoOfArtisans: 10,
    },
    {
        id: '1',
        name: 'Plumber',
        createdAt: '04 May 2021',
        NoOfArtisans: 10,
    },
]

function RenderArtisans() {
    const [fetchedResidentUsers, setFetchedResidentUsers] = useState<
        IResidentUsersList[] | null
    >(null)
    const [fetchedArtisanCategories, setFetchedArtisanCategories] = useState<
        IArtisanCategory[] | null
    >(null)

    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedResidentUsers(RESIDENT_LISTS)
                setFetchedArtisanCategories(ARTISAN_CATEGORY)
            }, 1000)
        }
        fetchData()
    }, [])

    type PathSwitch = 'artisanCategory' | 'artisanList' | 'artisanGroup'


    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        artisanCategory: (
            <ArtisanCategory
                fetchedArtisanCategories={fetchedArtisanCategories ?? []}
            />
        ),
        artisanList: (
            <ArtisanCategory
                fetchedArtisanCategories={fetchedArtisanCategories ?? []}
            />
        ),
        artisanGroup: (
            <ArtisanCategory
                fetchedArtisanCategories={fetchedArtisanCategories ?? []}
            />
        ),
    }

    return (
        <div>
            <div className='estateDetail__radioBox'>
                <input
                    type='radio'
                    name='report'
                    id='additionalResidentUsr'
                    className='hidden'
                    onChange={() => setCurrentPage(1)}
                    defaultChecked
                />
                <label htmlFor='additionalResidentUsr'>
                    Additional Resident Package
                </label>

                <input
                    type='radio'
                    name='report'
                    id='residentUserHistory'
                    className='hidden'
                    onChange={() => setCurrentPage(2)}
                />
                <label htmlFor='residentUserHistory' className='capitalize'>
                    Package purchase history
                    {/* //Change the custom select of package to be normal input field
                    //comma separated in Amount */}
                </label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {fetchedResidentUsers && fetchedResidentUsers.length > 0 ? (
                        handlePathSwitch(currentPage)
                    ) : (
                        <section className='relative w-[70vw] h-[60vh] mx-auto grid'>
                            <div className='absolute w-full h-full grid place-content-center'>
                                <CgSpinnerTwo className='animate-spin text-color-green-light text-5xl' />
                            </div>
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}

export default RenderArtisans
