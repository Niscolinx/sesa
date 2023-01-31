import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import AddSecurityCompany from '../../components/securityCompany/AddSecurityCompany'
import RenderSecurityCompanies from '../../components/securityCompany/RenderedSecurityCompanies'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import {
    routeChangeSelector,
    setEstatePath,
} from '../../store/features/routeChange'

export type Actions = 'View Details' | 'Activate' | 'Deactivate'


function SecurityCompany() {
    const dispatch = useAppDispatch()
    const { securityCompanyPath } = useAppSelector(routeChangeSelector)

    const [securityCompanies, setSecurityCompanies] = useState(false)

    const switchRoute = {
        renderedSecurityCompanies: <RenderSecurityCompanies />,
        addSecurityCompany: <AddSecurityCompany />,
    }

    const addSecurityCompanyHandler = () => {
        setSecurityCompanies(true)
        dispatch(setEstatePath('renderedEstates'))
    }

    return (
        <div>
            <h1 className='heading2'>Security Company</h1>
            <div className='rounded-lg mt-[3rem] h-[80vh]'>
                {/* {securityCompanies ? (
                    <section>{switchRoute[securityCompanyPath]}</section>
                ) : (
                    <section className='estates__wrapper bg-white'>
                        <img src='/icons/admins/errorSvg.svg' alt='' />
                        <p className='text'>
                            Ooops you have not added any security Company yet
                        </p>
                        <button
                            className='btn addEstate__btn'
                            onClick={addSecurityCompanyHandler}
                        >
                            <span>
                                <IoMdAdd />
                            </span>{' '}
                            Add Company
                        </button>
                    </section>
                )} */}

                {switchRoute[securityCompanyPath]}
            </div>
        </div>
    )
}

export default SecurityCompany
