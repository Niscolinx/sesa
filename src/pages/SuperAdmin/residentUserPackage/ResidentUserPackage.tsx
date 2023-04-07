import { Fragment, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import ResidentPackageHistory from './ResidentPackageHistory'
import ResidentPackageList from './ResidentPackageList'
import useAxios from '../../../components/hooks/useAxios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

function AdditionalResident() {
    type SwitchRoute = 'list' | 'history'
    const axiosInstance = useAxios()
    const navigate = useNavigate()

   const handlePathSwitch = () => {
    navigate('/superAdmin/resident-user-package/add')
   }

     const fetchPackages = () => {
         return axiosInstance({
             // url: '/admin/get/all',
             url: '/manager/get/all',
         })
     }

     const {
         isLoading: get_packages_loading,
         data: get_packages_response,
         isError: get_packages_isError,
         error: get_packages_error,
         // isFetching: get_packages_fetching,
     } = useQuery('packages', fetchPackages) as any

    const resident_paths = [
        { path: 'list', label: 'Additional Resident Package' },
        { path: 'history', label: 'Package purchase history' },
    ] satisfies { path: SwitchRoute; label: string }[]

    const [currentPath, setCurrentPath] = useState<SwitchRoute>('list')

    const switchRoute = new Map([
        ['list', <ResidentPackageList />],
        ['history', <ResidentPackageHistory />],
    ]) satisfies Map<SwitchRoute, JSX.Element>

    const fetched = get_packages_response.data.data

    return (
        <div>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {fetched.length > 0 ? (
                    <>
                        <div className='estateDetail__radioBox capitalize'>
                            {resident_paths.map((eachPath, idx) => {
                                const { label, path } = eachPath
                                return (
                                    <Fragment key={label + idx}>
                                        <input
                                            type='radio'
                                            name='report'
                                            id={label + idx}
                                            className='hidden'
                                            onChange={() =>
                                                setCurrentPath(path)
                                            }
                                            checked={currentPath === path}
                                        />
                                        <label htmlFor={label + idx}>
                                            {label}
                                        </label>
                                    </Fragment>
                                )
                            })}
                        </div>
                        <section className='bg-color-white rounded-lg border min-w-[112rem] overflow-scroll mt-8 min-h-[60vh]'>
                            {switchRoute.get(currentPath)}
                        </section>
                    </>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4 bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Package yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={handlePathSwitch}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Package
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default AdditionalResident
