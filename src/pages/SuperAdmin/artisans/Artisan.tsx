import { Fragment, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import RenderArtisans from './RenderArtisans'
import Table from '../../../components/UI/table/Table'

function ArtisanCategory() {
    return (
        <Table
            fetch_url={'/admin/category/getAll'}
            title={'artisanCategory'}
            view_page_url={'/superAdmin/artisan/category/'}
            is_add_btn={true}
            isCategory={true}
            actions={['delete']}
            delete_item_url={'/admin/category/delete/'}
            THeader={['name', 'No of Artisans', 'created at', 'actions']}
            data_to_display={['name', 'artisan_count', 'created_at']}
            deactivateProp={{ url: '/admin/artisan/changeStatus', tag: 'id' }}
        />
    )
}

function ArtisanList() {
    return (
        <Table
            fetch_url={'/admin/artisan/getAll'}
            title={'artisanList'}
            view_page_url={'/superAdmin/artisan/detail/'}
            add_page_url={'/superAdmin/artisan/add'}
            is_add_btn={true}
            THeader={['name', 'business name', 'phone no', 'rating', 'actions']}
            data_to_display={[
                'firstname',
                'business_name',
                'phone_number',
                'rating',
            ]}
            deactivateProp={{ url: '/admin/artisan/changeStatus', tag: 'id' }}
        />
    )
}
function ArtisanGroup() {
    return (
        <Table
            fetch_url={'/admin/group/getAll'}
            title={'artisanGroup'}
            view_page_url={'/superAdmin/artisan/group/'}
            add_page_url={'/superAdmin/artisan/group/add'}
            is_add_btn={true}
            actions={['delete']}
            delete_item_url={'/admin/group/delete/'}
            THeader={['name', 'No of Artisans', 'No of Estates', 'status', 'created at', 'actions']}
            data_to_display={['name', 'artisan_count', 'estate_count', 'status', 'created_at']}
            deactivateProp={{ url: '/admin/artisan/changeStatus', tag: 'id' }}
        />
    )
}

function Artisan() {
    type PathSwitch = 'artisan_category' | 'artisan_list' | 'artisan_group'

    const [currentPath, setCurrentPath] = useState<PathSwitch>('artisan_list')

    const handlePathSwitch = new Map([
        ['artisan_category', <ArtisanCategory />],
        ['artisan_list', <ArtisanList />],
        ['artisan_group', <ArtisanGroup />],
    ]) satisfies Map<PathSwitch, JSX.Element>

    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
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
            {/* <div className='rounded-lg mt-[3rem] h-[80vh]'>
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
