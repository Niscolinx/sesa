import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router'
import RenderArtisans from './RenderArtisans'
import Table from '../../../components/UI/table/Table'

function ArtisanCategory() {
    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <Table
                fetch_url={'/manager/get/all'}
                title={'estateManager'}
                view_page_url={'/superAdmin/estateManagers/view/'}
                add_page_url={'/superAdmin/estateManagers/add'}
                is_add_btn={true}
                THeader={[
                    'name',
                    'gender',
                    'phone number',
                    'joined date',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'name',
                    'image',
                    'gender',
                    'phone',
                    'created_at',
                    'status',
                ]}
                deactivateProp={{ url: 'change/user/status' }}
            />
        </div>
    )
}

function ArtisanList() {
    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <Table
                fetch_url={'/manager/get/all'}
                title={'estateManager'}
                view_page_url={'/superAdmin/estateManagers/view/'}
                add_page_url={'/superAdmin/estateManagers/add'}
                is_add_btn={true}
                THeader={[
                    'name',
                    'gender',
                    'phone number',
                    'joined date',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'name',
                    'image',
                    'gender',
                    'phone',
                    'created_at',
                    'status',
                ]}
                deactivateProp={{ url: 'change/user/status' }}
            />
        </div>
    )
}
function ArtisanGroup() {
    return (
        <div className='rounded-lg mt-[3rem] h-[80vh]'>
            <Table
                fetch_url={'/manager/get/all'}
                title={'estateManager'}
                view_page_url={'/superAdmin/estateManagers/view/'}
                add_page_url={'/superAdmin/estateManagers/add'}
                is_add_btn={true}
                THeader={[
                    'name',
                    'gender',
                    'phone number',
                    'joined date',
                    'status',
                    'actions',
                ]}
                data_to_display={[
                    'name',
                    'image',
                    'gender',
                    'phone',
                    'created_at',
                    'status',
                ]}
                deactivateProp={{ url: 'change/user/status' }}
            />
        </div>
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
        <div>
            <div className='estateDetail__radioBox'>
                {Array.from(handlePathSwitch.keys()).map((path) => {
                    return (
                        <>
                            <input
                                type='radio'
                                name='artisan'
                                id={path}
                                className='hidden'
                                onChange={() =>
                                    setCurrentPath(path)
                                }
                                checked={path === currentPath}
                            />
                            <label htmlFor={path} className='capitalize'>
                                {path.replaceAll('_', ' ')}
                            </label>
                        </>
                    )
                })}
                
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
