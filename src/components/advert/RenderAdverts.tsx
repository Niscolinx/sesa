import { useState, useEffect } from 'react'
import { CgSpinnerTwo } from 'react-icons/cg'



export const ARTISAN_CATEGORY: IArti[] = [
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


type PathSwitch = 'artisanCategory' | 'artisanList' | 'artisanGroup'

function RenderAdverts() {
    const [fetchedArtisanList, setFetchedArtisanList] = useState<
        IArtisanList[] | null
    >(null)
    const [fetchedArtisanCategories, setFetchedArtisanCategories] = useState<
        IArtisanCategory[] | null
    >(null)
    const [fetchedArtisanGroups, setFetchedArtisanGroups] = useState<
        IArtisanGroup[] | null
    >(null)

    const [pathToSwitch, setPathToSwitch] =
        useState<PathSwitch>('artisanCategory')

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => {
                setFetchedArtisanList(ARTISAN_LIST)
                setFetchedArtisanCategories(ARTISAN_CATEGORY)
                setFetchedArtisanGroups(ARTISAN_GROUP)
            }, 1000)
        }
        fetchData()
    }, [])

    const handlePathSwitch: Record<PathSwitch, JSX.Element> = {
        artisanCategory: (
            <ArtisanCategory
                fetchedArtisanCategories={fetchedArtisanCategories ?? []}
            />
        ),
        artisanList: (
            <ArtisanList fetchedArtisanList={fetchedArtisanList ?? []} />
        ),
        artisanGroup: (
            <ArtisanGroup fetchedArtisanGroups={fetchedArtisanGroups ?? []} />
        ),
    }

    return (
        <div>
            <div className='estateDetail__radioBox'>
                <input
                    type='radio'
                    name='artisan'
                    id='artisanCategory'
                    className='hidden'
                    onChange={() => setPathToSwitch('artisanCategory')}
                    defaultChecked
                />
                <label htmlFor='artisanCategory'>Artisan Category</label>

                <input
                    type='radio'
                    name='artisan'
                    id='artisanList'
                    className='hidden'
                    onChange={() => setPathToSwitch('artisanList')}
                />
                <label htmlFor='artisanList' className='capitalize'>
                    Artisan List
                </label>
                <input
                    type='radio'
                    name='artisan'
                    id='artisanGroup'
                    className='hidden'
                    onChange={() => setPathToSwitch('artisanGroup')}
                />
                <label htmlFor='artisanGroup' className='capitalize'>
                    Artisan Group
                </label>
            </div>
            <div className='mt-8 grid gap-8'>
                <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll'>
                    {fetchedArtisanList && fetchedArtisanList.length > 0 ? (
                        handlePathSwitch[pathToSwitch]
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

export default RenderAdverts
