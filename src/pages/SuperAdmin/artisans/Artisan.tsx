import { Fragment, useLayoutEffect, useState } from 'react'
import Table from '../../../components/UI/table/Table'
import PrevLocation from '../../../components/hooks/prevLocation'

function ArtisanList() {
    return (
        <Table
            fetch_url={'/admin/artisan/getAll'}
            title={'artisan'}
            view_page_url={'/superAdmin/artisan/detail/'}
            add_page_url={'/superAdmin/artisan/add-list'}
            is_add_btn={true}
            THeader={[
                'name',
                'business name',
                'phone no',
                'rating',
                'status',
                'actions',
            ]}
            data_to_display={[
                'firstname',
                'business_name',
                'phone_number',
                'rating',
                'status',
            ]}
            deactivateProp={{ url: '/admin/artisan/changeStatus', tag: 'id' }}
        />
    )
}

function ArtisanCategory() {
    return (
        <Table
            fetch_url={'/admin/category/getAll'}
            title={'artisanCategory'}
            view_page_url={'/superAdmin/artisan/category/'}
            is_add_btn={true}
            isCategory={true}
            THeader={[
                'name',
                'No of Artisans',
                'created at',
                'status',
                'actions',
            ]}
            data_to_display={['name', 'artisan_count', 'created_at', 'status']}
            deactivateProp={{ url: '/admin/category/delete', tag: 'id' }}
        />
    )
}

function ArtisanGroup() {
    return (
        <Table
            fetch_url={'/admin/group/getAll'}
            title={'artisanGroup'}
            view_page_url={'/superAdmin/artisan/group/'}
            add_page_url={'/superAdmin/artisan/add-group'}
            is_add_btn={true}
            delete_item_url={'/admin/group/delete/'}
            THeader={[
                'name',
                'No of Artisans',
                'No of Estates',
                'status',
                'created at',
                'actions',
            ]}
            data_to_display={[
                'name',
                'artisan_relationship_count',
                'estate_relationship_count',
                'status',
                'created_at',
            ]}
            deactivateProp={{
                url: '/admin/group/deactivate_activate',
                tag: 'id',
            }}
        />
    )
}

function Artisan() {
    type PathSwitch = 'artisan_category' | 'artisan_list' | 'artisan_group'

    const [currentPath, setCurrentPath] = useState<PathSwitch>('artisan_list')

    const handlePathSwitch = new Map([
        ['artisan_list', <ArtisanList />],
        ['artisan_category', <ArtisanCategory />],
        ['artisan_group', <ArtisanGroup />],
    ]) satisfies Map<PathSwitch, JSX.Element>

    const { prevLocation } = PrevLocation()

    let getLastPath = prevLocation.split('/').pop()

    let gottenPath = getLastPath?.includes(':')
        ? prevLocation.split('/:')[0].split('/').pop()
        : getLastPath

    useLayoutEffect(() => {
        if (gottenPath) {
            gottenPath = gottenPath.replace(/([a-z])([A-Z])/g, '$1 $2')

            let word = gottenPath.split('-').pop()?.toLowerCase()

            Array.from(handlePathSwitch.keys()).some((path) => {
                console.log({ path, word })
                return (
                    path.replace('_', ' ').toLowerCase().includes(word!) &&
                    setCurrentPath(path)
                )
            })
        }
    }, [getLastPath])

    return (
        <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
            <div className='estateDetail__radioBox'>
                {Array.from(handlePathSwitch.keys()).map((path) => {
                    return (
                        <Fragment key={path}>
                            <input
                                type='radio'
                                name='artisan'
                                id={path}
                                className='hidden'
                                onChange={() => setCurrentPath(path)}
                                checked={path === currentPath}
                            />
                            <label htmlFor={path} className='capitalize'>
                                {path.replaceAll('_', ' ')}
                            </label>
                        </Fragment>
                    )
                })}
            </div>
            <div className='mt-8 grid gap-8'>
                {handlePathSwitch.get(currentPath)}
            </div>
            {/* <div className='rounded-lg mt-[3rem] min-h-[60vh]'>
                {artisan ? (
                    <section>
                        <RenderArtisans />
                    </section>
                ) : (
                    <section className='grid  place-content-center w-full h-full justify-items-center gap-4 bg-white rounded-lg'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Artisan yet
                        </p>
                        <button
                            className='btn text-white bg-color-blue-1 flex items-center gap-4 py-4 px-16 rounded-lg'
                            onClick={addArtisanHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Artisan
                        </button>
                    </section>
                )}
            </div> */}
        </div>
    )
}

export default Artisan
