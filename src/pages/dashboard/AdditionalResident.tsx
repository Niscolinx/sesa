import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddEstate from '../../components/estates/AddEstate'
import RenderedEstates from '../../components/estates/RenderedEstates'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { routeChangeSelector, RenderEstatePath, setEstatePath } from '../../store/features/routeChange'



function AdditionalResident() {
    const dispatch = useAppDispatch()
    const { estatePath } = useAppSelector(routeChangeSelector)

    const [estatesLoaded, setEstatesLoaded] = useState(false)

    const switchRoute = (estatePath: RenderEstatePath) => {
        switch (estatePath) {
            case 'renderedEstates':
                return <RenderedEstates />

            case 'addEstate':
                return <AddEstate />

            default:
                return <AddEstate />
        }
    }

    const handleAddEstate = () => {
        setEstatesLoaded(true)
        dispatch(setEstatePath('renderedEstates'))
    }

    return (
        <div>
            <h1 className='heading2'>Additional Resident User</h1>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {estatesLoaded ? (
                    <section>{switchRoute(estatePath)}</section>
                ) : (
                    <section className='grid place-content-center w-full h-full justify-items-center gap-4'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any Package yet
                        </p>
                        <button
                            className='bg-color-blue-1 text-white flex gap-2 items-center rounded-lg justify-self-center py-4 px-16 text-[1.6rem]'
                            onClick={handleAddEstate}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Estate
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default AdditionalResident
